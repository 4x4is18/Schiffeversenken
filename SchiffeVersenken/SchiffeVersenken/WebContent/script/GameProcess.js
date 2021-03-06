/**
 * Dieser Parameter gibt an, auf welchem Server der Websocket l�uft <br />
 * 134.106.56.164 oder localhost <br />
 * READ ONLY
 */
//var SERVERIP = "134.106.56.164";
//var SERVERIP = "192.168.2.139";
var SERVERIP = "192.168.2.240";

/**
 * Dieser Parameter gibt an, auf welchem Port der Websocket l�uft
 * READ ONLY
 */
var PORT = 8080;

/**
 * Initialisiert den Websocket f�r das Spiel mit der ServerIP und dem Port. <br />
 * Wenn der Websocket ge�ffnet wird (onopen), wird �berpr�ft ob die UserID oder der UserName im LocalSotrage ist. <br />
 * --- <br />
 * Wenn Nachrichten vom Websocket gesendet werden, wird der String gesplittet und �berpr�ft, zu welchem Case er geh�rt. <br />
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
						
						// Anzahl der Sch�sse
						numShots = 0;
	    		        
						
	    		        
	    		        // Der benutzername wird aus dem Localstorage gelesen
	    		        var key = "benutzername";
	    		        user = localStorage.getItem(key);
	    		        
	    		        // Der benutzername wird aus dem Localstorage gelesen
	    		        var key = "playerID";
	    		        playerID = localStorage.getItem(key);
	    		        
						document.getElementById('Spielername').innerHTML = user;
						
	    		        // Zeichnen der Boards
						ownBoard.load();
						enemyBoard.load();
						
						// Erstellt einen neuen Spieler f�r das Spiel
						
						webSocket.send("1" + DELIMITER + user);
						
						// Die GameID wird aus dem Localstorage gelesen
						var key = "gameName";
						webSocket.send("5" + DELIMITER + localStorage.getItem(key));
						
						
		    		};
		    		/*
		    		 * Der DELIMITER ist in der Game.js zu finden
		    		 * CASE 12: Der Spieler bekommt gesagt, dass er am Zug ist
		    		 * CASE 13: Der eigene Schuss wird vom Websocket empfangen
		    		 * CASE 14: Der gegnerische Schuss wird �bermittelt
		    		 * CASE 15: Der Websocket �bermittelt, dass das spiel zuende ist, und der Spieler wird in die Lobby weitergeleitet.
		    		 * TODO: Konstanten f�r die Cases in der Game.js definieren und �bertragen
		    		 */
		    		
		    		webSocket.onmessage = function( event ) {
		    			
		    			
		    			if(event.data != null) {
		    				var result = event.data.split(DELIMITER);
		    				
		    				if(result[0] == "5") {
		    					// 5 := Der Spieler wurder erfolgreich dem Spiel hinzugefuegt
		    					// Er erhaelt daraufhin die Namen der Gegner uebermittelt.
		    					
		    					showStatusMessage("Setze die Schiffe, und klicke anschliessend auf OK");
		    					document.getElementById('Gegnername').innerHTML = result[1];
		    				}
		    				
		    				if(result[0] == "12") {
		    					// 12 := Spieler aktivieren / er ist am Zug
		    					
		    					// Zu beginn wird einer der beiden Spieler dar�ber informiert, dass er an der Reihe ist.
		    					if (numShots == 0) {
		    						showStatusMessage("Du bist an der Reihe.");
		    					}
		    					
		    					mode = ACTION;
			    				
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
		    					
		    					
		    				} else if(result[0] == "16") {
		    					//TODO: 16 tritt nie auf?
		    					// 16 := Wenn ein Client dem Spiel beitritt, erhaelt er den Namen des neuen Gegners uebermittelt.
		    					document.getElementById('Gegnername').innerHTML = result[1];
		    					showStatusMessage(result[1] + " ist dem Spiel beigetreten.");
		    					// Aktivieren des Go- Buttons des Spielerstellers, sobald ein zweiter Spieler dem Spiel beitritt
		    					document.getElementById('go').disabled = false;
		    					
		    				}
		    				
		    				
		    			}

		   			};
		   		 }
				
	
};