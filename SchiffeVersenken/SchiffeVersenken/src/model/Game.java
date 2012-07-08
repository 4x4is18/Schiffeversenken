package model;

import java.util.ArrayList;

import servlet.ShipWebSocketServlet;

/**
 * Die Modellklasse zur Beschreibung von Spielern 
 * fuer das Spiel Schiffe Versenken.
 * @see model.Game
 * @author Team easy
 * @category model
 * @version 1.0
 */
public class Game {
	
	/**
	 * Der Name des Spiels.
	 */
	private String name;
	
	/**
	 * Die Anzahl der Spieler.
	 */
	private int maxPlayers;
	
	/**
	 * Die Liste mit den Spielern. <br />
	 * Der Ersteller ist immer der erste Eintrag in der Liste.
	 * @see model.Player
	 */
	private ArrayList<Player> players;
	
	/**
	 * Der Index des Spielers, der gerade am Zug ist.
	 */
	private int actPlayer;
	
	/**
	 * Das Passwort fuer das Spiel. <br />
	 * Bei offenen Spielen ist das Passwort null.
	 */
	private String password;
	
	/**
	 * Zeigt an, ob das Spiel vorbei ist und eine Person gewonnen hat.
	 */
	private boolean gameOver;
	
	/**
	 * Konstruktor fuer ein offenes Spiel fuer zwei Spieler.
	 * @param creator Der Ersteller des Spiels.
	 * @param name Der Name des Spiels.
	 * @see model.Player
	 */
	public Game(Player creator, String name) {
		
		this.name = name;
		this.maxPlayers = 2;
		this.players = new ArrayList<Player>(2);
		this.players.add(creator);
		this.actPlayer = 0;
		this.password = null;
		this.gameOver = false;
		
	}
	
	/**
	 *  Konstruktor fuer ein offenes Spiel fuer zwei Spieler.
	 * @param name Der Name des Spiels.
	 * @see model.Player
	 */
	public Game(String name) {
		
		this.name = name;
		this.maxPlayers = 2;
		this.players = new ArrayList<Player>(2);
		this.actPlayer = 0;
		this.password = null;
		this.gameOver = false;
		
	}
	
	/**
	 * Konstruktor fuer ein passwort-gesch�tztes Spiel fuer zwei Spieler.
	 * @param creator Der Ersteller des Spiels.
	 * @param name Der Name des Spiels.
	 * @param password Das Passwort fuer das Spiel.
	 * @see model.Player
	 */
	public Game(Player creator, String name, String password) {
		
		this(creator, name);
		this.password = password;
		
	}
	
	/**
	 * Konstruktor fuer ein offenes Spiel fuer beliebig viele Spieler.
	 * @param creator Der Ersteller des Spiels.
	 * @param name Der Name des Spiels.
	 * @param numPlayers Die Anzahl der Spieler.
	 * @see model.Player
	 */
	public Game(Player creator, String name, int numPlayers) {
		
		this.name = name;
		this.maxPlayers = numPlayers;
		this.players = new ArrayList<Player>(numPlayers);
		this.players.add(creator);
		this.actPlayer = 0;
		this.password = null;
		this.gameOver = false;	
		
	}
	
	/**
	 * Konstruktor fuer ein passwort-gesch�tztes Spiel fuer beliebig viele 
	 * Spieler.
	 * @param creator Der Ersteller des Spiels.
	 * @param name Der Name des Spiels.
	 * @param numPlayers Die Anzahl der Spieler.
	 * @param password Das Passwort fuer das Spiel.
	 * @see model.Player
	 */
	public Game(Player creator, String name, int numPlayers, String password) {
		
		this(creator, name, numPlayers);
		this.password = password;
		
	}
	
	public boolean isGameOver() {
		
		return this.gameOver;
		
	}
	
	/**
	 * Der Name des Spiels.
	 */
	public String getName() {
		
		return this.name;
		
	}
	
	/**
	 * Pr�ft, ob alle Spieler auf Go geklickt haben und das Spiel gestartet
	 * werden kann
	 * @return
	 */
	public boolean allPlayersReady() {
		
		if (this.maxPlayers > this.players.size()) {
			
			return false;
			
		}
		
		for (int i = 0; i < players.size(); i++) {
			
			if (!players.get(i).isReady()) return false;
			
		}
		
		return true;
		
	}
	
	/**
	 * Die Anzahl der Spieler.
	 */
	public int getMaxPlayers() {
		
		return this.maxPlayers;
		
	}
	
	/**
	 * Der Ersteller des Spiels.
	 * @see model.Player
	 */
	public Player getCreator() {
		
		return this.players.get(0);
		
	}
	
