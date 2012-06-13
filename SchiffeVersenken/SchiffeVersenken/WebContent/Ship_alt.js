/**
 * Konstante fuer ein unversehrtes Schiffsteil.
 */
Ship.NO_HIT = 0;

/**
 * Konstante fuer ein getroffenes Schiffsteil.
 */
Ship.HIT = 1;

/**
 * Die Farbe, in der intakte Schiffsteile gezeichnet werden.
 */
Ship.COLOR_NO_HIT = "rgba(0, 255, 255, 0.7)";

/**
 * Die Farbe, in der getroffene Schiffsteile gezeichnet werden.
 */
Ship.COLOR_HIT = "rgba(255, 0, 0, 0.7)";


/**
 * Die Schiffsteile. <br />
 * Ein Schiffsteil ist entweder intakt oder getroffen.
 * @see model.Ship#NO_HIT
 * @see model.Ship#HIT
 */
Ship.prototype.parts;


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