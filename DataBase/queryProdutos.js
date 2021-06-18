let queryProdutos = {
    listar : 'SELECT * from produto',
    inserir : "INSERT INTO produto (nome, preco) VALUES (?, ?)",
    buscaPorId : "SELECT * FROM produto WHERE id=?",
    atualizar : `UPDATE produto SET nome=?, preco=? WHERE id=?`,
    deletar : `DELETE FROM produto WHERE id=?`
}

module.exports = queryProdutos;