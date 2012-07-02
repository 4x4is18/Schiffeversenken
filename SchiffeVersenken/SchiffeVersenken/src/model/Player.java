package model;

import org.eclipse.jetty.websocket.WebSocket.Connection;

/**
 * Die Modellklasse zur Beschreibung von Spielern 
 * fuer das Spiel Schiffe Versenken.
 * @see model.Game
 * @author Team easy
 * @category model
 * @version 1.0
 */
public class Player {

	/**
	 * Die ID des Spielers. <br />
	 * Primary Key
	 * @see createID()
	 */
	private long id;
	
	/**
	 * Der Name des Spielers.
	 */
	private String name;
	
	/**
	 * Das Brett des Spielers.
	 * @see model.Board
	 */
	private Board board;
	
	private boolean ready;
	
	private Connection connection;
	
	private int hits;
	
	/**
	 * Konstruktor zum Erstellen eines Spielers ohne Board.
	 * @param connection Die Websocket Connection des Spielers.
	 * @param name Der Name des Spielers.
	 */
	
	public Player(String name, Connection connection) {
		
		this.connection = connection;
		this.id = this.createID();
		this.name = name;
		this.board = null;
		this.ready = false;
		this.hits = 0;
		
	}
	
	/**
	 * Konstruktor zum Erstellen eines Spielers ohne Board aber mit bestehender UserID
	 * @param connection Die Websocket Connection des Spielers.
	 * @param name Der Name des Spielers.
	 * @param id die erstellte ID
	 */
	public Player(String name, Connection connection,long id ) {
		
		this.connection = connection;
		this.id = id;
		this.name = name;
		this.board = null;
		this.ready = false;
		this.hits = 0;
		
	}
	
	/**
	 * Konstruktor zum Erstellen eines Spielers mit Board.
	 * @param id Die ID des Spielers.
	 * @param name Der Name des Spielers.
	 * @param board Das Brett des Spielers.
	 * @see model.Board
	 */
	public Player(int id, String name, Board board, Connection connection) {
		
		this(name, connection);
		this.board = new Board(board);
		this.ready = true;
		this.hits = 0;
	}
	
	/**
	 * Vergleichen zweier Spieler anhand ihrer IDs auf Gleichheit.
	 */
	@Override
	public boolean equals(Object obj) {
		
		return this.id == ((Player)obj).id;
		
	}
	
	/**
	 * Gibt die Verbindung zum Client zurück
	 * @return
	 */
	public Connection getWebSocketConnection() {
		return this.connection;
	}
	
	public boolean isReady() {
		return ready;
	}
	
	/**
	 * String-Repraesentation des Spielers: <br />
	 * "Name + Board als String"
	 */
	@Override
	public String toString() {
		
		return this.name + " " + this.board.toString();
		 
	}
	
	/**
	 * Die ID des Spielers.
	 */
	public long getID() {
		
		return this.id;
		
	}
	
	/**
	 * Der Name des Spielers.
	 */
	public String getName() {
		
		return this.name;
		
	}
	
	/**
	 * Das Brett des Spielers.
	 * @see model.Board
	 */
	public Board getBoard() {
		
		return this.board;
		
	}
	
	
	/**
	 * Zuweisen eines Boards an einen Spieler.
	 */
	public void setBoard(Board board) {
		
		this.board = new Board(board);
		this.ready = true;
		
	}
	
	/**
	 * Setzen der neuen Websocket-Verbindung des Players
	 * @param connection
	 */
	public void setConnection(Connection connection) {
		this.connection = connection;
	}
	
	/**
	 * Updaten des Brettes des Spielers nach einem Beschuss.
	 * @see model.Board#update(int, int)
	 * @param y Die y-Koordinate, auf die geschossen wurde.
	 * @param x Die x-Koordinate, auf die geschossen wurde.
	 * @return {@link model.Ship#update(int, int)}, wenn ein Schiff getroffen wurde
	 * @return {@link model.Board#WATER_HIT}, wenn ins Wasser geschossen wurde
	 */
	public int updateBoard(int y, int x) {
		
		return this.board.update(y, x);
		
	}
	
	/**
	 * Es wird eine 13 Stellige PlayerID erstellt. <br />
	 * Die PlayerID ist die Erstellungszeit in ms
	 * TODO: einen Randomwert addieren für mehr Sicherheit 
	 * @return PlayerID
	 */
	private long createID() {
		 return System.currentTimeMillis();
		
	}
	
	public boolean hasLost() {
		
		for(Ship ship : this.board.getShips()) {
			
			if(!ship.isSunk())
				return false;
			
		}
		
		return true;
		
	}
	
	/**
	 * Setzt den Spieler auf nicht Ready
	 */
	public void resetReady(){
		this.ready = false;
	}
	
	public void setHit() {
		
		this.hits += 1;
		
	}
	
	public int getHits() {
		
		return this.hits;
		
	}
	
}
