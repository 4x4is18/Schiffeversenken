/*
 * TODO:
 * - Schiffe nur auf dem linken Feld setzen k�nnen
 * - Schiff als Overlay anzeigen, wenn man mit der Maus �ber das Feld geht
 * - Button clear
 * - Button play
 */

var ownBoard = new Board('ownBoard');
var enemyBoard = new Board('enemyBoard');

var selectedShip = null;
var selectedShipLength = null;
var vertical = false;

if(window.addEventListener){

	addEventListener("load", draw, false);
	
}

window.addEventListener('keydown',doKeyDown,true);
function doKeyDown(evt){
	
	if(evt.keyCode == 17) {
		
		vertical= !vertical;
		
	}

}

function draw() {
	
	ownBoard.draw();
	enemyBoard.draw();
	
}

function selectShip(id, length) {

	selectedShip = id;
	selectedShipLength = length;
	document.getElementById(id).style.display="none";
	
}