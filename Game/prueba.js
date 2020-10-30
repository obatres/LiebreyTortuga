var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const Http = new XMLHttpRequest();


Http.open("POST", "http://35.225.47.35:5001/token?id=Juego&secret=JuegoSecret");
Http.send();

console.log(Http.responseText);
window.print(Http.responseText);