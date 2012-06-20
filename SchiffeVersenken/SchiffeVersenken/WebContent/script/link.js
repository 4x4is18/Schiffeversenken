function popup (url,width,height) {
 fenster = window.open(url, "Popupfenster", "width=" + width + ",height=" + height + ",resizable=yes");
 fenster.focus();
 return false;
}