
/**
 * Initialisiert den Websocket.
 * Bei einer neuen Nachticht die vom Websocket gesendet wird, wird die Value der Textarea um eine Zeile erweitert 
 */
function gameWS() {
	
	if ( "WebSocket" in window ) {
		
		webSocket = new WebSocket( 'ws://localhost:8080/SchiffeVersenken/WebSocket/anything' ); // wo befindet sich der WebSocket

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
						//alert(gameID);
						
						ownBoard.load();
						enemyBoard.load();
						
						
		    		};
		    		
		    		webSocket.onmessage = function( event ) {
		    			
		    			alert(event.data);
		    		
		    			if(event.data != null) {
		    				
		    				var result = event.data.split(":");
		    				
		    				enemyBoard.update(result[0], result[1], result[2]);
		    				ownBoard.update(result[3], result[4], result[5]);
		    				
		    			}
		    			
		    			mode = ACTION;

		   			};
		   		 }
	
};