package servlet;

import java.io.IOException;

import java.sql.SQLException;

import model.Board;
import model.Game;
import model.GameProcess;
import model.Player;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

/**
 * Websocket fuer Schiffe-Versenken-Spiele.
 */
public class ShipWebSocket implements OnTextMessage {
	  
    static final String SPLITDELIMITER = "%"; 
    
    /**
     * Konstante am Anfang des Strings, wenn ein Benutzername gesendet wird. data = "1%Benutzername"
     */
    static final int CREATEPLAYER = 1;
    
    /**
     *  Konstante am Anfang des Strings, wenn eine Chatmessage gesendet wird. data = "2%Chatmessage"
     */
    static final int CHATMESSAGE = 2; 
    
    /**
     * Konstante am Anfang des Strings, wenn sich ein neuer Spieler am Server anmeldet. <br />
     * data = "3%SpielerID%Spielername"
     */
    static final int HANDSHAKE = 3;
     
    /**
     * Konstante am Anfang des Strings, wenn ein neues Spiel erstellt wird. data = "3%"
     */
    static final int CREATEGAME = 4;
    
    /**
     * Konstante am Anfang des Strings, wenn einem Spiel beigetreten wird. data = "4%GameID%SpielerID"
     */
    static final int JOINGAME = 5;
    
   /**
    * Konstante am Anfang des Strings, wenn ein neues Spiel in der Lobby angezeigt werden soll. 
    * <br />data = "6%Alle Spiele als String" 
    */
    static final int NEWOPENGAME = 6;
    
    /**
     * Konstante am Anfang des Strings, wenn ein Spielbrett gesendet wird. data = "10%Spielbrett"
     */
    // TODO: von 10 auf 7 (muss dann aber auch im Client geändert werden)
    static final int GETBOARD = 10;
    
    /**
     * Konstante am Anfang des Strings, wenn ein Schuss gesendet wird. data = "11%y-Koordinate%x-Koordinate"
     */
    static final int GETSHOOT = 11;
    
    /**
     * Konstante am Anfang des Strings, wenn der Spieler am Zug ist. data = "12%"
     */
    static final int YOURTURN = 12;
    
    /**
     * Konstante am Anfang des Strings, wenn das Spiel vorbei ist. data = "15%Ergebnis"
     */
    static final int GAMEOVER = 15;
    
    
    /**
     * Die Websocket-Verbindung.
     * @see Connection servlet.ShipWebSocket.connection
     */
    private Connection connection;
    
    /**
     * Der Nutzer des Websockets.
     * @see model.Player
     */
    private Player player;
    
    /**
     * Konstruktor zum Erstellen eines Websockets aus einer Menge von Nutzern.
     * @param websockets Die Menge der Nutzer
     * @see java.util.Set
     */
    public ShipWebSocket() {
    	
    	this.connection = null;
    	this.player = null;
    	
    }
    
    /**
     * @return Der Spieler, der die Websocket-Verbindung nutzt.
     */
    public Player getPlayer() {
    	
    	return this.player;
    	
    }
    
    /**
     * @return Die Websocket-Verbindung.
     */
    public Connection getConnection() {
    	
    	return this.connection;
    	
    }
    
    /**
     * Oeffnen der Websocket-Verbindung.  <br />
     * Der Websocket wird ausserdem dem Servlet hinzugefuegt.
     */
    @Override
    public void onOpen(Connection connection ) {
    	
        this.connection = connection;
        ShipWebSocketServlet.addWebSocket(this);
        
    }
    
    /**
     * Schliessen der Websocket-Verbindung. <br />
     * Der Websocket wird ausserdem aus dem Servlet entfernt.
     */
    @Override
    public void onClose( int closeCode, String message ) {
    	
    	
        ShipWebSocketServlet.removeWebSocket(this);
        
    }

