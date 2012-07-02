/**
 * In dieser Variablen wird der Websocket gespeichert
 */
var webSocket;

/**
 * Der Benutzername des Spielers
 * @see getUserName()
 */
var userName;

/**
 * Der Splitter für die Methode onmessage in der Funktion websocket
 */
var DELIMITER = "%";

/**
 * Dieser Parameter gibt an, auf welchem Server der Websocket läuft
 * 134.106.56.164 oder localhost
 * READ ONLY
 */
//var SERVERIP = "134.106.56.164";
var SERVERIP = "192.168.2.240";


/**
 * Dieser Parameter gibt an, auf welchem Port der Websocket läuft
 * READ ONLY
 */
var PORT = "8080";


/**
 * Wird beim Seitenaufruf aufgerufen.
 * Startet den Websocket und den Eventlistener für die Returntaste
 * @see read()
 * @see websocket()
 */
function onload() {
	window.addEventListener('keydown',doKeyDown,true);
	websocket();
	
	// TODO: Testen ob diese Funktion überhaupt gebraucht wird. 
	read();
};

/**
 * Überwacht, ob die Returntaste gedrückt wurde. Returntastekeycode: 13
 * @see sendMessage()
 */
function doKeyDown(evt){
	
	if(evt.keyCode == 13) {
		
		document.getElementById('submitmsg').focus();
		sendMessage();

	}
	
};

/**
 * Initialisiert den Websocket. Mit der ServerIP und dem Port. <br />
 * Wenn der Websocket geöffnet wird (onopen), wird überprüft ob die UserID oder der UserName im LocalSotrage ist. <br />
 * --- <br />
 * Wenn Nachrichten vom Websocket gesendet werden, wird der String gesplittet und überprüft, zu welchem Case er gehört. <br />
 * CASE 1:		Speichert die UserID in den LocalStorage <br />
 * CASE 2:		Chatnachrichten <br />
 * CASE 3:		Nichts (Da auf Serverseite die drei mit einer anderen Aufgabe belegt ist und auf Clientseite nicht genutzt wird.)
 * CASE 4:		Die Antwort wenn man ein Spiel erstellen will
 * CASE 5:		Die Antwort wenn man einem Spiel beitreten will
 * @see UserIDExists()
 * @see UserNameExists()
 */
function websocket() {
	if ( "WebSocket" in window ) {
		
		// Die Websocket Verbindung des Clients, wo befindet sich der Websocket
		webSocket = new WebSocket( 'ws://' + SERVERIP + ":" + PORT + '/SchiffeVersenken/WebSocket/anything' ); 
					
					// Wird beim Öffnen aufgerufen. Überprüft ob überprüft ob die UserID oder der UserName im LocalSotrage ist.
					webSocket.onopen = function( event ) {
						
						// True wenn es schon eine UserID im LocalStorage gibt
						if (UserIDExists()) {
							
							// Dem Server wird die PlayerID gesendet und dem Websocket wird anhand der PlayerID der Player zugeördnet
							webSocket.send("3" + DELIMITER + getUserID() + DELIMITER + getUserName()); 
							
						} else {
							
							// Dem Server wird der Username übermittelt und ein neues Playerobjekt wird erstellt
							webSocket.send("1" + DELIMITER + getUserName()); 
							
						}
						
		    		};
		    		
		    		// Wenn eine Nachricht ankommt wird diese Funktion aufgerufen. (Siehe oben)

		    		webSocket.onmessage = function( event ) {
		    			var result = event.data.split(DELIMITER);
		    			switch(result[0]) {
		    				
		    			case "1":
		    				var key = "playerID";
		    		        var data = result[1];
		    		        localStorage.setItem(key, data);
		    		        break;
		    			case "2":
		    				document.getElementById('messages').value += result[1] + "\n";
		    				
		    				break;
		    			case "3":
		    				
		    				break;
		    			case "4":
		    		        
		    				break;
		    			case "5":
		    				
		    		        break;
		    			
		    			case "6":
		    				document.getElementById('spiele').innerHTML = "";
		    				
		    				for (var i = 1; i < result.length-1; i++) {
		    					
		    					document.getElementById('spiele').innerHTML += "<option value=\"" + result[i] + "\">" + result[i] +"</option>";
		    					
		    				}
		    				break;
		    			
		    			default:
		    					
		    				break;
		    			}
		    			
		   			};
		   		 }
	
};

/**
 * Überprüft eine Nachricht auf ihren Inhalt (darf nicht leer sein oder nur aus leerzeichen bestehen) und sendet sie dem Websocket
 */
function sendMessage() {

		// TODO: Es können noch leere Nachrichten abgeschickt werden. Sofern +1 Leerzeichen geschrieben wird.
		if(document.getElementById('usermsg').value == "") {
			
		} else {
			
			var text = "2" + DELIMITER + document.getElementById('usermsg').value;
			document.getElementById('usermsg').value = "";
			webSocket.send(text);
			document.getElementById('usermsg').focus();
			
		}
};

/**
 * TODO: Implementieren
 */
function sendGames() {
	
}

/**
 * Überprüft ob der Benutzername im LocalSotrage eingetragen ist <br />
 * @returns {Boolean} Ture wenn sie existiert/eingetragen ist.
 */
function UserNameExists() {
	
	var key = "benutzername";
	
 	if (localStorage.getItem(key) == "") {
 		
 		return false;
 		
 	}
 	
 		return true;	
 		
};

/**
 * Läd den Benutzernamen aus dem LocalStorage <br />
 * @returns Benutzername des Spielers
 */
function getUserName() {
	
	 	var key = "benutzername";
	 	return localStorage.getItem(key);
	 	
};

/**
 * Läd die PlayerID aus dem Localstorage
 * @returns PlayerID des Spielers
 */
function getUserID() {
	
	var key = "playerID";
 	return localStorage.getItem(key);
 	
};

/**
 * Überprüft den LocalStorage, ob die PlayerID leer ist. LS == "" <br />
 * @returns {Boolean} True wenn sie existiert/eingetragen ist
 */
function UserIDExists() {
	
	var key = "playerID";
	
 	if (localStorage.getItem(key) == "") {
 		
 		return false;
 		
 	}
 	
 		return true;	
 		
};

/**
 * Erstellt ein Spiel. <br />
 * Überträgt an den Websocket die UserID. <br />
 * Leitet den Spieler auf die main.html weiter <br />
 * TODO: Fenster zum erstellen des Spiels entwerfen und dieses anzeigen lassen.
 */
function createGame() {
	
	// Zunächst soll der Spieler einen Namen für das Spiel vergeben
	var gameID = prompt("Spielname eingeben:");
	
	// Eintragen des Namens in den LocalStorage
	var key = "gameID";
	localStorage.setItem(key, gameID);
	// Senden der Informationen an den Server
	webSocket.send("4" + DELIMITER + getUserID() + DELIMITER + gameID);

	// Aufrufen des Spiels
	window.location.replace('main.html');
			
};

/**
 * Startet ein Spiel. <br />
 * Überträgt an den Websocket die UserID und der Spielname <br />
 * Leitet den Spieler auf die main.html weiter
 */
function joinGame() {

	if (document.getElementById('spiele').value == "") {
		
		alert("Bitte wähle zuerst ein Spiel aus!");
		
	} else {
		var key = "gameID";
        gameID = localStorage.setItem(key, document.getElementById('spiele').value);
		window.location.replace('main.html');
		
	}
	
};
	 		