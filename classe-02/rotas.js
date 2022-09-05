const express = require('express');
const votacao = require('./controladores/obter-voto');

const rotas = express();

rotas.post('/votacao/:pais/:ip', votacao.obterVoto);
rotas.get('/votacao', votacao.listarVotos);

module.exports = rotas;