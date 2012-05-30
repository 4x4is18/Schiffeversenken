/*
 * Neu:
 * - Spielmodi eingeführt
 * - Schiff speichert Treffer und gibt an, ob es getroffen/versenkt wurde
 * - Schiff zeichnet ein rotes Feld, wenn es dort getroffen wurde
 * - Ship.isOnField und Board.isShipOnField liefern das Schiff oder null zurück statt true/false
 * - Schüsse auf gegnerischem Feld möglich
 * - Treffer und Versenken möglich
 */

/*
 * TODO:
 * - Komentare schreiben
 * - Schiffe runterzählen um den Gewinner zu ermitteln
 */

var ownBoard = new Board();
var enemyBoard = new Board();

var PREPARE = 0;
var INGAME = 1;
var mode = PREPARE;

var selectedShip = null;
var selectedShipLength = null;
var vertical = true;

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

	ownBoard.init('ownBoard');
	enemyBoard.init('enemyBoard');
	
	ownBoard.draw();
	enemyBoard.draw();
	// TODO:
	//alert("Prepare yourself!");
	
}

function selectShip(id, length) {

	selectedShip = id;
	selectedShipLength = length;
	document.getElementById(id).style.display="none";
	
}

function clearBoard() {
	
	selectedShip = null;
	selectedShipLength = null;
	vertical = true;
	ownBoard.init('ownBoard');
	ownBoard.draw();
	document.getElementById('ship50').style.display="inline-block";
	document.getElementById('ship40').style.display="inline-block";
	document.getElementById('ship32').style.display="inline-block";
	document.getElementById('ship31').style.display="inline-block";
	document.getElementById('ship20').style.display="inline-block";
	document.getElementById('go').disabled = true;
	
}

function readyToPlay() {
	
	document.getElementById('go').disabled = false;
	
	
}

function play() {
	
	mode = INGAME;
	document.getElementById('clear').disabled = true;
	document.getElementById('go').disabled = true;
	
	// TODO: Verbindung zum Server
//	alert("Ich bin soweit, wenn mein Gegner es auch ist!");
	// TODO: Test
	var string = ownBoard.toString();
	enemyBoard.clone(string);
	alert(enemyBoard);
	enemyBoard.draw();
	
}