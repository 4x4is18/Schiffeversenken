package model;

/**
 * Die Modellklasse zur Beschreibung von Schiffen 
 * fuer das Spiel Schiffe Versenken.
 * @see model.Game
 * @author Team easy
 * @category model
 * @version 1.0
 */
class Ship {
	
	/**
	 * Konstante ID des Schachschiffes der Laenge 5.
	 */
	static final int ID_BATTLESHIP = 50;
	
	/**
	 * Konstante ID des Kreutzers der Laenge 3.
	 */
	static final int ID_CRUISER = 40;
	
	/**
	 * Konstante ID einer der Fregatten der Laenge 3.
	 */
	static final int ID_FRIGATE_1 = 35;
	
	/**
	 * Konstante ID einer der Fregatten der Laenge 3.
	 */
	static final int ID_FRIGATE_2 = 30;
	
	/**
	 * Konstante ID des Minensuchers der Laenge 2.
	 */
	static final int ID_MINESLOCATOR = 20;
	
	/**
	 * Konstante fuer ein unversehrtes Schiffsteil.
	 */
	static final int NO_HIT = 0;
	
	/**
	 * Konstante fuer ein getroffenes Schiffsteil.
	 */
	static final int HIT = 1;
	
	/**
	 * Konstante fuer ein gesunkenes Schiff <br />
	 * D.h. alle Schiffsteile wurden getroffen.
	 */
	static final int SUNK = 2;
	
	/**
	 * Die ID des Schiffes.
	 * @see #ID_BATTLESHIP
	 * @see #ID_CRUISER
	 * @see #ID_FRIGATE_1
	 * @see #ID_FRIGATE_2
	 * @see #ID_MINESLOCATOR
	 */
	private int id;
	
	/**
	 * Die Laenge des Schiffes. <br />
	 * Sie wird wie folgt berechnet: id / 10 (abgerundet)
	 * @see #id
	 */
	private int length;
	
	/**
	 * Die y-Koordinate des obersten Schiffsteils. <br />
	 * Es ist die niedrigste y-Koordinate aller Schiffsteile.
	 */
	private int top;
	
	/**
	 * Die x-Koordinate des am linkesten Schiffsteils. <br />
	 * Es ist die niedrigste x-Koordinate aller Schiffsteile.
	 */
	private int left;
	
	/**
	 * Die Angabe, ob das Schiff vertikal oder horizontal auf 
	 * dem Brett liegt.
	 */
	private boolean vertical;
	
	/**
	 * Die Schiffsteile. <br />
	 * Ein Schiffsteil ist entweder intakt oder getroffen.
	 * @see model.Ship#NO_HIT
	 * @see model.Ship#HIT
	 */
	private int[] parts;
	
	/**
	 * Die Angabe, ob das Schiff bereits gesunken ist. <br />
	 * Sie wird wie folgt berechnet: <br />
	 * Wenn alle Schiffsteile getroffen wurden, ist das Schiff gesunken.
	 * @see model.Ship#parts
	 */
	private boolean sunk;
	
	/**
	 * Konstruktor zum Erstellen eines Schiffes mit standardmaessig 
	 * intakten Schiffsteilen.	
	 * @param id Die ID des Schiffes.
	 * @param top Die y-Koordinate des obersten Schiffsteils. <br />
	 * Es ist die niedrigste y-Koordinate aller Schiffsteile.
	 * @param left Die x-Koordinate des am linkesten Schiffsteils. <br />
	 * Es ist die niedrigste x-Koordinate aller Schiffsteile.
	 * @param vertical Die Angabe, ob das Schiff vertikal oder horizontal auf 
	 * dem Brett liegt.
	 */
	@SuppressWarnings("unused")	// Für die Schleifenvariable p
	Ship(int id, int top, int left, boolean vertical) {
		
		this.id = id;
		this.length = id / 10;
		this.top = top;
		this.left = left;
		this.vertical = vertical;
		this.parts = new int[this.length];
		for(int p : this.parts)			
			p = NO_HIT;
		this.sunk = false;
		
	}
	
