// Verificações de acesso (projecto escolar: isto melhora a experiência, não é segurança real).
const CHAVE = "sessao_usuario";
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nomeDe = (u) => u.nome || u.email;
const destino = (u) => (u.tipo === "admin" ? "admin.html" : "dashboard.html");

// A sessão guarda só o id; os dados (e o tipo) vêm sempre da "base de dados".
// Se a conta foi eliminada, a sessão deixa de ser válida.
const guardarSessao = (u) => sessionStorage.setItem(CHAVE, JSON.stringify({ id: u.id }));
function usuarioAtual() {
    let id;
    try { id = JSON.parse(sessionStorage.getItem(CHAVE)).id; } catch { return null; }
    const u = Api.perfil(id);
    if (!u) sessionStorage.removeItem(CHAVE);
    return u;
}
function sair() { sessionStorage.removeItem(CHAVE); location.replace("login.html"); }

function exigirLogin() {
    const u = usuarioAtual();
    if (!u) { location.replace("login.html"); return null; }
    return u;
}
function exigirAluno() {
    const u = exigirLogin();
    if (u && u.tipo === "admin") { location.replace("admin.html"); return null; }
    if (u) montarNav(u);
    return u;
}
function exigirAdmin() {
    const u = exigirLogin();
    if (u && u.tipo !== "admin") { location.replace("acesso-negado.html"); return null; }
    if (u) montarNav(u);
    return u;
}

function montarNav(u) {
    const home = ["index.html", "Início"];
    const links = u.tipo === "admin"
        ? [home, ["admin.html", "Painel"], ["admin-bolsas.html", "Gerir bolsas"], ["admin-utilizadores.html", "Utilizadores"]]
        : [home, ["dashboard.html", "Meu painel"], ["bolsas.html", "Bolsas"], ["mentorias.html", "Mentorias"], ["perfil.html", "Perfil"]];
    const atual = location.pathname.split("/").pop() || "index.html";
    const nav = document.getElementById("nav");
    nav.querySelectorAll("a:not(.logo)").forEach((a) => a.remove());
    nav.insertAdjacentHTML("beforeend",
        links.map(([h, t]) => `<a href="${h}" class="${h === atual ? "on" : ""}">${t}</a>`).join("") + '<a href="#" id="sair">Sair</a>');
    document.getElementById("sair").onclick = (e) => { e.preventDefault(); sair(); };
}
