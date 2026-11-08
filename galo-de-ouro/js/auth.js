const formularioLogin = document.getElementById("login-form") ; 

const email = document.getElementById("login-email").value.trim(); 

const senha = document.getElementById("login-password").value;

const formularioCadastro = document.getElementById("register-form");

const tituloAcesso = document.getElementById("auth-title");

const botaoAlternar = document.getElementById("auth-toggle");

formularioLogin.addEventListener("submit",function(evento){
    evento.preventDefault ;
    console.log("Envio Do Formulario OK") ;
}) ;



botaoAlternar.addEventListener("click", function () {
    console.log("Opção de cadastro selecionada.");
});

botaoAlternar.addEventListener("click", function () {
    if (formularioCadastro.hidden) {
        formularioLogin.hidden = true;
        formularioCadastro.hidden = false;

        tituloAcesso.textContent = "Crie sua conta";
        botaoAlternar.textContent = "Já tem conta? Entrar";

        document.getElementById("register-name").focus();
    } else {
        formularioCadastro.hidden = true;
        formularioLogin.hidden = false;

        tituloAcesso.textContent = "Entre em sua conta";
        botaoAlternar.textContent = "Não tem conta? Cadastre-se";

        document.getElementById("login-email").focus();
    }
});

formularioCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    console.log("Envio do cadastro identificado.");
});

formularioCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const senha = document.getElementById("register-password").value;
    const confirmacaoSenha = document.getElementById("register-confirm-password").value;
    const mensagemCadastro = document.getElementById("register-message");

    if (senha !== confirmacaoSenha) {
        mensagemCadastro.textContent = "As senhas não coincidem.";

        document.getElementById("register-confirm-password").focus();

        return;
    }

    mensagemCadastro.textContent = "As senhas conferem.";
});
