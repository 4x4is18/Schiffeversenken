   // Die Canvas-Funktion beim Laden der Seite aufrufen
                         if(window.addEventListener){
                         addEventListener("load", spielfeld, false);
                         }


        function draw(){
         var canvas = document.getElementById('spielfeld');
        if(canvas.getContext){
        var cx = canvas.getContext('2d');
        }
        // Position des Mauszeigers
        var x, y;
        // Wird kontinuierlich abgefragt
        canvas.onmousemove = function(e){
        //Differenz zwischen Mausposition und Position der Canvas-Fläche ermitteln
        //damit an der richten Stelle gezeichnet wird
        x = e.clientX-canvas.offsetLeft;
        y = e.clientY-canvas.offsetTop;
        zeichne();
}

        // Malen
        var active = false;
        //Status der Maustaste abfragen
        canvas.onmousedown = function(){ active = true; }
        canvas.onmouseup = function(){ active = false; }

        function zeichne(){
        //Wenn Maustaste gedrückt kleines
                if(active){
                        cx.fillStyle = "rgba(255, 0, 0, 1)";
                        cx.fillRect(x, y, 1, 1);
                        }
                }//Ende zeichne()
}//Ende











                            // Initialisiert das Spielfeld
                          function spielfeld() {

                          var canvas = document.getElementById('spielfeld');
                          if (canvas.getContext) {
                                 canvas = canvas.getContext('2d');
                                 canvas.fillStyle = "rgb(0, 0, 200)";
                                 for(var y = 0; y < 10; y++) {
                                     for(var x = 0; x < 10; x++) {
                                        canvas.fillRect(x*30, y*30, 29, 29);
                                }
                        }
                           draw();

                     }




        }
