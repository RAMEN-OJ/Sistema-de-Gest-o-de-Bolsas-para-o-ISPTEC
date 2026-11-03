(function () {
if (exigirAluno()) {
    const lista = document.getElementById("lista");
    const desenhar = (txt = "") => {
        const t = txt.toLowerCase();
        const itens = Api.listarBolsas().filter((b) => (b.titulo + " " + b.pais).toLowerCase().includes(t));
        lista.innerHTML = itens.length ? itens.map((b) => `
            <div class="card hv"><span class="tag">${esc(b.pais)}</span><h2>${esc(b.titulo)}</h2>
            <p class="mut">${esc(b.descricao.slice(0, 80))}…</p>
            <p class="mut">Idade máxima: ${b.idadeMax}</p>
            <a class="btn" href="bolsa-detalhes.html?id=${b.id}">Ver detalhes</a> ${favBtn(b.id)}</div>`).join("")
            : '<p class="mut">Nenhuma bolsa encontrada.</p>';
    };
    document.getElementById("filtro").addEventListener("input", (e) => desenhar(e.target.value));
    desenhar();
}
})();
