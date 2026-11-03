(() => {
    if (!exigirAluno()) return;
    const b = Api.bolsaPorId(parseInt(new URLSearchParams(location.search).get("id"), 10));
    document.getElementById("conteudo").innerHTML = b ? `
        <div class="card hv"><span class="tag">${esc(b.pais)}</span> <span class="tag">${esc(b.tipo || "")}</span> ${selo(b)}
        <h1>${esc(b.titulo)}</h1><p>${esc(b.descricao)}</p>
        <p class="mut"><b>Idade:</b> ${b.idadeMin || 18}–${b.idadeMax} anos · <b>Prazo:</b> ${esc(b.prazo || "Consultar o site oficial")} · <b>Valor:</b> ${esc(b.valor || "Consultar o site oficial")}</p>
        ${(b.docs || []).length ? `<h2>Documentos geralmente pedidos</h2><ul>${b.docs.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
        <div class="acoes">${b.link ? `<a class="btn" href="${esc(b.link)}" target="_blank" rel="noopener">Site oficial ↗</a>` : ""}
        <a class="btn s" href="mentorias.html">Falar com um mentor</a>${favBtn(b.id)}</div></div>`
        : '<div class="center"><div class="big">404</div><h1>Bolsa não encontrada</h1></div>';
})();
