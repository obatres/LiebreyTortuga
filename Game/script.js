let tamanio = 100; 
//usuarios
let user1 = "USUARIO A";
let user2 = "USUARIO B";

//personajes
let pers1 = "conejo";
let pers2 = "tortuga";
//turno
var turno = "jugador1";

// espera en el arbol
var arbol=false;

// ganador
var ganador="";

//dados
let tiro = [];
let dado1 = 0;
let dado2 = 0;
//token para pedir los dados
let token=""
//faltan peticiones
let estrellas = [24,60];
let arboles = [4,50,70,90];
let hoyos = [35,78,10];

// posiciones jugadores

let u1 = 0;
let u2 = 0;
// seccion de peticiones 


function iniciarJuego(){
   //inicia variables de posicion y dados
   u1=1;
   u2=1;
   dado1 = 1;
   dado2 = 1;
   user1 = "USUARIO A";
   user2 = "USUARIO B";
   //coloca la imagen de cada dado
   let imgs = ['dado1.png', 'dado2.png', 'dado3.png', 'dado4.png', 'dado5.png', 'dado6.png'];
   let htmld1 = `<img src="/${imgs[dado1-1]}" width="100%" ></img>`;
   let htmld2 = `<img src="/${imgs[dado2-1]}" width="100%" ></img>`;
   document.getElementById("dado1").innerHTML = htmld1;
   document.getElementById("dado2").innerHTML = htmld2;
   // coloca a cada jugador
   document.getElementById(u1.toString()).appendChild(node);
   document.getElementById(u2.toString()).appendChild(node2);
   document.getElementById("pos1").innerHTML = u1;
   document.getElementById("pos2").innerHTML = u2;
   // coloca nombre de jugadores
   document.getElementById("u1").innerHTML = user1 + "-Jugador 1";
   document.getElementById("u2").innerHTML = user2 + "-Jugador 2";
   // coloca el turno
   document.getElementById("turno").innerHTML = turno;
   // coloca ell tipo de jugador
   document.getElementById("tipo1").innerHTML = pers1;
   document.getElementById("tipo2").innerHTML = pers2;

   document.getElementById("ganador").innerHTML = ganador;
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

   return;
}

function moveconejo(dado1,dado2){
   if (dado1 == dado2){
       switch(dado1){
           case 6:
           case 4:
           case 2:
               return -dado1
           case 1:
               return 0
           default:
               return dado1*2
       }
   }else{
       var suma = dado1 + dado2
       if (suma % 2 == 0) return suma/2
       else return Math.abs(dado1-dado2)
   }
}

function movetortuga(dado1,dado2){
   if (dado1 == dado2){
       if (dado1 > 3) return -dado1
       else return dado1*2
   }else{
       var suma = dado1 + dado2
       if (suma % 2 == 0) return suma
       else{
           if (dado1>dado2) return -dado2
           else return -dado1
       }
   }
}

function moverJugador(tiro1, tiro2){
   var posiciones = 0;
   var pre=0;
   turno = document.getElementById("turno").innerHTML;
   // verifica que sea el turno del jugador 1
   if(turno=="jugador1"){
      // verifica que el personaje que tenga es el conejo
      if(pers1=="conejo"){
         // Realiza los movimientos del conejo
         if(arbol==false){
            posiciones = moveconejo(tiro1,tiro2);
            if(posiciones == 0){
               u1 =1;
            }else{
               pre=u1+(posiciones);
               if(pre<=0){
                  u1=1;
               }else{
                  u1=pre;
               }
            }
         }else{
            posiciones = 0 ;
            u1 =u1+posiciones;
            arbol=false;
            verificarCasillaEspecial(u1+1);
         }
      // verifica que el personaje no sea el conejo
      }else{
         // Reliza los movimientos de la tortuga
         if(arbol==false){
            posiciones = movetortuga(tiro1,tiro2);
            pre=u1+(posiciones);
            if(pre<=0){
               u1=1;
            }else{
               u1=pre;
            }
         }else{
            posiciones = 0;
            u1=u1+posiciones;
            arbol=false;
            verificarCasillaEspecial(u1+1);
         }
      }
      if (u1>=100){
         u1=100;
         ganador="JUGADOR 1 HA GANADO!";
         document.getElementById("ganador").innerHTML=ganador;
         document.getElementById("pos1").innerText = u1;
         document.getElementById(u1.toString()).appendChild(node);
         return;
      }else{

         // Posiciona al jugador
         document.getElementById(u1.toString()).appendChild(node);
         // Actualiza el marcador
         document.getElementById("pos1").innerText = u1;
         verificarCasillaEspecial(u1);
         return;
      }

      // Verificar que sea turno del jugador 2
   }else if(turno=="jugador2"){

      // Verifica que el personaje sea conejo
      if(pers2=="conejo"){
         // Realiza los movimientos de conejo
         if(arbol==false){
            posiciones = moveconejo(tiro1,tiro2);
            if(posiciones == 0){
               u2 =1;
            }else{
               pre=u2+(posiciones);
               if(pre<=0){
                  u2=1;
               }else{
                  u2=pre;
               }
            }
         }else{
            u2=u2+0;
            arbol=false;
            verificarCasillaEspecial(u2+1);
         }

      // Verifica que el personaje sea tortuga   
      }else if(pers2=="tortuga"){
         // Realiza los movimientos de tortuga
         if(arbol==false){
            posiciones = movetortuga(tiro1,tiro2);
            pre=u2+(posiciones);
            if(pre<=0){
               u2=1;
            }else{
               u2=u2+pre;
            }
         }else{
            u2=u2+0;
            arbol=false;
            verificarCasillaEspecial(u2+1);
         }

      }

      if (u2>=100){
         u2=100;
         ganador="JUGADOR 2 HA GANADO!";
         document.getElementById("ganador").innerHTML=ganador;
         document.getElementById("pos2").innerText = u2;
         document.getElementById(u2.toString()).appendChild(node2);
         return;
      }else{
         // posiciona el jugador 2
         document.getElementById(u2.toString()).appendChild(node2);
         // Actualiza el marcador
         document.getElementById("pos2").innerHTML = u2;

         verificarCasillaEspecial(u2);
         return;
      }
   }
}

