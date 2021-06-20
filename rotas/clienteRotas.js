//rotas especifica as funcionalidades 
//próximo caminho depois da rotas é os controllers
const express = require('express');
const rota = express.Router();
const clienteController = require('../controller/clienteController' )

rota.get('/', clienteController.listar)
rota.post('/', clienteController.inserir)
rota.get('/search', clienteController.buscarPorUsername)
rota.get('/:id', clienteController.buscarPorId)
rota.put('/:id', clienteController.atualizar)
rota.delete('/:id', clienteController.deletar)
rota.post('/auth',clienteController.validacaoCliente)

module.exports = rota