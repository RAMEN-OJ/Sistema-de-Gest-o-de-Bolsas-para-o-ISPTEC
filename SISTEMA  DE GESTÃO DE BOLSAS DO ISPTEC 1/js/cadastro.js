(function () {
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg");
    const r = Api.cadastro(
        document.getElementById("nome").value.trim(),
        document.getElementById("email").value.trim(),
        document.getElementById("senha").value,
        document.getElementById("nasc").value
    );
    msg.className = r.erro ? "msg e" : "msg o";
    msg.textContent = r.erro || "Conta criada! Já podes entrar.";
    if (r.sucesso) e.target.reset();
});
})();
