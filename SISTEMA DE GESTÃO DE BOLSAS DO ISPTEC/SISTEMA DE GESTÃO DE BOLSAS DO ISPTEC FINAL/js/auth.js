// ATENÇÃO: estas verificações melhoram a experiência, mas NÃO são segurança.
// Num sistema real, o backend valida o tipo de utilizador em cada pedido.
const CHAVE = "sessao_usuario";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nomeDe = (u) => u.nome || u.email;
const destino = (u) => (u.tipo === "admin" ? "admin.html" : "dashboard.html");

function guardarSessao(u) { sessionStorage.setItem(CHAVE, JSON.stringify(u)); }
function usuarioAtual() {
    try { return JSON.parse(sessionStorage.getItem(CHAVE)); } catch { return null; }
}
function sair() { sessionStorage.removeItem(CHAVE); location.replace("login.html"); }

function exigirLogin() {
    const u = usuarioAtual();
    if (!u) { location.replace("login.html"); return null; }
    return u;
}
function exigirAluno() {            // área comum: admin vai para o painel
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
    const links = !u ? [home, ["bolsas.html", "Bolsas"]]
        : u.tipo === "admin" ? [home, ["admin.html", "Painel"], ["admin-bolsas.html", "Gerir bolsas"]]
        : [home, ["dashboard.html", "Meu painel"], ["bolsas.html", "Bolsas"], ["mentorias.html", "Mentorias"], ["perfil.html", "Perfil"]];
    const atual = location.pathname.split("/").pop() || "index.html";
    const nav = document.getElementById("nav");
    nav.innerHTML = '<a class="logo" href="index.html">ISP<b>TEC</b> · Bolsas</a>' +
        links.map(([h, t]) => `<a href="${h}" class="${h === atual ? "on" : ""}">${t}</a>`).join("") +
        (u ? '<a href="#" id="sair">Sair</a>'
           : '<a href="login.html" class="cta">Entrar</a><a href="cadastro.html" class="cta2">Criar conta</a>');
    const sb = document.getElementById("sair");
    if (sb) sb.onclick = (e) => { e.preventDefault(); sair(); };
}
