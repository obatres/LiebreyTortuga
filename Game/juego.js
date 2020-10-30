'use strict';
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const jwt = require('jsonwebtoken');
app.use(express.static('./'));
var publicKEY  = fs.readFileSync('./publica.pem', 'utf8');

var verifyOptions = {
  algorithm:  ["RS256"]
 };

app.get('/', (req, res) => {
  
  
})

app.get('/juego/:ide', function (req, res) {

    res.sendFile('index.html', { root: "./" }); //Render el html para que se conecte al socket
 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function verificarToken(token){

  if(jwt.verify(token, publicKEY, verifyOptions)){
    return true;
  }else{
    return false;
  }
 
}