	/**
	 * Konstruktor zum Erstellen eines Schiffes mit Schiffsteilen.	
	 * @param id Die ID des Schiffes.
	 * @param top Die y-Koordinate des obersten Schiffsteils. <br />
	 * Es ist die niedrigste y-Koordinate aller Schiffsteile.
	 * @param left Die x-Koordinate des am linkesten Schiffsteils. <br />
	 * Es ist die niedrigste x-Koordinate aller Schiffsteile.
	 * @param vertical Die Angabe, ob das Schiff vertikal oder horizontal auf 
	 * dem Brett liegt.
	 * @param parts Die Schiffsteile. <br />
	 * Ein Schiffsteil ist entweder intakt oder getroffen.
	 * @see model.Ship#NO_HIT
	 * @see model.Ship#HIT
	 */
	Ship(int id, int top, int left, boolean vertical, int[] parts) {
		
		this.id = id;
		this.length = id / 10;
		this.top = top;
		this.left = left;
		this.vertical = vertical;
		this.parts = new int[this.length];
		this.sunk = true;
		for(int p = 0; p < this.length; p++) {
			
			this.parts[p] = parts[p];
			if(parts[p] == NO_HIT)
				this.sunk = false;
		
		}
	}
	
	/**
	 * Konstruktor zum Erstellen eines Schiffes aus einem String.
	 * @param strOrig Muster: "id 50 top 0 left 0 vertical 1 50, 50, 50, 50, 50"
	 */
	Ship(String strOrig) {
		
		String[] strSplit = strOrig.split(" ", 13);
		/*
		 * strSplit[0] = id
		 * strSplit[1] = 50
		 * strSplit[2] = top
		 * strSplit[3] = 0
		 * strSplit[4] = left
		 * strSplit[5] = 0
		 * strSplit[6] = vertical
		 * strSplit[7] = 1
		 * strSplit[8...] = id + HIT oder NOHIT
		 */
		this.id = Integer.valueOf(strSplit[1]);
		this.length = this.id / 10;
		this.top = Integer.valueOf(strSplit[3]);
		this.left = Integer.valueOf(strSplit[5]);
		if(Integer.valueOf(strSplit[7]) == 1)
			this.vertical = true;
		else this.vertical = false;
		this.sunk = true;
		this.parts = new int[this.length];
		for(int part = 8; part < strSplit.length; part++) {
			
			this.parts[part - 8] = Integer.valueOf(strSplit[part]) - this.id;
			if(this.parts[part - 8] == NO_HIT)
				this.sunk = false;
		}
		
	}
	
	/**
	 * Copykontruktor zum Erstellen eines Schiffes anhand eines vorhandenen.
	 * @param orig Das Schiff, das als Vorlage dient.
	 */
	Ship(Ship orig) {
		
		this(orig.id, orig.top, orig.left, orig.vertical);
		for(int p = 0; p < this.length; p++)
			this.parts[p] = orig.parts[p];
		this.sunk = orig.sunk;
		
	}
	
	/**
	 * Erstellen einer Kopie des Schiffes.
	 */
	@Override
	public Object clone() {
		
		return new Ship(this);
		
	}
	
	/**
	 * Vergleichen des Schiffes mit einem andern anhand ihrer IDs.
	 * @param obj Das Schiff mit dem verglichen werden soll.
	 */
	@Override
	public boolean equals(Object obj) {
		
		return this.id == ((Ship) obj).id;
		
	}
	
	/**
	 * Die String-Repraensentation des Schiffes. <br />
	 * Muster fuer ein Schlachtschiff, das noch nicht getroffen wurde: <br />
	 * "id 50 top 0 left 0 vertical true 50 50 50 50 50"
	 */
	@Override
	public String toString() {
		
		String strShip = "id " + String.valueOf(this.id) + 
				" top " + String.valueOf(this.top) + 
				" left " + String.valueOf(this.top) + 
				" vertical " + String.valueOf(this.vertical) + 
				" parts";
		for(int p : this.parts)
			strShip += " " + String.valueOf(this.id + p);
		
		return strShip;
		
	}
	
	/**
	 * Integer-Repraensentation des Schiffes. <br />
	 * Muster: {id, top, left, vertical (0 oder 1), id + parts[0],
	 * 			id + parts[1], ..., id + parts[length]}
	 */
	int[] toIntegerArray() {
		
		int intShip[] = new int[this.length + 4];
		intShip[0] = this.id;
		intShip[1] = this.top;
		intShip[2] = this.left;
		if(this.vertical)
			intShip[3] = 1;
		else intShip[4] = 0;
		for(int p = 0; p < this.length; p++)
			intShip[p] = this.id + this.parts[p];
		return intShip;
		
	}

	/**
	 * Angabe, ob sich das Schiff auf einem bestimmten Feld befindet.
	 * @param y Die y-Koordinate des Feldes.
	 * @param x Die x-Koordinate des Feldes.
	 * @return Die Kombination aus der Schiffsid und dem Schiffsteil 
	 * (id + parts[i])
	 * @return -1, wenn das Schiff nicht auf dem Feld ist.
	 */
	int isOnField(int y, int x) {
		
		if(this.vertical && x == this.left && y >= this.top && y < this.top + this.length)
			return this.id + this.parts[y - this.top];
		else if(!this.vertical && y == this.top && x >= left && x < this.left + this.length)
			return this.id + this.parts[x - this.top];
		else return -1;
		
	}
	
