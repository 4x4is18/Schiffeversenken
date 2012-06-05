package model;

/**
 * TODO:
 * - javaDoc schreiben
 * - testen
 * @author Team easy
 */
public class Ship {
	
	public static final int ID_BATTLESHIP = 50;
	
	public static final int ID_CRUISER = 40;
	
	public static final int ID_FRIGATE_1 = 35;
	
	public static final int ID_FRIGATE_2 = 30;
	
	public static final int ID_MINESLOCATOR = 20;
	
	public static final int NO_HIT = 0;
	
	public static final int HIT = 1;
	
	public static final int SUNK = 2;
	
	private int id;
	
	private int length;
	
	private int top;
	
	private int left;
	
	private boolean vertical;
	
	private int[] parts;
		
	@SuppressWarnings("unused")	// Für die Schleifenvariable p
	public Ship(int id, int top, int left, boolean vertical) {
		
		this.id = id;
		this.length = id / 10;
		this.top = top;
		this.left = left;
		this.vertical = vertical;
		this.parts = new int[length];
		for(int p : this.parts)
			p = NO_HIT;
		
	}
	
	public Ship(int id, int top, int left, boolean vertical, int[] intShip) {
		// Muster für intShip: {50, 50, 50, 50, 51}
		// für ein Schlachtschiff mit einem Treffer
		// (52 = ID_BATTLESHIP + HIT)
		
		this(id, top, left, vertical);
		for(int p = 0; p < this.length; p++)
			this.parts[p] = intShip[p] - this.id;
		
	}
	
	public Ship(Ship orig) {
		
		this(orig.id, orig.top, orig.left, orig.vertical);
		for(int p = 0; p < this.length; p++)
			this.parts[p] = orig.parts[p];
		
	}
	
	public Ship(String strOrig) {
		// Muster: "id 50 top 0 left 0 vertical true 0 0 0 0 0
		
		String[] strParts = strOrig.split(" ");
		
		for(int str = 0; str < strParts.length; str++) {
			
			if(strParts[str].equals("id")) {
				
				this.id = Integer.valueOf(strParts[++str]);
				this.length = this.id / 10;
				
			} else if(strParts[str].equals("top"))
				this.top = Integer.valueOf(strParts[++str]);
			else if(strParts[str].equals("left"))
				this.left = Integer.valueOf(strParts[++str]);
			else if(strParts[str].equals("vertical"))
				this.vertical = Boolean.valueOf(strParts[++str]);
			else if(strParts[str].equals("parts")) {
				
				this.parts = new int[this.length];
				str++;
				for(int p = str; p < str + this.length; p++)
					this.parts[p] = Integer.valueOf(strParts[p]);
				str += this.length;
				
			} else return;			
			
		}
		
	}
	
	@Override
	public Object clone() {
		
		return new Ship(this);
		
	}
	
	@Override
	public boolean equals(Object obj) {
		
		Ship ship = (Ship) obj;
		return this.id == ship.id;
		
	}
	
	@Override
	public String toString() {
		// Muster: "id 50 top 0 left 0 vertical true 0 0 0 0 0
		
		String strShip = "id " + String.valueOf(this.id) + 
				" top " + String.valueOf(this.top) + 
				" left " + String.valueOf(this.top) + 
				" vertical " + String.valueOf(this.vertical) + 
				" parts";
		for(int p : this.parts)
			strShip += " " + String.valueOf(p);
		
		return strShip;
		
	}
	
	public int[] toIntegerArray() {
		// Muster: {50, 50, 50, 50, 51}
		// für ein Schlachtschiff mit einem Treffer
		// (52 = ID_BATTLESHIP + HIT)
		
		int intShip[] = new int[this.length];
		for(int p = 0; p < this.length; p++)
			intShip[p] = this.id + this.parts[p];
		return intShip;
		
	}
	
	public boolean isSunk() {

		for(int p : this.parts) {
			
			if(p == NO_HIT)
				return false;
			
		}
		
		return true;
		
	}

	public int isOnField(int y, int x) {
		
		if(this.vertical && x == this.left && y >= this.top && y < this.top + this.length)
			return this.parts[y - this.top];
		else if(!this.vertical && y == this.top && x >= left && x < this.left + this.length)
			return this.parts[x - this.top];
		else return -1;
		
	}
	
	public int getID() {
		
		return this.id;
		
	}
	
	public boolean isBattleship() {
		
		return this.id == ID_BATTLESHIP;
		
	}
	
	public boolean isCruiser() {
		
		return this.id == ID_CRUISER;
		
	}
	
	public boolean isFrigate() {
		
		return this.id == ID_FRIGATE_1 || this.id == ID_FRIGATE_2;
		
	}
	
	public boolean isMinesLocator() {
		
		return this.id == ID_MINESLOCATOR;
		
	}
	
	public int getLength() {
		
		return this.length;
		
	}
	
	public int getTop() {
		
		return this.top;
		
	}
	
	public int getLeft() {
		
		return this.left;
		
	}
	
	public boolean isVertical() {
		
		return this.vertical;
		
	}
	
	public int[] getParts() {
		
		return this.parts;
		
	}
	
	public int getPart(int index) {
		
		return this.parts[index];
		
	}
	
	public int update(int y, int x) {
		
		if(this.isOnField(y, x) == -1)
			return NO_HIT;
		
		if(this.vertical)
			this.parts[y - this.top] = HIT;
		else this.parts[x - this.left] = HIT;
		
		if(this.isSunk())
			return SUNK;
		else return HIT;
		
	}

}