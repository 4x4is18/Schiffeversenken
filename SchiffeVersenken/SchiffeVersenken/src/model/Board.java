package model;

/**
 * TODO:
 * - definieren
 * - implementieren
 * - javaDoc schreiben
 * - testen
 * @author Team easy
 */
public class Board {
	
	public int MAX_SHIPS = 5;
	
	private int height;
	
	private int width;
	
	private Ship[] ships;
	
	public Board(int height, int width) {}
	
	public Board(int height, int width, Ship[] ships) {}
	
	public Board(Board orig) {}
	
	public Board(String strBoard) {}
	
	@Override
	public Object clone() {}
	
	public int getHeight() {}
	
	public int getWidth() {}
	
	public Ships[] getShips() {}
	
	public Ship getShip(int index) {}
	
	public void setShips(Ship[] ships) {}
	
	public void update(int[][] iBoard) {}
	
	@Override
	public String toString() {}
	
	public int[] toIntegerArray() {}

}