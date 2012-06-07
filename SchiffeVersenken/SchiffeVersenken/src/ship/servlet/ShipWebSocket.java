package ship.servlet;


import java.io.IOException;
import java.util.Set;
import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

public class ShipWebSocket implements OnTextMessage {
    private Connection connection;
    private Set<ShipWebSocket> user;
    private String benutzername;

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
        System.out.println("Websocket CLOSE - " + this.connection.toString());
    }

    /**
     * Wenn eine Nachricht vom Client empfangen wird, wird jedem User der auf dem Websocket ist diese Nachricht übermittelt. Alle User stehen in einem Array
     */

    public void onMessage(String data) {
    	/* 
    	 * TODO:_Schrecklich geschirben, bitte verbesser
    	 */
    	String delimiter;
		delimiter = ";";
    	String[] message = data.split(delimiter);
    	int index = Integer.parseInt(message[0]);
    	
    	
    	switch (index){
    	
          case 1:
          	this.benutzername = message[1];
          	
          	break;
          case 2:
        	  for (ShipWebSocket users : user) {
        		  try {
      				users.connection.sendMessage(this.benutzername + ": " + message[1]);
      			  } catch (Exception e) {
      				
      		      }
      		   }
        	  break;
          case 3:

          case 4:

          default:

        }
    	// TODO: System.out.println entfernen
    	System.out.println(data);
   	


		}
		
    }

		

