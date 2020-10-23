let tamanio = 0; 
//usuarios
let user1 = "";
let user2 = "";

//personajes
let pers1 = "";
let pers2 = "";
//turno
let turno = "";

//dados
let tiro = [];
let dado1 = 0;
let dado2 = 0;
//token para pedir los dados
let token=""
//faltan peticiones
let estrellas = [24,10];
let arboles = [5, 32];
let hoyos = [22];

// posiciones jugadores

let u1 = 0;
let u2 = 0;
// seccion de peticiones 

//tamaño tablero
jQuery.ajax({
   url: 'http://34.122.16.223/web/index.php/service/tam' ,
   success: function (result) {
     //  alert(result);
       tamanio = result;
   },
   async: false
});

jQuery.ajax({
   url: 'http://34.122.16.223/web/index.php/service/jugadores' ,
   success: function (result) {
       //tamanio = result;
     //  console.log(result[0]);
     user1 = result[0];
     user2 = result[1];
   },
   async: false
});

jQuery.ajax({
   url: 'http://34.122.16.223/web/index.php/service/personajes' ,
   success: function (result) {
       //tamanio = result;
     //  console.log(result[0]);
     pers1 = result[0];
     pers2 = result[1];
   },
   async: false
});

jQuery.ajax({
   url: 'http://34.122.16.223/web/index.php/service/turno' ,
   success: function (result) {
     //  alert(result);
       turno = result;
   },
   async: false
});

function iniciarJuego(){
   //inicia variables de posicion y dados
   u1=1;
   u2=1;
   dado1 = 1;
   dado2 = 1;
   //coloca la imagen de cada dado
   let imgs = ['dado1.png', 'dado2.png', 'dado3.png', 'dado4.png', 'dado5.png', 'dado6.png'];
   let htmld1 = `<img src="/${imgs[dado1-1]}" width="100%" ></img>`;
   let htmld2 = `<img src="/${imgs[dado2-1]}" width="100%" ></img>`;
   document.getElementById("dado1").innerHTML = htmld1;
   document.getElementById("dado2").innerHTML = htmld2;
   // coloca a cada jugador
   document.getElementById(u1.toString()).appendChild(node);
   document.getElementById(u2.toString()).appendChild(node2);
}

function empiezaJuego(){
   
}

//funcion para obtener un nuevo token
function getToken(){
   //obtener token
   jQuery.ajax({
      url: 'http://35.225.47.35:5001/token?id=Dados&secret=DadosSecret' ,
      type:  'POST',
      success: function (result) {

        token = result.jwt;
      },
      async: false
   });
   tirarDados(token)
}

//Tirar dados
function tirarDados(tokenpass){
   //dados
   jQuery.ajax({
      url: 'http://35.225.47.35:5002/tirar/2' ,
      headers: {
         "Authorization": "Bearer " + tokenpass
      },
      success: function (result) {
      //  actualiza el valor de cada dado
      tiro1 = parseInt(result.dados[0]);
      tiro2 = parseInt(result.dados[1]);
      dado1 = tiro1;
      dado2 = tiro2;
      },
      async: false
   });

   //se actualiza la imagen de cada dado
   let imgs = ['dado1.png', 'dado2.png', 'dado3.png', 'dado4.png', 'dado5.png', 'dado6.png'];

   let htmld1 = `<img src="/${imgs[dado1-1]}" width="100%" ></img>`;
   let htmld2 = `<img src="/${imgs[dado2-1]}" width="100%" ></img>`;

   document.getElementById("dado1").innerHTML = htmld1;
   document.getElementById("dado2").innerHTML = htmld2;

   //Se mueve el jugador
   moverJugador(tiro1,tiro2);
}

function moverJugador(tiro1, tiro2){
   console.log("el u1 va en: ",u1);
   u1=u1+(tiro1+tiro2);
   document.getElementById(u1.toString()).appendChild(node);
   document.getElementById(u2.toString(10)).appendChild(node2);
   console.log("ahora va en: ",u1);
}


jQuery.ajax({
   url: 'http://34.122.16.223/web/index.php/service/posiciones' ,
   success: function (result) {
       //tamanio = result;
     //  console.log(result[0]);
     u1 = result[0];
     u2 = result[1];
   },
   async: false
});


