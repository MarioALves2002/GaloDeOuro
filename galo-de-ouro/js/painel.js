const painel = document.getElementById("admin-panel");
const formularioAve = document.getElementById("bird-form");
const mensagemAve = document.getElementById("bird-message");
const mensagemPainel = document.getElementById("panel-message");
let quantidadeAvesOriginais = null;

function atualizarResumo() {
    const aves = JSON.parse(localStorage.getItem("galo-de-ouro:aves")) || [];
    const contas = listarContas();
    mostrarContas(contas);

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
    try {
        await garantirAdministradorDemo();
        if (!verificarAdministrador()) {
            return;
        }
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
    const autorizado = sessaoAtual && sessaoAtual.perfil === "administrador";
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

const formularioAdmin = document.getElementById("admin-form");
const mensagemUsuario = document.getElementById("user-message");

function mostrarContas(contas) {
    const lista = document.getElementById("user-list");
    lista.replaceChildren();
    contas.forEach(function (conta) {
        const linha = document.createElement("li");
        const descricao = document.createElement("span");
        descricao.textContent = conta.nome + " · " + conta.email + " · " + conta.perfil;
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = conta.perfil === "administrador" ? "Tornar cliente" : "Tornar administrador";
        botao.setAttribute("aria-label", botao.textContent + ": " + conta.email);
        botao.addEventListener("click", function () { alterarPerfil(conta.email); });
        linha.append(descricao, botao);
        lista.append(linha);
    });
}

function alterarPerfil(email) {
    if (!verificarAdministrador()) {
        return;
    }
    try {
        const chave = "galo-de-ouro:usuario:" + email;
        const conta = JSON.parse(localStorage.getItem(chave));
        if (conta.perfil === "administrador") {
            const administradores = listarContas().filter(function (usuario) {
                return usuario.perfil === "administrador";
            });
            if (administradores.length <= 1) {
                mensagemUsuario.textContent = "Não é possível retirar a permissão do último administrador.";
                return;
            }
            conta.perfil = "cliente";
        } else {
            conta.perfil = "administrador";
        }
        localStorage.setItem(chave, JSON.stringify(conta));
        mensagemUsuario.textContent = "Perfil atualizado para " + conta.perfil + ".";
        carregarPainel();
    } catch {
        mensagemUsuario.textContent = "Não foi possível alterar o perfil neste navegador.";
    }
}

formularioAdmin.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    if (!verificarAdministrador()) {
        return;
    }
    const botao = formularioAdmin.querySelector("button[type='submit']");
    botao.disabled = true;
    mensagemUsuario.textContent = "Criando administrador...";
    try {
        await cadastrarConta(
            document.getElementById("admin-name").value,
            document.getElementById("admin-email").value,
            document.getElementById("admin-password").value,
            document.getElementById("admin-confirm-password").value,
            "administrador", verificarAdministrador
        );
        formularioAdmin.reset();
        mensagemUsuario.textContent = "Administrador criado.";
        carregarPainel();
    } catch (erro) {
        mensagemUsuario.textContent = erro instanceof DOMException
            ? "Não foi possível salvar a conta neste navegador." : erro.message;
    } finally {
        botao.disabled = false;
    }
});

window.addEventListener("pageshow", carregarPainel);
window.addEventListener("storage", carregarPainel);
carregarPainel();
