/**
 * Dieser Parameter gibt an, auf welchem Server der Websocket läuft <br />
 * 134.106.56.164 oder localhost <br />
 * READ ONLY
 */
//var SERVERIP = "134.106.56.164";
var SERVERIP = "192.168.178.28";

/**
 * Dieser Parameter gibt an, auf welchem Port der Websocket läuft
 * READ ONLY
 */
var PORT = 8080;

/**
 * Initialisiert den Websocket für das Spiel mit der ServerIP und dem Port. <br />
 * Wenn der Websocket geöffnet wird (onopen), wird überprüft ob die UserID oder der UserName im LocalSotrage ist. <br />
 * --- <br />
 * Wenn Nachrichten vom Websocket gesendet werden, wird der String gesplittet und überprüft, zu welchem Case er gehört. <br />
 * CASE 1:		Speichert die UserID in den LocalStorage <br />
 * CASE 2:		Chatnachrichten <br />
 * CASE 3:		Nichts (Da auf Serverseite die drei mit einer anderen Aufgabe belegt ist und auf Clientseite nicht genutzt wird.) <br />
 * CASE 4:		Die Antwort wenn man ein Spiel erstellen will <br />
 * CASE 5:		Die Antwort wenn man einem Spiel beitreten will <br />
 * @see UserIDExists()
 * @see UserNameExists()
 */
function gameWS() {
	
	if ( "WebSocket" in window ) {

		webSocket = new WebSocket( 'ws://' + SERVERIP + ":" + PORT + '/SchiffeVersenken/WebSocket/anything' ); // wo befindet sich der WebSocket
		//webSocket = new WebSocket( 'ws://' + location.host + '/SchiffeVersenken/WebSocket/anything' ); // wo befindet sich der WebSocket

					webSocket.onopen = function( event ) {
						
						/*
						 * Initialisieren des Spiels:
						 * Es werden die Buttons gesetzt sowie die zwei Boards erstellt.
						 * Der mode wird auf PREPARE gesetzt.
						 */ 
						document.getElementById('go').disabled = true;
						document.getElementById('clear').disabled = false;
						
						ownBoard = new Board('ownBoard');
						enemyBoard = new Board('enemyBoard');
						
						mode = PREPARE;
						
						selectedShip = null;
						selectedShipLength = null;
						vertical = true;
						
						// Anzahl der Schüsse
						numShots = 0;
	    		        
						// Die GameID wird aus dem Localstorage gelesen
						var key = "gameID";
	    		        gameID = localStorage.getItem(key);
	    		        
	    		        // Der benutzername wird aus dem Localstorage gelesen
	    		        var key = "benutzername";
	    		        user = localStorage.getItem(key);
						
	    		        // Zeichnen der Boards
						ownBoard.load();
						enemyBoard.load();
						
						
		    		};
		    		/*
		    		 * Der DELIMITER ist in der Game.js zu finden
		    		 * CASE 12: Der Spieler bekommt gesagt, dass er am Zug ist
		    		 * CASE 13: Der eigene Schuss wird vom Websocket empfangen
		    		 * CASE 14: Der gegnerische Schuss wird übermittelt
		    		 * CASE 15: Der Websocket übermittelt, dass das spiel zuende ist, und der Spieler wird in die Lobby weitergeleitet.
		    		 * TODO: Konstanten für die Cases in der Game.js definieren und übertragen
		    		 */
		    		
		    		webSocket.onmessage = function( event ) {
		    			
		    			// alert(event.data);
		    			if(event.data != null) {
		    				var result = event.data.split(DELIMITER);
		    				
		    				if(result[0] == "12") {
		    					// 12 := Spieler aktivieren / er ist am Zug
		    					
		    					mode = ACTION;
			    				//alert("DUUUUU bist dran du Ratte!");
			    				
		    				} else if(result[0] == "13") {
		    					// 13 := Ergebnis vom eigenen Schuss bekommen
		    					
		    					enemyBoard.update(result[1], result[2], result[3]);
		    					
		    				} else if(result[0] == "14") {
		    					// 14 := Ergebnis vom gegnerischen Schuss bekommen
		    					
		    					ownBoard.update(result[1], result[2], result[3]);
		    					
		    				} else if(result[0] == "15") {
		    					// 15 := Spielende
		    					
		    					alert(result[1]);
		    					window.location.replace('lobby.html');
		    				}
		    				
		    			}

		   			};
		   		 }
	
};