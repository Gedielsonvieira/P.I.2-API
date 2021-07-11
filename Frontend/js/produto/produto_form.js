function renderForm(produto) {
    //Se produto estiver indefinido, cria novo produto.
    if (!produto) {
        produto = {};
    }

    var str = `
    <h2>Formulario de Produtos</h2>
    <div class="container">
    <form id="formulario">
        Nome:
        <label for="txtnome">
            <input type="text" id="txtnome" value="${produto.nome ? produto.nome : ''}">
        </label>
        <br />
        Preço:
        <label for="txtuso">
            <input type="text" id="txtpreco" value="${produto.preco ? produto.preco : ''}">
        </label>
        <br />
        <br />
        <input type="submit" id="btnsalvar" value="Salvar">
        <input type="reset" id="cancel" value="Cancelar">
        <br />
    </form>
    </div>
    `;

    let containerForm = document.querySelector("main");
    containerForm.innerHTML = str;

    var form = document.querySelector("#formulario");

    form.onsubmit = function (event) {
        event.preventDefault();
        onSalvar(getDataProduto(produto));
    }

    form.onreset = function (event) {
        event.preventDefault();
        onCancelar();
    }

}

function getDataProduto(produto) {
    produto.nome = document.querySelector("#txtnome").value;
    produto.preco = document.querySelector("#txtpreco").value;
    return produto;
}

function limparCampos() {
    document.querySelector("#txtnome").value = "";
    document.querySelector("#txtpreco").value = "";
}

