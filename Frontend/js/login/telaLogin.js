function renderTelaLogin(){
    var str=`
    <div class="container">
        <aside>
            <div>
                <img src="/Frontend/wallpaper/undraw_secure_login_pdn4.svg" alt="">
            </div>
        </aside>
        
        <form action="POST" action="#">
            <h1>Login</h1>
            <label>
                <input type="text" name="nome_usuario" placeholder="Digite seu nome" required>
            </label>
            <label>     
                <input type="email" name="email_usuario" placeholder="Digite seu email" required>
            </label>
            <label> 
                <input type="password" name="password_usuario" placeholder="Digite sua senha" required>
            </label>
            <a href="cadastro.html">Não tem cadastro? Cadastre-se</a>
            <a href="#" class="btn">Entrar</a>
        </form>
    </div>
    `

    var telaLogin = document.querySelector('main');
    telaLogin.innerHTML = str;


}