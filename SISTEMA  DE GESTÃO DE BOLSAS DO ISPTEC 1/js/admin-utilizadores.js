(() => {
    const eu = exigirAdmin();
    if (!eu) return;
    const corpo = document.getElementById("corpo"), q = document.getElementById("q"), n = document.getElementById("n");
    const desenhar = () => {
        const t = q.value.toLowerCase();
        const l = Api.listarUsuario().filter((u) => (nomeDe(u) + " " + u.email).toLowerCase().includes(t));
        n.textContent = l.length + " conta(s)";
        corpo.innerHTML = l.map((u) => { const i = Api.idadeDe(u.dataNascimento); return `<tr><td>${esc(nomeDe(u))}</td><td>${esc(u.email)}</td>
            <td>${i === null ? "—" : i + " anos"}</td><td>${esc(u.tipo)}</td>
            <td>${u.id === eu.id ? '<span class="mut">(tu)</span>' : `<button class="btn d" data-del="${u.id}">Eliminar</button>`}</td></tr>`; }).join("");
    };
    corpo.addEventListener("click", (e) => {
        const b = e.target.closest("[data-del]");
        const u = b && Api.perfil(parseInt(b.dataset.del, 10));
        if (u && confirm(`Eliminar a conta de ${nomeDe(u)} (${u.email})?`)) {
            toast(Api.apagarConta(u.id, null).erro || "Conta eliminada");
            desenhar();
        }
    });
    q.addEventListener("input", desenhar);
    desenhar();
})();
