package ship.servlet;


import java.io.IOException;
import java.sql.SQLException;
import java.util.Set;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

public class ShipWebSocket implements OnTextMessage {
    private Connection connection;
    private Set<ShipWebSocket> user;

    public ShipWebSocket(Set<ShipWebSocket> user) {
        this.user = user;
    }

    /**
     * Methode wird bei WebSocket verbinden aufgerufen
     */
    @Override
    public void onOpen( Connection connection ) {
        this.connection = connection;
        this.user.add( this );
        System.out.println("Websocket OPEN");
    }
    
    /**
     * Methode wird bei WebSocket trennen aufgerufen
     */
    @Override
    public void onClose( int closeCode, String message ) {
        this.user.remove( this );
        System.out.println("Websocket CLOSE - " + this.connection.toString());
    }

    /**
     * Methode wird bei neuer Nachricht vom Client aufgerufen
     */
    @Override
    public void onMessage(String data) {
    	DBConnection con = new DBConnection();
    	try {
			con.query("INSERT INTO Schiffeversenken.spieler (spielerid, name) VALUES ('1', '" + data +"')");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	try {
			connection.sendMessage(data);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
} 