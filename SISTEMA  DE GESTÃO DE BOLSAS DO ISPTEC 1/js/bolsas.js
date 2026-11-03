(() => {
    if (!exigirAluno()) return;
    const lista = document.getElementById("lista"), filtro = document.getElementById("filtro"), tipo = document.getElementById("tipo");
    const desenhar = () => {
        const q = filtro.value.toLowerCase();
        const itens = Api.listarBolsas().filter((b) => (b.titulo + " " + b.pais).toLowerCase().includes(q) && (!tipo.value || b.tipo === tipo.value));
        lista.innerHTML = itens.length ? itens.map(bolsaCard).join("") : '<p class="mut">Nenhuma bolsa encontrada.</p>';
    };
    filtro.addEventListener("input", desenhar);
    tipo.addEventListener("change", desenhar);
    desenhar();
})();
