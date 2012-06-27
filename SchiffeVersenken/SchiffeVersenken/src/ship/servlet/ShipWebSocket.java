package ship.servlet;

import java.io.IOException;

import java.util.Set;

import model.Board;
import model.Game;
import model.GameProcess;
import model.Player;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

public class ShipWebSocket implements OnTextMessage {
    private Connection connection;
    private Set<ShipWebSocket> user;
    Player player;
    
    static final String SPLITDELIMITER = "%"; 
    
    /**
     * Konstante am Anfang des Strings, wenn ein Benutzername gesendet wird. data = "1;Benutzername"
     */
    static final int CREATE = 1;
    
    /**
     *  Konstante am Anfang des Strings, wenn eine Chatmessage gesendet wird. data = "2;Chatmessage"
     */
    static final int CHATMESSAGE = 2; 
    
    /**
     * TODO: 
     * Konstante am Anfang des Strings, wenn ein neues Spiel gestartet wird. data = "3;create"
     *
     */
    static final int HANDSHAKE = 3;
     
    /**
     * Konstante für das Erstellen eines Spieles
     */
    static final int CREATEGAME = 4;
    
    /**
     * TODO
     */
    static final int JOINGAME = 5;
    
    /**
     * Konstante fuer das Empfangen eines Brettes
     */
    static final int GETBOARD = 10;
    
    /**
     * Konstante fuer das Empfangen eines Schusses
     */
    static final int GETSHOOT = 11;
    
    
    static final int YOURTURN = 12;
    
    /**
     * TODO
     * @param user
     */
    public ShipWebSocket(Set<ShipWebSocket> user) {
    	
        this.user = user;
        
    }
    
    /**
     * Methode wird bei WebSocket verbinden aufgerufen
     */
    @Override
    public void onOpen(Connection connection ) {
    	
        this.connection = connection;
        this.user.add( this );
        System.out.println("Websocket OPEN");
        
    }
    
    /**
     * Wenn ein Client den Websocket schließt, wird dieser User gelöscht
     */
    @Override
    public void onClose( int closeCode, String message ) {
    	
        this.user.remove( this );
        System.out.println();
        
    }

    /**
     * Wenn eine Nachricht vom Client empfangen wird, wird jedem User der auf dem Websocket ist diese Nachricht übermittelt. Alle User stehen in einem Array
     */
    public void onMessage(String data) {
    	/* 
    	 * Der String wird in den Messageparameter und den Inhalt geteilt.
    	 * TODO:_Schrecklich geschirben, bitte verbessern
    	 */
    	Game game;
    	System.out.println(data);
    	String[] message = data.split(SPLITDELIMITER);
    	
    	/**
    	 * Da erst ab Java 1.7 Switch mit String möglich ist, wird der Messageparameter in ein Int umgewandelt.
    	 */
    	int messageparameter = Integer.parseInt(message[0]);
    	
    	switch (messageparameter){
    	
          case CREATE:
        	player = new Player(message[1], connection);
        	ShipWebSocketServlet.addPlayer(player);
          	try {
				this.connection.sendMessage(CREATE + SPLITDELIMITER + String.valueOf(player.getID()));
				
			} catch (IOException e1) {
				// TODO Auto-generated catch block
			}
          	break;
          case CHATMESSAGE:
        	  for (ShipWebSocket users : user) {
        		  try {
        			  System.out.println(CHATMESSAGE + SPLITDELIMITER + this.player.getName() + ": " + message[1]);
      				users.connection.sendMessage(CHATMESSAGE + SPLITDELIMITER + this.player.getName() + ": " + message[1]);
      			  } catch (Exception e) {
      				
      		      }
      		   }
        	  break;
          case HANDSHAKE:  	 
        	  String userID = message[1];
        	  player = ShipWebSocketServlet.getPlayer(userID);
        	  break;
          
          case CREATEGAME:
        	  game = new Game(this.player, "bla", "bla");
        	  ShipWebSocketServlet.addGame(game);
        	  try {
  				this.connection.sendMessage(CREATEGAME + SPLITDELIMITER + "bla");
  				
  			} catch (IOException e) {
  				// TODO Auto-generated catch block
  			}
        	 
  			break;
  			
          case JOINGAME:
        	  String gameName = message[2];
        	  game = ShipWebSocketServlet.getGame(gameName);
        	  String playerID = message[1]; 
        	  Player player = ShipWebSocketServlet.getPlayer(playerID);
        	  game.addPlayer(player);
        	  
        	  try {
    				this.connection.sendMessage(JOINGAME + SPLITDELIMITER + game.getName());
    				this.connection.sendMessage(String.valueOf(game.getNumPlayers()) );
    				
    			} catch (IOException e) {
    				// TODO Auto-generated catch block
    			}
        	  break;
        	  
          case GETBOARD:
        	  String gameID = message[1];
        	  game = ShipWebSocketServlet.getGame(gameID); // TODO
        	  playerID = message[2]; 
        	  
        	  player = ShipWebSocketServlet.getPlayer(playerID);
        	  player.setConneion(connection);
        	  String strBoard = message[3];
        	  Board board = new Board(strBoard);
        	  player.setBoard(board);     
        	  if (game.allPlayersReady()) {
        		  game.startGame();
        		
        	  }
        	  break;
        	  
          case GETSHOOT: //TODO umbedingt optimieren!!!!!
        	  gameID = message[1];
        	  game = ShipWebSocketServlet.getGame(gameID);
        	  /*
        	   * TODO: nur für 2 Spieler implementiert:
        	   */
        	  int y = Integer.parseInt(message[2]);
        	  int x = Integer.parseInt(message[3]);
        	  int result = game.update(game.getActPlayer(), y, x).get(0);
        	  
        	  if(game.isGameOver()) {
        		  // TODO: Datenbank
        		  ShipWebSocketServlet.removeGame(gameID);
        		  break;
        	  }
        	  
        	  GameProcess.sendOwnResult(game.getActPlayer().getWebSocketConnection(), y, x, result);
        	  GameProcess.sendEnemyResult(game.getNextPlayer().getWebSocketConnection(), y, x, result);
        	  GameProcess.callNextPlayer(game.getActPlayer().getWebSocketConnection());
        	  break;
        	
        	  
          default:

        }
    	// TODO: System.out.println entfernen
    	//System.out.println(data);
   	}
		
}