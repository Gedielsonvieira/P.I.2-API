const express = require('express')//Gerencia requisições de diferentes verbos HTTP
const app = express()
const port = 3000
const clienteController = require('./controller/clienteController')

//Para poder trabalhar com JSON precisamos trabalhar com as duas linhas abaixo  
app.use(express.json())
app.use(express.urlencoded({ extended: true}))  

let count = 1;
app.use((req, res, next) => {
   console.log(`Passando pelo Middleware ${count++}`);
   next();
})

//Rota para verificação do login
const authRota = require('./rotas/authRotas')
app.use('/api/login', authRota)

//Middleware pega abaixo
app.use(clienteController.validacaoToken)

//aplicação principal, mapeação das rotas
//Rotas produto
const atalhoProdutoRota = require('./rotas/produtoRotas') 
app.use('/api/produtos', atalhoProdutoRota)

//Rotas cliente
const atalhoClienteRota = require('./rotas/clienteRotas')  
app.use('/api/clientes', atalhoClienteRota) 



app.listen(port, () => {// escuta as requisições vindas da porta definida
   let data = new Date();
   console.log(`Servidor node iniciado em: ${data.toLocaleString()}`)
})