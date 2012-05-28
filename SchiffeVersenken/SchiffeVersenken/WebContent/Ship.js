/*
 * Ship - Klassenvariablen
 */

// Die Markierung fuer ein intaktes Schiffsteil:
Ship.NO_HIT = 0;	// READ ONLY

//Die Markierung fuer ein getroffenes Schiffsteil:
Ship.HIT = 1;	// READ ONLY

//Die Markierung fuer ein gesunkenes Schiff:
Ship.SUNK_IN = 2;

// Die Farbe, in der intakte Schiffsteile gezeichnet werden:
Ship.COLOR = "rgba(0, 255, 255, 0.7)";	// READ ONLY

// Die Farbe, in der der getroffene Schiffsteile gezeichnet werden:
Ship.COLOR_HIT = "rgba(255, 0, 0, 0.7)";	// READ ONLY

/*
 * Ship - Instanzvariablen
 */

// TODO: von ID zu OWN
Ship.prototype.id;
// Die Angabe, ob das Schiff ein eigenes oder gegniersches ist:
//Ship.prototype.own;

// Die Laenge des Schiffes:
Ship.prototype.length;

// Die x-Koordinate des ersten Schiffsteils (links-oben):
Ship.prototype.leftX;

// Die y-Koordinate des ersten Schiffsteils (links oben):
Ship.prototype.topY;

// Die Angabe, ob das Schiff vertikal oder horizonal im Wasser liegt:
Ship.prototype.vertical;

// TODO: von HITS zu PARTS
Ship.prototype.hits;
// Das Array fuer die einzelnen Schiffsteile (je NO_HIT oder HIT)
//Ship.prototype.parts;

// TODO: NUMHITS rausnehmen
Ship.prototype.numHits;

/*
 * Konstruktor zum Erstellen eines Schiffes.
 */
//TODO: von ID zu OWN
//TODO: von HITS zu PARTS
//TODO: NUMHITS rausnehmen
function Ship(id, length, topY, leftX, vertical) {
	
	this.id = id;
	this.length = length;
	this.topY = topY;
	this.leftX = leftX;
	this.vertical = vertical;
	this.hits = new Array(length);
	for(var i = 0; i < length; i++) {
		
		this.hits[i] = false;
		
	}
	this.numHits = 0;
	
}

/*
 * Getter fuer die Angabe, ob das Schiff ein eigenes oder gegniersches ist.
 */
Ship.prototype.isOwn = function() {
	
	return this.isOwn();
	
};

/*
 * Getter fuer die Laenge des Schiffes.
 */
//TODO: von ID zu OWN
/*Ship.prototype.getLength = function() {
	
	return this.length;
	
};*/

/*
 * Getter fuer die x-Koordinate des ersten Schiffsteils (links-oben).
 */
Ship.prototype.getLeftX = function() {
	
	return this.leftX;
	
};

/*
 * Getter fuer die y-Koordinate des ersten Schiffsteils (links-oben).
 */
Ship.prototype.getTopY = function() {
	
	return this.topY;
	
};

/*
 * Getter fuer die Angabe, ob das Schiff vertikal oder horizontal im Wasser liegt.
 */
Ship.prototype.isVertical = function() {
	
	return this.vertical;
	
};

/*
 * Getter fuer die einzenen Schiffsteile.
 * Fuer vertikale Schiffe: topY <= i < topY + length.
 * Fuer horizontale Schiffe: leftX <= i < leftX + length.
 */
//TODO: von ID zu OWN
/*Ship.prototype.getPart = function(i) {
	
	return this.parts[i];
	
}*/

/*
 * Zeichnen eines Schiffes.
 */
// TODO: von HITS zu PARTS
Ship.prototype.draw = function(canvContext) {
	
	if(this.vertical) {
		// Zeichnen eines vertikalen Schifes:
		// Alle Schiffsteile von oben nach unten durchgehen und je nach dem, 
		// ob es ein intaktes Schiffsteil oder ein getroffenes ist, die Farbe 
		// waehlen.
		
		for(var y = this.topY; y < (this.topY + this.length); y++) {

			// Erstes Teil: this.topY
			// Letztes Teil this.topY + this.length
			if(this.hits[y - this.topY]) {
				
				canvContext.fillStyle = Ship.COLOR_HIT;
				
			} else {
				
				canvContext.fillStyle = Ship.COLOR;
				
			}
			
			canvContext.fillRect(this.leftX * Board.FIELD_SIZE, y * Board.FIELD_SIZE, 
					Board.FIELD_SIZE - 1, Board.FIELD_SIZE - 1);
	        	
		}
		
	} else {
		// Zeichnen eines horizontalen Schifes:
		// Alle Schiffsteile von links nach rechts durchgehen und je nach dem, 
		// ob es ein intaktes Schiffsteil oder ein getroffenes ist, die Farbe 
		// waehlen.

		for(var x = this.leftX; x < (this.leftX + this.length); x++) {
			
			// Erstes Teil: this.leftX
			// Letztes Teil this.leftX + this.length
			if(this.hits[y]) {
				
				canvContext.fillStyle = Ship.COLOR_HIT;
				
			} else {
				
				canvContext.fillStyle = Ship.COLOR;
				
			}
			
			canvContext.fillRect(x * Board.FIELD_SIZE, this.topY * Board.FIELD_SIZE, 
					Board.FIELD_SIZE - 1, Board.FIELD_SIZE - 1);
	        	
		}
		
	}
	
};

/*
 * Ueberpruefung, ob das Schiff auf einem bestimmten Feld liegt.
 * return: das Schiff oder null
 */
Ship.prototype.isOnField = function(y, x) {

	if(this.vertical && x == this.leftX && y >= this.topY && 
			y <= this.topY + this.length) {
		// Vertikales Schiff:
		// Erstes Teil: this.topY
		// Letztes Teil this.topY + this.length

		return this;
		
	} else if(!this.vertical && y == this.topY && x >= this.leftX && 
			x < this.leftX + this.length) {
		// Horizontales Schiff:
		// Erstes Teil: this.leftX
		// Letztes Teil this.leftX + this.length
		
		return this;
		
	} else {
		
		return null;
		
	}
	
};

// TODO: rausnehmen?
Ship.prototype.getHitPos = function(y, x) {
	
	if(this.vertical) {
		
		for(var pos = this.topY; pos < (this.topY + this.length); pos++) {
			
			if(y == pos) {
				
				return pos - this.topY;
				
			}
	        	
		}
		
	} else {

		for(var pos = this.leftX; pos < (this.leftX + this.length); pos++) {
			
			if(x == pos) {
				
				return pos - this.leftX;
				
			}
	        	
		}
		
	}
	
};

Ship.prototype.getHit = function(y, x) {
	
	if(this.isOnField(y, x) && this.numHits < this.length) {
		
		hitPos = this.getHitPos(y, x);
		if(!this.hits[hitPos]) {
			
			this.hits[hitPos] = true;
			
			if(++this.numHits == this.length) {
				
				return Ship.SUNK_IN;
				
			} else {
				
				return Ship.HIT;
				
			}
			
		} else {
			
			return Ship.NO_HIT;
			
		}
				
	} else {
		
		return Ship.NO_HIT;
		
	}
	
};