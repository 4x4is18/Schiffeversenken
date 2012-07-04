package ship.servlet;

import java.io.IOException;

import java.sql.SQLException;
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
    DBConnection dbconnection;
    
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
     * Konstante für das Spielerstellen 
     */
    static final int JOINGAME = 5;
    
   /**
    * Konstante für das Senden an alle Clients, dass ein neues Spiel in der Liste ist. 
    */
    static final int NEWOPENGAME = 6;
    
    /**
     * Konstante fuer das Empfangen eines Brettes
     */
    static final int GETBOARD = 10;
    
    /**
     * Konstante fuer das Empfangen eines Schusses
     */
    static final int GETSHOOT = 11;
    
    /**
     * Wenn ein Spieler an der Reihe ist.
     */
    static final int YOURTURN = 12;
    
    /**
     * Konstante für Spiel vorbei.
     */
    static final int GAMEOVER = 15;
    
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
    	
    	
    	ShipWebSocketServlet.removePlayer(this.player);
        this.user.remove( this );
        System.out.println("Websocket closed");
        
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
          	
      	  // Sendet beim Eintritt in die Lobby dem User die Liste mit offenen Spielen
      	  try {
      		  
				this.connection.sendMessage(NEWOPENGAME + SPLITDELIMITER + ShipWebSocketServlet.getAllGames());
				
			} catch (IOException e1) {

				e1.printStackTrace();
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
        	  player = new Player(message[2], connection, Long.valueOf(message[1]).longValue());
          	  ShipWebSocketServlet.addPlayer(player);
      	  
        	  // Sendet beim Eintritt in die Lobby dem User die Liste mit offenen Spielen
        	  try {
        		  
				this.connection.sendMessage(NEWOPENGAME + SPLITDELIMITER + ShipWebSocketServlet.getAllGames());
				
			} catch (IOException e1) {

				e1.printStackTrace();
			}
        	  break;
        	  
          
          case CREATEGAME:
        	  
        	  game = new Game(message[2], message[2]);
        	  ShipWebSocketServlet.addGame(game);
        	  
        	  try {
        		  
  				this.connection.sendMessage(CREATEGAME + SPLITDELIMITER + "bla");
  				
  			  } catch (IOException e) {
  				// TODO Auto-generated catch block
  			  }
        	  
        	  refreshLobbyGames();
  			  break;
  			
          case JOINGAME:
        	  String gameName = message[2];
        	  game = ShipWebSocketServlet.getGame(gameName);
        	  String playerID = message[1]; 
        	  game.addPlayer(this.player);
        	  
        	  try {
    				this.connection.sendMessage(JOINGAME + SPLITDELIMITER + game.getName());
    				// TODO: kicken
    				//this.connection.sendMessage(String.valueOf(game.getNumPlayers()) );
    				
    			} catch (IOException e) {
    				// TODO Auto-generated catch block
    			}
        	  
        	  // Nach dem Joinen eines Spiels wird die Liste der offenen Spiele in der Lobby aktualisiert
        	  refreshLobbyGames();
        
        	  break;
        	  
          case GETBOARD:
        	  String gameID = message[1];
        	  game = ShipWebSocketServlet.getGame(gameID); // TODO
        	  playerID = message[2]; 
        	  
        	  this.player.setConnection(this.connection);
        	  String strBoard = message[3];
        	  Board board = new Board(strBoard);
        	  this.player.setBoard(board);     
        	  if (game.allPlayersReady()) {
        		  game.startGame();
        		
        	  }
        	  break;
        	  
          case GETSHOOT: //TODO umbedingt optimieren!!!!!
        	  gameID = message[1];
        	  game = ShipWebSocketServlet.getGame(gameID);
        	  
        	  if(game.allPlayersReady() == true) {
        		  
            	  /*
            	   * TODO: nur für 2 Spieler implementiert:
            	   */
            	  int y = Integer.parseInt(message[2]);
            	  int x = Integer.parseInt(message[3]);
            	  int result = game.update(game.getActPlayer(), y, x).get(0);
            	  

            	  // Wenn das Spiel gewonnen ist, wird das Spiel entfernt und die Player zur Lobby weitergeleitet.
            	  if(game.isGameOver()) {
            		  // TODO: Datenbank
            		  dbconnection = new DBConnection();
            		  try {
						//Eintrag des Gewinners in die Datenbank
            			  dbconnection.query("INSERT INTO `Schiffeversenken`.`highscore`" + " VALUES ('" + game.getActPlayer().getName() + "', '" + game.getNextPlayer().getName() + "' , '" + game.getActPlayer().getHits() + "');");
						
						 //Entfernt das Spiel aus der Game arraylist
						ShipWebSocketServlet.removeGame(gameID);
						 break;
						 
					} catch (SQLException e) {
						// TODO Automatisch erstellter Catch-Block
						e.printStackTrace();
					}           		 
            		  
            	  }
            	  
            	  // Jedem Spieler (BIS JETZT NUR ZWEI) wird der Schuss übermittelt.
            	  GameProcess.sendOwnResult(game.getActPlayer().getWebSocketConnection(), y, x, result);
            	  GameProcess.sendEnemyResult(game.getNextPlayer().getWebSocketConnection(), y, x, result);
            	  
            	  //Bei jedem Spielzug des aktuellen Spielers wird dessen Hitliste um +1 erhöht
            	  game.getActPlayer().setHit();
            	  
            	  // Wenn es ein Treffer ist, darf der Spieler noch einmal schießen. Wenn nicht ist der andere dran
            	  if (result == 1) {
            		  // Es wurde ins Wasser geschossen. Es wird die Connection vom Gegner aufgerufen und ihm gesagt, dass er an der Reihe ist.
            		  GameProcess.callNextPlayer(game.getActPlayer().getWebSocketConnection());
            	  } else {
            		  // Es wurde ein Schiff versenkt oder getroffen. Der Aktuelle Spieler darf noch einmal schießen. 
            		  GameProcess.callNextPlayer(game.getNextPlayer().getWebSocketConnection());
            	  } 
            	  
            	  break;
        		  
        	  } else {
        		  
        		  try {
        			  
        			  this.connection.sendMessage(String.valueOf(GAMEOVER) + SPLITDELIMITER + 
        					  "Dein Gegner hat leider das Spiel verlassen! Du hast gewonnen.");
					
				} catch (IOException e) {
					
					// TODO Auto-generated catch block
					e.printStackTrace();
					
				}
        		  
        		  ShipWebSocketServlet.removeGame(gameID);
        	  }

        	  break;
          default:

        }
    	
    	

   	}
    
    /**
     * Sendet jedem Client eine Liste mit offenen Spielen
     */
    public void refreshLobbyGames() {
		
		 for (ShipWebSocket users : user) {
  		  
  		  try {
  			          			  
				users.connection.sendMessage(NEWOPENGAME + SPLITDELIMITER + ShipWebSocketServlet.getAllGames());
				
			  } catch (Exception e) {
				
		      }
  		  
		   }
		 
	}
		
}