    /**
     * Empfangen einer Nachricht vom Client.
     */
    public void onMessage(String data) {
    	
    	/* 
    	 * Der String wird in den Messageparameter und den Inhalt geteilt.
    	 * siehe oben definierte Konstanten.
    	 */
    	System.out.println(data);
    	// Das String-Array nach dem Split.
    	String[] message = data.split(SPLITDELIMITER);
    	
    	// Umwandeln des ersten Strings (Messageparameter) in eine Ganzzahl.
    	int messageparameter = Integer.parseInt(message[0]);
    	
    	try {
    	
	    	// Vergleich des Messageparameters mit den definierten Konstanten:
	    	switch (messageparameter){
	    	
	          case CREATEPLAYER:
	        	  // Erstellen eines neuen Spielers:
	        	  createPlayer(message[1]);
	        	  
	        	  // Senden aller offenen Spiele an alle Spieler:
	        	  refreshLobbyGames();
	        	  break;
	          	
	          case CHATMESSAGE:
	        	  // Weiterleiten der Chatnachricht an alle Nutzer:
	        	  sendChatMessage(message[1]);
	        	  break;
	        	  
	          case HANDSHAKE:  	 
	        	  // Erneutes Erstellen des Spielers, beim Wechseln von der Lobby ins Spiel:
	        	  createPlayer(message[2], Long.valueOf(message[1]));
	        	  
	        	  // Senden aller offenen Spiele an alle Spieler:
	        	  refreshLobbyGames();
	        	  break;
	        	  
	          
	          case CREATEGAME:
	        	  // Erstellen eines neuen Spiels:
	        	  //Ja.. obwol es sich um ein StringArray handelt, ist das toString erforderlich... frag nicht warum........ ??
	        	  createGame(message[1].toString());
	        	  
	        	  // Senden aller offenen Spiele an alle Spieler:
	        	  refreshLobbyGames();
	  			  break;
	  			
	          case JOINGAME:
	        	  // Beitreten zu einem Spiel:
	        	  joinGame(message[1]);
	        	  
	        	  // Senden aller offenen Spiele an alle Spieler:
	        	  refreshLobbyGames();       
	        	  break;
	        	  
	          case GETBOARD:
	        	  // Setzen des Brettes:
	        	  setBoard(message[1], message[2]);       	 
	        	  break;
	        	  
	          case GETSHOOT:
	        	  // Updaten des Spiels und aller Spieler:
	        	  updateBoards(message[1], Integer.valueOf(message[2]), Integer.valueOf(message[3]));
	        	  break;
	        	  
	          default:
	
	        }
	    	
    	} catch(Exception e) {
    		
    		e.printStackTrace();
    		
    	}

   	}
    
    /**
     * Erstellen eines neuen Spielers.
     * @param playerName Der Name der Spielers.
     * @throws IOException wird geworfen, wenn beim Senden der Antwort ein Fehler auftritt.
     */
    private void createPlayer(String playerName) throws IOException {
    	
    	this.player = new Player(playerName, connection);
  	  	this.connection.sendMessage(CREATEPLAYER + SPLITDELIMITER + String.valueOf(player.getID()));
    	
    }
    
    /**
     * Erstellen eines neuen Spielers.
     * @param playerName Der Name der Spielers.
     * @param playerID Die ID des Spielers.
     * @throws IOException wird geworfen, wenn beim Senden der Antwort ein Fehler auftritt.
     */
    private void createPlayer(String playerName, long playerID) throws IOException {
    	
    	player = new Player(playerName, connection, playerID);

    }
    
    /**
     * Versenden einer eingeganenen Chatnachricht an alle Nutzer.
     * @param message Die eingegangene Chatnachricht.
     * @throws IOException wird geworfen, wenn beim Senden der Chatnachricht ein Fehler auftritt.
     */
    private void sendChatMessage(String message) throws IOException {
    	
    	for (ShipWebSocket socket : ShipWebSocketServlet.websockets)
    		socket.getConnection().sendMessage(CHATMESSAGE + SPLITDELIMITER + this.player.getName() + 
    				": " + message);

    }
    
    /**
     * Erstellen eines neues Spiels.
     * @param gameName Der Name des Spiels.
     * @throws IOException wird geworfen, wenn beim Senden der Antwort ein Fehler auftritt.
     */
    private void createGame(String gameName) throws IOException {
    	
  	  	ShipWebSocketServlet.addGame(new Game(gameName)); 	  
		this.connection.sendMessage(CREATEGAME + SPLITDELIMITER + gameName);
    	
    }
    
