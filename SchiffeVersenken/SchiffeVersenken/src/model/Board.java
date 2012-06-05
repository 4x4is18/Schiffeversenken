package model;

/**
 * TODO:
 * - implementieren
 * - javaDoc schreiben
 * - testen
 * @author Team easy
 */
public class Board {
	
	public static final int MAX_SHIPS = 5;
	
	public static final int WATER = 0;
	
	private int height;
	
	private int width;
	
	private Ship[] ships;
	
	public Board(int height, int width) {}
	
	public Board(int height, int width, Ship[] ships) {}
	
	public Board(int height, int width, Ship[] ships, int[] intBoard) {}
	
	public Board(Board orig) {}
	
	public Board(String strBoard) {}
	
	@Override
	public Object clone() {}
	
	@Override
	public boolean equals(Object obj) {}
	
	@Override
	public String toString() {}
	
	public int[] toIntegerArray() {}
	
	public int getHeight() {}
	
	public int getWidth() {}
	
	public Ships[] getShips() {}
	
	public Ship getShip(int index) {}
	
	public void setShips(Ship[] ships) {}
	
	public void update(int[][] intBoard) {}

}