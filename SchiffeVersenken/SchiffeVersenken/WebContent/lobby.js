var webSocket;

var userName;

var DELIMITER = ":";

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
		document.message.submitmsg.focus();
		sendMessage();	
	}
	
};

/**
 * Initialisiert den Websocket.
 * Bei einer neuen Nachticht die vom Websocket gesendet wird, wird die Value der Textarea um eine Zeile erweitert 
 */


function websocket() {
	if ( "WebSocket" in window ) {
		
		webSocket = new WebSocket( 'ws://localhost:8080/SchiffeVersenken/WebSocket/anything' ); // wo befindet sich der WebSocket
		
					webSocket.onopen = function( event ) {
						
						if (UserIDExists()) {
							webSocket.send("3;" + getUserID()); 
						} else {
							webSocket.send("1;" + getUserName()); 
						}						
		    		};
		    		
		    		webSocket.onmessage = function( event ) {
		    			var result = event.data.split(";");
		    			alert(event.data);
		    			switch(result[0]) {
		    			case "0":
		    				
		    			case "1":
		    				var key = "playerID";
		    		        var data = result[1];
		    		        localStorage.setItem(key, data);
		    		        break;
		    			case "2":
		    				document.message.messages.value += result[1] + "\n";
		    				
		    				break;
		    			case "3":
		    				
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
		if(document.message.usermsg.value == "") {
			
		} else {
			
			var text = "2;" + document.message.usermsg.value;
			document.message.usermsg.value = "";
			webSocket.send(text);
		}
};


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
	 		



