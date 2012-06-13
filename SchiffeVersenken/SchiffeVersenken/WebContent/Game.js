/*
 * TODO:
 * - Das zeichnen des Overlay-Schiffes ist buggy. Mal wird es garnicht angezeigt, wenn man mit der Maus stehen bleibt. MB
 * - Die SpielID muss in der globalen Variable gameID gespiechert werden.
 * - Eventuell kann der Client vor dem Setzen eines Schusses ueberpruefen, ob dort schon einmal hingeschossen wurde.
 * - serverseitig: Splitter auf ":" setzen
 */

/**
 * Die Hoehe eines Spielbrettes gemessen in der Anzahl an Reihen.
 * READ ONLY
 */
var BOARD_HEIGHT = 10;

/**
 * Die Breite eines Spielbrettes gemessen in der Anzahl an Spalten.
 * READ ONLY
 */
var BOARD_WIDTH = 10;

/**
 * Die Groesse der einzelnen Felder in Pixeln.
 * READ ONLY
 */
var FIELD_SIZE = 30;

/**
 * Die Farbe des Wassers.
 * READ ONLY
 */
var WATER_COLOR = "rgba(0, 0, 200, 1)";

/**
 * Die Farbe, in der intakte Schiffsteile gezeichnet werden.
 * READ ONLY
 */
var SHIP_COLOR = "rgba(0, 255, 255, 0.7)";

/**
 * Die Farbe von Schuessen ins Wasser.
 * READ ONLY
 */
var WATER_SHOT_COLOR = "rgba(200, 200, 0, 1)";

/**
 * Die Farbe, in der getroffene Schiffsteile gezeichnet werden.
 */
var SHIP_HIT_COLOR = "rgba(255, 0, 0, 0.7)";

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
var PREPARE = -1;

/**
 * Spielmodus: im Spiel und am Zug
 * READ ONLY
 */
var ACTION = 1;

/**
 * Spielmodus: im Spiel und auf den/die Gegner wartend
 * READ ONLY
 */
var WAIT = 0;

/**
 * Der aktuelle Spielmodus.
 */
var mode;

/**
 * Konstante ID des Schachschiffes der Laenge 5.
 * READ ONLY
 */
var SHIP_ID_BATTLESHIP = 50;

/**
 * Konstante ID des Kreutzers der Laenge 3.
 * READ ONLY
 */
var SHIP_ID_CRUISER = 40;

/**
 * Konstante ID einer der Fregatten der Laenge 3.
 * READ ONLY
 */
var SHIP_ID_FRIGATE_1 = 35;

/**
 * Konstante ID einer der Fregatten der Laenge 3.
 * READ ONLY
 */
var SHIP_ID_FRIGATE_2 = 30;

/**
 * Konstante ID des Minensuchers der Laenge 2.
 * READ ONLY
 */
var SHIP_ID_MINESLOCATOR = 20;

/**
 * Konstante Anzahl von Schiffen auf einem Brett.
 * READ ONLY
 */
var NUM_SHIPS = 5;

/**
 * Konstante fuer ein unversehrtes Schiffsteil.
 * READ ONLY
 */
var NO_HIT = 0;

/**
 * Konstante fuer ein getroffenes Schiffsteil oder ein Schuss ins Wasser.
 * READ ONLY
 */
var HIT = 1;

/**
 * Konstante fuer ein gesunkenes Schiff.
 * READ ONLY
 */
var SUNK = 2;

/**
 * Die ID des Spiels.
 */
var gameID;

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

/**
 * Die Anzahl der abgefeuerten Schuesse.
 */
var numShots;

if(window.addEventListener){

	/*
	 * Starten des Programmes vom Client aus.
	 */
	addEventListener("load", gameWS(), false);
	
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
/*function init() {
	
	document.getElementById('go').disabled = true;
	document.getElementById('clear').disabled = false;
	
	ownBoard = new Board('ownBoard');
	enemyBoard = new Board('enemyBoard');
	
	mode = PREPARE;
	
	selectedShip = null;
	selectedShipLength = null;
	vertical = true;
	
	numShots = 0;
	
	ownBoard.load();
	enemyBoard.load();
	
}*/

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

/**
 * Aktivieren des Go-Buttons.
 */
function readyToPlay() {
	
	document.getElementById('go').disabled = false;
	
}

/**
 * Beenden des Vorbereitungsmodus, Senden des eigenen Brettes an den Server 
 * und Warten auf dessen Antwort.
 */
function play() {
	
	mode = WAIT;
	document.getElementById('clear').disabled = true;
	document.getElementById('go').disabled = true;
	
	var strBoard = ownBoard.toString();
	
	/*
	 * Serverkommunikation
	 * Dem Server muss folgendes uebergeben werden: gameID und strBoard.
	 * Vom Server muss ein Befehl kommen, der mode = ACTION setzt.
	 * Danach ein alert, dass der Spieler dran ist.
	 */
	// TODO: gameID benutzen oder ohne? Wenn mit gameID, so muss diese vorher
	// gesetzt werden
	webSocket.send(10 + ":" /*gameID + ":"*/ + strBoard);
	
}

/**
 * Senden der Koordinaten, auf die geschossen wurde, an den Server.
 * @param y Die y-Koordinate.
 * @param x Die x-Koordinate.
 */
function update(y, x) {
		
	mode = WAIT;
	
	/*
	 * TODO: Serverkommunikation
	 * Senden der beiden Koordinaten an den Server.
	 * Als Antwort vom Server kommt ein als String gepacktes int-Array:
	 * Das erste Element ist der eigene Schuss, der zweite ist der des Gegners.
	 * Muster: "i:j". Für i,j gilt: "y:x:result"
	 * 1 := Es wurde ins Wasser geschossen.
	 * sonst: 	shipID + HIT := Das Schiff wurde getroffen
	 * 			shipID + SUNK := Das Schiff wurde versenkt
	 * Dieser Wert muss in result abgespeichert werden.
	 */
	// TODO: gameID benutzen oder ohne? Wenn mit gameID, so muss diese vorher
	// gesetzt werden
	webSocket.send(11 + ":" /*gameID + ":"*/ + y + ":" + x);
	
}