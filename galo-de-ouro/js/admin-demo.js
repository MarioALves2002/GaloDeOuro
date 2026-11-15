// Credenciais públicas e fictícias, usadas apenas na demonstração local.
const administradorDemo = {
    nome: "Administrador de demonstração",
    email: "admin@galodeouro.demo",
    senha: "GaloDemo123!",
    perfil: "administrador"
};

async function garantirAdministradorDemo() {
    const chave = "galo-de-ouro:usuario:" + administradorDemo.email;
    // Só cria na primeira utilização; preserva o perfil alterado pelo painel.
    if (localStorage.getItem(chave) === null) {
        try {
            await cadastrarConta(administradorDemo.nome, administradorDemo.email,
                administradorDemo.senha, administradorDemo.senha, "administrador", function () { return true; });
        } catch (erro) {
            if (localStorage.getItem(chave) === null) {
                throw erro;
            }
        }
    }
}
