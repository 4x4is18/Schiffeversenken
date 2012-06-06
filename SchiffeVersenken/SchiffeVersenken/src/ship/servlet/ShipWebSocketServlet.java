package ship.servlet;

import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;

@SuppressWarnings("serial")
public class ShipWebSocketServlet extends WebSocketServlet {
    public final Set<ShipWebSocket> user = new CopyOnWriteArraySet<ShipWebSocket>();
    
    @Override
    public WebSocket doWebSocketConnect(HttpServletRequest request, String protocol) {
        return new ShipWebSocket(user);
    }
} 
