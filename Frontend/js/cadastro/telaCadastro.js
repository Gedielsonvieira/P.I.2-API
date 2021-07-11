function renderTelaCadastro() {
    var str = `
    <div class="container">
        <aside>
            <div>
                <img src="/Frontend/wallpaper/undraw_secure_login_pdn4.svg" alt="">
            </div>
        </aside>

        <form action="POST" action="#">
            <h1>Cadastre-se</h1>
            <label>
                <input type="text" name="nome_usuario" placeholder="Digite seu nome" required>
            </label>
            <label>     
                <input type="email" name="email_usuario" placeholder="Digite seu email" required>
            </label>
            <label> 
                <input type="password" name="password_usuario" placeholder="Crie sua senha" required>
            </label>
            <label> 
                <input type="password" name="confirmation_password_usuario" placeholder="Confirme sua senha" required>
            </label>
            <a href="login.html">Já tem login? Clique aqui</a>
            <a href="#" class="btn">Cadastre-se</a>
        </form>
    </div>
    `

    var telaCadastro = document.querySelector('main');
    telaCadastro.innerHTML = str
}