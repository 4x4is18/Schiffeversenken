
       var wasserFarbe = "rgba(0, 0, 200, 1)";
       var schiffsFarbe = "rgba(0, 255, 255, 0.7)";
       var schiff = 2;
       var horizontal = true;







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


        function draw(){
         var canvas = document.getElementById('spielfeld');
        if(canvas.getContext){
        var cx = canvas.getContext('2d');
        }
        // Position des Mauszeigers
        var x, y;
        // Wird kontinuierlich abgefragt




        canvas.onmousemove = function(o) {
        backToClicked();



           x = o.clientX-canvas.offsetLeft;
         y = o.clientY-canvas.offsetTop;
         if (horizontal) horizont();
         else vertikal();

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

        canvas.mouseout = function(e){


        }

        canvas.onmousedown = function(e){
        //Differenz zwischen Mausposition und Position der Canvas-Fläche ermitteln
        //damit an der richten Stelle gezeichnet wird
        x = e.clientX-canvas.offsetLeft;
        y = e.clientY-canvas.offsetTop;
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