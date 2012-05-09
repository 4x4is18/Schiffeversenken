/**
 * 
 */
function draw()
var canvas = document.getElementbyId('spielfeld');
if (canvas.getContext) {
	canvas = canvas.getContext("2d");
	canvas.fillStyle = "rgb(0, 0, 200)";
	for(var y = 0; y < 10; y++) {
		for(var x = 0; x < 10; x++) {
			canvas.fillRect(0, 0, 30, 30);
		}
	}
}
