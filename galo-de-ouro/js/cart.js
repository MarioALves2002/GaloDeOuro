const listaCarrinho = document.getElementById("cart-items");
const mensagemCarrinho = document.getElementById("cart-message");
const contadorCarrinho = document.querySelector(".cart-count");

function chaveCarrinho() {
    atualizarAcesso();
    return sessaoAtual && sessaoAtual.email
        ? "galo-de-ouro:carrinho:" + sessaoAtual.email
        : null;
}

function lerCarrinho(chave) {
    const itens = JSON.parse(localStorage.getItem(chave)) || [];
    if (!Array.isArray(itens)) {
        throw new Error("Carrinho inválido.");
    }
    return itens;
}

function mostrarCarrinho(itens) {
    listaCarrinho.replaceChildren();
    let quantidadeTotal = 0;

    itens.forEach(function (item) {
        quantidadeTotal += item.quantidade;

        const linha = document.createElement("li");
        const descricao = document.createElement("span");
        descricao.textContent = item.nome + " — Quantidade: " + item.quantidade + " · Preço sob consulta";

        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.textContent = "Remover 1";
        botaoRemover.setAttribute("aria-label", "Remover uma unidade de " + item.nome);
        botaoRemover.addEventListener("click", function () {
            alterarCarrinho(item.id, item.nome, -1);
        });

        linha.append(descricao, botaoRemover);
        listaCarrinho.append(linha);
    });

    contadorCarrinho.textContent = quantidadeTotal;
    contadorCarrinho.setAttribute("aria-label", quantidadeTotal + " itens");
    mensagemCarrinho.textContent = itens.length === 0 ? "Nenhum produto adicionado." : "";
}

function atualizarCarrinho() {
    mostrarCarrinho([]);
    try {
        const chave = chaveCarrinho();
        if (chave) {
            mostrarCarrinho(lerCarrinho(chave));
        }
    } catch {
        mensagemCarrinho.textContent = "Não foi possível carregar o carrinho neste navegador.";
    }
}

function alterarCarrinho(id, nome, diferenca) {
    try {
        const chave = chaveCarrinho();
        if (!chave) {
            window.location.href = "login.html";
            return;
        }

        const itens = lerCarrinho(chave);
        const item = itens.find(function (produto) {
            return produto.id === id;
        });

        if (item) {
            item.quantidade += diferenca;
        } else if (diferenca > 0) {
            itens.push({ id: id, nome: nome, quantidade: 1 });
        }

        const itensRestantes = itens.filter(function (produto) {
            return produto.quantidade > 0;
        });
        localStorage.setItem(chave, JSON.stringify(itensRestantes));
        mostrarCarrinho(itensRestantes);
        mensagemCarrinho.textContent = diferenca > 0 ? "Uma unidade adicionada." : "Uma unidade removida.";
    } catch {
        mensagemCarrinho.textContent = "Não foi possível salvar o carrinho neste navegador.";
    }
    document.querySelector(".header-cart").open = true;
}

document.querySelectorAll(".product-add").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const card = botao.closest(".product-card");
        alterarCarrinho(card.id, card.querySelector("h3").textContent, 1);
    });
});

window.addEventListener("pageshow", atualizarCarrinho);
window.addEventListener("storage", atualizarCarrinho);
atualizarCarrinho();
