  var wasserFarbe = "rgba(0, 0, 200, 1)";
  var schiffsFarbe = "rgba(0, 255, 255, 0.7)";
  var schiff = 0;
  var horizontal = false;
  var x, y;
  var gesetzteschiffe;
  var pregame = true;
  var spielfeldarray = new Array (10);
  var clickedArray = new Array (10);
 // KOMMENTARE !!!!       MW
 // KOMMENTARE !!!!       MW
 // KOMMENTARE !!!!       MW
 // KOMMENTARE !!!!       MW
 // KOMMENTARE !!!!       MW

<<<<<<< .mine
=======
       var wasserFarbe = "rgba(0, 0, 200, 1)";
       var schiffsFarbe = "rgba(0, 255, 255, 0.7)";
<<<<<<< .mine
       var schiff;
=======
       var schiff = 0;
>>>>>>> .r33
       var horizontal = true;
       var x, y;
>>>>>>> .r38


 // Dieses Array hift beim zeichnen der Schiffe bevor sie gesetzt werden. Falls die Maus aus dem Canvas heraus geht
 // oder ein schon gesetztes Schiff im Weg ist werden alle Werte des Array durch die Funktion backToClicked(); wieder
 // auf 0 gesetzt und somit kein Schiff mehr gezeichnet.
 // Ich würde BackToTheRoot() besser finden. Oder Atombombe oder so. MW

   for (var i = 0; i < spielfeldarray.length; i++) {
         spielfeldarray[i] = new Array(0,0,0,0,0,0,0,0,0,0);
   }
       // Wenn ein Schiff gesetzt wurde wird es in diesem Array eingetragen.

   for (var i = 0; i < clickedArray.length; i++)
         clickedArray[i] = new Array(0,0,0,0,0,0,0,0,0,0);

 // ************************************************************************************************************************
 // *************************************************** EventListener ******************************************************
 // ************************************************************************************************************************

   // Die Canvas-Funktion beim Laden der Seite aufrufen.
        if(window.addEventListener){
                 addEventListener("load", spielfeld, false);
        }
        
   // Die Canvas-Funktion für das gegnerische Spielfeld beim Laden der Seite aufrufen
        if(window.addEventListener){
                 addEventListener("load", spielfeldGegner, false);
        }

        // Der Eventlistener setzt wenn die Crtl(keycode == 17) Taste gedrückt wird die Variable horizontal auf True/False
        // Damit kann zwischen einer horizontalen und einer vertikalen Schiffspositionierung gewechselt werden. MW
        window.addEventListener('keydown',doKeyDown,true);
        function doKeyDown(evt){
                 if (evt.keyCode == 17) horizontal = !horizontal;

        }
 // ************************************************************************************************************************
 // *************************************************** Mauspositon bestimmen  *********************************************
 // ************************************************************************************************************************


        function getMousePosY() {
          var totalOffsetY = 0;
          for (var aktoffsetParent = canvas.offsetParent; aktoffsetParent != null; aktoffsetParent = aktoffsetParent.offsetParent) {
                 totalOffsetY += aktoffsetParent.offsetTop;
          }
           y = event.pageY - totalOffsetY;
           return y;
        }


        function getMousePosX() {
         var totalOffsetX = 0;
          for (var aktoffsetParent = canvas.offsetParent; aktoffsetParent != null; aktoffsetParent = aktoffsetParent.offsetParent) {
                 totalOffsetX += aktoffsetParent.offsetLeft;
          }
           x = event.pageX - totalOffsetX;
           return x;
        }

// ************************************************************************************************************************
// *************************************************** Schiffe platzieren  ************************************************
// ************************************************************************************************************************


