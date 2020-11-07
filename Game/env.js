"use strict";
const env = {
  ENDPOINT_USER: process.env.ENDPOINT_USER || "http://34.67.137.28:3002",
  ENDPOINT_TORNEOS: process.env.ENDPOINT_TORNEOS || "http://34.67.137.28:3000",
  ENDPOINT_TOKENS: process.env.ENDPOINT_TOKENS || "http://35.225.47.35:5001",
  ENDPOINT_DADOS: process.env.ENDPOINT_DADOS || "http://35.225.47.35:5002",

  ID_USER: process.env.ID_USER || "Usuarios",
  SECRET_USER: process.env.SECRET_USER || "UsuariosSecret",
  ID_TORNEOS: process.env.ID_TORNEOS || "Torneo",
  SECRET_TORNEOS: process.env.SECRET_TORNEOS || "TorneoSecret",
  ID_DADOS: process.env.ID_DADOS || "Dados",
  SECRET_DADOS: process.env.SECRET_DADOS || "DadosSecret",
  ID_JUEGO: process.env.ID_JUEGO || "Juego",
  SECRET_JUEGOS: process.env.SECRET_JUEGOS || "JuegoSecret",
};

module.exports.env = env;