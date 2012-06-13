/*
 * TODO:
 * - Das zeichnen des Overlay-Schiffes ist buggy. Mal wird es garnicht angezeigt, wenn man mit der Maus stehen bleibt. MB
 * - Go-Button in der main.html muss disabled werden
 */

/**
 * Die Hoehe eines Spielbrettes gemessen in der Anzahl an Reihen.
 */
var BOARD_HEIGHT = 10;

/**
 * Die Breite eines Spielbrettes gemessen in der Anzahl an Spalten.
 */
var BOARD_WIDTH = 10;

/**
 * Die Groesse der einzelnen Felder in Pixeln.
 */
var FIELD_SIZE = 30;

/**
 * Die Farbe des Wassers.
 */
var WATER_COLOR = "rgba(0, 0, 200, 1)";

/**
 * Die Farbe, in der intakte Schiffsteile gezeichnet werden.
 */
var SHIP_COLOR = "rgba(0, 255, 255, 0.7)";

/**
 * Die Farbe von Schuessen ins Wasser.
 */
var WATER_SHOT_COLOR = "rgba(200, 200, 0, 1)";

/**
 * Das eigene Spielbrett.
 */
var ownBoard;

/**
 * Das gegnerische Spielbrett.
 */
var enemyBoard;

/**
 * Spielmodus: Vorbereiten <br />
 * In diesem Modus werden die eigenen Schife platziert. <br />
 * READ ONLY
 */
var PREPARE = 0;

/**
 * Spielmodus: im Spiel <br />
 * In diesem Modus wird das eigentliche Spiel ausgetragen. <br />
 * READ ONLY
 */
var INGAME = 1;

/**
 * Der aktuelle Spielmodus.
 */
var mode;

/**
 * Konstante ID des Schachschiffes der Laenge 5.
 */
var SHIP_ID_BATTLESHIP = 50;

/**
 * Konstante ID des Kreutzers der Laenge 3.
 */
var SHIP_ID_CRUISER = 40;

/**
 * Konstante ID einer der Fregatten der Laenge 3.
 */
var SHIP_ID_FRIGATE_1 = 35;

/**
 * Konstante ID einer der Fregatten der Laenge 3.
 */
var SHIP_ID_FRIGATE_2 = 30;

/**
 * Konstante ID des Minensuchers der Laenge 2.
 */
var SHIP_ID_MINESLOCATOR = 20;

/**
 * Konstante Anzahl von Schiffen auf einem Brett.
 */
var NUM_SHIPS = 5;

/**
 * Das zur Zeit ausgewaehlte Schiff (ID). <br />
 * Diese Variable wird nur im Vorberiatungsmodus gebraucht.
 */
var selectedShip;

/**
 * Die Laenge des ausgewaehlten Schiffes.
 */
var selectedShipLength;

/**
 * Die Angabe, ob das Schiff vertikal oder horizontal gesetzt werden soll.
 */
var vertical;

if(window.addEventListener){

	/*
	 * Starten des Programmes vom Client aus.
	 */
	addEventListener("load", init, false);
	
	/*
	 * Ueberwachen der Tastatur.
	 */
	addEventListener('keydown',doKeyDown,true);
	
}

/**
 * Drehen des angewaehlten Schiffes, wenn die Strg-Taste gedrückt wird.
 */
function doKeyDown(evt){
	
	if(evt.keyCode == 17) {
		
		vertical= !vertical;
		
	}

}

/**
 * Initialisieren des Clients.
 */
function init() {
	
	document.getElementById('go').disabled = true;
	document.getElementById('clear').disabled = false;
	
	ownBoard = new Board('ownBoard');
	enemyBoard = new Board('enemyBoard');
	
	mode = PREPARE;
	
	selectedShip = null;
	selectedShipLength = null;
	vertical = true;
	
	ownBoard.load();
	enemyBoard.load();
	
}

/**
 * Auswaehlen eines Schiffes zum Setzen im Vorbereitungsmodus.
 * @param id Die ID des Schiffes.
 * @param length Die Laenge des Schiffes.
 */
function selectShip(id, length) {

	selectedShip = id;
	selectedShipLength = length;
	document.getElementById(id).style.display="none";
	
}

/**
 * Zuruecksetzen des eigenen Spielbrettes im Vorbereitungsmodus.
 */
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
	document.getElementById('clear').disabled = true;
	document.getElementById('go').disabled = true;
	
	// TODO: Serverkommunikation
	
}