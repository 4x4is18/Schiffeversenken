var webSocket;

var userName;

var DELIMITER = "%";

/**
 * Dieser Parameter gibt an, auf welchem Server der Websocket läuft
 * 134.106.56.164 oder localhost
 * READ ONLY
 */
//var SERVERIP = "134.106.56.164";
var SERVERIP = "localhost";


/**
 * Dieser Parameter gibt an, auf welchem Port der Websocket läuft
 * READ ONLY
 */
var PORT = "8080";


/**
 * Wird beim Seitenaufruf aufgerufen.
 * Startet den Websocket und den Eventlistener für die Returntaste
 * @see read()
 */
function onload() {
	window.addEventListener('keydown',doKeyDown,true);
	websocket();
	read();
};

/**
 * Überwacht, ob die Returntaste gedrückt wurde. Returntastekeycode: 13
 * 
 */
function doKeyDown(evt){
	// TODO: Der Cursor springt aus dem Textfeld usermsg. Es ist sehr unbequem immer wieder darein zuklicken.
	if(evt.keyCode == 13) {
		document.getElementById('submitmsg').focus();
		sendMessage();

	}
	
};

/**
 * Initialisiert den Websocket.
 * Bei einer neuen Nachticht die vom Websocket gesendet wird, wird die Value der Textarea um eine Zeile erweitert 
 */


function websocket() {
	if ( "WebSocket" in window ) {
		
		webSocket = new WebSocket( 'ws://' + location.host + '/SchiffeVersenken/WebSocket/anything' ); // wo befindet sich der WebSocket
		
					webSocket.onopen = function( event ) {
						
						if (UserIDExists()) {
							webSocket.send("3" + DELIMITER + getUserID()); 
						} else {
							webSocket.send("1" + DELIMITER + getUserName()); 
						}						
		    		};
		    		
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
		    				
		    			
		    			case "4":
		    				var key = "gameID";
		    		        var data = result[1];
		    		        localStorage.setItem(key, data);
		    		        window.location="main.html";
		    		        break;
		    		        
		    			case "5":
		    				var key = "gameID";
		    		        var data = result[1];
		    		        localStorage.setItem(key, data);
		    		        window.location="main.html";
		    		        break;
		    			}
		   			};
		   		 }
	
};

/**
 * Überprüft eine Nachricht auf ihren Inhalt (darf nicht leer sein oder nur aus leerzeichen bestehen) und sendet sie dem Websocket
 * 
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

function sendGames() {
	
	
	
}


function getUserName() {
	 	var key = "benutzername";
	 	return localStorage.getItem(key);
};

function getUserID() {
	var key = "playerID";
 	return localStorage.getItem(key);
};

function UserIDExists() {
	var key = "playerID";
 	if (localStorage.getItem(key) == "") {
 		return false;
 	}
 		return true;	
};

function createGame() {
	
	webSocket.send("4" + DELIMITER + getUserID());
	window.location.replace('main.html');
	
	
};

function joinGame() {
	//alert("5" + DELIMITER + getUserID() + DELIMITER + "bla");
	webSocket.send("5" + DELIMITER + getUserID() + DELIMITER + "bla");
	window.location.replace('main.html');
	
};
	 		



