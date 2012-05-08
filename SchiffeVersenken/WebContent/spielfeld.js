/**
 * 
 */

var canvas; //Canvas Element
var ctx; //Canvas context
var boardX;
var boardY;
drawGame();

function drawGame() {
	// Get the canvas element.
	canvas = document.getElementbyId("spielfeld");
	ctx = canvas.getContext("2d"); 
	ctx.fillstyle ="";
	ctx.beginPath();
	ctx.arc(0,0,boardX,boardY);
	ctx.closePath();
	ctx.fill;
	}
	

