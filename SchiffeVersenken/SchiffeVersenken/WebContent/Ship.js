/**
 * Die ID des Schiffes.
 */
Ship.prototype.id;

/**
 * Die Laenge des Schiffes.
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
 * Konstruktor zum Erstellen eines Schiffes.
 * @param id Die ID des Schiffes.
 * @param length Die Laenge des Schiffes.
 * @param top Die y-Koordinate des obersten Schiffsteils. <br />
 * Es ist die niedrigste y-Koordinate aller Schiffsteile.
 * @param left Die x-Koordinate des am linkesten Schiffsteils. <br />
 * Es ist die niedrigste x-Koordinate aller Schiffsteile.
 * @param vertical Die Angabe, ob das Schiff vertikal oder horizontal auf 
 * dem Brett liegt.
 */
function Ship(id, length, top, left, vertical) {
	
	this.id = id;
	this.length = length;
	this.top = top;
	this.left = left;
	this.vertical = vertical;
	
}

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
			canvContext.fillStyle = SHIP_COLOR;
			canvContext.fillRect(this.left * FIELD_SIZE, y * FIELD_SIZE, 
					FIELD_SIZE - 1, FIELD_SIZE - 1);
	        	
		}
		
	} else {
		// Zeichnen eines horizontalen Schiffes:
		// Alle Schiffsteile von links nach rechts durchgehen und je nach dem, 
		// ob es ein intaktes Schiffsteil oder ein getroffenes ist, die Farbe 
		// waehlen.

		for(var x = this.left; x < (this.left + this.length); x++) {
			
			// Erstes Teil: this.left
			// Letztes Teil this.left + this.length
			canvContext.fillStyle = SHIP_COLOR;
			
			canvContext.fillRect(x * FIELD_SIZE, this.top * FIELD_SIZE, 
					FIELD_SIZE - 1, FIELD_SIZE - 1);
	        	
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