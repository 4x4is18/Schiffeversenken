/**
 * Konstante fuer ein unversehrtes Schiffsteil.
 */
static final int NO_HIT = 0;

/**
 * Konstante fuer ein getroffenes Schiffsteil.
 */
static final int HIT = 1;

/**
 * Die Farbe, in der intakte Schiffsteile gezeichnet werden.
 */
Ship.COLOR_NO_HIT = "rgba(0, 255, 255, 0.7)";

/**
 * Die Farbe, in der getroffene Schiffsteile gezeichnet werden.
 */
Ship.COLOR_HIT = "rgba(255, 0, 0, 0.7)";

/**
 * Konstante ID des Schachschiffes der Laenge 5.
 */
Ship.ID_BATTLESHIP = 50;

/**
 * Konstante ID des Kreutzers der Laenge 3.
 */
Ship.ID_CRUISER = 40;

/**
 * Konstante ID einer der Fregatten der Laenge 3.
 */
Ship.ID_FRIGATE_1 = 35;

/**
 * Konstante ID einer der Fregatten der Laenge 3.
 */
Ship.ID_FRIGATE_2 = 30;

/**
 * Konstante ID des Minensuchers der Laenge 2.
 */
Ship.ID_MINESLOCATOR = 20;

/**
 * Die ID des Schiffes.
 * @see #ID_BATTLESHIP
 * @see #ID_CRUISER
 * @see #ID_FRIGATE_1
 * @see #ID_FRIGATE_2
 * @see #ID_MINESLOCATOR
 */
Ship.prototype.id;

/**
 * Die Laenge des Schiffes. <br />
 * Sie wird wie folgt berechnet: id / 10 (abgerundet)
 * @see #id
 */
Ship.prototype.length;

/**
 * Die y-Koordinate des obersten Schiffsteils. <br />
 * Es ist die niedrigste y-Koordinate aller Schiffsteile.
 */
Ship.prototype.top;

/**
 * Die x-Koordinate des am linkesten Schiffsteils. <br />
 * Es ist die niedrigste x-Koordinate aller Schiffsteile.
 */
Ship.prototype.left;

/**
 * Die Angabe, ob das Schiff vertikal oder horizontal auf 
 * dem Brett liegt.
 */
Ship.prototype.vertical;

/**
 * Die Schiffsteile. <br />
 * Ein Schiffsteil ist entweder intakt oder getroffen.
 * @see model.Ship#NO_HIT
 * @see model.Ship#HIT
 */
Ship.prototype.parts;

/**
 * Konstruktor zum Erstellen eines Schiffes.
 * @param id Die ID des Schiffes.
 * @param top Die y-Koordinate des obersten Schiffsteils. <br />
 * Es ist die niedrigste y-Koordinate aller Schiffsteile.
 * @param left Die x-Koordinate des am linkesten Schiffsteils. <br />
 * Es ist die niedrigste x-Koordinate aller Schiffsteile.
 * @param vertical Die Angabe, ob das Schiff vertikal oder horizontal auf 
 * dem Brett liegt.
 */
function Ship(var id, var top, var left, var vertical) {
	
	this.id = id;
	this.length = id / 10;
	this.top = top;
	this.left = left;
	this.vertical = vertical;
	this.parts = new Array(this.length);
	for(var p = 0; p < this.length; p++)			
		this.parts[p] = Ship.NO_HIT;
	
}

/**
 * Getter fuer die Laenge des Schiffes.
 */
Ship.prototype.getLength = function() {
	
	return this.length;
	
};

/**
 * Getter fuer die x-Koordinate des ersten Schiffsteils (links-oben).
 */
Ship.prototype.getLeft = function() {
	
	return this.left;
	
};

/**
 * Getter fuer die y-Koordinate des ersten Schiffsteils (links-oben).
 */
Ship.prototype.getTop = function() {
	
	return this.top;
	
};

/**
 * Getter fuer die Angabe, ob das Schiff vertikal oder horizontal im Wasser liegt.
 */
Ship.prototype.isVertical = function() {
	
	return this.vertical;
	
};

/**
 * Zeichnen eines Schiffes.
 */
Ship.prototype.draw = function(canvContext) {
	
	if(this.vertical) {
		// Zeichnen eines vertikalen Schiffes:
		// Alle Schiffsteile von oben nach unten durchgehen und je nach dem, 
		// ob es ein intaktes Schiffsteil oder ein getroffenes ist, die Farbe 
		// waehlen.
		for(var y = this.top; y < (this.top + this.length); y++) {
			// Erstes Teil: this.top
			// Letztes Teil this.top + this.length
			if(this.parts[y-this.top] == HIT)
				canvContext.fillStyle = Ship.COLOR_HIT;
				
			} else {
				canvContext.fillStyle = Ship.COLOR;
				
			}
			
			canvContext.fillRect(this.left * Board.FIELD_SIZE, y * Board.FIELD_SIZE, 
					Board.FIELD_SIZE - 1, Board.FIELD_SIZE - 1);
	        	
		}
		
	} else {
		// Zeichnen eines horizontalen Schiffes:
		// Alle Schiffsteile von links nach rechts durchgehen und je nach dem, 
		// ob es ein intaktes Schiffsteil oder ein getroffenes ist, die Farbe 
		// waehlen.

		for(var x = this.left; x < (this.left + this.length); x++) {
			
			// Erstes Teil: this.left
			// Letztes Teil this.left + this.length
			if(this.parts[x-this.left] == HIT)
				canvContext.fillStyle = Ship.COLOR_HIT;				
			else canvContext.fillStyle = Ship.COLOR;
			
			canvContext.fillRect(x * Board.FIELD_SIZE, this.top * Board.FIELD_SIZE, 
					Board.FIELD_SIZE - 1, Board.FIELD_SIZE - 1);
	        	
		}
		
	}
	
};

/**
 * Ueberpruefung, ob das Schiff auf einem bestimmten Feld liegt.
 * return: das Schiff oder null
 */
Ship.prototype.isOnField = function(y, x) {

	if(this.vertical && x == this.left && y >= this.top && 
			y < this.top + this.length) {
		// Vertikales Schiff:
		// Erstes Teil: this.top
		// Letztes Teil this.top + this.length

		return this;
		
	} else if(!this.vertical && y == this.top && x >= this.left && 
			x < this.left + this.length) {
		// Horizontales Schiff:
		// Erstes Teil: this.left
		// Letztes Teil this.left + this.length
		
		return this;
		
	} else {
		
		return null;
		
	}
	
};

/**
 * Ermitteln der Position eines Treffers.
 */
Ship.prototype.getHitPos = function(y, x) {
	
	if(this.vertical) {
		
		for(var pos = this.top; pos < (this.top + this.length); pos++) {
			
			if(y == pos) {
				
				return pos - this.top;
				
			}
	        	
		}
		
	} else {

		for(var pos = this.left; pos < (this.left + this.length); pos++) {
			
			if(x == pos) {
				
				return pos - this.left;
				
			}
	        	
		}
		
	}
	
};

Ship.prototype.update = function(y, x) {
	
	var hitPos = this.getHitPos(y, x);
	this.parts[hitPos] = Ship.HIT;
	
};