    /**
     * Beitreten zu einem Spiel.
     * @param gameName Der Name des Spiels.
     * @throws IOException wird geworfen, wenn beim Senden der Antwort ein Fehler auftritt.
     */
    private void joinGame(String gameName) throws IOException {
    	
    	String enemyNames = "";
  	  	Game game = ShipWebSocketServlet.getGame(gameName);
  	  	game.addPlayer(this.player);
  	  	
  	  	
  	  	// Nach dem Hinzufuegen werden alle anderen Spieler dieses Spiels informiert.
  	  	for (Player player : game.getAllPlayer()) {
  	  		if (player != this.player) {
  	  			player.getWebSocketConnection().sendMessage(JOINGAME + SPLITDELIMITER + this.player.getName());
  	  			enemyNames += player.getName() + SPLITDELIMITER;
  	  		}
  	  	}
  	  	
  	  	// Anschliessend bekommt der Spieler, der gejoint hat, die Namen aller anderen Spieler, sofern er nicht alleine ist
  	  	// Alleine ist der Spieler, wenn er der Creator des Spiels ist.
  	  	if (!enemyNames.isEmpty()) {
  	  		this.connection.sendMessage(JOINGAME + SPLITDELIMITER + enemyNames);
  	  	}
    	
    }
    
    /**
     * Setzen des Spielbrettes.
     * @param gameName Das Spiel des Spielers.
     * @param strBoard Das Brett als String.
     */
    private void setBoard(String gameName, String strBoard) {
    	
   	  	Game game = ShipWebSocketServlet.getGame(gameName);
   	  	Board board = new Board(strBoard);
   	  	this.player.setBoard(board);     
   	  	if(game.allPlayersReady())
   	  		game.startGame();
    	
    }
    
    /**
     * Updaten des Spiels und der Spielbretter aller Spieler nach einem Schuss.
     * @param gameName Der Name des Spiels.
     * @param y Die y-Koordinate des Schusses.
     * @param x Die x-Koordinate des Schusses.
     * @throws SQLException wird geworfen, wenn beim Eintragen in die Datenbank ein Fehler auftritt.
     * @throws IOException wird geworfen, wenn beim Senden der Antwort ein Fehler auftritt.
     */
    // TODO: auf 2 spieler ausgelegt
    private void updateBoards(String gameName, int y, int x) throws SQLException, IOException {
    	
    	Game game = ShipWebSocketServlet.getGame(gameName);
  	  
    	game.getActPlayer().setHit();
    	
  	  	if(game.allPlayersReady() == true) {

  	  		// Ergebnis des Schusses bestimmen:
  	  		int result = game.update(game.getActPlayer(), y, x).get(0);
      	  

  	  		// Wenn das Spiel gewonnen ist, wird das Spiel entfernt und die Player zur Lobby weitergeleitet.
  	  		if(game.isGameOver()) {
					
      			//Entfernt das Spiel vom Serlvet:
				ShipWebSocketServlet.removeGame(gameName);
				return;      		 
      		  
  	  		}
      	  
  	  		// Jedem Spieler wird der Schuss uebermittelt.
  	  		GameProcess.sendOwnResult(game.getActPlayer().getWebSocketConnection(), y, x, result);
  	  		GameProcess.sendEnemyResult(game.getNextPlayer().getWebSocketConnection(), y, x, result);
 
      	  
  	  		// Wenn es ein Treffer ist, darf der Spieler noch einmal schiessen.
  	  		if (result == 1) {
  	  			
  	  			// kein Treffer (Spieler wird nicht nochmal gewechselt)
  	  			GameProcess.callNextPlayer(game.getActPlayer().getWebSocketConnection());
  	  			
  	  		} else {
  	  			// Treffer (Spieler wird erneut gewechselt)
  	  			GameProcess.callNextPlayer(game.getNextPlayer().getWebSocketConnection());
  	  		}
  		  
  	  } else {
  		  
  		  this.connection.sendMessage(String.valueOf(GAMEOVER) + SPLITDELIMITER + 
  					  "Dein Gegner hat leider das Spiel verlassen! Du hast gewonnen.");
  		  ShipWebSocketServlet.removeGame(gameName);
  		  
  	  }
    	
    }
    
    /**
     * Sendet jedem Client eine Liste mit offenen Spielen.
     * @throws IOException wird geworfen, wenn beim Senden der Antwort ein Fehler auftritt.
     */
    private void refreshLobbyGames() throws IOException {
		
    	for (ShipWebSocket socket : ShipWebSocketServlet.websockets)
    		socket.getConnection().sendMessage(NEWOPENGAME + SPLITDELIMITER + 
						ShipWebSocketServlet.getAllGames());
    	
	}
    
    
		
}