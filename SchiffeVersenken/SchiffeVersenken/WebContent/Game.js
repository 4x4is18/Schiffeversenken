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

var ownBoard = new Board('ownBoard');
var enemyBoard = new Board('enemyBoard');

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

	ownBoard.draw();
	enemyBoard.draw();
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
	ownBoard = new Board('ownBoard');
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
	
	// TODO: Verbindung zum Server
	alert("Ich bin soweit, wenn mein Gegner es auch ist!");
	
}