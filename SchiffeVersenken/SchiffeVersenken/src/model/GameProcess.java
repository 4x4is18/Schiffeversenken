package model;

import java.io.IOException;

import org.eclipse.jetty.websocket.WebSocket.Connection;

public class GameProcess {
	
	static final int SELECTPLAYER = 12;
	
	static final String SPLITDELIMITER = "%"; 
	
	public static void SendData(String data) {
		
	}
	
	/*
	 * Dem Spieler mitteilen, dass er an der Reihe ist.
	 */
	public static void callNextPlayer(Connection connection) {
		try {
			connection.sendMessage(String.valueOf(SELECTPLAYER) + SPLITDELIMITER );
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
