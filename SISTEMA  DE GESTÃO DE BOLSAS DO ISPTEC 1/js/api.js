
// SIMULAÇÃO: como cada página HTML recarrega o JavaScript, guardamos as alterações
// no localStorage para não se perderem ao navegar. Com backend real, isto desaparece.
// Para repor os dados originais: localStorage.removeItem("bolsas_db_v3")
const CHAVE_DB = "bolsas_db_v3";
try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_DB));
    if (salvo) {
        bolsas.splice(0, bolsas.length, ...salvo.bolsas);
        usuarios.splice(0, usuarios.length, ...salvo.usuarios);
    }
} catch {}
function persistir() {
    try { localStorage.setItem(CHAVE_DB, JSON.stringify({ bolsas, usuarios })); } catch {}
}

function semSenha(u) {
    const { senha, ...resto } = u;
    return resto;
}

function login(email, senha) {
    const user = usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase() && String(u.senha) === String(senha));
    if (!user) return { erro: "Email ou senha errada" };
    return { sucesso: true, usuario: semSenha(user) };
}

function cadastro(nome, email, senha, dataNascimento) {
    if (new Date(dataNascimento) > new Date()) return { erro: "Data de nascimento inválida" };
    if (usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase())) return { erro: "Este utilizador já existe" };
    const novo = { id: Date.now(), nome, email, senha, dataNascimento, tipo: "aluno" }; // nunca admin
    usuarios.push(novo);
    persistir();
    return { sucesso: true, usuario: semSenha(novo) };
}

function criarBolsa(titulo, pais, descricao, idadeMax, link) {
    const nova = { id: Date.now(), titulo, pais, descricao, idadeMax, idadeMin: 18, tipo: pais === "Angola" ? "interna" : "externa", prazo: "Consultar o site oficial", valor: "Consultar o site oficial", docs: [], link: link || "" };
    bolsas.push(nova);
    persistir();
    return { sucesso: true, bolsa: nova };
}

function removerBolsa(id) {
    const i = bolsas.findIndex((b) => b.id === id);
    if (i === -1) return { erro: "Bolsa não encontrada" };
    bolsas.splice(i, 1);
    persistir();
    return { sucesso: true };
}

function listarUsuario() { return usuarios.map(semSenha); }
function listarBolsas() { return [...bolsas]; }
function bolsaPorId(id) { return bolsas.find((b) => b.id === id); }
function listarMentorias() { return [...mentorias]; }

function perfil(id) { const u = usuarios.find((x) => x.id === id); return u ? semSenha(u) : null; }
function idadeDe(d) {   // aceita aaaa-mm-dd e dd/mm/aaaa
    const m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})$/) || String(d || "").match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return null;
    const [a, mo, di] = m[1].length === 4 ? [+m[1], +m[2], +m[3]] : [+m[3], +m[2], +m[1]];
    const h = new Date(); let i = h.getFullYear() - a;
    if (h.getMonth() + 1 < mo || (h.getMonth() + 1 === mo && h.getDate() < di)) i--;
    return i;
}
function elegivel(u, b) { const i = idadeDe(u && u.dataNascimento); return i === null ? null : i >= (b.idadeMin || 0) && i <= b.idadeMax; }
// senha === null → eliminação feita pelo administrador
function apagarConta(id, senha) {
    const i = usuarios.findIndex((u) => u.id === id);
    if (i < 0) return { erro: "Conta não encontrada" };
    if (senha !== null && String(usuarios[i].senha) !== String(senha)) return { erro: "Senha incorreta" };
    if (usuarios[i].tipo === "admin" && usuarios.filter((u) => u.tipo === "admin").length === 1) return { erro: "Não é possível eliminar o único administrador" };
    usuarios.splice(i, 1); persistir();
    try { Object.keys(localStorage).filter((k) => k === "fav_" + id || k.startsWith("chat_" + id + "_")).forEach((k) => localStorage.removeItem(k)); } catch {}
    return { sucesso: true };
}

const Api = { perfil, idadeDe, elegivel, apagarConta, login, cadastro, criarBolsa, removerBolsa, listarUsuario, listarBolsas, bolsaPorId, listarMentorias };

