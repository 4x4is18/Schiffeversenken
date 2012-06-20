/**
 * Dieser Parameter gibt an, auf welchem Server der Websocket läuft
 * 134.106.56.164 oder localhost
 * READ ONLY
 */
//var SERVERIP = "134.106.56.164"; //TODO
var SERVERIP = "localhost";

/**
 * Dieser Parameter gibt an, auf welchem Port der Websocket läuft
 * READ ONLY
 */
var PORT = 8080;

/**
 * Initialisiert den Websocket.
 * Bei einer neuen Nachticht die vom Websocket gesendet wird, wird die Value der Textarea um eine Zeile erweitert 
 */
function gameWS() {
	
	if ( "WebSocket" in window ) {
		/**
		 * Der DELIMITER ist in der Game.js zufinden
		 */
		webSocket = new WebSocket( 'ws://' + location.host + '/SchiffeVersenken/WebSocket/anything' ); // wo befindet sich der WebSocket

					webSocket.onopen = function( event ) {
						
						document.getElementById('go').disabled = true;
						document.getElementById('clear').disabled = false;
						
						ownBoard = new Board('ownBoard');
						enemyBoard = new Board('enemyBoard');
						
						mode = PREPARE;
						
						selectedShip = null;
						selectedShipLength = null;
						vertical = true;
						
						numShots = 0;
	    		        
						var key = "gameID";
	    		        gameID = localStorage.getItem(key);
						
						ownBoard.load();
						enemyBoard.load();
						
						
		    		};
		    		
		    		webSocket.onmessage = function( event ) {
		    			alert(event.data);
		    			if(event.data != null) {
		    				var result = event.data.split(DELIMITER);
		    				if (result[0] == "12") {
		    					
		    					mode = ACTION;
			    				alert("DUUUUU bist dran du Ratte!");
			    				
		    				}
		    				
		    				
		    				
		    				//TODO enemyBoard.update(result[0], result[1], result[2]);


		    				
		    				
		    			}
		    			
		    			mode = ACTION;

		   			};
		   		 }
	
};