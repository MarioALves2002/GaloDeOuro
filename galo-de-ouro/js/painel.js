const painel = document.getElementById("admin-panel");
const formularioAve = document.getElementById("bird-form");
const mensagemAve = document.getElementById("bird-message");

function verificarAdministrador() {
    atualizarAcesso();
    const autorizado = sessaoAtual && sessaoAtual.email === administradorDemo.email
        && sessaoAtual.perfil === administradorDemo.perfil;
    painel.hidden = !autorizado;
    if (!autorizado) {
        window.location.replace("login.html");
    }
    return autorizado;
}

formularioAve.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (!verificarAdministrador()) {
        return;
    }

    const nome = document.getElementById("bird-name").value.trim();
    const raca = document.getElementById("bird-breed").value.trim();
    const foto = document.getElementById("bird-photo").value;
    const fotosPermitidas = ["img/abel.jpg", "img/imperador.jpg", "img/bruxo.jpg"];
    if (!nome || !raca || !fotosPermitidas.includes(foto)) {
        mensagemAve.textContent = "Informe nome, raça e uma das fotos disponíveis.";
        return;
    }

    try {
        const aves = JSON.parse(localStorage.getItem("galo-de-ouro:aves")) || [];
        aves.push({ id: "produto-" + crypto.randomUUID(), nome: nome, raca: raca, foto: foto });
        localStorage.setItem("galo-de-ouro:aves", JSON.stringify(aves));
        formularioAve.reset();
        mensagemAve.textContent = "Ave cadastrada. Abra a loja para ver o novo card.";
    } catch {
        mensagemAve.textContent = "Não foi possível salvar a ave neste navegador.";
    }
});

window.addEventListener("pageshow", verificarAdministrador);
verificarAdministrador();
