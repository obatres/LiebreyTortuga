'use strict';

const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

const jwt = require('jsonwebtoken');
app.use(express.static('./'));
var publicKEY  = fs.readFileSync('./publica.pem', 'utf8');

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImV4cCI6MTYwMzQzMjI2NSwic2NvcGUiOlsiZGFkb3MudGlyYXIiXX0.WXjJA_4W_FjWuVbgOaSr_xMmTvDijcmYocrkkH2YkoPvMdMQbAgzXqwK4ksUsN8mu1vbAwyqwyfleRBsqpf5LkPCRyLkz-bXCnT1ksEJSgtE9IeeXOkn6Apk0I8G4u5TiQFePCb35h2PrUPUmtkKzzTxxpC-a9zx6XTRT9yQFSKz8CLoMnAIMHBwD383HFKPNy-t-Q3YghVHRVtGcxSX3w6w2THbsQnACBuKjyPQIsTSH7kI7DxivLDhotap1TFwrR8a5R_K0ehhJwAAvlBB5KmJn7rKW-qOz24c5TvvBFSc-BHQTdSkK9nnSEKvlW25wU-FaFTySkxEY093zn9pfA'
var verifyOptions = {
    algorithm:  ["RS256"]
   };
var legit = jwt.verify(token, publicKEY, verifyOptions);
   

console.log("\nJWT verification result: " + legit);

app.get('/', (req, res) => {
  res.send(legit)
})

app.get('/juego/:ide', function (req, res) {

    res.sendFile('index.html', { root: "./" }); //Render el html para que se conecte al socket
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
