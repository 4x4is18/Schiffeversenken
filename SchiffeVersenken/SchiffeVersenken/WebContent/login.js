

/*
 * 
 */
function store() {
		
	
	
		var key = "benutzername";
        var data = document.formular.user.value;
        localStorage.setItem(key, data);
        
        var key = "playerID";
        var data = "";
        localStorage.setItem(key, data);
        

        
      }

/* Über diese Funktion kann auf JEDER Seite die Variable abgerufen werden.
 * function read() {
 *		var key = "benutzername";
 *		document.getElementById('data').value = localStorage.getItem(key);
 *		}
*/