function verificarCasillaEspecial(posicion){
   turno = document.getElementById("turno").innerHTML;
      // Casilla estrella
      if( posicion == 24 || posicion==60){
         document.getElementById("turno").innerHTML=turno;
         turno=document.getElementById("turno").innerHTML;
         return;

      // Casilla arbol
      }else if(posicion==4 || posicion == 50 || posicion==70 || posicion ==90){
         arbol = true;
         return;
      
      // Casilla hoyo
      }else if(posicion==35 || posicion == 78 || posicion ==10){
         // obtiene los personajes
         pers1 = document.getElementById("tipo1").innerHTML;
         pers2 = document.getElementById("tipo2").innerHTML;

         // Verifica los personajes de los jugadores
         if(pers1=="conejo"){
            console.log("CAMBIO DE TORTUGA A CONEJO JUGADOR 1");
            node2.src="/conejo1.svg";
            node.src="/tortuga2.svg";
            // Actualilza los tipos en la pantalla
            document.getElementById("tipo1").innerHTML="tortuga";
            document.getElementById("tipo2").innerHTML="conejo";
         }else if(pers1=="tortuga"){
            console.log("CAMBIO DE TORTUGA A CONEJO JUGADOR 2");
            node2.src="/tortuga2.svg";
            node.src="/conejo1.svg";
            // Actualilza los tipos en la pantalla
            document.getElementById("tipo1").innerHTML="conejo";
            document.getElementById("tipo2").innerHTML="tortuga";
         }

         // Actualiza las imagenes de los jugadores
         document.getElementById(u1.toString()).appendChild(node);
         document.getElementById(u2.toString()).appendChild(node2);

         if(turno=="jugador1"){
            // Actualiza el turno
            turno = "jugador2";
            // Muestra el turno
            document.getElementById("turno").innerHTML = turno ;
         }else{
            // Actualiza el turno
            turno = "jugador1";
            // Muestra el turno
            document.getElementById("turno").innerHTML = turno ;
         }
         return;
      }else{
         // Casilla normal
         if(turno=="jugador1"){
            // Actualiza el turno
            turno = "jugador2";
            // Muestra el turno
            document.getElementById("turno").innerHTML = turno ;
         }else{
            // Actualiza el turno
            turno = "jugador1";
            // Muestra el turno
            document.getElementById("turno").innerHTML = turno ;
         }
         return;
      }
  
}

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

if (pers1 == "conejo") per1img = "/conejo1.svg";
else per1img = "/tortuga1.svg";

if (pers2 == "tortuga") per2img = "/tortuga2.svg";
else per2img = "/conejo2.svg";

let htmlu1 = `<img  src="${per1img}"  width="50%" id="miimagen"></img>`;
let htmlu2 = `<img  src="${per2img}" id="personaje2" width="50%"></img>`;

//console.log(u1.toString());
var node = document.createElement("img");                 // Create a <li> node

//var textnode = document.createTextNode(`src="${per1img}" width="50%"`);         // Create a text node
node.src = per1img;
node.style.width = "50%";
node.id="personaje1";
//node.appendChild(textnode); 

var node2 = document.createElement("img");                 // Create a <li> node

//var textnode = document.createTextNode(`src="${per1img}" width="50%"`);         // Create a text node
node2.src = per2img;
node2.style.width = "50%";
node2.id="personaje2";


document.getElementById("tipo1").innerHTML = pers1;
document.getElementById("tipo2").innerHTML = pers2;


