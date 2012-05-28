Board.WATER_COLOR = "rgba(0, 0, 200, 1)";
Board.SHOT_COLOR = "rgba(200, 200, 0, 1)";
Board.NUM_FIELDS = 10;
Board.FIELD_SIZE = 30;
Board.MAX_SHIPS = 5;

Board.prototype.id;
Board.prototype.canvas;
Board.prototype.ships_set;
Board.prototype.ships;
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

Board.prototype.draw = function() {
	
	var board = this;
	
	this.canvas.onmousedown = function(event) {

		if(mode == PREPARE && board == ownBoard && selectedShip != null) {
			
			board.overlayShip = null;
				
			var y = parseInt(board.getMousePosY() / Board.FIELD_SIZE);
			var x = parseInt(board.getMousePosX() / Board.FIELD_SIZE);
			
			if(board.canSetShip(selectedShipLength, y, x, vertical)) {

				board.ships[board.ships_set++] = new Ship(selectedShip, 
						selectedShipLength, y, x, vertical);
				selectedShip = null;
				
				if(board.ships_set == Board.MAX_SHIPS) {
					
					readyToPlay();
					
				}
				
				board.draw();
				
			}
			
		} else if(mode == INGAME && board == enemyBoard) {
			
			var y = parseInt(board.getMousePosY() / Board.FIELD_SIZE);
			var x = parseInt(board.getMousePosX() / Board.FIELD_SIZE);		
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
			
			board.draw();
			
		}
		
	};
	
	this.canvas.onmousemove = function(event) {
		
		if(mode == PREPARE && board == ownBoard && selectedShip != null) {
			
			var topY = parseInt(board.getMousePosY() / Board.FIELD_SIZE);
			var leftX = parseInt(board.getMousePosX() / Board.FIELD_SIZE);
			
			if(board.canSetShip(selectedShipLength, topY, leftX, vertical)) {
				
				board.overlayShip = new Ship(selectShip, 
						selectedShipLength, topY, leftX, vertical);
				
			} else {
				
				board.overlayShip = null;
				
			}
			
			board.draw();
			
		}
		
	};
			
	if(this.canvas.getContext) {
			
		var canvContext = this.canvas.getContext('2d');
		
		for(var s = 0; s < this.ships_set; s++) {
			
			this.ships[s].draw(canvContext);
			
		}
		
		if(this.overlayShip != null) {
			
			this.overlayShip.draw(canvContext);
			
		}
		
		for(var y = 0; y < Board.NUM_FIELDS; y++) {
	        
        	for(var x = 0; x < Board.NUM_FIELDS; x++) {
        		
        		if(!this.isShipOnField(y, x)) {
        			        		
        			if(this.shots[y][x]) {
        				
        				canvContext.fillStyle = Board.SHOT_COLOR;
        				
        			} else {
        				
        				canvContext.fillStyle = Board.WATER_COLOR;
        				
        			}
	        		canvContext.fillRect(x * Board.FIELD_SIZE, y * Board.FIELD_SIZE, 
	        				Board.FIELD_SIZE - 1, Board.FIELD_SIZE - 1);
        		
        		}
                	
        	}
            	
		}
        	
	}
		
};

Board.prototype.getMousePosY = function() {
	
	var totalOffsetY = 0;
		
    for(var offsetParent = this.canvas.offsetParent; offsetParent != null; 
    		offsetParent = offsetParent.offsetParent) {
    	
		totalOffsetY += offsetParent.offsetTop;
          
	}
  
	
    return event.pageY - totalOffsetY;
    
};

Board.prototype.getMousePosX = function() {
	
	var totalOffsetX = 0;
		
    for(var offsetParent = this.canvas.offsetParent; offsetParent != null; 
    		offsetParent = offsetParent.offsetParent) {
    	
		totalOffsetX += offsetParent.offsetLeft;
          
	}
	
    return event.pageX - totalOffsetX;
    
};

Board.prototype.isShipOnField = function(y, x) {
	
	for(var s = 0; s < this.ships_set; s++) {
		
		if(this.ships[s].isOnField(y, x)) {
			
			return this.ships[s];
			
		}
		
	}
	
	if(this.overlayShip != null && this.overlayShip.isOnField(y, x)) {
		
		return this.ships[s];
		
	}
	
	return null;
	
};

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