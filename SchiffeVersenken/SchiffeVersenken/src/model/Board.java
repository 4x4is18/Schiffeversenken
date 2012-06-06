package model;

import java.util.ArrayList;

/**
 * Die Modellklasse zur Beschreibung von Spielbrettern 
 * fuer das Spiel Schiffe Versenken.
 * @see model.Game
 * @author Team easy
 * @category model
 * @version 1.0
 */
class Board {
	
	/**
	 * Konstante Anzahl von Schiffen auf einem Brett.
	 */
	static final int NUM_SHIPS = 5;
	
	/**
	 * Konstante fuer ein Wasserfeld auf einem Brett.
	 */
	static final int WATER = 0;
	
	/**
	 * Konstante fuer einen Schuss auf ein Wasserfeld.
	 */
	static final int WATER_HIT = 1;
	
	/**
	 * Die Hoehe des Brettes.
	 */
	private int height;
	
	/**
	 * Die Breite des Brettes.
	 */
	private int width;
	
	/**
	 * Die Schiffe auf dem Brett. <br />
	 * ships.length = NUM_SHIPS
	 */
	private Ship[] ships;
	
	/**
	 * Die aktuelle Anzahl, der Schiffe auf dem Feld. <br />
	 * Sie berechnet sich aus der Anzahl zu Beginn minus der 
	 * versenkten Schiffe.
	 */
	private int numShips;
	
	/**
	 * Konstruktor zum Erstellen eines Brettes mit Schiffen.
	 * @param height Die Hoehe des Brettes.
	 * @param width Die Breite des Brettes.
	 * @param ships Die Schiffe.
	 */
	Board(int height, int width, Ship[] ships) {
		
		this.height = height;
		this.width = width;
		this.ships = new Ship[NUM_SHIPS];
		for(int s = 0; s < ships.length; s++)
			this.ships[s] = new Ship(ships[s]);
		this.numShips = NUM_SHIPS;
		
	}
	
	/**
	 * Copykontruktor zum Erstellen eines Brettes anhand eines vorhandenen.
	 * @param orig Das Brett, das als Vorlage dient.
	 */
	Board(Board orig) {
		
		this(orig.height, orig.width, orig.ships);
		this.numShips = orig.numShips;
		
	}
	
	/**
	 * Konstruktor zum Erstellen eines Brettes aus einem Integer-Array.
	 * @param height Die Hoehe des Brettes.
	 * @param width Die Breite des Brettes.
	 * @param intBoard Das Brett als Integer-Array <br />
	 * Wenn kein Schiff auf einem Feld ist, hat dieses den Wert WATER, 
	 * ansonsten hat das Feld den Wert der Schiff-ID + dem Wert des Schiffsteils
	 * @see model.Ship#getID()
	 * @see model.Ship#getPart(int)
	 */
	Board(int height, int width, int[][] intBoard) {
		
		this.height = height;
		this.width = width;
		this.numShips = NUM_SHIPS;

		// Auslesen des int-Arrays und Erstellen der Schiffe daraus:
		ArrayList<Integer> settedShips = new ArrayList<Integer>(NUM_SHIPS);
		int shipID, shipTop, shipLeft;
		boolean shipVertical;
		for(int y = 0; y < height; y++) {
			
			for(int x = 0; x < width; x++) {
				
				if(intBoard[y][x] == WATER)
					continue;
									
				/*
				 * ID des Schiffes bestimmen.
				 * Alle Schiff-IDs sind durch 5 teilbar.
				 * Der Integer-Wert ist entweder die id, wenn es ein intaktes Schiffsteil ist 
				 * oder id + 1, wenn es ein getroffenes Schiffsteil ist.
				 */
				shipID = intBoard[y][x] - (intBoard[y][x] % 5);
				
				// Überprüfen, ob das Schiff bereits gesetzt wurde:
				if(settedShips.contains(shipID))
					continue;
				
				/* Da das Brett von oben nach unten und von links rechts durchlaufen wird,
				 * ist das Feld, auf dem ein Schiff erstmals gefunden wird, die linke obere
				 * Ecke des Schiffes.
				 * Jetzt fehlt nur noch die Information, ob es vertikal oder horizontal
				 * im Wasser liegt.
				 */
				shipTop = y;
				shipLeft = x;
				int[] shipParts = new int[shipID / 10];	// Die Laenge berechnet sich aus der ID.
				if(y + 1 < height && (intBoard[y+1][x] - (intBoard[y+1][x] % 5) == shipID)) {
					
					/*
					 * Das Schiff liegt vertikal auf dem Brett.
					 */
					shipVertical = true;
					for(int p = 0; p < shipParts.length; p++)
						shipParts[p] = intBoard[y+p][x] - shipID;
					
				} else {
					
					shipVertical = false;
					for(int p = 0; p < shipParts.length; p++)
						shipParts[p] = intBoard[y][x+p] - shipID;
					
				}
				
				this.ships[settedShips.size()] = new Ship(shipID, shipTop, shipLeft, shipVertical, shipParts);
				if(!this.ships[settedShips.size()].isSunk())
					this.numShips--;
				settedShips.add(shipID);
				
			}
			
		}
		
	}
	
