const painel = document.getElementById("admin-panel");
const formularioAve = document.getElementById("bird-form");
const mensagemAve = document.getElementById("bird-message");
const mensagemPainel = document.getElementById("panel-message");
let quantidadeAvesOriginais = null;

function atualizarResumo() {
    const aves = JSON.parse(localStorage.getItem("galo-de-ouro:aves")) || [];
    const contas = [];
    for (let indice = 0; indice < localStorage.length; indice++) {
        const chave = localStorage.key(indice);
        if (chave.startsWith("galo-de-ouro:usuario:")) {
            const conta = JSON.parse(localStorage.getItem(chave));
            if (conta.email !== administradorDemo.email) {
                contas.push(conta);
            }
        }
    }
    // O login reconhece esta conta fixa mesmo sem registro no localStorage.
    contas.push(administradorDemo);

    document.getElementById("total-birds").textContent = quantidadeAvesOriginais === null
        ? "—" : quantidadeAvesOriginais + aves.length;
    document.getElementById("total-accounts").textContent = contas.length;
    document.getElementById("total-clients").textContent = contas.filter(function (conta) {
        return conta.perfil === "cliente";
    }).length;
    document.getElementById("total-admins").textContent = contas.filter(function (conta) {
        return conta.perfil === "administrador";
    }).length;

    const listaAves = document.getElementById("bird-list");
    listaAves.replaceChildren();
    aves.forEach(function (ave) {
        const linha = document.createElement("li");
        const foto = document.createElement("img");
        foto.src = ave.foto;
        foto.alt = "Ave " + ave.nome;
        foto.width = 72;
        foto.height = 60;
        foto.loading = "lazy";
        const descricao = document.createElement("span");
        descricao.textContent = ave.nome + " · Raça: " + ave.raca + " · Preço sob consulta";
        linha.append(foto, descricao);
        listaAves.append(linha);
    });
    document.getElementById("bird-list-message").textContent = aves.length === 0
        ? "Nenhuma ave cadastrada pelo painel." : "";
}

async function carregarPainel() {
    if (!verificarAdministrador()) {
        return;
    }
    try {
        atualizarResumo();
        if (quantidadeAvesOriginais === null) {
            const resposta = await fetch("loja.html");
            if (!resposta.ok) {
                throw new Error("Não foi possível ler a loja.");
            }
            const paginaLoja = new DOMParser().parseFromString(await resposta.text(), "text/html");
            quantidadeAvesOriginais = paginaLoja.querySelectorAll(".products-grid .product-card").length;
        }
        if (verificarAdministrador()) {
            atualizarResumo();
            mensagemPainel.textContent = "";
        }
    } catch {
        mensagemPainel.textContent = "Não foi possível atualizar o resumo. Use localhost e confira os dados deste navegador.";
    }
}

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
        return;
    }
    carregarPainel();
});

window.addEventListener("pageshow", carregarPainel);
window.addEventListener("storage", carregarPainel);
carregarPainel();
