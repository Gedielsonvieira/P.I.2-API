const con = require('../conexBD/config')
const queryProduto = require("../DataBase/queryProdutos")

exports.listar = (req, res) => {
    con.query(queryProduto.listar, (erro, rows) => {
        if(erro){
            res.status(500).json({"erro": "Database ERROR!"})
            console.log(erro)
        } else{
            res.status(200).json(rows)
        }
    }) 
}

exports.inserir = (req, res) => {
    const prod = req.body;

    con.query(queryProduto.inserir, [prod.nome, prod.preco],
        (erro, rows) => {
            if(erro){
                res.status(500).json({"erro:":"Database Error"})
                console.log(erro)
        } else {
            console.log("Produtos inseridos com sucesso!!")
            prod.id = rows.insertId;
            res.status(201).json(prod)
        }
    })
}

exports.buscarPorId = (req, res) =>{
    const id = req.params.id;//params é utilizado normalmente para identificadores únicos, aquele dado ou objeto em especifico 

    con.query(queryProduto.buscaPorId, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows && rows.length > 0){
                res.status(200).json(rows[0])
            }
            else{ 
                res.status(404).json({"msg":"Produto nao encontrado"})
            }
        }
    })
}

exports.atualizar = (req, res) => {
    const id = req.params.id;//sempre retorna uma string
    const prod = req.body;

    con.query(queryProduto.atualizar, [prod.nome, prod.preco, id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            prod.id = +id; //Sinal de "+" -> converte String para number (ou usar parseInt)
            res.status(200).json(prod);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;//sempre retorna uma string

    con.query(queryProduto.deletar, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            if(rows.affectedRows)
            res.status(200).json({"msg": `Produto ${id} removido com sucesso`});
        }
    })
}