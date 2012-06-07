
var name = "Gast";
var webSocket;

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
	// TODO: Der Cursor springt aus dem Textfeld usermsg. Es ist sehr unbequem immer wieder darein zuclicken.
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
						webSocket.send("1;" + name); 
		    		};
		    		
		    		webSocket.onmessage = function( event ) {
		    			document.message.messages.value += event.data + "\n"; 
		   			};
		   		 }
	
};

/**
 * Überprüft eine Nachricht auf ihren Inhalt (darf nicht leer sein oder nur aus leerzeichen bestehen) und sendet sie dem Websocket
 * 
 */
function sendMessage() {
	
		// TODO: Es können noch leere NAchrichten abgeschickt werden. Sofern +1 Leerzeichen geschrieben wird.
		if(document.message.usermsg.value == "") {
			
		} else {
			
			var text = "2;" + document.message.usermsg.value;
			document.message.usermsg.value = "";
			webSocket.send(text);
		}
};

/**
 *  Läd den Usernamen aus dem Clientstorage und speichert ihn in die Variable name
 */
function read() {
	 	var key = "benutzername";
	 	name = localStorage.getItem(key);
	 		};

