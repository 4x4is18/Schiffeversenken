Board.WATER_COLOR = "rgba(0, 0, 200, 1)";
Board.NUM_FIELDS = 10;
Board.FIELD_SIZE = 30;

Board.prototype.id;
Board.prototype.canvas;
Board.prototype.ships_set;
Board.prototype.ships;

function Board(id) {
	
	this.id = id;
	this.canvas = document.getElementById(id);	
	this.ships_set = 0;
	this.ships = new Array(5);
	
}

Board.prototype.draw = function() {
	
	var board = this;
	
	this.canvas.onmousedown = function(event) {
		
		if(selectedShip != null) {
							
			var y = parseInt(board.getMousePosY() / Board.FIELD_SIZE);
			var x = parseInt(board.getMousePosX() / Board.FIELD_SIZE);
			
			board.ships[board.ships_set++] = new Ship(selectedShip, 
					selectedShipLength, y, x);
			selectedShip = null;
			board.draw();
			
		}
		
	};
			
	if(this.canvas.getContext) {
			
		var canvContext = this.canvas.getContext('2d');
		
		for(var s = 0; s < this.ships_set; s++) {
			
			this.ships[s].draw(canvContext);
			
		}
		
		for(var y = 0; y < Board.NUM_FIELDS; y++) {
	        
        	for(var x = 0; x < Board.NUM_FIELDS; x++) {
        		
        		if(!this.isShipOnField(y, x)) {
        			        		
	        		canvContext.fillStyle = Board.WATER_COLOR;
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
			
			return true;
			
		}
		
	}
	
	return false;
	
};