	/**
	 * Hinzufuegen eines Spielers.
	 * @param player
	 * @return true, wenn das Spiel bereit ist, d.h. es sind genug Spieler da.
	 * @return false, wenn das Spiel noch nicht bereit ist.
	 * @see model.Player
	 */
	public boolean addPlayer(Player player) {
		
		if(this.players.size() == this.maxPlayers)
			return true;	// Es passt kein Spieler mehr rein, aber bereit ist das Spiel natuerlich dennoch
		else {
			
			this.players.add(player);
			
			
			
			return this.players.size() == this.maxPlayers;
			
		}
		
	}
	
	/**
	 * Der Spieler, der als naechstes am Zug ist.
	 * @see model.Player
	 */
	public Player getNextPlayer() {
		
		if(this.actPlayer < this.players.size() - 1)
			return this.players.get(++this.actPlayer);
		else {
			
			this.actPlayer = 0;
			return this.players.get(this.actPlayer);
			
		}

	}
	
	/**
	 * Angabe, ob das Spiel offen oder passwort-geschuetzt ist.
	 */
	public boolean isOpen() {
		
		return this.password == null;
		
	}
	
	/**
	 * Das Passwort fuer das Spiel. <br />
	 * Bei offenen Spielen ist das Passwort null.
	 */
	public String getPassword() {
		
		return this.password;
		
	}
	
	/**
	 * Das Starten eines Spiels. Der Startspieler wird via Zufall ermittelt.
	 * @return Der Spieler, der beginnt.
	 * @see model.Player
	 */
	public void startGame() {

		this.actPlayer = (int)(Math.random() * this.players.size());
		GameProcess.callNextPlayer(this.getNextPlayer().getWebSocketConnection());
		
	}
	
	
	
	
	/**
	 * Updaten aller Bretter nach einem Schuss.
	 * @param updater Der Spieler, der geschossen hat.
	 * @param y Die y-Koordinate, auf die geschossen wurde.
	 * @param x Die x-Koordinate, auf die geschossen wurde.
	 * @return {@link model.Ship#update(int, int)}, wenn ein Schiff getroffen wurde
	 * @return {@link model.Board#WATER_HIT}, wenn ins Wasser geschossen wurde <br />
	 * Diese beiden Angaben werden fuer alle gegnerischen Bretter zurueckgegeben.
	 */
	public ArrayList<Integer> update(Player updater, int y, int x) {
		
		// TODO: Aus der Game schmei�en. Hat nichts hier zusuchen :D
		ArrayList<Integer> targets = new ArrayList<Integer>(this.maxPlayers);
		
		for(Player victim : this.players) {
			
			if(updater.equals(victim))
				continue;
			
			targets.add(victim.updateBoard(y, x));
			
			if(victim.hasLost()) {
				this.setGameOver();
				GameProcess.sendGameOver(victim.getWebSocketConnection(), "Du hast leider verloren");
				GameProcess.sendGameOver(updater.getWebSocketConnection(), "Gratulation! Du hast gewonnen!");
			}
			
		}
		
		return targets;
		
	}
	
	/**
	 * Gibt den aktuellen Spieler zur�ck
	 * @return den Spieler der an der Reihe ist
	 */
	public Player getActPlayer() {
		
		return players.get(actPlayer);
		
	}
	
	/**
	 * Gibt zur�ck ob die maximale Anzahl an Spielern erreicht ist.
	 * @return true wenn KEIN Platz mehr im Spiel ist. False wenn noch Platz im Spiel ist.
	 */
	public boolean isFull() {
		
		if(players.size() == this.maxPlayers) {
			
			return true;
			
		}
		
		return false;
		
	}
	
	/**
	 * Gibt das Playerarray zur�ck
	 * @return eine Arraylist mit allen Spielern in einem Spiel
	 */
	public ArrayList<Player> getAllPlayer() {
			
		return this.players;
	}
	
	/**
	 * Setzt das Spiel auf GameOver
	 */
	public void setGameOver() {
		this.gameOver = true;
	}
	
	/**
	 * L�scht einen Spieler aus der Liste des Spiels
	 * Wenn er der aktuelle Spieler ist, wird der n�chste Spieler zur�ck gegeben. Wenn nicht dann wird null zur�ck gegeben.
	 * @param player der zul�schende Spieler
	 */
	public Player deletePlayer(Player player) {
					
			players.remove(player);
			
			if (!players.isEmpty()) {
				
				return getNextPlayer();
				
			} else {
			
				ShipWebSocketServlet.removeGame(this.name);
				return null;
				
			}
			
		
	}
	
}
