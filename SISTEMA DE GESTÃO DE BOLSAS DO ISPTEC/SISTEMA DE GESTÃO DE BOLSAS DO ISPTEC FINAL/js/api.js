
// SIMULAÇÃO: como cada página HTML recarrega o JavaScript, guardamos as alterações
// no localStorage para não se perderem ao navegar. Com backend real, isto desaparece.
// Para repor os dados originais: localStorage.removeItem("bolsas_db_simulada")
const CHAVE_DB = "bolsas_db_simulada";
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
    const user = usuarios.find((u) => u.email === email && String(u.senha) === String(senha));
    if (!user) return { erro: "Email ou senha errada" };
    return { sucesso: true, usuario: semSenha(user) };
}

function cadastro(nome, email, senha, dataNascimento) {
    if (usuarios.find((u) => u.email === email)) return { erro: "Este utilizador já existe" };
    const novo = { id: Date.now(), nome, email, senha, dataNascimento, tipo: "aluno" }; // nunca admin
    usuarios.push(novo);
    persistir();
    return { sucesso: true, usuario: semSenha(novo) };
}

function criarBolsa(titulo, pais, descricao, idadeMax) {
    const nova = { id: Date.now(), titulo, pais, descricao, idadeMax };
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

const Api = { login, cadastro, criarBolsa, removerBolsa, listarUsuario, listarBolsas, bolsaPorId, listarMentorias };

