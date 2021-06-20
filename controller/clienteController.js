//controller tratamento do req, res e persistencia

const con = require('../conexBD/config')
const queryCliente = require('../DataBase/queryClientes')
const jwt = require('jsonwebtoken')
const clienteRepository = require('../repository/clienteRepository')

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
    const id = +req.params.id;//+ é o parseint do ecmascript 6 converte o req.params.id que é uma string para um inteiro
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
    const id = +req.params.id;//sempre retorna uma string
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
    const id = +req.params.id;//sempre retorna uma string
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
        const username = req.query.username;//req.query - qualquer busca n sendo algo único utiliza-se req.query (listagem, search)
        clienteRepository.buscarPorUsername(username, (err,usuario) => {
            if(err){
                res.status(err.status).json(err);
            }
            else {
                res.json(usuario);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar username."})
    }
}

exports.validacaoCliente = (req, res) => {
    if(req.body && req.body.username && req.body.senha){
        const username = req.body.username;
        const password = req.body.senha;
        clienteRepository.buscarPorUsername(username, (err,cliente) => {
            if (err) {//alguma msg de erro no servidor
                if(err.status == 404){
                    const erro = {
                        status: 401,
                        msg: "Cliente inválido"
                    }
                    res.status(erro.status).json(erro);
                }
                else {
                    res.status(err.status).json(err);
                }
            }
            else {
                if (cliente.senha == password) {
                    const token = jwt.sign({
                        id: cliente.id, //payload
                        nome: cliente.nome //payload
                    }, "Sen@crs2021", { expiresIn: "1h" });//secret Key
                    res.status(201).json({ 'token': token });
                }
                else {
                    res.status(401).json('msg: Senha Inválida');
                }
            }
        })
    }
    else {
        const erro = {
            status: 400,
            msg: "Usuário ou senha inexistentes"
        }
        res.status(erro.status).json(erro);
    }
}

exports.validacaoToken = (req, res, next) => {
    const token = req.get("x-auth-token");//resgatando um dado no cabeçalho
    if(!token){
        const error = { 
            status: 403,
            msg: "Nao tem token de acesso"
        }
        res.status(error.status).json(error);
    }
    else {
        jwt.verify(token, "Sen@crs2021", (err, payload) => {
            if(err){
                const error = { 
                    status: 403,
                    msg: "Token invalido"
                }
                res.status(error.status).json(error);        
            }
            else{
                console.log(`Id do Usuario: ${+payload.id}`);
                next();
            }
        })
    }
}
