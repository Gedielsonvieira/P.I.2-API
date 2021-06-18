let queryClientes = {
    listar : 'SELECT * from cliente',
    inserir : "INSERT INTO cliente (nome, email, cpf, username, senha) VALUES (?, ?, ?, ?, ?)",//add  (username,senha) VALUES (?,?,?,?)" e no BD TBM
    buscaPorId : "SELECT * FROM cliente WHERE id=?",
    atualizar : `UPDATE cliente SET nome=?, email=?, cpf=? WHERE id=?`,
    deletar : `DELETE FROM cliente WHERE id=?`,
    buscarPorUsername: "SELECT * FROM cliente where username=?"
}

module.exports = queryClientes;

//saber como utilizar e por que req.query - qualquer busca n sendo algo único utiliza-se req.query (listagem, search)

//repository normalmente se comunica com o bd - EU ACHO