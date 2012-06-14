package ship.servlet;

import java.util.ArrayList;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServletRequest;

import model.Game;
import model.Player;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;

@SuppressWarnings("serial")
public class ShipWebSocketServlet extends WebSocketServlet {
	/*
	 * Ist die Anzahl der Leseoperationen hoch, kann es sich lohnen, bei jedem Schreibzugriff erst die Daten zu kopieren 
	 * und dann das Element hinzuzufügen, damit im Hintergrund andere Threads ohne einen Lock, 
	 * der fürs Schreiben nötig ist, lesen können. Zwei dieser Datenstrukturen bietet Java an: 
	 * CopyOnWriteArrayList für Listen und CopyOnWriteArraySet für Mengen. Die Klassen sind 
	 * genau dann optimal, wenn wenig verändert – das ist teuer – und fast ausschließlich gelesen wird.
	 * (http://openbook.galileodesign.de/javainsel8/javainsel_12_011.htm#mj7ea0af34a657da6801fadfe13bd23bcb)
	 */
    public final Set<ShipWebSocket> user = new CopyOnWriteArraySet<ShipWebSocket>();
    private static ArrayList<Player> players = new ArrayList<Player>(); 
    private static ArrayList<Game> games = new ArrayList<Game>();
    
    @Override
    public WebSocket doWebSocketConnect(HttpServletRequest request, String protocol) {
        return new ShipWebSocket(user);
    }
    
    public static void addPlayer(Player player) {
    	players.add(player);
    }
    
    public static Player getPlayer(String playerID) {
    	for (int i = 0; i < players.size(); i++) {
    		if (String.valueOf(players.get(i).getID()).equals(playerID)) {
    			return players.get(i);
    		}
    	}
    	return null;
    }
    
    public static void addGame(Game game) {
    	games.add(game);
    	
    }
    
    public static Game getGame(String gameID) {
    	for (int i = 0; i < games.size(); i++) {
    		if (String.valueOf(games.get(i).getName()).equals(gameID)) {
    			return games.get(i);
    		}
    	}
    	return null;
    }
    
    
} 
