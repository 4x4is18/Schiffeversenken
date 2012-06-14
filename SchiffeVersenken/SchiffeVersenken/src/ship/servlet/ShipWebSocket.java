package ship.servlet;

import java.io.IOException;

import java.util.Set;

import model.Player;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

public class ShipWebSocket implements OnTextMessage {
    private Connection connection;
    private Set<ShipWebSocket> user;
    Player player;
    
    static final String SPLITDELIMITER = ":"; 
    
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
    	String[] message = data.split(SPLITDELIMITER);
    	
    	/**
    	 * Da erst ab Java 1.7 Switch mit String möglich ist, wird der Messageparameter in ein Int umgewandelt.
    	 */
    	int messageparameter = Integer.parseInt(message[0]);
    	
    	switch (messageparameter){
    	
          case CREATE:
        	player = new Player(message[1]);
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
          case 4:

          default:

        }
    	// TODO: System.out.println entfernen
    	System.out.println(data);
   	}
		
}
		

