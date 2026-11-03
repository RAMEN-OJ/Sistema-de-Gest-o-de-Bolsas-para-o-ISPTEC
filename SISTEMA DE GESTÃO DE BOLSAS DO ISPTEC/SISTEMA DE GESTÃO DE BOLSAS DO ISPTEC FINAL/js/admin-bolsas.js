(function () {
if (exigirAdmin()) {
    const corpo = document.getElementById("corpo");
    const desenhar = () => {
        corpo.innerHTML = Api.listarBolsas().map((b) => `<tr><td>${esc(b.titulo)}</td><td>${esc(b.pais)}</td>
            <td>${b.idadeMax}</td><td><button class="btn d" data-del="${b.id}">Remover</button></td></tr>`).join("");
        corpo.querySelectorAll("[data-del]").forEach((btn) => btn.onclick = () => {
            if (confirm("Remover esta bolsa?")) { Api.removerBolsa(parseInt(btn.dataset.del, 10)); desenhar(); }
        });
    };
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const v = (id) => document.getElementById(id).value.trim();
        Api.criarBolsa(v("t"), v("p"), v("d"), parseInt(v("i"), 10));
        e.target.reset();
        desenhar();
    });
    desenhar();
}
})();
