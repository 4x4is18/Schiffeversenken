package ship.servlet;

import java.util.ArrayList;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServletRequest;

import model.Game;
import model.GameProcess;
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
    
    /**
     * Fügt einen Spieler in die Liste der Spieler hinzu
     * @param player
     * 
     */
    public static void addPlayer(Player player) {
    	players.add(player);
    }
    
    /**
     * Sucht einen Spieler mithilfe seiner playerID
     * @param playerID Die playerID vom zusuchenden Spieler
     * @return den zugehörigen Spieler oder null wenn kein Spieler gefunden wurde
     */
    public static Player getPlayer(String playerID) {
    	
    	for (int i = 0; i < players.size(); i++) {
    		if (String.valueOf(players.get(i).getID()).equals(playerID)) {
    			return players.get(i);
    		}
    	}
    	return null;
    }
    
    /**
     * Fügt ein Spiel in die Liste ein
     * @param game
     */
    public static void addGame(Game game) {
    	games.add(game);
    	
    }
    
    /**
     * Sucht ein Spiel anhand seiner ID aus der Liste heraus
     * @param gameID vom zusuchenden Game
     * @return Game
     */
    public static Game getGame(String gameID) {
    	
    	for (int i = 0; i < games.size(); i++) {
    		
    		if (String.valueOf(games.get(i).getName()).equals(gameID)) {
    			
    			return games.get(i);
    			
    		}
    		
    	}
    	
    	return null;
    	
    }
    
    /**
     * Es werden die Boards der Player und das Spiel gelöscht.
     * @param gameID Ist die ID des zulöschenden Spiels
     */
    public static void removeGame(String gameID) {
    	
    	// Es werden die zwei Spieler aus dem zu löschenden Game geholt, und deren Ready resettet.
    	// TODO: (NUR FÜR ZWEI SPIELER)
    	//getGame(gameID).getActPlayer().resetReady();
    	//getGame(gameID).getNextPlayer().resetReady();   	
    	// Das Spiel wird aus der Liste entfernt.
    	games.remove(getGame(gameID));
    	System.gc();
    	
    }
    
    /**
     * Gibt alle Spiele bei denen noch nicht die maximale Anzahl der Spieler erreicht ist als String aus <br />
     * Nach dem letzten Spiel wird noch ein Delimiter gesetzt.
     * Der Name ist noch nicht optimal
     * @return Einen String mit "offenen" Spielen
     */
    public static String getAllGames() {
    	
    	String allGames = "";
    	
    	for(int i = 0; i < games.size(); i++) {
    		
    		if(!games.get(i).isFull())
    		allGames += games.get(i).getName() + "%";
    	}
    	
    	return allGames;
    }
    
    /**
     * Entfernt den Spieler aus der Spielerliste, prüft ob der Spieler in einem Spiel war anhand seiner SpielerID
     * sendet dem Spiel, dass es 
     * @param player der zulöschende Spieler
     */
    public static void removePlayer(Player deleteplayer){
    	
    	// Der Spieler wird aus der Arraylist gelöscht
    	players.remove(deleteplayer);
    		
    	// Es werden alle Spiele durchlaufen
    	  for (Game game : games) {
    		  
    		  // In jedem Spiel werden die Spieler überprüft, wenn er gefunden wurde wird sein Status auf nicht mehr ready gesetzt
    		  // Sowie das Spiel auf Gameover gesetzt wenn nur noch ein Spieler im Spiel ist.
    		  // Sowie der Spieler aus der Liste gestrichen
    		  for(Player player : game.getAllPlayer()) {
    			  
    			if (player.getID() == deleteplayer.getID()) {
    				
    				player.resetReady();
    				
    				// Der Spieler der als nächstes dran ist.
    				Player nextPlayer = game.deletePlayer(deleteplayer);
    					
    					//TODO: FÜR ZWEI SPIELER GESCHRIEBEN
    					if(nextPlayer != null) {
    						
        					GameProcess.sendGameOver(nextPlayer.getWebSocketConnection(), "Dein Gegner hat leider das Spiel verlassen");
        					game.isGameOver();
        					
    					}
    					
    					
    					
    			}
    			
    			if(game.getAllPlayer().isEmpty()) {
    		  		break;
    			}
    			
    		 }
    		  	if(games.isEmpty()) {
    		  		break;
    		  	}
    	}
    		  
    }
    
}
    
    

