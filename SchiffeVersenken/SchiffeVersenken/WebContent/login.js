/*
 * Die Funktion wird aufgerufen sobald das Script abgeschickt wurde. Es ist ein ClientStorage.
 * http://www.phpgangsta.de/html-5-und-javascript-5-clientseitige-datenbanken
 */
function store() {
        var key = "benutzername";
        var data = document.formular.user.value;
        localStorage.setItem(key, data);
      }

/* Über diese Funktion kann auf JEDER Seite die Variable abgerufen werden.
 * function read() {
 *		var key = "benutzername";
 *		document.getElementById('data').value = localStorage.getItem(key);
 *		}
*/

