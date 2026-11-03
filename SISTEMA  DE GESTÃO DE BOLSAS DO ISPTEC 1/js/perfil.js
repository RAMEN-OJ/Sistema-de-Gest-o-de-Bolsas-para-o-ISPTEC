(() => {
    const u = exigirAluno();
    if (!u) return;
    const i = Api.idadeDe(u.dataNascimento);
    document.getElementById("dados").innerHTML = `
        <p><b>Nome:</b> ${esc(nomeDe(u))}</p><p><b>Email:</b> ${esc(u.email)}</p>
        <p><b>Idade:</b> ${i === null ? "—" : i + " anos"}</p><p><b>Tipo:</b> ${esc(u.tipo)}</p>
        <div class="acoes"><button class="btn s" id="fim">Terminar sessão</button><button class="btn d" id="del">Eliminar conta</button></div>`;
    document.getElementById("fim").onclick = sair;
    document.getElementById("del").onclick = () => {
        document.body.insertAdjacentHTML("beforeend", `<div class="modal" role="dialog" aria-modal="true"><div class="card">
            <h2>Eliminar conta</h2><p class="mut">Esta acção é permanente. Escreve a tua senha para confirmar.</p>
            <input type="password" id="ms" autocomplete="current-password" aria-label="Senha"><div class="msg e" id="mm"></div>
            <div class="acoes"><button class="btn s" id="mc">Cancelar</button><button class="btn d" id="mo">Eliminar</button></div></div></div>`);
        const fechar = () => document.querySelector(".modal").remove();
        document.getElementById("ms").focus();
        document.getElementById("mc").onclick = fechar;
        document.getElementById("mo").onclick = () => {
            const r = Api.apagarConta(u.id, document.getElementById("ms").value);
            if (r.erro) { document.getElementById("mm").textContent = r.erro; return; }
            sair();
        };
    };
})();
