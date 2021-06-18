//controller tratamento do req, res

const con = require('../conexBD/config')
const queryCliente = require('../DataBase/queryClientes')


exports.listar = (req, res) => {
    con.query(queryCliente.listar, (erro, rows) => {
        if (erro) {
            res.status(500).json({ "erro": "Database ERRO!" })
            console.log(erro)
        } else {
            res.status(200).json(rows)
        }
    })
}

exports.inserir = (req, res) => {
    //Obter o dado do request - nome e o preco
    const cli = req.body;
    con.query(queryCliente.inserir, [cli.nome, cli.email, cli.cpf],//add username,senha
        (erro, rows) => {
            if (erro) {
                res.status(500).json({ "erro:": "Database Error" })
                console.log(erro)
            } else {
                console.log("Cliente inseridos com sucesso!!")
                cli.id = rows.insertId;
                res.status(201).json(cli)
            }
        })
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    con.query(queryCliente.buscaPorId, [id], (erro, rows) => {
        if (erro) {
            res.status(500).json({ "erro:": "Database Error" })
            console.log(erro)
        }
        else {
            if (rows && rows.length > 0) {
                res.status(200).json(rows[0])
            }
            else {
                res.status(404).json({ "msg": "Cliente nao encontrado" })
            }
        }
    })
}

exports.atualizar = (req, res) => {
    const id = req.params.id;//sempre retorna uma string
    const cli = req.body;
    con.query(queryCliente.atualizar, [cli.nome, cli.email, cli.cpf, id], (erro, rows) => {
        if (erro) {
            res.status(500).json({ "erro:": "Database Error" })
            console.log(erro)
        }
        else {
            cli.id = +id; //Sinal de "+" -> converte String para number (ou usar parseInt)
            res.status(200).json(cli);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;//sempre retorna uma string
    con.query(queryCliente.deletar, [id], (erro, rows) => {
        if (erro) {
            res.status(500).json({ "erro:": "Database Error" })
            console.log(erro)
        }
        else {
            if (rows.affectedRows)
                res.status(200).json({ "msg": `Cliente ${id} removido com sucesso` });
        }
    })
}

exports.buscarPorUsername = (req, res) => {   
    if(req.query && req.query.username){
        const username = req.query.username; 
        con.query(queryCliente.buscarPorUsername, [username], (err, rows) => {
            if(err){            
                const error = {
                    status: 500,
                    msg: err
                }
                console.log(err)
                res.status(error.status).json(error);
            }
            else {
                if(rows && rows.length > 0){
                    res.json(rows[0]);
                }
                else{ 
                    const error = {
                        status: 404,
                        msg: "usuario nao encontrado"
                    }
                    res.status(error);
                }
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar username."})
    }
}
