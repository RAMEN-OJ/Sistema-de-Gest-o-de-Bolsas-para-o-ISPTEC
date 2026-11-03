// Chat com o mentor: conversa simulada (respostas geradas pelo navegador), guardada no localStorage.
(() => {
    const u = exigirAluno();
    if (!u) return;
    const id = parseInt(new URLSearchParams(location.search).get("id"), 10);
    const m = Api.listarMentorias().find((x) => x.id === id);
    if (!m) { document.getElementById("app").innerHTML = '<div class="center"><div class="big">404</div><h1>Mentor não encontrado</h1></div>'; return; }

    const K = `chat_${u.id}_${id}`;
    const eu1 = nomeDe(u).split(" ")[0];
    const box = document.getElementById("msgs"), inp = document.getElementById("t");
    let msgs = [];
    try { msgs = JSON.parse(localStorage.getItem(K) || "[]"); } catch {}
    msgs.forEach((x, i) => { x.h = x.h || Date.now() - (msgs.length - i) * 60000; x.st = x.st || "lida"; });

    document.getElementById("topo").innerHTML = `${avatar(m)}<div style="flex:1"><h2 style="margin:0">${esc(m.mentor)}</h2>
        <span class="mut">${esc(m.area || "")} · <b id="est" class="on">Online</b></span></div>
        <button class="btn s mini" id="info" type="button" aria-label="Informação">ⓘ</button><button class="btn s mini" id="limpar" type="button" aria-label="Limpar conversa">🗑</button>`;
    const estado = (t) => { const e = document.getElementById("est"); e.textContent = t; e.className = t === "Online" ? "on" : "esc"; };

    // ---------- desenho ----------
    const hora = (h) => new Date(h).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
    const rotulo = (h) => (new Date(h).toDateString() === new Date().toDateString() ? "Hoje" : new Date(h).toLocaleDateString("pt-PT"));
    const tam = (b) => (b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");
    const anexo = (f) => !f ? "" : f.dados && f.tipo.startsWith("image/")
        ? `<img class="foto" src="${f.dados}" alt="${esc(f.nome)}">`
        : `<${f.dados ? `a href="${f.dados}" download="${esc(f.nome)}"` : "div"} class="anexo"><span>${/pdf/.test(f.tipo) ? "📕" : f.tipo.startsWith("image/") ? "🖼️" : "📄"}</span><div><b>${esc(f.nome)}</b><small>${tam(f.tam)}</small></div></${f.dados ? "a" : "div"}>`;
    const bolha = (x) => `<div class="m ${x.eu ? "eu" : "el"}">${anexo(x.f)}${x.t ? `<span>${esc(x.t)}</span>` : ""}
        <small class="h">${hora(x.h)}${x.eu ? ` <span class="tk ${x.st === "lida" ? "lida" : ""}">${x.st === "enviada" ? "✓" : "✓✓"}</span>` : ""}</small></div>`;
    const DIG = '<div class="m el dig" aria-label="a escrever"><i></i><i></i><i></i></div>';
    function draw(extra) {
        let ult = "";
        box.innerHTML = msgs.map((x) => { const d = new Date(x.h).toDateString(); const s = d !== ult ? `<div class="dia">${rotulo(x.h)}</div>` : ""; ult = d; return s + bolha(x); }).join("") + (extra || "");
        box.scrollTop = box.scrollHeight;
    }
    function save() {
        try { localStorage.setItem(K, JSON.stringify(msgs)); } catch {
            msgs.forEach((x) => x.f && delete x.f.dados);
            try { localStorage.setItem(K, JSON.stringify(msgs)); } catch {}
            toast("Sem espaço: só o nome do ficheiro foi guardado.");
        }
    }
    const marcar = (st) => { msgs.forEach((x) => { if (x.eu && x.st !== "lida") x.st = st; }); save(); draw(); };

    // ---------- "cérebro" do mentor ----------
    const N = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const usado = {};
    const pick = (k, a) => { let i; do i = Math.floor(Math.random() * a.length); while (a.length > 1 && usado[k] === i); usado[k] = i; return a[i]; };
    const sauda = () => { const h = new Date().getHours(); return h < 12 ? "Bom dia" : h < 19 ? "Boa tarde" : "Boa noite"; };
    const bolsas = Api.listarBolsas();
    const idade = Api.idadeDe(u.dataNascimento);
    const INTENCOES = [
        [/tchau|adeus|ate (logo|amanha|breve)|ate ja|fui indo/, () => [pick("d", [`Até breve, ${eu1}! Qualquer dúvida, estou por aqui.`, `Fica bem, ${eu1}. Manda-me novidades da candidatura!`])]],
        [/obrigad|agradec|valeu|brigad/, () => [pick("o", ["De nada! É para isso que cá estou. 😊", `Disponha, ${eu1}. Mais alguma coisa em que possa ajudar?`, "Com todo o gosto! Se surgir outra dúvida, escreve."])]],
        [/^(ola|oi|ei|hey|bom dia|boa tarde|boa noite|tudo bem|boas)\b/, () => [`${sauda()}, ${eu1}! ${pick("g", ["Como correm os preparativos?", "Em que posso ajudar hoje?", "Diz-me o que tens em mente."])}`]],
        [/preco|quanto custa|pagar|pagamento|gratis|gratuito|custo/, () => [m.preco === "Gratuito" ? "A minha mentoria é gratuita, não precisas de te preocupar com isso. Foca-te na candidatura!" : `A mentoria está em ${m.preco}. Inclui revisão de documentos e acompanhamento por aqui. Se tiveres dúvidas antes de decidir, pergunta à vontade.`]],
        [/carta|motivacao/, () => [pick("c", ["A carta de motivação é onde te destacas. Conta uma história tua, não uma lista de qualidades.", "Na carta, evita frases feitas. O júri lê dezenas e lembra-se das que soam autênticas."]), "Estrutura que recomendo: 1) quem és, 2) porque este curso e este país, 3) o que vais fazer com a bolsa quando voltares. Já tens um rascunho? Podes enviar-me pelo 📎."]],
        [/curricul|\bcv\b/, () => ["Para o currículo: máximo de 1–2 páginas, formação primeiro e foto opcional. Destaca projectos, voluntariado e competências em vez de só listar cargos.", "Envia-me o teu pelo 📎 e digo-te o que mexia."]],
        [/entrevista/, () => [pick("e", ["Prepara 3 histórias reais: um desafio que superaste, uma vez que lideraste e porque queres esta bolsa.", "Nas entrevistas, o que mais pesa é a clareza do teu plano. Responde ao que perguntam, com exemplos."]), "Se quiseres, simulamos uma entrevista aqui no chat. Diz-me e começo com a primeira pergunta."]],
        [/document|certificad|historico|passaporte|\bbi\b|declaracao|apostil|traduc|notas/, () => ["Os documentos mais pedidos costumam ser: BI/passaporte válido, certificado de habilitações, carta de motivação e currículo. Confirma sempre a lista no site oficial da bolsa.", "Podes enviar-me os ficheiros pelo 📎 para eu ver se estão legíveis e completos."]],
        [/prazo|data limite|quando (e|abre|fecha)|ate quando|calendario/, () => ["Os prazos mudam de ano para ano, por isso a fonte certa é o site oficial (está na página de cada bolsa). Mas não deixes para a última semana: documentos com carimbos demoram.", "Diz-me a bolsa que te interessa e montamos um calendário de trabalho."]],
        [/elegiv|idade|posso candidat|requisito|criterio/, () => { const e = bolsas.filter((b) => Api.elegivel(u, b)); return [idade === null ? "Para ver a elegibilidade preciso da tua data de nascimento." : e.length ? `Pelo teu perfil, tens ${idade} anos e és elegível em ${e.length} das ${bolsas.length} bolsas da plataforma. Vê o selo "Elegível" em cada uma.` : `Com ${idade} anos ficas fora da faixa etária das bolsas actuais (18–22). Mas há outras opções; queres que falemos delas?`, "Além da idade, confirma sempre as notas mínimas e documentos no site oficial."]; }],
        [/./, (t) => { const b = bolsas.find((x) => N(t).includes(N(x.pais))); return b ? [`Sobre ${b.pais}: ${b.descricao}`, "Os detalhes e o link oficial estão na página da bolsa. Já pensaste no curso que queres lá?"] : null; }],
        [/marcar|reuniao|chamada|videochamada|\bcall\b|horario|disponiv|whatsapp|contacto|telefone/, () => [/\d{6,}/.test(m.contacto) ? `Podes ligar-me para ${m.contacto}, de preferência ao fim da tarde. Mas por aqui também resolvemos muita coisa.` : "Por agora falamos melhor por aqui. Quando tiveres o rascunho dos documentos, marcamos uma videochamada."]],
        [/ingles|ielts|toefl|idioma|lingua|frances/, () => ["Para bolsas fora de países lusófonos, o inglês conta muito. Se não tens certificado, treina todos os dias, mesmo 20 minutos, e vê quais as bolsas que o exigem.", "Como está o teu nível actualmente?"]],
        [/nervos|medo|ansios|nao sei|perdid|dificil|desanim|stress|cansad/, () => [pick("n", [`Calma, ${eu1}. Sentir isso é normal; quase todos os candidatos passam por aí.`, `É normal sentires-te assim, ${eu1}. Vamos por partes, um passo de cada vez.`]), "Qual é a parte que mais te preocupa agora: documentos, carta ou escolher a bolsa?"]],
        [/engenharia|medicina|dados|informatica|curso|area|tecnologia/, () => [`A minha área é ${m.area || "orientação de candidaturas"}. Diz-me o curso que queres e vejo que bolsas fazem mais sentido para ti.`, "Tens preferência por algum país?"]],
    ];
    function gerar(texto) {
        const t = N(texto);
        for (const [re, fn] of INTENCOES) { if (re.test(t)) { const r = fn(texto); if (r) return r; } }
        return [pick("f", [`Percebi, ${eu1}. Podes dar-me mais detalhes? Assim ajudo-te melhor.`, "Boa pergunta. Para te orientar bem, conta-me em que fase estás: escolha da bolsa, documentos ou carta?", "Hmm, não tenho a certeza de ter percebido. Podes reformular?"])];
    }
    function gerarFicheiro(f) {
        const n = N(f.nome);
        const k = /curricul|\bcv\b/.test(n) ? "cv" : /carta|motiv/.test(n) ? "carta" : /certif|historico|notas|declar/.test(n) ? "cert" : /\bbi\b|passaport|identific/.test(n) ? "id" : "x";
        const r = {
            cv: "Já vi o currículo. Ideias: 1) mete os resultados em números (ex.: «organizei um evento com 80 pessoas»); 2) põe a formação no topo; 3) corta o que não se relaciona com a bolsa.",
            carta: "Li a carta. Fica a minha opinião: o início pode ser mais pessoal e a conclusão mais concreta sobre o que vais fazer depois do curso. Ajusto contigo, se quiseres.",
            cert: "O documento está legível. Confirma só se precisa de autenticação ou tradução para a bolsa que escolheste.",
            id: "Documento recebido. Confirma que a validade cobre todo o período da candidatura e da viagem.",
            x: "Recebido. De que documento se trata? Assim digo-te se está de acordo com o que a bolsa pede.",
        }[k];
        return [{ t: `Recebi "${f.nome}". Deixa-me abrir e ver com calma…`, d: 400 }, { t: r, d: 2800 }];
    }

    // ---------- fluxo de resposta (lê → a escrever → responde) ----------
    const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
    let cadeia = Promise.resolve(), pend = [], tmr;
    const responder = (lista) => { cadeia = cadeia.then(async () => {
        await esperar(500 + Math.random() * 500); marcar("entregue");
        await esperar(600 + Math.random() * 1000); marcar("lida");
        for (const it of lista) {
            const t = it.t || it;
            await esperar(it.d || 500); estado("a escrever…"); draw(DIG);
            await esperar(Math.min(4500, 900 + t.length * 28));
            msgs.push({ eu: false, t, h: Date.now() }); save(); estado("Online"); draw();
        }
    }); };
    function enviar(t, f) {
        msgs.push({ eu: true, t, f, h: Date.now(), st: "enviada" }); save(); draw();
        pend.push({ t, f }); clearTimeout(tmr);
        tmr = setTimeout(() => {   // o mentor espera um instante, caso continues a escrever
            const p = pend; pend = [];
            const fs = p.filter((x) => x.f).map((x) => x.f), txt = p.map((x) => x.t).join(" ").trim();
            responder([].concat(...fs.map(gerarFicheiro), txt ? gerar(txt) : []));
        }, 1300);
    }
    function ficheiros(lista) {
        [...lista].forEach((fl) => {
            if (fl.size > 2097152) { toast(`"${fl.name}" excede 2 MB.`); return; }
            const f = { nome: fl.name, tam: fl.size, tipo: fl.type || "application/octet-stream" };
            if (fl.size > 307200) { enviar("", f); return; }   // ficheiros grandes: só o nome é guardado
            const r = new FileReader();
            r.onload = () => { f.dados = r.result; enviar("", f); };
            r.readAsDataURL(fl);
        });
    }

    // ---------- eventos ----------
    document.getElementById("f").addEventListener("submit", (e) => { e.preventDefault(); const v = inp.value.trim(); if (v) { inp.value = ""; enviar(v); } });
    const fx = document.getElementById("fx");
    document.getElementById("clip").onclick = () => fx.click();
    fx.onchange = () => { ficheiros(fx.files); fx.value = ""; };
    const chat = document.getElementById("chat");
    ["dragover", "dragenter"].forEach((ev) => chat.addEventListener(ev, (e) => { e.preventDefault(); chat.classList.add("arrasta"); }));
    ["dragleave", "drop"].forEach((ev) => chat.addEventListener(ev, () => chat.classList.remove("arrasta")));
    chat.addEventListener("drop", (e) => { e.preventDefault(); ficheiros(e.dataTransfer.files); });
    document.getElementById("chips").innerHTML = ["Carta de motivação", "Rever o meu CV", "Documentos necessários", "Prazos", "Marcar uma conversa"].map((c) => `<button type="button" class="chip">${c}</button>`).join("");
    document.getElementById("chips").onclick = (e) => { if (e.target.classList.contains("chip")) enviar(e.target.textContent); };
    document.getElementById("info").onclick = () => toast("Demonstração académica: as respostas são geradas automaticamente.");
    document.getElementById("limpar").onclick = () => { if (confirm("Apagar toda a conversa?")) { localStorage.removeItem(K); location.reload(); } };

    draw();
    if (!msgs.length) responder([{ t: `${sauda()}, ${eu1}! Sou ${m.mentor}${m.area ? " e trabalho com " + m.area.toLowerCase() : ""}. Em que fase estás da tua preparação?`, d: 800 }]);
})();
