/*
 * Javascript fuer den Client.
 */
// TODO: Beschreibung erg�nzen

/*
 * Variablen-Deklaration und -Initialisierung
 */
// TODO: Variablen umbenennen

// Die Farbe f�r Wasser-Felder auf dem Spielbrett (blau)
var wasserFarbe = "rgba(0, 0, 200, 1)";

// Die Farbe f�r Schiff-Felder auf dem Spielbrett (hell-blau)
var schiffsFarbe = "rgba(0, 255, 255, 0.7)";

// L�nge des aktuell angeklickten Schiffes
var schiff = 0;

// Das Array mit den bisher gespeicherten Schiffen. Es werden nur Schiffe in dieses Array �bernommen, 
// wenn sie gesetzt wurden.
var spielfeldarray = new Array (10);
for (var i = 0; i < spielfeldarray.length; i++) {

	spielfeldarray[i] = new Array(0,0,0,0,0,0,0,0,0,0);
	
}

// Das Array, das eine moegliche Schiffsposition beim Bewegen der Maus ueber dem Spielfeld anzeigt.
var clickedArray = new Array (10);
for (var i = 0; i < clickedArray.length; i++) {

	clickedArray[i] = new Array(0,0,0,0,0,0,0,0,0,0);

}

/*
 * Der Event-Listener fuer das Laden der Seite.
 * Die Canvas-Funktion beim Laden der Seite aufrufen.
 */
if(window.addEventListener){

	// Die Canvas-Funktion beim Laden der Seite aufrufen.
	addEventListener("load", spielfeld, false);
	
}

/*
 * Der Event-Listener f�r das Druecken der Strg-Taste.
 */
window.addEventListener('keydown', doKeyDown, true);
function doKeyDown(evt){

	if (evt.keyCode == 17) {
	
		// Wechseln vom horizontalen zum vertikalen Platzieren eines Schiffes oder umgekehrt
		horizontal = !horizontal;
		
	}
	
}

