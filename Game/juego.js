'use strict';
const express = require('express')
const app = express()
const port = 3001
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.json())
app.use(express.static('./'));
var publicKEY  = fs.readFileSync('./publica.pem', 'utf8');

var iptorneos = 'localhost:3001'
var sendtoken = 'token'
var verifyOptions = {
  algorithm:  ["RS256"]
 };

app.get('/', (req, res) => {
  
  
})

app.get('/juego/:ide', function (req, res) {
  res.sendFile('index.html', { root: "./" }); //Render el html para que se conecte al socket
});

app.post('/simular/',function(req,res){
  var token = req.headers['authorization']
    if(!token){
        newlog('Error al recibir token')
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }
    token = token.replace('Bearer ', '')
    
    jwt.verify(token, publicKEY, verifyOptions, function(err, user) {
        if (err) {
            console.log(err)
            newlog('Error token vencido')
            res.status(401).send({error: "Token vencido"})
            return
        }
        var partida = req.body.id
        var fingame = simularjuego()
        var enviar = {
          id: partida,
          marcador: [fingame[0].pos,fingame[1].pos]
        }
		
		var url = 'http://'+iptorneos+'/partidas/'+partida
		const options = {
			url: url,
			method: 'PUT',
			headers: {'Authorization' : 'Bearer '+sendtoken},
			json: enviar,
		}
		request.put(options)
		
        res.status(201).send(enviar)
    });
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function verificarToken(token){
  if(jwt.verify(token, publicKEY, verifyOptions)){
    return true;
  }else{
    return false;
  }
}



//Funciones para simular la partida

function simularjuego(){
  console.log("Simulando partida")
  var simj1 = {pos: 0,tipo: 1,mov: 0,casilla: ""}
  var simj2 = {pos: 0,tipo: 2,mov: 0,casilla: ""}
  var mov = 0
  var finpartida = true
  var turnos = 1
  while(finpartida){
          //Simular jugador 1
          if(simj1.casilla == "estrella") turnos = 2
          else if(simj1.casilla == "arbol") turnos = 0
          else if(simj1.casilla == "hoyo"){
              if (simj1.tipo == 1) simj1.tipo = 2
              else simj1.tipo = 1
              console.log("Jugador 1 cambió de personaje")
              turnos = 1
          }else{turnos = 1}
          simj1.casilla = ""
          while (turnos>0){
              if (simj1.tipo == 1) simj1.mov = moveconejo(simulardado(),simulardado())
              else simj1.mov = movetortuga(simulardado(),simulardado())
              if (simj1.mov == 0) simj1.pos = 0
              mov = simj1.pos + simj1.mov
              console.log("Turno Jugador 1: Se mueve "+simj1.mov+" casillas")
              if (mov < 0) simj1.pos = 0
              else if(mov >= 100){
                  console.log("Jugador 1 es el ganador de la partida ")
                  simj1.pos = 100
                  finpartida = false
              }else simj1.pos = mov
              simj1.casilla = simularcasillaespecial(simj1.pos)
              console.log("Jugador 1 en posicion: "+simj1.pos)
              turnos = turnos - 1 
          }
          

          //Simular jugador 2
          if(simj2.casilla == "estrella") turnos = 2
          else if(simj2.casilla == "arbol") turnos = 0
          else if(simj2.casilla == "hoyo"){
              if (simj2.tipo == 1) simj2.tipo = 2
              else simj2.tipo = 1
              console.log("Jugador 2 cambió de personaje")
              turnos = 1
          }else{turnos = 1}
          simj2.casilla = ""
          while (turnos>0 && finpartida){
              if (simj2.tipo == 1) simj2.mov = moveconejo(simulardado(),simulardado())
              else simj2.mov = movetortuga(simulardado(),simulardado())
              if (simj2.mov == 0) simj2.pos = 0
              mov = simj2.pos + simj2.mov
              console.log("Turno Jugador 2: Se mueve "+simj2.mov+" casillas")
              if (mov < 0) simj2.pos = 0
              else if(mov >= 100){
                  console.log("Jugador 2 es el ganador de la partida")
                  finpartida = false
                  simj2.pos = 100
              }else simj2.pos = mov
              simj2.casilla = simularcasillaespecial(simj2.pos)
              console.log("Jugador 2 en posicion: "+simj2.pos)
              turnos = turnos - 1 
          }
          
  }
  return([simj1,simj2])

}

function simulardado() {return Math.floor(Math.random() * (7 - 1) + 1);}

function simularcasillaespecial(posicion){
  //Casilla estrella 
  if( posicion == 24 || posicion==60) return "estrella";
  //Casilla arbol
  if(posicion==4 || posicion == 50 || posicion==70 || posicion ==90) return "arbol"
  //Casilla hoyo
  if(posicion==35 || posicion == 78 || posicion ==10) return "hoyo"
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
//----------------------------- FIN SIMULAR PARTIDAS-----------------------------------


module.exports = {
  server: server,
  sdado: simulardado,
  scasilla: simularcasillaespecial
};