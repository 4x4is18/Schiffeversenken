/**
 * Das HTML-Canvas-Element, in dem das Brett gezeichnet wird.
 */
Board.prototype.canvas;

/**
 * Die Anzahl der bereits gesetzten Schiffe.
 */
Board.prototype.ships_set;

/**
 * Das Array, welches die Schiffe enth�lt.
 */
Board.prototype.ships;

/**
 * Das tempor�re Schiff (durch Mauszeigerbewegung).
 */
Board.prototype.overlayShip;

/**
 * Die abgefeuerten Schuesse ins Wasser.
 */
Board.prototype.shots;

/**
 * Konstruktor zum Erstellen eines Brettes.
 * @param id Die HTML-Div-ID des Brettes.
 */

/**
 * Wenn ein Schiff getroffen wurde
 */
Board.prototype.hitImg;


function Board(id) {
	this.canvas = document.getElementById(id);	
	this.ships = new Array(NUM_SHIPS);
	for(var s = 0; s < NUM_SHIPS; s++) {
		
		this.ships[s] = null;
		
	}	
	this.ships_set = 0;
	this.overlayShip = null;
	
	this.shots = new Array(BOARD_HEIGHT);
	for(var y = 0; y < BOARD_HEIGHT; y++) {
		
		this.shots[y] = new Array(BOARD_WIDTH);
		for(var x = 0; x < BOARD_WIDTH; x++)
			this.shots[y][x] = NO_HIT;
		
	}
	this.numShots = 0;
	
}

/**
 * Das Laden des Spielfeldes und der Eventhandler.
 */
Board.prototype.load = function() {
	
	var board = this;
	board.draw();
	
	// Zeichnen des tempor�ren Schiffes bei Mausbewegung
	this.canvas.onmousemove = function(event) {
		
		// Tritt auf, falls das Spiel noch nicht gestartet ist, und auf das eigene Feld geklickt wird
		if(mode == PREPARE && board == ownBoard && selectedShip != null) {

			// Bestimmung, auf welchem Feld der Mauszeiger sind befindet.
			var y = parseInt(board.getMousePosY(event) / FIELD_SIZE);
			var x = parseInt(board.getMousePosX(event) / FIELD_SIZE);
			
			// Sofern ein Schiff an diese Stelle gesetzt werden kann,
			// wird ein neues tempor�res Schiff erzeugt.
			if(board.canSetShip(selectedShipLength, y, x, vertical)) {
				
				board.overlayShip = new Ship(selectedShip, selectedShipLength, y, x, vertical);
				
			} else {
				
				// Kann das Schiff an der Stelle nicht gezeichnet werden,
				// Wird das tempor�re Schiff wieder entfernt.
				board.overlayShip = null;
				
			}
			
			// Abschlie�end wird das Spielfeld gezeichnet.
			board.draw();
			
		}
	
	};
	
	// Zeichnen eines Schiffes auf dem eigenen Feld
	this.canvas.onmousedown = function(event) {
		
		// Vor Spielbeginn k�nnen Schiffe (nur auf dem eigenen Feld) gesetzt werden
		if(mode == PREPARE && board == ownBoard && selectedShip != null) {
			
			board.overlayShip = null;
			
			var y = parseInt(board.getMousePosY(event) / FIELD_SIZE);
			var x = parseInt(board.getMousePosX(event) / FIELD_SIZE);
			
			/*  Wenn das Setzen eines Schiff an dieser Stelle m�glich ist,
			 *  wird es zun�chst erstellt. Zus�tzlich wird das
			 *  tempor�re Schiff (f�r Mauszeigerbewegungen) entfernt
			 */
			if(board.canSetShip(selectedShipLength, y, x, vertical)) {
				
				board.ships[board.ships_set++] = new Ship(selectedShip, selectedShipLength, y, x, 
						vertical);
				vertical = true;

				selectedShip = null;
				
				// Wurde das letzte Schiff gesetzt, und sind zwei Spieler vorhanden, ist der Spieler bereit f�r das Spiel
				if(board.ships_set == NUM_SHIPS && document.getElementById('Gegnername').innerHTML != ("Gegner Feld"))
					readyToPlay();   
				
				// Nach dem Erstellen des Schiffs das Spielfeld neu gezeichnet
				board.draw();
				
			}
			
		} else if(mode == ACTION && board == enemyBoard) {
			
			// W�hrend des Spiels kann nur (auf gegnerischem Feld) geschossen werden
			var y = parseInt(board.getMousePosY(event) / FIELD_SIZE);
			var x = parseInt(board.getMousePosX(event) / FIELD_SIZE);		
			
			numShots++;
			update(y, x);
			
		}
		
	};

};

