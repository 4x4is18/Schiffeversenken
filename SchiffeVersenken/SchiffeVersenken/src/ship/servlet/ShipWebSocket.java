package ship.servlet;

import java.io.IOException;
import java.util.Set;
import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

public class ShipWebSocket implements OnTextMessage {
    private Connection connection;
    private Set<ShipWebSocket> user;
    private String benutzername;
    
    /**
     * Konstante am Anfang des Strings, wenn ein Benutzername gesendet wird. data = "1;Benutzername"
     */
    static final int BENUTZERNAME = 1;
    
    /**
     *  Konstante am Anfang des Strings, wenn eine Chatmessage gesendet wird. data = "2;Chatmessage"
     */
    static final int CHATMESSAGE = 2; 
    
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
        System.out.println("Websocket CLOSE");
    }

    /**
     * Wenn eine Nachricht vom Client empfangen wird, wird jedem User der auf dem Websocket ist diese Nachricht übermittelt. Alle User stehen in einem Array
     */
    public void onMessage(String data) {
    	System.out.println(data);
    	/* 
    	 * Der String wird in den Messageparameter und den Inhalt geteilt.
    	 * TODO:_Schrecklich geschirben, bitte verbesser
    	 */
    	String delimiter = ":";
    	String[] message = data.split(delimiter);
    	
    	/**
    	 * Da erst ab Java 1.7 Switch mit String möglich ist, wird der Messageparameter in ein Int umgewandelt.
    	 */
    	int messageparameter = Integer.parseInt(message[0]);
    	
    	switch (messageparameter){
    	
          case BENUTZERNAME:
          	this.benutzername = message[1];
          	
          	break;
          case CHATMESSAGE:
        	  for (ShipWebSocket users : user) {
        		  try {
      				users.connection.sendMessage(this.benutzername + ": " + message[1]);
      			  } catch (Exception e) {
      				
      		      }
      		   }
        	  break;
          case 3:

          case 4:
        	  
          case 10:
        	  try {
				connection.sendMessage(String.valueOf(1));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

          default:

        }
    	// TODO: System.out.println entfernen
    	System.out.println(data);
   	}
		
}

		

