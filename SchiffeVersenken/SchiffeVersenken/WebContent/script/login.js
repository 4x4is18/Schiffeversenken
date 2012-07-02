/**
 * Diese Funktion �berpr�ft den Benutzernamen auf Richtigkeit. Es d�rfen keine Leerzeichen im Namen vorkommen. 
 */
function onload() {
	window.addEventListener('keydown',doKeyDown,true);
};


function store() {

		 
	// Hier steht der Benutzername drin.
	 var data =  document.getElementById('username').value.split(" ");	 
	 
	 // Sobald es ein Leerzeichen im Namen gibt ist die L�nge des Arrays >= 2
	if(data.length >= 2) {
		
		alert("Dein Benutzername darf keine Leerzeichen enthalten");
	
	// Wenn nichts eingegeben wurde, ist die L�nge des Arrays 1. Dann wird �berpr�ft ob dieses ein Leerzeichen ist
	} else if(data[0] == "") {
	
		alert("Bitte gebe einen Benutzernamen an!");
	
	// Wenn alles klappt dann wird der Benutzer an die Lobby weitergeleitet.
	} else {
		
		var key = "benutzername";
        localStorage.setItem(key, data[0]);
        
        var key = "playerID";
        var data = "";
        localStorage.setItem(key, data);
        window.location.replace('lobby.html');
        
	}
		
};

function doKeyDown(evt){
	
	if(evt.keyCode == 13) {
		
		store();

	}
	
};



/* �ber diese Funktion kann auf JEDER Seite die Variable abgerufen werden.
 * function read() {
 *		var key = "benutzername";
 *		document.getElementById('data').value = localStorage.getItem(key);
 *		}
*/

