(function () {
const ja = usuarioAtual();
if (ja) location.replace(destino(ja));

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const r = Api.login(document.getElementById("email").value.trim(), document.getElementById("senha").value);
    if (r.erro) { document.getElementById("msg").textContent = r.erro; return; }
    guardarSessao(r.usuario);
    location.replace(destino(r.usuario));   // admin → admin.html | aluno → dashboard.html
});
})();
