package servlet;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import model.Game;
import model.GameProcess;
import model.Player;
import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;

/**
 * Das Servlet fuer das Schiffe-Versenken-Spiel.
 */
public class ShipWebSocketServlet extends WebSocketServlet {
	
	/*
	 * Ist die Anzahl der Leseoperationen hoch, kann es sich lohnen, bei jedem Schreibzugriff erst die Daten 
	 * zu kopieren und dann das Element hinzuzufuegen, damit im Hintergrund andere Threads ohne einen Lock, 
	 * der fuers Schreiben noetig ist, lesen koennen. Zwei dieser Datenstrukturen bietet Java an: 
	 * CopyOnWriteArrayList fuer Listen und CopyOnWriteArraySet fuer Mengen. Die Klassen sind 
	 * genau dann optimal, wenn wenig veraendert (teuer) und fast ausschliesslich gelesen wird.
	 * (http://openbook.galileodesign.de/javainsel8/javainsel_12_011.htm#mj7ea0af34a657da6801fadfe13bd23bcb)
	 */
	
	/**
	 * Die Versionsnummer der Klasse.
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Die Menge aller angemeldeten Websockets (= Clients)
	 */
    public static ArrayList<ShipWebSocket> websockets = new ArrayList<ShipWebSocket>();
    
    /**
     * Die Liste aller offenen Spiele.
     */
    private static ArrayList<Game> games = new ArrayList<Game>();
    
    @Override
    public WebSocket doWebSocketConnect(HttpServletRequest request, String protocol) {
    	
        return new ShipWebSocket();
        
    }
    
    /**
     * Hinzufuegen eines Websockets (=Clients).
     * @param socket Der Websocket, der hinzugefuegt werden soll.
     */
    public static void addWebSocket(ShipWebSocket socket) {
    	
    	websockets.add(socket);
    	
    }
    
    /**
     * Entfernen eines Websockets (=Clients).
     * @param socket Der Websocket, der entfernt werden soll.
     */
    // TODO: auf 2 spieler ausgelegt
    public static void removeWebSocket(ShipWebSocket socket) {
    	
    	// Es werden alle Spiele durchlaufen
    	for (Game game : games) {
    		  
    		/* In jedem Spiel werden die Spieler ueberprueft.
    		 * Wenn er gefunden wurde wird sein Status auf "nicht mehr ready" gesetzt und
    		 * das Spiel auf Gameover gesetzt, wenn nur noch ein Spieler im Spiel ist.
    		 */
    		for(Player player : game.getAllPlayer()) {
    			  
    			if(player.getID() == socket.getPlayer().getID()) {
    				
    				player.resetReady();
    				
    				// Der Spieler der als naechstes dran ist:
    				Player nextPlayer = game.deletePlayer(player);
    				
    				if(game.getAllPlayer().isEmpty())
        		  		return;
    				else {
    						
    					GameProcess.sendGameOver(nextPlayer.getWebSocketConnection(), 
    							"Dein Gegner hat leider das Spiel verlassen");
        				game.setGameOver();
        					
    				}
   					
    			}
  			
    		 }
    		
    	}
    	
    	websockets.remove(socket);
    	
    }
    
    /**
     * Hinzufuegen eines neues Spiels.
     * @param game Das Spiel, das hinzugefuegt werden soll.
     */
    public static void addGame(Game game) {
    	
    	games.add(game);
    	
    }
    
    /**
     * Sucht ein Spiel anhand seines Namens.
     * @param gameName Der Name des gesuchten Spiels.
     * @return Game Das Spiel mit dem Spielnamen.
     */
    public static Game getGame(String gameName) {
    	
    	for(Game game : games) {
    		
    		if(game.getName().equals(gameName)) 
    			return game;
    		
    	}
    	
    	// TODO: Exception statt null
    	return null;
    	
    }
    
    /**
     * Es werden die Boards der Spieler und das Spiel entfernt.
     * @param gameName Der Name des zu loeschenden Spiels.
     */
    public static void removeGame(String gameName) {
    	
    	games.remove(getGame(gameName));
    	
    }
    
    /**
     * @return Alle offenen Spiele als String.
     */
    public static String getAllGames() {
    	
    	String allGames = "";
    	
    	if(games.isEmpty()) 
    		return allGames;
    	
    	for(Game game : games) {
    		
    		if(!game.isFull())
    			allGames += game.getName() + ShipWebSocket.SPLITDELIMITER;
    	}
    	
    	if(allGames.length() == 0) {
    		
    		return allGames;
    		
    	} else {
    		
    		return allGames.substring(0, allGames.length() - 1);
    		
    	}
    	
    	
    	// Entfernen des letzten Delimiters aus dem String:
    	

    }
    
}
    
    