// TODO: Dokumentation
function draw() {

	var canvas = document.getElementById('spielfeld');
	
	// Angabe, ob das Platzieren eines Schiffes horizontal oder
	// vertikal geschehen soll
	var horizontal = false;
	
	// Die aktuellen Mauskoordinaten auf dem Spielfeld.
	var x, y;
        
    /*
	 * Bestimmen der Koordinate der Mausposition auf dem Spielfeld.
	 * Die linke obere Ecke des Spielfeldes hat dabei die Koordinaten 0,0.
	 */
	function getMousePos() {
	
		// Die Summe der Abstaende zum jeweils oberen Rand aller Container.
		var totalOffsetX = 0;
		var totalOffsetY = 0;
			
		// Durchlauf aller Container
	    for (var offsetParent = canvas.offsetParent; offsetParent != null; 
	    		offsetParent = offsetParent.offsetParent) {
	    	
	    	totalOffsetX += offsetParent.offsetLeft;	
			totalOffsetY += offsetParent.offsetTop;
	          
		}
		
		// Speichern der aktuellen Koordinaten
		x = event.pageX - totalOffsetX;
	    y = event.pageY - totalOffsetY;
	    
	}
    
	canvas.onmousemove = function(event) {
    
    	restoreField();
    	
    	getMousePos();

        if(horizontal) {
        
        	horizont();
        	
       	} else {
       	
        	vertikal();

		}
	};
	
    // Wenn die Maus aus dem Canvas heraus geht wird die Funktion restoreField() !!!!!!!11111
    // aufgerufen. Diese Funktion l?scht das Array das gef?llt wird wenn man ?ber das Spielfeld geht und aus dem auch
    // die Informationen f?r das Schiffe zeichenen kommen. MW

    canvas.onmouseout = function() {
    	
    	restoreField();

    }


	/*
	 * Wiederherstellen des gespeicherten Spielfeldes
	 */
    function restoreField() {
    
    	for (var i = 0; i < spielfeldarray.length; i++) {
    	
        	for (var j = 0; j < spielfeldarray.length; j++) {
        	
            	spielfeldarray[i][j] = clickedArray[i][j];
            	
            }
            
        }
        
        spielfeld();
        
	}



        function horizont(){
                 var xkasten = parseInt(x / 30);
                 var ykasten = parseInt(y / 30);
                 // alert(y);
                 if ((xkasten + schiff - 1) < spielfeldarray.length) {

                          for(var i = 0; i < schiff; i++) {
                                  if (spielfeldarray[xkasten+i][ykasten] == 1) {
                                          restoreField();
                                          break;
                                  } else {
                                          spielfeldarray[xkasten+i][ykasten] = 1;
                                  }
                          }
                 }
                 spielfeld();

        }

        function vertikal(){

                 var xkasten = parseInt(x / 30);
                 var ykasten = parseInt(y / 30);
                 if ((ykasten + schiff - 1) < spielfeldarray[0].length) {
                 for(var i = 0; i < schiff; i++) {
                         if (spielfeldarray[xkasten][ykasten + i] == 1) {
                                 restoreField();
                                 break;
                         } else {
                                 spielfeldarray[xkasten][ykasten + i] = 1;
                         }
                 }

                 }
                 spielfeld();

        }





        canvas.onmousedown = function(e){
        //Differenz zwischen Mausposition und Position der Canvas-Fl�che ermitteln
        //damit an der richten Stelle gezeichnet wird


                var totalOffsetX = 0;
          var totalOffsetY = 0;
          for (var aktoffsetParent = canvas.offsetParent; aktoffsetParent != null; aktoffsetParent = aktoffsetParent.offsetParent) {
                 totalOffsetX += aktoffsetParent.offsetLeft;
                 totalOffsetY += aktoffsetParent.offsetTop;
          }

           x = e.pageX - totalOffsetX;
           y = e.pageY - totalOffsetY;
         zeichne();

         }

         function checkClicked(xkasten, ykasten) {
             if (horizontal) {
                for(var i = 0; i < schiff; i++) {
                     if (clickedArray[xkasten + i][ykasten] == 1) {
                             return false;
                     }
                 }
             return true;

             } else {





                            for(var i = 0; i < schiff; i++) {
                     if (clickedArray[xkasten][ykasten + i] == 1) {
                             return false;
                     }
               }
               return true;
             }

         }

        // Malen
       // var active = false;
        //Status der Maustaste abfragen
        //canvas.onmousedown = function(){ active = true; }
        //canvas.onmouseup = function(){ active = false; }

        function zeichne(){

           var xkasten = parseInt(x / 30);
                 var ykasten = parseInt(y / 30);

                 if (horizontal) {

                         if (checkClicked(xkasten, ykasten)) {
                             if ((xkasten + schiff - 1) < spielfeldarray.length) {
                         for(var i = 0; i < schiff; i++) {
                                 spielfeldarray[xkasten + i][ykasten] = 1;
                                 clickedArray[xkasten + i][ykasten] = 1;
                         }
                      }

                         }


                 } else {
                         if (checkClicked(xkasten, ykasten)) {
                                 if ((ykasten + schiff - 1) < spielfeldarray.length) {
                                         for(var i = 0; i < schiff; i++) {
                                                 spielfeldarray[xkasten][ykasten + i] = 1;
                                                 clickedArray[xkasten][ykasten + i] = 1;
                                         }
                                 }
                         }



                 }

                 spielfeld();
                 schiff = 0;

       }//Ende zeichne()
}//Ende

 // ************************************************************************************************************************
 // *************************************************** Spielfeld zeichnen *************************************************
 // ************************************************************************************************************************

function spielfeld() {

var canvas = document.getElementById('spielfeld');

	if(canvas.getContext) {
	
    	canvas = canvas.getContext('2d');
    
    	for(var y = 0; y < 10; y++) {
        
        	for(var x = 0; x < 10; x++) {
            	if (spielfeldarray[x][y] == 0) {
            	
                	canvas.fillStyle = wasserFarbe;
                	canvas.fillRect(x*30, y*30, 29, 29);
             	} else if (spielfeldarray[x][y] == 1) {
                
                	canvas.fillStyle = schiffsFarbe;
                	canvas.fillRect(x*30, y*30, 29, 29);
             	}
        	}
		}
		
   	draw();
   	
 }



    }