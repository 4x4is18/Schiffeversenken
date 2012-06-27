package model;

import java.util.ArrayList;

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
	private int numPlayers;
	
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
	 * Die eindeutige ID des Spiels.
	 */
	private String id;
	
	private boolean gameOver;
	
	/**
	 * Konstruktor fuer ein offenes Spiel fuer zwei Spieler.
	 * @param creator Der Ersteller des Spiels.
	 * @param name Der Name des Spiels.
	 * @param id Die eindeutige ID des Spiels.
	 * @see model.Player
	 */
	public Game(Player creator, String name, String id) {
		
		this.name = name;  //bisher immer nur "bla"
		this.id = id;
		this.numPlayers = 2;
		this.players = new ArrayList<Player>(2);
		this.players.add(creator);
		this.actPlayer = 0;
		this.password = null;
		this.gameOver = false;
		
	}
	
	/**
	 * Konstruktor fuer ein passwort-geschütztes Spiel fuer zwei Spieler.
	 * @param creator Der Ersteller des Spiels.
	 * @param name Der Name des Spiels.
	 * @param id Die eindeutige ID des Spiels.
	 * @param password Das Passwort fuer das Spiel.
	 * @see model.Player
	 */
	public Game(Player creator, String name, String id, String password) {
		
		this(creator, name, id);
		this.password = password;
		
	}
	
	/**
	 * Konstruktor fuer ein offenes Spiel fuer beliebig viele Spieler.
	 * @param creator Der Ersteller des Spiels.
	 * @param name Der Name des Spiels.
	 * @param id Die eindeutige ID des Spiels.
	 * @param numPlayers Die Anzahl der Spieler.
	 * @see model.Player
	 */
	public Game(Player creator, String name, String id, int numPlayers) {
		
		this.name = name;
		this.id = id;
		this.numPlayers = numPlayers;
		this.players = new ArrayList<Player>(numPlayers);
		this.players.add(creator);
		this.actPlayer = 0;
		this.password = null;
		this.gameOver = false;
		
	}
	
	/**
	 * Konstruktor fuer ein passwort-geschütztes Spiel fuer beliebig viele 
	 * Spieler.
	 * @param creator Der Ersteller des Spiels.
	 * @param name Der Name des Spiels.
	 * @param id Die eindeutige ID des Spiels.
	 * @param numPlayers Die Anzahl der Spieler.
	 * @param password Das Passwort fuer das Spiel.
	 * @see model.Player
	 */
	public Game(Player creator, String name, String id, int numPlayers, String password) {
		
		this(creator, name, id, numPlayers);
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
	 * Prüft, ob alle Spieler auf Go geklickt haben und das Spiel gestartet
	 * werden kann
	 * @return
	 */
	public boolean allPlayersReady() {
		for (int i = 0; i < players.size(); i++) {
			if (!players.get(i).isReady()) return false;
		}
		return true;
	}
	
	/**
	 * Die eindeutige ID des Spiels
	 */
	public String getID() {
		
		return this.id;
		
	}
	
	/**
	 * Die Anzahl der Spieler.
	 */
	public int getNumPlayers() {
		
		return this.numPlayers;
		
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
		
		if(this.players.size() == this.numPlayers)
			return true;	// Es passt kein Spieler mehr rein, aber bereit ist das Spiel natuerlich dennoch
		else {
			
			this.players.add(player);
			return this.players.size() == this.numPlayers;
			
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
		Player nextPlayer = this.getNextPlayer();
		GameProcess.callNextPlayer(nextPlayer.getWebSocketConnection());
		
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
		
		ArrayList<Integer> targets = new ArrayList<Integer>(this.numPlayers);
		
		for(Player victim : this.players) {
			
			if(updater.equals(victim))
				continue;
			
			targets.add(victim.updateBoard(y, x));
			
			if(victim.hasLost()) {
				this.gameOver = true;
				GameProcess.sendGameOver(victim.getWebSocketConnection(), "Du hast leider verloren");
				GameProcess.sendGameOver(updater.getWebSocketConnection(), "Gratulation! Du hast gewonnen!");
			}
			
		}
		
		return targets;
		
	}
	
	public Player getActPlayer() {
		
		return players.get(actPlayer);
	}
	
}
