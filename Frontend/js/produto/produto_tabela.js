function renderTabela(produtos) {
    var str = `
    <h3>Tabela de Produtos</h3>
    <a id='novo' href="#">Inserir Produto</a>
    <div class="container">
    <div id="tabela">

    <table>
        <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Preço</th>
            <th colspan="2">Ação</th>
        </tr>`;

    for (var i in produtos) {
        str += `<tr id=${produtos[i].id}>
                <td>${produtos[i].id}</td>
                <td>${produtos[i].nome}</td>
                <td>R$ ${produtos[i].preco}</td>
                <td><a class="edit" href="#" 
                    data-id="${produtos[i].id}">Editar</a></td>
                <td><a class="delete" href="#" 
                    data-id="${produtos[i].id}">Deletar</a></td>
            </tr>`;

    }
    str += `
    </table>
    </div>
    </div>`

    var tabela = document.querySelector("main");
    tabela.innerHTML = str;

    var linkNovo = document.querySelector("#novo");
    linkNovo.onclick = function (event) {
        carregarForm();
    }

    const linksEdit = document.querySelectorAll(".edit");
    for (let linkEdit of linksEdit) {
        linkEdit.onclick = function (event) {
            onEdit(event.target.getAttribute("data-id"));
        }
    }

    const linksDelete = document.querySelectorAll(".delete");
    for (let linkDelete of linksDelete) {
        linkDelete.onclick = function (event) {
            onDeletar(event.target.getAttribute("data-id"));
        }
    }

}