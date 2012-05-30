
// Die Farbe des Wassers
Board.WATER_COLOR = "rgba(0, 0, 200, 1)";

// Die Farbe, wenn auf dem Feld geschossen wurde
Board.SHOT_COLOR = "rgba(200, 200, 0, 1)";

// Die Anzahl der Felder pro Achse
Board.NUM_FIELDS = 10;

// Die Groesse der einzelnen Felder
Board.FIELD_SIZE = 30;

// Die Anzahl der zu setzenden Schiffe
Board.MAX_SHIPS = 5;

Board.prototype.id;

Board.prototype.canvas;

Board.prototype.ships_set;

// Das Array, welches die Schiffe enthält
Board.prototype.ships;

// Das temporäre Schiff (durch Mauszeigerbewegung)
Board.prototype.overlayShip;

Board.prototype.shots;


function Board(id) {
	
	this.id = id;
	this.canvas = document.getElementById(id);	
	this.ships_set = 0;
	this.ships = new Array(Board.MAX_SHIPS);
	this.overlayShip = null;
	this.shots = new Array(10);
	for(var y = 0; y < 10; y++) {
		
		this.shots[y] = new Array(10);
		
		for(var x = 0; x < 10; x++) {
			
			this.shots[y][x] = false;
			
		}
		
	}
	
}

/**
 * Das Spielfeld und sämtliche Eventhandler werden erstellt
 * In dieser Funktion wird explizit NICHT gezeichnet, da das spätere, erneute Zeichnen
 * zu rekursiven Anweisungen führt, die vermieden werden sollten.
 */
Board.prototype.draw = function() {
	
	var board = this;
	
	// Zunächst wird das (leere) Spielfeld gezeichnet.
	board.drawField();	

	// Mouseklick-Handler
	this.canvas.onmousedown = function(event) {
		// Vor Spielbeginn können Schiffe (nur auf dem eigenen Feld) gesetzt werden
		if(mode == PREPARE && board == ownBoard && selectedShip != null) {
			
			board.overlayShip = null;
			var y = parseInt(board.getMousePosY(event) / Board.FIELD_SIZE);
			var x = parseInt(board.getMousePosX(event) / Board.FIELD_SIZE);
			
			/*
			 *  Wenn ein Schiff an dieser Stelle möglich ist.
			 *  wird es zunächst erstellt. Zusätzlich wird das
			 *  temporäre Schiff (Für Mauszeigerbewegungen) entfernt
			 */
			if(board.canSetShip(selectedShipLength, y, x, vertical)) {
				board.ships[board.ships_set++] = new Ship(selectedShip, 
						selectedShipLength, y, x, vertical);
				selectedShip = null;
				
				// Sind alle Schiffe gesetzt, kann der Spieler auf GO klicken
				if(board.ships_set == Board.MAX_SHIPS) {
					
					readyToPlay();
					
				}
				
				// Nach erstellen des Schiffs das Spielfeld neu zeichnen
				board.drawField();
				
			}
			
		// Während des Spiels kann nur (auf gegnerischem Feld) geschossen werden
		} else if(mode == INGAME && board == enemyBoard) {
			
			var y = parseInt(board.getMousePosY(event) / Board.FIELD_SIZE);
			var x = parseInt(board.getMousePosX(event) / Board.FIELD_SIZE);		
			var ship = board.isShipOnField(y, x);
			
			if(ship == null) {
				
				board.shots[y][x] = true;
				
			} else {
				
				var hitInfo = ship.getHit(y, x);
				
				if(hitInfo == Ship.HIT) {
					
					window.alert("Treffer!");
					
				} else if(hitInfo == Ship.SUNK_IN) {
					
					window.alert("Versenkt!");
					
				}
				
			}
			
			board.drawField();
			
		}
		
	};
	
	// Zeichnen des temporären Schiffes bei Mausbewegung
	this.canvas.onmousemove = function(event) {
		
		// Tritt auf, falls das Spiel noch nicht gestartet ist, und auf das eigene Feld geklickt wird
		if(mode == PREPARE && board == ownBoard && selectedShip != null) {
			
			// Bestimmung, auf welchem Feld der Mauszeiger sind befindet.
			var y = parseInt(board.getMousePosY(event) / Board.FIELD_SIZE);
			var x = parseInt(board.getMousePosX(event) / Board.FIELD_SIZE);
			
			// Sofern ein Schiff an dieser stelle gezeichnet werden kann,
			// wird ein neues temporäres Schiff erzeugt.
			if(board.canSetShip(selectedShipLength, y, x, vertical)) {
				board.overlayShip = new Ship(selectShip, 
						selectedShipLength, y, x, vertical);
				
			} else {
				
				// Kann das Schiff an der Stelle nicht gezeichnet werden,
				// Wird das temporäre Schiff wieder entfernt.
				board.overlayShip = null;
				
			}
			
			// Abschließend wird das Spielfeld gezeichnet.
			board.drawField();
			
		}
		
	};

};


