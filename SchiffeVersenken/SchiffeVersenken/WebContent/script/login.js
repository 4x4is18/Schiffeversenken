

/*
 * 
 */
function store() {
		
		var key = "benutzername";
        var data =  document.getElementById('username').value;
        localStorage.setItem(key, data);
        
        var key = "playerID";
        var data = "";
        localStorage.setItem(key, data);
        window.location.replace('lobby.html');
      };

/* Über diese Funktion kann auf JEDER Seite die Variable abgerufen werden.
 * function read() {
 *		var key = "benutzername";
 *		document.getElementById('data').value = localStorage.getItem(key);
 *		}
*/