function draw(){

         var canvas = document.getElementById('spielfeld');
         if(canvas.getContext){
                 // Die Variable wird nicht genutzt wir schreiben alles auf dem Canvas Element wieso ? MW
                 var cx = canvas.getContext('2d');
         }
        // Position des Mauszeigers

        // Wird kontinuierlich abgefragt



         // Dieses Funktion wird ausgeführt wenn die Maus bewegt wird. Dabei wird die Position der Maus bestimmt.
         // Wenn ein Schiff (Variable Schiff) ausgewählt wurde, wird geguckt ob das Schiff veritkal oder horizontal
         // positioniert werden soll. MW
<<<<<<< .mine
        canvas.onmousemove = function(e) {
        backToClicked();
=======
        canvas.onmousemove = function(event) {
          backToClicked();
          var totalOffsetX = 0;
          var totalOffsetY = 0;
          for (var aktoffsetParent = canvas.offsetParent; aktoffsetParent != null; aktoffsetParent = aktoffsetParent.offsetParent) {
                 totalOffsetX += aktoffsetParent.offsetLeft;
                 totalOffsetY += aktoffsetParent.offsetTop;
          }
>>>>>>> .r33

		var totalOffsetX;
		var totalOffsetY;
		do {
	        totalOffsetX += currentElement.offsetLeft;
	        totalOffsetY += currentElement.offsetTop;
	   }
	   while(currentElement == currentElement.offsetParent)

x = e.pageX - totalOffsetX;
    y = e.pageY - totalOffsetY;
    alert(x);


<<<<<<< .mine
         if (horizontal) horizont();
         else vertikal();
=======
           x = event.pageX - totalOffsetX;
           y = event.pageY - totalOffsetY;


>>>>>>> .r33

           if (horizontal)
                   horizont();
           else
                   vertikal();

          }

          // Wenn die Maus aus dem Canvas heraus geht wird die Funktion backToClicked() !!!!!!!11111
          // aufgerufen. Diese Funktion löscht das Array das gefüllt wird wenn man über das Spielfeld geht und aus dem auch
          // die Informationen für das Schiffe zeichenen kommen. MW
          canvas.onmouseout = function() {
          backToClicked();

        }


        function backToClicked(){
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
                                          backToClicked();
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
                                 backToClicked();
                                 break;
                         } else {
                                 spielfeldarray[xkasten][ykasten + i] = 1;
                         }
                 }

                 }
                 spielfeld();

        }





        canvas.onmousedown = function(e){
        //Differenz zwischen Mausposition und Position der Canvas-Fläche ermitteln
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
      gesetzeschiffe = 0;
      var canvas = document.getElementById('spielfeld');
      var enemieboard = document.getElementById('enemieboard');

      if (canvas.getContext && enemieboard.getContext) {
             canvas = canvas.getContext('2d');
             enemieboard = enemieboard.getContext('2d');
             for(var y = 0; y < 10; y++) {
                     for(var x = 0; x < 10; x++) {
                             if (spielfeldarray[x][y] == 0) {
                                     canvas.fillStyle = wasserFarbe;
                                     canvas.fillRect(x*30, y*30, 29, 29);
                                          // Hier wird das Gegnerische Spielfeld erzeugt MW
                                     enemieboard.fillStyle = wasserFarbe;
                                     enemieboard.fillRect(x*30, y*30, 29, 29);

                             } else if (spielfeldarray[x][y] == 1) {
                                     canvas.fillStyle = schiffsFarbe;
                                     canvas.fillRect(x*30, y*30, 29, 29);
                                     gesetzeschiffe++;

                             }
                     }
             }

             draw();

      }

<<<<<<< .mine




}


=======
    }
    
    
    // Initialisiert das Spielfeld des Gegners (Einfach ein leeres Spielfeld)
                          function spielfeldGegner() {
                          	
                          var canvas2 = document.getElementById('spielfeldGegner');

                          if (canvas2.getContext) {
                                 canvas2 = canvas.getContext('2d');
                                 canvas2.fillStyle = wasserFarbe;
                                 for(var y = 0; y < 10; y++) {
                                     for(var x = 0; x < 10; x++) {
                                        canvas2.fillRect(x*30, y*30, 29, 29);
                                }

                     }
    }
 }>>>>>>> .r38
