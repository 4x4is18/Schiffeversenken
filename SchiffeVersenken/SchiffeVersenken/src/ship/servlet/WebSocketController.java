package ship.servlet;

/*
 * Splitter, da immoment nur Strings �ber den Websocket gepushed werden k�nnnen.
 */
public class WebSocketController {
	
	private static String delimiter = ":";
	
	
	public static String[] recieve(String data) {
		
		return data.split(delimiter);
	}
	
	
	

}
