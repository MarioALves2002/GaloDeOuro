function listarContas() {
    const contas = [];
    for (let indice = 0; indice < localStorage.length; indice++) {
        const chave = localStorage.key(indice);
        if (chave.startsWith("galo-de-ouro:usuario:")) {
            contas.push(JSON.parse(localStorage.getItem(chave)));
        }
    }
    return contas;
}

async function cadastrarConta(nome, email, senha, confirmacao, perfil, verificarPermissao) {
    nome = nome.trim();
    email = email.trim().toLowerCase();
    if (!nome) {
        throw new Error("Informe seu nome.");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Informe um e-mail válido.");
    }
    if (!senha) {
        throw new Error("Informe uma senha.");
    }
    if (senha !== confirmacao) {
        throw new Error("As senhas não coincidem.");
    }
    const chave = "galo-de-ouro:usuario:" + email;
    if (localStorage.getItem(chave) !== null) {
        throw new Error("Já existe uma conta com esse e-mail.");
    }
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iteracoes = 600000;
    const hash = await calcularHashSenha(senha, salt, iteracoes);
    if (perfil !== "cliente" && (perfil !== "administrador" || !verificarPermissao || !verificarPermissao())) {
        throw new Error("Acesso administrativo necessário.");
    }
    if (localStorage.getItem(chave) !== null) {
        throw new Error("Já existe uma conta com esse e-mail.");
    }
    localStorage.setItem(chave, JSON.stringify({
        nome: nome, email: email, perfil: perfil,
        credencial: { salt: Array.from(salt), iteracoes: iteracoes, hash: hash }
    }));
}
