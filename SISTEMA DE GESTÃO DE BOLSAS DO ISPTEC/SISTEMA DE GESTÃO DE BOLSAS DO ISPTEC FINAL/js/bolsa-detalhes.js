(function () {
if (exigirAluno()) {
    const id = parseInt(new URLSearchParams(location.search).get("id"), 10);
    const b = Api.bolsaPorId(id);
    document.getElementById("conteudo").innerHTML = b ? `
        <div class="card hv"><span class="tag">${esc(b.pais)}</span><h1>${esc(b.titulo)}</h1>
        <p>${esc(b.descricao)}</p><p class="mut">Idade máxima: ${b.idadeMax} anos</p>
        <a class="btn" href="mentorias.html">Falar com um mentor</a> ${favBtn(b.id)}</div>`
        : '<div class="center"><div class="big">404</div><h1>Bolsa não encontrada</h1></div>';
}
})();
