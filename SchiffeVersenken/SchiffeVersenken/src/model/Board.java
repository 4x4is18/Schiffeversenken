package model;

import java.util.ArrayList;

/**
 * TODO:
 * - javaDoc schreiben
 * - testen
 * @author Team easy
 */
public class Board {
	
	public static final int NUM_SHIPS = 5;
	
	public static final int WATER = 0;
	
	private int height;
	
	private int width;
	
	private Ship[] ships;
	
	@SuppressWarnings("unused")	// Für die Schleifenvariable s
	public Board(int height, int width) {
		
		this.height = height;
		this.width = width;
		this.ships = new Ship[NUM_SHIPS];
		for(Ship s : this.ships)
			s = null;
		
	}
	
	public Board(int height, int width, Ship[] ships) {
		
		this(height, width);
		for(int s = 0; s < ships.length; s++)
			this.ships[s] = new Ship(ships[s]);
		
	}
	
	public Board(int height, int width, int[][] intBoard) {
		
		this(height, width);		
		update(intBoard);
		
	}
	
	public Board(Board orig) {
		
		this(orig.height, orig.width, orig.ships);
		
	}
	
	public Board(String strOrig) {
		/*
		 * Muster: "height 10 width 10 ships <muster von Schiff 1>;<muster von Schiff 2>;...<muster von Schiff 5>
		 */
		
		String[] strParts = strOrig.split(" ");
		
		for(int str = 0; str < strParts.length; str++) {
			
			if(strParts[str].equals("height"))				
				this.height = Integer.valueOf(strParts[++str]);				
			else if(strParts[str].equals("width"))
				this.width = Integer.valueOf(strParts[++str]);
			else if(strParts[str].equals("ships")) {
				
				this.ships = new Ship[NUM_SHIPS];
				String[] strShips = strParts[++str].split(";");
				for(int s = 0; s < strShips.length; s++)
					this.ships[s] = new Ship(strShips[s]);
				
			} else return;
			
		}
		
	}
	
	@Override
	public Object clone() {
		
		return new Board(this);
		
	}
	
	@Override
	public String toString() {
		/*
		 * Muster: "height 10 width 10 ships <muster von Schiff 1>;<muster von Schiff 2>;...<muster von Schiff 5>
		 */
		
		String strBoard = "height " + String.valueOf(this.height) + 
		" width " + String.valueOf(this.width) + 
		" ships";
		for(Ship ship : this.ships)
			strBoard += " " + ship.toString();

		return strBoard;
		
	}
	
	public int[][] toIntegerArray() {
		
		int intBoard[][] = new int[this.height][this.width];
		
		for(int y = 0; y < this.height; y++) {
			
			for(int x = 0; x < this.width; x++) {
				
				Ship ship = shipIsOnField(y, x);
				
				if(ship == null)
					intBoard[y][x] = WATER;
				else intBoard[y][x] = ship.isOnField(y, x);
				
			}
			
		}
		
		return intBoard;
		
	}
	
	private Ship shipIsOnField(int y, int x) {

		for(Ship s : this.ships) {
			
			if(s.isOnField(y, x) != -1)
				return s;
			
		}
		
		return null;
		
	}

	public int getHeight() {
		
		return this.height;
		
	}
	
	public int getWidth() {
		
		return this.width;
		
	}
	
	public Ship[] getShips() {
		
		return this.ships;
		
	}
	
	public Ship getShip(int index) {
		
		return this.ships[index];
		
	}
	
	public void setShips(Ship[] ships) {
		
		for(int s = 0; s < this.ships.length; s++)
			this.ships[s] = new Ship(ships[s]);
		
	}
	
	public void update(int[][] intBoard) {
		
		ArrayList<Integer> settedShips = new ArrayList<Integer>(NUM_SHIPS);
		for(int y = 0; y < height; y++) {
			
			for(int x = 0; x < width; x++) {
				
				if(intBoard[y][x] == WATER)
					continue;
				
				// ID des Schiffes bestimmen:
				int shipID;			
				switch(intBoard[y][x]) {
				
					case Ship.ID_BATTLESHIP + Ship.NO_HIT:
					case Ship.ID_BATTLESHIP + Ship.HIT:
						shipID = Ship.ID_BATTLESHIP;
						break;
					case Ship.ID_CRUISER + Ship.NO_HIT:
					case Ship.ID_CRUISER + Ship.HIT:
						shipID = Ship.ID_CRUISER;
						break;
					case Ship.ID_FRIGATE_1 + Ship.NO_HIT:
					case Ship.ID_FRIGATE_1 + Ship.HIT:
						shipID = Ship.ID_FRIGATE_1;
						break;
					case Ship.ID_FRIGATE_2 + Ship.NO_HIT:
					case Ship.ID_FRIGATE_2 + Ship.HIT:
						shipID = Ship.ID_FRIGATE_2;
						break;
					default:
						shipID = Ship.ID_MINESLOCATOR;
					
				}
				
				// Überprüfen, ob das Schiff bereits gesetzt wurde:
				if(settedShips.contains(shipID))
					continue;
				
				/* Da das Brett von oben nach unten und von links rechts durchlaufen wird,
				 * ist das Feld, auf dem ein Schiff erstmals gefunden wird, die linke obere
				 * Ecke des Schiffes.
				 * Jetzt fehlt nur noch die Information, ob es vertikal oder horizontal
				 * im Wasser liegt.
				 */
				int top = y;
				int left = x;
				boolean vertical;
				int[] shipParts = new int[shipID / 10];
				if(y + 1 < height && (intBoard[y+1][x] == intBoard[y][x] || 
						intBoard[y+1][x] == intBoard[y][x] + Ship.HIT || intBoard[y+1][x] == intBoard[y][x] - Ship.HIT)) {
					
					vertical = true;
					for(int p = 0; p < shipParts.length; p++)
						shipParts[p] = intBoard[y+p][x];
					
				} else {
					
					vertical = false;
					for(int p = 0; p < shipParts.length; p++)
						shipParts[p] = intBoard[y][x+p];
					
				}
				
				this.ships[settedShips.size()] = new Ship(shipID, top, left, vertical, shipParts);
				settedShips.add(shipID);
				
			}
			
		}
		
	}

}