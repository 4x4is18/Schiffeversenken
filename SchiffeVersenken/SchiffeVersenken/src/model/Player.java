package model;

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
	 * TODO: Wie ist die ID aufgebaut?
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
	
	/**
	 * Konstruktor zum Erstellen eines Spielers ohne Board.
	 * @param id Die ID des Spielers.
	 * @param name Der Name des Spielers.
	 */
	public Player(String name) {
		
		this.id = this.createID();
		this.name = name;
		this.board = null;
		
	}
	
	
	/**
	 * Konstruktor zum Erstellen eines Spielers mit Board.
	 * @param id Die ID des Spielers.
	 * @param name Der Name des Spielers.
	 * @param board Das Brett des Spielers.
	 * @see model.Board
	 */
	public Player(int id, String name, Board board) {
		
		this(name);
		this.board = new Board(board);
		
	}
	
	/**
	 * Vergleichen zweier Spieler anhand ihrer IDs auf Gleichheit.
	 */
	@Override
	public boolean equals(Object obj) {
		
		return this.id == ((Player)obj).id;
		
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
	
	private long createID() {
		 return System.currentTimeMillis();
		
	}
	
}
