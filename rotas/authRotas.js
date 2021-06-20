const express = require('express');
const rota = express.Router();
const clienteController = require('../controller/clienteController' )

rota.post('/', clienteController.validacaoCliente);

module.exports = rota