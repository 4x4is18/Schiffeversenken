
       var wasserFarbe = "rgba(0, 0, 200, 1)";
       var schiffsFarbe = "rgba(0, 255, 255, 0.7)";
<<<<<<< .mine
       var schiff;
=======
       var schiff = 0;
>>>>>>> .r33
       var horizontal = true;
       var x, y;







       var spielfeldarray = new Array (10);
       for (var i = 0; i < spielfeldarray.length; i++)
                 spielfeldarray[i] = new Array(0,0,0,0,0,0,0,0,0,0);


       var clickedArray = new Array (10);
       for (var i = 0; i < clickedArray.length; i++)
                 clickedArray[i] = new Array(0,0,0,0,0,0,0,0,0,0);





   // Die Canvas-Funktion beim Laden der Seite aufrufen
        if(window.addEventListener){
                 addEventListener("load", spielfeld, false);
        }

        window.addEventListener('keydown',doKeyDown,true);
        function doKeyDown(evt){
                 if (evt.keyCode == 17) horizontal = !horizontal;

        }

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




        function draw(){
         var canvas = document.getElementById('spielfeld');
        if(canvas.getContext){
        var cx = canvas.getContext('2d');
        }
        // Position des Mauszeigers

        // Wird kontinuierlich abgefragt




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


                            // Initialisiert das Spielfeld
                          function spielfeld() {

                          var canvas = document.getElementById('spielfeld');

                          if (canvas.getContext) {
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
    
    
    // Initialisiert das Spielfeld des Gegners (Einfach ein leeres Spielfeld)
                          function spielfeld_Gegner() {

                          var canvas = document.getElementById('spielfeld_Gegner');

                          if (canvas.getContext) {
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