	/**
	 * Konstruktor zum Erstellen eines Brettes aus einem String heraus.
	 * @param strOrig Muster: "height 10 width 10;<muster von Schiff 1>;<muster von Schiff 2>;...<muster von Schiff 5>"
	 */
	Board(String strOrig) {
				
		String[] strSplit = strOrig.split(";", 6);
		/*
		 * strSplit[0] = height 10 width 10
		 * strSplit[1...6] = <muster von Schiff 1...6>
		 */
		String[] strSubSplit;
		this.ships = new Ship[NUM_SHIPS];
		this.numShips = NUM_SHIPS;
		
		for(int split = 0; split < strSplit.length; split++) {
			
			if(split == 0) {
				
				/*
				 * Der String mit den Angaben zur Groesse des Brettes.
				 */
				strSubSplit = strSplit[split].split(" ", 4);
				/*
				 * strSubSplit[0] = "height"
				 * strSubSplit[1] = "10"
				 * strSubSplit[2] = "width"
				 * strSubSplit[3] = "10"
				 */
				this.height = Integer.valueOf(strSubSplit[1]);
				this.width = Integer.valueOf(strSubSplit[3]);
				
			} else {
				
				/*
				 * Erstellen der Schiffe.
				 */
				this.ships[split-1] = new Ship(strSplit[split]);
				if(this.ships[split-1].isSunk())
					this.numShips--;
				
			}
			
		}
		
	}
	
	/**
	 * Kopieren des Schiffes.
	 */
	@Override
	public Object clone() {
		
		return new Board(this);
		
	}
	
	/**
	 * Die String-Repraensentation des Brettes. <br />
	 * Muster: "height 10 width 10;<muster von Schiff 1>;<muster von Schiff 2>;...<muster von Schiff 5>"
	 */
	@Override
	public String toString() {
		
		String strBoard = "height " + String.valueOf(this.height) + 
		" width " + String.valueOf(this.width) + ";";
		for(Ship ship : this.ships)
			strBoard += " " + ship.toString();
		return strBoard;
		
	}
	
	/**
	 * Integer-Repraensentation des Brettes. <br />
	 * Muster: {{0, 0, 0, 50, 50, 50, 50, 50, 0, 0},
	 * 			{40, 41, 0, 0, 0, 0, 0, 0, 0, 0},
	 * 			...}
	 */
	int[][] toIntegerArray() {
		
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
	
	/**
	 * Ueberpruefen, ob auf einem bestimmten Feld ein Schiff liegt.
	 * @param y Die y-Koordinate des Feldes.
	 * @param x Die x-Koordinate des Feldes.
	 * @return Das Schiff, das sich auf dem Feld befindet
	 * @return null, wenn sich kein Schiff auf dem Feld befindet.
	 */
	private Ship shipIsOnField(int y, int x) {

		for(Ship s : this.ships) {
			
			if(s.isOnField(y, x) != -1)
				return s;
			
		}
		
		return null;
		
	}

	/**
	 * Die Hoehe des Brettes.
	 */
	int getHeight() {
		
		return this.height;
		
	}
	
	/**
	 * Die Breite des Brettes.
	 */
	int getWidth() {
		
		return this.width;
		
	}
	
	/**
	 * Die Schiffe auf dem Brett. <br />
	 * ships.length = NUM_SHIPS
	 */
	Ship[] getShips() {
		
		return this.ships;
		
	}
	
	/**
	 * Ein bestimmtes Schiff auf dem Brett.
	 * @param index 0 <= index < NUM_SHIPS
	 */
	Ship getShip(int index) {
		
		return this.ships[index];
		
	}
	
	/**
	 * Die aktuelle Anzahl, der Schiffe auf dem Feld. <br />
	 * Sie berechnet sich aus der Anzahl zu Beginn minus der 
	 * versenkten Schiffe.
	 */
	int getNumShips() {
		
		return this.numShips;
		
	}
	
	/**
	 * Updaten des Brettes nach einem Beschuss.
	 * @param y Die y-Koordinate, auf die geschossen wurde.
	 * @param x Die x-Koordinate, auf die geschossen wurde.
	 * @return {@link model.Ship#update(int, int)}, wenn ein Schiff getroffen wurde
	 * @return {@link model.Board#WATER_HIT}, wenn ins Wasser geschossen wurde
	 */
	int update(int y, int x) {
		
		for(Ship ship : this.ships) {
			
			if(ship.isOnField(y, x) != -1)
				return ship.update(y, x);
			
		}

		return WATER_HIT;
		
	}

}