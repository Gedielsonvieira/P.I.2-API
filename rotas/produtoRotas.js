const express = require('express');
const rota = express.Router();
const produtoController = require('../controller/produtoController' )

rota.get('/', produtoController.listar)
rota.post('/', produtoController.inserir)
rota.get('/:id', produtoController.buscarPorId)
rota.put('/:id', produtoController.atualizar)
rota.delete('/:id', produtoController.deletar)

module.exports = rota