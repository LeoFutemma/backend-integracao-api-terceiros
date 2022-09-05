const express = require('express');
const empresas = require('./controladores/obter-empresa');

const rotas = express();

rotas.get('/empresas/:dominioEmpresa', empresas.obterEmpresa);

module.exports = rotas;