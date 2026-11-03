(function () {
const u = exigirAluno();
if (u) {
    document.getElementById("dados").innerHTML = `
        <p><b>Nome:</b> ${esc(nomeDe(u))}</p><p><b>Email:</b> ${esc(u.email)}</p>
        <p><b>Tipo:</b> ${esc(u.tipo)}</p><button class="btn s" id="fim">Terminar sessão</button>`;
    document.getElementById("fim").onclick = sair;
}
})();