/**
 * Das Spielfeld zeichnen, inkl fertig erstellen und tempor�ren Schiffen
 */
Board.prototype.draw = function() {
	var hitImg = new Image();
	if(this.canvas.getContext) {
		
		var canvContext = this.canvas.getContext('2d');
		// TODO: dynamisch machen
		canvContext.clearRect(0, 0, 300, 300);
		
		// Nur wenn man auf dem eigenen Board ist kann man die Schiffe zeichnen
		if(this == ownBoard){
			
			// Die fest erstellen Schiffe zeichnen
			for(var s = 0; s < this.ships_set; s++) {
						
				this.ships[s].draw(canvContext);
						
			}
		
			// Das tempor�re Schiff zeichnen, falls der Mauszeiger �ber einem g�ltigen Feld ist
			if(this.overlayShip != null) {
				
				this.overlayShip.draw(canvContext);
				
			}
			
		}
		
		// Die Schiffe d�rfen NICHT zuerst gezeichnet werden, da sonst gegnerische Treffer �berzeichnet werden
		for(var y = 0; y < BOARD_HEIGHT; y++) {
	        
	    	for(var x = 0; x < BOARD_WIDTH; x++) {
	    		
	    		var ship = this.isShipOnField(y, x);
	    		
	    		if(ship != null) {
	    			
	    			if(this.shots[y][x] > SUNK) {
	    				
	    				// TODO: eigentlich muss das in der Klasse Ship geschehen
	    				// im Moment werden die Treffer �berzeichnet
	    				canvContext.fillStyle = SHIP_HIT_COLOR;
	    				
	    				canvContext.fillRect(x * FIELD_SIZE, y * FIELD_SIZE, 
	    				FIELD_SIZE - 1, FIELD_SIZE - 1);
	    			}
	    			
	    		} else {
	    			
	    			if(this.shots[y][x] == NO_HIT) {
	    				
	    				canvContext.fillStyle = WATER_COLOR;
	    				canvContext.fillRect(x * FIELD_SIZE, y * FIELD_SIZE, 
	    	    	    		FIELD_SIZE - 1, FIELD_SIZE - 1);
	    				
	    				
	    			} else if(this.shots[y][x] == HIT) {
	    				hitImg.src = "images/o.png";
	    				//canvContext.fillStyle = WATER_SHOT_COLOR;
	    				canvContext.drawImage(hitImg, x * FIELD_SIZE, y * FIELD_SIZE, 
	    											FIELD_SIZE - 1, FIELD_SIZE - 1);
	   	
	    			} else {
	    				
	    				// gegnerisches Board
	    				hitImg.src = "images/x.png";
	    				//canvContext.fillStyle = SHIP_HIT_COLOR;
	    				canvContext.drawImage(hitImg, x * FIELD_SIZE, y * FIELD_SIZE, 
    	    	    	FIELD_SIZE - 1, FIELD_SIZE - 1);
	    				
	    			}
	    			
	    		
  
	    			
	    		}
	    		
        		
    			
	    	}
	        	
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
 * Liefert zur�ck, ob ein Schiff der angegebenen L�nge auf der angegebenen
 * Koordinate gezeichnet werden kann.
 * @param selectedShipLength Die Laenge des Schiffes.
 * @param topY Die oberste y-Koordinate des Schiffes.
 * @param leftX Die am weitesten links gelegene x-Koordinate des Schiffes.
 * @param vertical Die Angabe, ob das Schiff vertikal oder horizontal liegt.
 * @returns true, wenn das Schiff dort gesetzt werden kann <br />
 * false sonst
 */
Board.prototype.canSetShip = function(selectedShipLength, topY, leftX, vertical) {
	
	if(vertical) {
		
		if(topY + selectedShipLength > BOARD_HEIGHT) {
			
			return false;
			
		}
		
		for(var y = topY; y < topY + selectedShipLength; y++) {
				
			if(this.isShipOnField(y, leftX)) {
					
				return false;
					
			}
				
		}
		
	} else {
		
		if(leftX + selectedShipLength > BOARD_WIDTH) {
			
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

/**
 * Liefert das Schiff auf der angegeben Koordinate zur�ck
 * @param y Die y-Koordinate, nach der gesucht wird.
 * @param x Die x-Koordinate, nach der gesucht wird.
 * @returns Das Schiff auf den Koordinaten oder null, wenn kein Schiff auf dem Feld ist.
 */
Board.prototype.isShipOnField = function(y, x) {
	
	for(var s = 0; s < this.ships_set; s++) {
		
		if(this.ships[s].isOnField(y, x)) {

			return this.ships[s];
			
		}
	}
	
	if(this.overlayShip != null && this.overlayShip.isOnField(y, x)) {
		
		return this.overlayShip;
		
	}

	return null;
	
};

/**
 * Die String-Repraesentation des Brettes.
 * Muster: "height 10 width 10;<muster von Schiff 1>;<muster von Schiff 2>;...<muster von Schiff 5>"
 */
Board.prototype.toString = function() {
	
	var strBoard = "height " + BOARD_HEIGHT + " width " + BOARD_WIDTH;
	
	for(var s = 0; s < this.ships_set; s++) {
		
		strBoard += ";" + this.ships[s].toString();
		
	}
	
	return strBoard;
	
};

/**
 * Updaten des Brettes nach einem Beschuss.
 * @param y Die y-Koordinate, auf die geschossen wurde.
 * @param x Die x-Koordinate, auf die geschossen wurde.
 * @param result WATER_HIT, wenn ins Wasser geschossen wurde <br />
 * shipID + HIT := Das Schiff wurde getroffen <br />
 * shipID + SUNK := Das Schiff wurde versenkt
 */
Board.prototype.update = function(y, x, result) {
	
	this.shots[y][x] = result;
	
	numShots += 1;
	
	if (result < 10) {
		if(this == ownBoard) {
			showStatusMessage("Der Gegner hat nicht getroffen. Du bist an der Reihe");
			
		} else {
			showStatusMessage("Du hast nicht getroffen. Dein Gegner ist an der Reihe");
		}
	} else {
		if(this == ownBoard) {
			showStatusMessage("Der Gegner hat ein Schiff getroffen. Er ist nochmal an der Reihe.");
			
		} else {
			showStatusMessage("Du hast ein Schiff getroffn. Du bist nochmal an der Reihe.");
		}
	}
	
	if(result == SHIP_ID_BATTLESHIP + SUNK || result == SHIP_ID_CRUISER + SUNK || 
			result == SHIP_ID_FRIGATE_1 + SUNK || result == SHIP_ID_FRIGATE_2 + SUNK || result == SHIP_ID_MINESLOCATOR + SUNK) {
		
		if(this == ownBoard) {
			showStatusMessage("Dein Gegner hat ein Schiff von dir versenkt!");
			alert("Ein Schiff von dir wurde versenkt!");
		}
			
		else {
			showStatusMessage("Du hast ein Schiff vom Gegner versenkt!");
			alert("Du hast ein Schiff versenkt!");
		}
			
		
	}
	
	this.draw();
	
};