// se arma tablero con id en posicion en forma se serpiente
let id = 1;

let rows = tamanio/10;

let tablero = "<table>";

for (let index = 0; index < rows; index++) {

   if(index % 2 == 0) {
   tablero += `<tr>
   <td class="noPieceHere" id="${id++}"></td>
   <td class="" id="${id++}"></td>
   <td class="noPieceHere" id="${id++}"></td>
   <td class="" id="${id++}"></td>
   <td class="noPieceHere" id="${id++}"></td>
   <td class="" id="${id++}"></td>
   <td class="noPieceHere" id="${id++}"></td>
   <td class="" id="${id++}"></td>
   <td class="noPieceHere" id="${id++}"></td>
   <td class="" id="${id++}"></td>
</tr>`;

   }else{

      id = id+9;

      tablero += `<tr>
      <td class="" id="${id--}"></td>
      <td class="noPieceHere" id="${id--}"></td>
      <td class="" id="${id--}"></td>
      <td class="noPieceHere" id="${id--}"></td>
      <td class="" id="${id--}"></td>
      <td class="noPieceHere" id="${id--}"></td>
      <td class="" id="${id--}"></td>
      <td class="noPieceHere" id="${id--}"></td>
      <td class="" id="${id--}"></td>
      <td class="noPieceHere" id="${id--}"></td>
   </tr>`;
      id = id+11;
   }

  // id++;
    
}

tablero += "</table>";


document.getElementById("tabla").innerHTML = tablero;

//agregan casillas especiales

arboles.forEach(element => {
   console.log(element);
  // document.getElementById(element.toString()).innerHTML =  `<img src="arbol.svg" width="75%"></img>`;
  let id = "#"+element.toString();
  $(id).css("background-image", "url('/arbol.svg')");
  $(id).css("background-size", "cover");
});

estrellas.forEach(element => {
   console.log(element);
  // document.getElementById(element.toString()).innerHTML =  `<img src="arbol.svg" width="75%"></img>`;
  let id = "#"+element.toString();
  $(id).css("background-image", "url('/estrella.svg')");
  $(id).css("background-size", "cover");
});

hoyos.forEach(element => {
   console.log(element);
  // document.getElementById(element.toString()).innerHTML =  `<img src="arbol.svg" width="75%"></img>`;
  let id = "#"+element.toString();
  $(id).css("background-image", "url('/hoyo.svg')");
  $(id).css("background-size", "cover");
});

//agrega casilla de fin

let fin = "#"+tamanio.toString();
$(fin).css("background-image", "url('/finish.svg')");
$(fin).css("background-size", "cover");





//se pintan personajes y posicion

let per1img = "";
let per2img = "";

if (pers1 == "c") per1img = "/conejo1.svg";
else per1img = "/tortuga1.svg";

if (pers2 == "t") per2img = "/tortuga2.svg";
else per2img = "/conejo2.svg";

let htmlu1 = `<img src="${per1img}" width="50%"></img>`;
let htmlu2 = `<img src="${per2img}" width="50%"></img>`;

//console.log(u1.toString());
var node = document.createElement("img");                 // Create a <li> node
//var textnode = document.createTextNode(`src="${per1img}" width="50%"`);         // Create a text node
node.src = per1img;
node.style.width = "50%";
//node.appendChild(textnode); 

var node2 = document.createElement("img");                 // Create a <li> node
//var textnode = document.createTextNode(`src="${per1img}" width="50%"`);         // Create a text node
node2.src = per2img;
node2.style.width = "50%";



document.getElementById(u1.toString()).appendChild(node);
document.getElementById(u2.toString()).appendChild(node2);

//se pinta usuarios y turno

if(turno == user1)
document.getElementById("u1").innerHTML = user1 + " - turno";
else 
document.getElementById("u1").innerHTML = user1;


if(turno == user2)
document.getElementById("u2").innerHTML = user2  + " - turno";
else
document.getElementById("u2").innerHTML = user2;

//document.getElementById("tiro").innerHTML ="<h1>"+token+"</h1>";





//console.log(tablero);