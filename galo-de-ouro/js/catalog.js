const gradeProdutos = document.querySelector(".products-grid");
const modeloProduto = gradeProdutos.querySelector(".product-card");

try {
    const aves = JSON.parse(localStorage.getItem("galo-de-ouro:aves")) || [];
    aves.forEach(function (ave) {
        const card = modeloProduto.cloneNode(true);
        card.id = ave.id;
        card.querySelector("h3").textContent = ave.nome;
        card.querySelector(".product-meta").textContent = "Raça: " + ave.raca;
        card.querySelector("img").src = ave.foto;
        card.querySelector("img").alt = "Ave " + ave.nome;
        card.querySelector(".product-add").setAttribute("aria-label", "Adicionar " + ave.nome + " ao carrinho");
        gradeProdutos.append(card);
    });
    const total = gradeProdutos.querySelectorAll(".product-card").length;
    document.querySelector(".catalog-count").textContent = total + " exemplares";
} catch {
    document.getElementById("catalog-message").textContent = "Não foi possível carregar as aves cadastradas neste navegador.";
}
