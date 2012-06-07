package ship.servlet;

import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;

@SuppressWarnings("serial")
public class ShipWebSocketServlet extends WebSocketServlet {
	/*
	 * Ist die Anzahl der Leseoperationen hoch, kann es sich lohnen, bei jedem Schreibzugriff erst die Daten zu kopieren 
	 * und dann das Element hinzuzuf�gen, damit im Hintergrund andere Threads ohne einen Lock, 
	 * der f�rs Schreiben n�tig ist, lesen k�nnen. Zwei dieser Datenstrukturen bietet Java an: 
	 * CopyOnWriteArrayList f�r Listen und CopyOnWriteArraySet f�r Mengen. Die Klassen sind 
	 * genau dann optimal, wenn wenig ver�ndert � das ist teuer � und fast ausschlie�lich gelesen wird.
	 * (http://openbook.galileodesign.de/javainsel8/javainsel_12_011.htm#mj7ea0af34a657da6801fadfe13bd23bcb)
	 */
    public final Set<ShipWebSocket> user = new CopyOnWriteArraySet<ShipWebSocket>(); 
    
    @Override
    public WebSocket doWebSocketConnect(HttpServletRequest request, String protocol) {
        return new ShipWebSocket(user);
    }
} 
