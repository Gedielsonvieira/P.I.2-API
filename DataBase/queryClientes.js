let queryClientes = {
    listar : 'SELECT * from cliente',
    inserir : "INSERT INTO cliente (nome, email, cpf, username, senha) VALUES (?, ?, ?, ?, ?)",
    buscaPorId : "SELECT * FROM cliente WHERE id=?",
    atualizar : `UPDATE cliente SET nome=?, email=?, cpf=? WHERE id=?`,
    deletar : `DELETE FROM cliente WHERE id=?`,
    buscarPorUsername: "SELECT * FROM cliente WHERE username=?"
}

module.exports = queryClientes;
