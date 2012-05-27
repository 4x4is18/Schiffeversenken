Ship.COLOR = "rgba(0, 255, 255, 0.7)";
Ship.COLOR_HIT = "rgba(255, 0, 0, 0.7";
Ship.NO_HIT = 0;
Ship.HIT = 1;
Ship.SUNK_IN = 2;

Ship.prototype.id;
Ship.prototype.length;
Ship.prototype.leftX;
Ship.prototype.topY;
Ship.prototype.vertical;
Ship.prototype.numHits;

function Ship(id, length, topY, leftX, vertical) {
	
	this.id = id;
	this.length = length;
	this.topY = topY;
	this.leftX = leftX;
	this.vertical = vertical;
	this.hits = 0;
	for(var i = 0; i < length; i++) {
		
		this.hits[i] = false;
		
	}
	this.numHits = 0;
	
}

Ship.prototype.draw = function(canvContext) {
	
	if(this.vertical) {
		
		for(var y = this.topY; y < (this.topY + this.length); y++) {
			
			if(this.hits[y]) {
				
				canvContext.fillStyle = Ship.COLOR_HIT;
				
			} else {
				
				canvContext.fillStyle = Ship.COLOR;
				
			}
			canvContext.fillRect(this.leftX * Board.FIELD_SIZE, y * Board.FIELD_SIZE, 
					Board.FIELD_SIZE - 1, Board.FIELD_SIZE - 1);
	        	
		}
		
	} else {

		for(var x = this.leftX; x < (this.leftX + this.length); x++) {
			
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

Ship.prototype.isOnField = function(y, x) {

	if(this.vertical && x == this.leftX && y >= this.topY && y <= this.topY + this.length) {

		return true;
		
	} else if(!this.vertical && y == this.topY && x >= this.leftX && x < this.leftX + this.length) {
		
		return true;
		
	} else {
		
		return false;
		
	}
	
};

Ship.prototype.getHitPos = function(y, x) {
	
	if(this.vertical) {
		
		for(var pos = this.topY; pos < (this.topY + this.length); pos++) {
			
			if(y == pos) {
				
				return pos;
				
			}
	        	
		}
		
	} else {

		for(var pos = this.leftX; pos < (this.leftX + this.length); pos++) {
			
			if(x == pos) {
				
				return pos;
				
			}
	        	
		}
		
	}
	
};

Ship.prototype.getHit = function(y, x) {
	
	if(this.isOnField(y, x) && this.numHits < this.length) {
		
		hitPos = this.getHitPos(y, x);
		if(!this.hits[hitPos]) {
			
			this.hits[hitPos];
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