	/**
	 * Die ID des Schiffes.
	 * @see model.Ship#ID_BATTLESHIP
	 * @see model.Ship#ID_CRUISER
	 * @see model.Ship#ID_FRIGATE_1
	 * @see model.Ship#ID_FRIGATE_2
	 * @see model.Ship#ID_MINESLOCATOR
	 */
	int getID() {
		
		return this.id;
		
	}
	
	/**
	 * Angabe, ob es sich bei dem Schiff um ein Schlachtschiff handelt.
	 * @see model.Ship#ID_BATTLESHIP
	 */
	boolean isBattleship() {
		
		return this.id == ID_BATTLESHIP;
		
	}
	
	/**
	 * Angabe, ob es sich bei dem Schiff um einen Kreutzer handelt.
	 * @see model.Ship#ID_CRUISER
	 */
	boolean isCruiser() {
		
		return this.id == ID_CRUISER;
		
	}
	
	/**
	 * Angabe, ob es sich bei dem Schiff um eine Fregatte handelt.
	 * @see model.Ship#ID_FRIGATE_1
	 * @see model.Ship#ID_FRIGATE_2
	 */
	boolean isFrigate() {
		
		return this.id == ID_FRIGATE_1 || this.id == ID_FRIGATE_2;
		
	}
	
	/**
	 * Angabe, ob es sich bei dem Schiff um einen Minensucher handelt.
	 * @see model.Ship#ID_MINESLOCATOR
	 */
	boolean isMinesLocator() {
		
		return this.id == ID_MINESLOCATOR;
		
	}
	
	/**
	 * Die Laenge des Schiffes.
	 */
	int getLength() {
		
		return this.length;
		
	}
	
	/**
	 * Die y-Koordinate des obersten Schiffsteils. <br />
	 * Es ist die niedrigste y-Koordinate aller Schiffsteile.
	 */
	int getTop() {
		
		return this.top;
		
	}
	
	/**
	 * Die x-Koordinate des linkesten Schiffsteils. <br />
	 * Es ist die niedrigste x-Koordinate aller Schiffsteile.
	 */
	int getLeft() {
		
		return this.left;
		
	}
	
	/**
	 * Die Angabe, ob das Schiff vertikal auf dem Brett liegt.
	 */
	boolean isVertical() {
		
		return this.vertical;
		
	}
	
	/**
	 * Die Schiffsteile. <br />
	 * Ein Schiffsteil ist entweder intakt oder getroffen.
	 * @see model.Ship#NO_HIT
	 * @see model.Ship#HIT
	 */
	int[] getParts() {
		
		return this.parts;
		
	}
	
	/**
	 * Ein bestimmtes Schiffsteil. <br />
	 * Ein Schiffsteil ist entweder intakt oder getroffen.
	 * @see model.Ship#NO_HIT
	 * @see model.Ship#HIT
	 * @param index 0 <= index < length
	 */
	int getPart(int index) {
		
		return this.parts[index];
		
	}
	
	/**
	 * Die Angabe, ob das Schiff bereits gesunken ist. <br />
	 * Sie wird wie folgt berechnet: <br />
	 * Wenn alle Schiffsteile getroffen wurden, ist das Schiff gesunken.
	 * @see model.Ship#parts
	 */
	boolean isSunk() {
		
		return this.sunk;
		
	}
	
	/**
	 * Updaten des Schiffes nach einem Beschuss.
	 * @param y Die y-Koordinate, auf die geschossen wurde.
	 * @param x Die x-Koordinate, auf die geschossen wurde.
	 * @return this.id + Ship.NO_HIT, wenn das Schiff nicht getroffen wurde.
	 * @return this.id + Ship.HIT, wenn das Schiff getroffen wurde.
	 * @return this.id + Ship.SUNK, wenn das Schiff versenkt wurde.
	 */
	int update(int y, int x) {
		
		if(this.isOnField(y, x) == -1) {
			
			// Das Schiff wurde nicht getroffen.
			return this.id + NO_HIT;
			
		}
		
		if(this.vertical)
			this.parts[y - this.top] = HIT;
		else this.parts[x - this.left] = HIT;
		
		for(int p : this.parts) {
			
			if(p == NO_HIT) {
				
				// Das Schiff wurde getroffen, ist aber noch nicht gesunken.
				return this.id + HIT;
				
			}
			
		}
		
		// Das Schiff wurde versenkt.
		this.sunk = true;
		return this.id + SUNK;
		
	}

}