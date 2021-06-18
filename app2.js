const express = require('express')//Gerencia requisições de diferentes verbos HTTP
const app = express()
const port = 3000

//Para poder trabalhar com JSON precisamos trabalhar com as duas linhas abaixo  
app.use(express.json())
app.use(express.urlencoded({ extended: true}))  

//Rotas
const atalhoProdutoRota = require('./rotas/produtoRotas')   
const atalhoClienteRota = require('./rotas/clienteRotas')  

//API
app.use('/api/produtos', atalhoProdutoRota)
app.use('/api/clientes', atalhoClienteRota) 

app.listen(port, () => {// escuta as requisições vindas da porta definida
   let data = new Date();
   console.log(`Servidor node iniciado em: ${data.toLocaleString()}`)
})