/**
 * Das Spielfeld zeichnen, inkl fertig erstellen und temporären Schiffen
 */
Board.prototype.drawField = function() {
	
	if(this.canvas.getContext) {
		
		var canvContext = this.canvas.getContext('2d');
		
		// Zunächst wird das gesammte Spielfeld mit Wasserfeldern überzeichnet.
		for(var y = 0; y < Board.NUM_FIELDS; y++) {
	        
	    	for(var x = 0; x < Board.NUM_FIELDS; x++) {
	    		 			        		
	    			if(this.shots[y][x]) {
	    				
	    				canvContext.fillStyle = Board.SHOT_COLOR;
	    				
	    			} else {
	    				
	    				canvContext.fillStyle = Board.WATER_COLOR;
	    				
	    			}
	        		canvContext.fillRect(x * Board.FIELD_SIZE, y * Board.FIELD_SIZE, 
	        				Board.FIELD_SIZE - 1, Board.FIELD_SIZE - 1);
	    			
	    	}
	        	
		}
			
		// Die fest erstellen Schiffe zeichnen
		for(var s = 0; s < this.ships_set; s++) {
			
			this.ships[s].draw(canvContext);
			
		}
		
		// Das temporäre Schiff zeichnen, falls der Mauszeiger über einem gültigen Feld ist
		if(this.overlayShip != null) {
			
			this.overlayShip.draw(canvContext);
			
		}
	      	
	}
	
};

/**
 * Besetimmt die Y-Koordinate des Mauszeigers, beginnent bei
 * dem Feld 0, 0
 * @param event
 * @returns {Number}
 */
Board.prototype.getMousePosY = function(event) {
	
	var totalOffsetY = 0;
	
    for(var offsetParent = this.canvas.offsetParent; offsetParent != null; 
    		offsetParent = offsetParent.offsetParent) {
    	
		totalOffsetY += offsetParent.offsetTop;
		
	}
    return event.pageY - totalOffsetY;
    
};


/**
 * Besetimmt die X-Koordinate des Mauszeigers, beginnent bei
 * dem Feld 0, 0
 * @param event
 * @returns {Number}
 */
Board.prototype.getMousePosX = function(event) {
	
	var totalOffsetX = 0;
		
    for(var offsetParent = this.canvas.offsetParent; offsetParent != null; 
    		offsetParent = offsetParent.offsetParent) {
    	
		totalOffsetX += offsetParent.offsetLeft;
          
	}
	
    return event.pageX - totalOffsetX;
    
};

/**
 * Liefert das Schiff auf der angegeben Koordinate zurück
 * @param y
 * @param x
 * @returns
 */
Board.prototype.isShipOnField = function(y, x) {
	
	for(var s = 0; s < this.ships_set; s++) {
		
		if(this.ships[s].isOnField(y, x)) {
			
			return this.ships[s];
			
		}
	}
	
	// Was ist das denn? :D
	if(this.overlayShip != null && this.overlayShip.isOnField(y, x)) {
		
		return this.ships[s];
		
	}
	
	return null;
	
};

/**
 * Liefert zurück, ob ein Schiff der angegebenen Länge auf der angegebenen
 * Koordinate gezeichnet werden kann.
 * @param selectedShipLength
 * @param topY
 * @param leftX
 * @param vertical
 * @returns {Boolean}
 */
Board.prototype.canSetShip = function(selectedShipLength, topY, leftX, vertical) {
	
	var start = null;
	var end = null;
	
	if(vertical) {
		
		if(topY + selectedShipLength > Board.NUM_FIELDS) {
			
			return false;
			
		}
		
		for(var y = topY; y < topY + selectedShipLength; y++) {
				
			if(this.isShipOnField(y, leftX)) {
					
				return false;
					
			}
				
		}
		
	} else {
		
		if(leftX + selectedShipLength > Board.NUM_FIELDS) {
			
			return false;
			
		}
		
		for(var x = leftX; x < leftX + selectedShipLength; x++) {
				
			if(this.isShipOnField(topY, x)) {
					
				return false;
					
			}
				
		}
		
	}
	
	return true;
	
};