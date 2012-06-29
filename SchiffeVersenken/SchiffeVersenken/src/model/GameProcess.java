package model;

import java.io.IOException;

import org.eclipse.jetty.websocket.WebSocket.Connection;

public class GameProcess {
	
	static final int SELECTPLAYER = 12;
	
	/**
     * Konstante für das Empfangen des eigenen Schussergebnisses.
     */
    static final int OWNRESULT = 13;
    
    /**
     * Konstante für das Empfangen des gegnerischen Schussergebnisses.
     */
    static final int ENEMYRESULT = 14;
    
    /**
     * Konstante für Spiel vorbei.
     */
    static final int GAMEOVER = 15;
	
    /**
     * Konstante für den Delimiter
     */
	static final String SPLITDELIMITER = "%"; 
	
	
	/**
	 * Dem Spieler mitteilen, dass er an der Reihe ist.
	 */
	public static void callNextPlayer(Connection connection) {
		
		try {
			
			connection.sendMessage(String.valueOf(SELECTPLAYER) + SPLITDELIMITER );	
			
		} catch (IOException e) {
			
			
		}
		
	}
	
	/**
	 * Dem Spieler sein Schussergebnis mitteilen.
	 */
	public static void sendOwnResult(Connection connection, int y, int x, int result) {
		
		try {
			
			connection.sendMessage(String.valueOf(OWNRESULT) + SPLITDELIMITER + String.valueOf(y) + SPLITDELIMITER + String.valueOf(x) + SPLITDELIMITER + String.valueOf(result));
			
		} catch(IOException e) {
			
			e.printStackTrace();
			
		}
		
	}
	
	/**
	 * Dem Spieler das Schussergebnis eines Gegners mitteilen.
	 */
	public static void sendEnemyResult(Connection connection, int y, int x, int result) {
		
		try {
			
			connection.sendMessage(String.valueOf(ENEMYRESULT) + SPLITDELIMITER + String.valueOf(y) + SPLITDELIMITER + String.valueOf(x) + SPLITDELIMITER + String.valueOf(result));
			
		} catch(IOException e) {
			
			e.printStackTrace();
			
		}
	}
	
	/**
	 * Dem Spieler mitteilen, ob er gewonnen oder verloren hat.
	 */
	public static void sendGameOver(Connection connection, String result) {
		
		try {
			
			connection.sendMessage(String.valueOf(GAMEOVER) + SPLITDELIMITER + result);
			
		} catch (IOException e) {
			
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		
	}
	
}
