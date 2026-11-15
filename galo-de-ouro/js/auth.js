const formularioLogin = document.getElementById("login-form");

const formularioCadastro = document.getElementById("register-form");

const tituloAcesso = document.getElementById("auth-title");

const botaoAlternar = document.getElementById("auth-toggle");

formularioLogin.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const email = document.getElementById("login-email").value.trim().toLowerCase();

    const senha = document.getElementById("login-password").value;

    const mensagemLogin = document.getElementById("login-message");
    const botaoEntrar = formularioLogin.querySelector("button[type='submit']");
    botaoEntrar.disabled = true;
    mensagemLogin.textContent = "Verificando conta...";

    try {
        const usuario = JSON.parse(localStorage.getItem("galo-de-ouro:usuario:" + email));

        if (!usuario) {
            mensagemLogin.textContent = "E-mail ou senha incorretos.";
            return;
        }

        const hash = await calcularHashSenha(
            senha,
            new Uint8Array(usuario.credencial.salt),
            usuario.credencial.iteracoes
        );

        if (hash !== usuario.credencial.hash) {
            mensagemLogin.textContent = "E-mail ou senha incorretos.";
            return;
        }

        sessionStorage.setItem("galo-de-ouro:sessao", JSON.stringify({
            nome: usuario.nome,
            email: email,
            perfil: usuario.perfil
        }));
        mensagemLogin.textContent = "Login realizado. Abrindo a loja...";
        window.location.href = "loja.html";
    } catch {
        mensagemLogin.textContent = "Não foi possível entrar. Confira os dados salvos e tente novamente.";
    } finally {
        botaoEntrar.disabled = false;
    }
});

botaoAlternar.addEventListener("click", function () {
    document.getElementById("login-message").textContent = "";
    document.getElementById("register-message").textContent = "";

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

formularioCadastro.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim().toLowerCase();

    const senha = document.getElementById("register-password").value;
    const confirmacaoSenha = document.getElementById("register-confirm-password").value;
    const mensagemCadastro = document.getElementById("register-message");

    if (nome === "") {
        mensagemCadastro.textContent = "Informe seu nome.";

        document.getElementById("register-name").focus();

        return;
    }

    if (senha !== confirmacaoSenha) {
        mensagemCadastro.textContent = "As senhas não coincidem.";

        document.getElementById("register-confirm-password").focus();

        return;
    }

    const botaoCadastrar = formularioCadastro.querySelector("button[type='submit']");
    botaoCadastrar.disabled = true;
    mensagemCadastro.textContent = "Criando conta...";

    try {
        const chaveUsuario = "galo-de-ouro:usuario:" + email;
        if (localStorage.getItem(chaveUsuario) !== null) {
            mensagemCadastro.textContent = "Já existe uma conta com esse e-mail.";
            return;
        }

        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iteracoes = 600000;
        const hash = await calcularHashSenha(senha, salt, iteracoes);

        if (localStorage.getItem(chaveUsuario) !== null) {
            mensagemCadastro.textContent = "Já existe uma conta com esse e-mail.";
            return;
        }

        const novoUsuario = {
            nome: nome,
            email: email,
            perfil: "cliente",
            credencial: {
                salt: Array.from(salt),
                iteracoes: iteracoes,
                hash: hash
            }
        };
        localStorage.setItem(chaveUsuario, JSON.stringify(novoUsuario));
        formularioCadastro.reset();
        mensagemCadastro.textContent = "Conta criada. Agora você já pode entrar.";
    } catch {
        mensagemCadastro.textContent = "Não foi possível salvar a conta neste navegador.";
    } finally {
        botaoCadastrar.disabled = false;
    }
});
