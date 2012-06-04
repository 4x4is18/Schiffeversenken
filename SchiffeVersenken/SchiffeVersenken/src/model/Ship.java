package model;

/**
 * TODO:
 * - javaDoc schreiben
 * - testen
 * @author Team easy
 */
public class Ship {
	
	public static final int NO_HIT = 0;
	
	public static final int HIT = 1;
	
	public static final int SUNK = 2;
	
	private int length;
	
	private int top;
	
	private int left;
	
	private boolean vertical;
	
	private int[] parts;
		
	@SuppressWarnings("unused")	// Für die Schleifenvariable p
	public Ship(int length, int top, int left, boolean vertical) {
		
		this.length = length;
		this.top = top;
		this.left = left;
		this.vertical = vertical;
		this.parts = new int[length];
		for(int p : this.parts)
			p = NO_HIT;
		
	}
	
	public Ship(Ship orig) {
		
		this(orig.length, orig.top, orig.left, orig.vertical);
		
	}
	
	public Ship(String strOrig) {
		// Muster: "length 5 top 0 left 0 vertical true 0 0 0 0 0
		
		String[] strParts = strOrig.split(" ");
		
		for(int str = 0; str < strParts.length; str++) {
			
			if(strParts[str].equals("length"))
				this.length = Integer.valueOf(strParts[++str]);
			else if(strParts[str].equals("top"))
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
	public String toString() {
		// Muster: "length 5 top 0 left 0 vertical true 0 0 0 0 0
		
		String strShip = "length " + String.valueOf(this.length) + 
				" top " + String.valueOf(this.top) + 
				" left " + String.valueOf(this.top) + 
				" vertical " + String.valueOf(this.vertical) + 
				" parts";
		for(int p : this.parts)
			strShip += " " + String.valueOf(p);
		
		return strShip;
		
	}
	
	public boolean isSunk() {

		for(int p : this.parts) {
			
			if(p == NO_HIT)
				return false;
			
		}
		
		return true;
		
	}

	public boolean isOnField(int y, int x) {
		
		if((this.vertical && x == this.left && 
				y >= this.top && y < this.top + this.length) || 
				(!this.vertical && y == this.top && 
				x >= left && x < this.left + this.length))
			return true;
		else return false;
		
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
		
		if(!this.isOnField(y, x))
			return NO_HIT;
		
		if(this.vertical)
			this.parts[y - this.top] = HIT;
		else this.parts[x - this.left] = HIT;
		
		if(this.isSunk())
			return SUNK;
		else return HIT;
		
	}

}