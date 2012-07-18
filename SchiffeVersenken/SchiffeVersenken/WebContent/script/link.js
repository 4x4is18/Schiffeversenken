/**
 * Für die Effekte
 */
var effectstatus = 0;
/**
 * Für die Musik
 */
var musicstatus = 0;

function popup (url,width,height) {
 fenster = window.open(url, "Popupfenster", "width=" + width + ",height=" + height + ",resizable=yes");
 fenster.focus();
 return false;
}

/**
 * Steuert das abspielen der Effekte und verändert das Bild im Nav
 */
function effect(image) {
	
	if(effectstatus == 0) {
		
		document.getElementById('effectimage').setAttribute("src", "images/effect-on.png");
		effectstatus = 1;
	} else {
		
		document.getElementById('effectimage').setAttribute("src", "images/effect-off.png");
		effectstatus = 0;
	}
		
};
	
/**
 * Steuert die Musik
 */
	function music(image) {
		
		if(musicstatus == 0) {
			
			document.getElementById('musicimage').setAttribute("src", "images/music-on.png");
			document.getElementById('audiomusic').play();
			musicstatus = 1;

		} else {
			
			document.getElementById('musicimage').setAttribute("src", "images/music-off.png");
			document.getElementById('audiomusic').pause();
			musicstatus = 0;
		
		}
			
};