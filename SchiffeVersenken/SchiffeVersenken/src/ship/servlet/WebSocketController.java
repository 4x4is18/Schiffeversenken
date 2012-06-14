package ship.servlet;

/*
 * Splitter, da immoment nur Strings über den Websocket gepushed werden könnnen.
 */
public class WebSocketController {
	
	private static String delimiter = ":";
	
	
	public static String[] recieve(String data) {
		
		return data.split(delimiter);
	}
	
	
	

}
