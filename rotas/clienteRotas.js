const express = require('express');
const rota = express.Router();
const clienteController = require('../controller/clienteController' )

rota.get('/', clienteController.listar)
rota.post('/', clienteController.inserir)
rota.get('/busca', clienteController.buscarPorUsername)
rota.get('/:id', clienteController.buscarPorId)
rota.put('/:id', clienteController.atualizar)
rota.delete('/:id', clienteController.deletar)

module.exports = rota