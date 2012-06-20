package ship.servlet;

public class WebSocketConnections {
	private static ShipWebSocket[] sockets = new ShipWebSocket[2];
	

	public static void addSocket(ShipWebSocket socket) {
		if (sockets[0] == null) {
			sockets[0] = socket;
			
		} else {
			sockets[1] = socket;
		}
	}
	
	public static ShipWebSocket getShipWebSocket (ShipWebSocket socket) {
		if (sockets[0] == socket) {
			return sockets[1];
		} else {
			return sockets[0];
		}
			
		
		
	}
	
		
	
		
}
