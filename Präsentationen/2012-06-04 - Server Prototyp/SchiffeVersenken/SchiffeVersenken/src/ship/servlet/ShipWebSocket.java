package ship.servlet;


import java.io.IOException;
import java.util.Set;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

public class ShipWebSocket implements OnTextMessage {
    private Connection connection;
    private Set<ShipWebSocket> user;

    
    public ShipWebSocket(Set<ShipWebSocket> user) {
        this.user = user;
    }
    
    
    public Connection getConnection() {
    	return connection;
    }

    /**
     * Methode wird bei WebSocket verbinden aufgerufen
     */
    @Override
    public void onOpen( Connection connection ) {
        this.connection = connection;
        this.user.add( this );
        
    }
    
    /**
     * Methode wird bei WebSocket trennen aufgerufen
     */
    @Override
    public void onClose( int closeCode, String message ) {
        
        Connection enemyConnection = WebSocketConnections.getShipWebSocket(this).getConnection();
    	try {
			enemyConnection.sendMessage("Connection close");
		} catch (IOException e) {
			// TODO Auto-generated catch block
		}
    	this.user.remove( this );
    }

    /**
     * Methode wird bei neuer Nachricht vom Client aufgerufen
     */
    @Override
    public void onMessage(String data) {
    	
    	// Bei eingehenden Nachrichten werden diese zuänchst direkt weitergesendet
    	// TODO Irgendwann mal serverseitig implementieren und für mehrere Benutzer implementieren
    	Connection enemyConnection = WebSocketConnections.getShipWebSocket(this).getConnection();
    	try {
			enemyConnection.sendMessage(data);
		} catch (IOException e) {
			// TODO Auto-generated catch block
		}
    }
} 