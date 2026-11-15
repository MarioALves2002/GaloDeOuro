const linkAcesso = document.getElementById("account-link");
let sessaoAtual = null;

function atualizarAcesso() {
    try {
        sessaoAtual = JSON.parse(sessionStorage.getItem("galo-de-ouro:sessao"));
    } catch {
        sessaoAtual = null;
    }

    linkAcesso.textContent = sessaoAtual ? "Sair" : "Entrar / cadastrar";
}

linkAcesso.addEventListener("click", function (evento) {
    if (!sessaoAtual) {
        return;
    }

    evento.preventDefault();

    try {
        sessionStorage.removeItem("galo-de-ouro:sessao");
        window.location.href = "login.html";
    } catch {
        linkAcesso.textContent = "Não foi possível sair. Tente novamente.";
    }
});

window.addEventListener("pageshow", atualizarAcesso);
atualizarAcesso();
