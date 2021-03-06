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
	var hitImg = new Image();
	if(this.vertical) {

		for(var y = this.top; y < (this.top + this.length); y++) {
			canvContext.fillStyle = WATER_COLOR;
			canvContext.fillRect(this.left * FIELD_SIZE, y * FIELD_SIZE, 
				FIELD_SIZE - 1, FIELD_SIZE - 1);
			
			if(y == this.top) {
				
				hitImg.src = "images/vertikal-oben.png";
				
				
			// Links	
			} else if(y == this.top + this.length - 1) {
			
				hitImg.src = "images/vertikal-unten.png";
				
			// Rechts	
			} else  {
				// TODO: Bild Pfad �ndern
				hitImg.src = "images/mitte-v.png";
				
			}
			//canvContext.fillStyle = WATER_SHOT_COLOR;
			canvContext.drawImage(hitImg, this.left * FIELD_SIZE, y * FIELD_SIZE, 
						FIELD_SIZE - 1, FIELD_SIZE - 1);
			//canvContext.fillStyle = SHIP_COLOR;		

	        	
		}
		
	} else {

		for(var x = this.left; x < (this.left + this.length); x++) {			
			// Den Hintergrund zeichnen
			canvContext.fillStyle = WATER_COLOR;
			canvContext.fillRect(x * FIELD_SIZE, this.top * FIELD_SIZE, 
					FIELD_SIZE - 1, FIELD_SIZE - 1);
			
			// Das Schiff zeichnen. Das Schiff besteht aus drei Teilen. Links Mitte Rechts
			

			if(x == this.left) {
				
				hitImg.src = "images/horizontal-links.png";
				
				
			// Links	
			} else if(x == this.left + this.length - 1) {
			
				hitImg.src = "images/horizontal-rechts.png";
				
			// Rechts	
			} else  {
				// TODO: Bild Pfad �ndern
				hitImg.src = "images/mitte-h.png";
				
			}

			canvContext.drawImage(hitImg, x * FIELD_SIZE, this.top * FIELD_SIZE, 
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

		return this;
		
	} else if(!this.vertical && y == this.top && x >= this.left && 
			x < this.left + this.length) {
		
		return this;
		
	} else {
		
		return null;
		
	}
	
};

/**
 * Die String-Repraesentation des Schiffes.
 * Muster: "id 50 top 0 left 0 vertical 1 50 50 50 50 50"
 */
Ship.prototype.toString = function() {
	
	var strShip = "id " + this.id + " top " + this.top + " left " + this.left + " vertical ";
	
	// Umwandeln vertical: boolean -> int
	if(this.vertical) {
		strShip += "1";
	} else {
		strShip += "0";
	}
	
	for(var p = 0; p < this.length; p++)
		strShip += " " + this.id;
	
	return strShip;
	
};