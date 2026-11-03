var LANG = "pt"; try { LANG = localStorage.getItem("lang") || "pt"; } catch (e) {}
function toast(m){ var t=document.createElement("div"); t.className="toast"; t.textContent=m; document.body.appendChild(t); setTimeout(function(){t.remove()},2500); }
function _fk(){ var u=usuarioAtual(); return "fav_"+(u?u.id:"x"); }
function favs(){ try{ return JSON.parse(localStorage.getItem(_fk())||"[]"); }catch(e){ return []; } }
function favBtn(id){ return '<button class="btn s" data-fav="'+id+'">'+(favs().indexOf(id)>-1?"♥ Guardada":"♡ Guardar")+'</button>'; }
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-fav]"); if(!b) return;
  var id=+b.dataset.fav,f=favs(),i=f.indexOf(id); if(i>-1) f.splice(i,1); else f.push(id);
  try{localStorage.setItem(_fk(),JSON.stringify(f));}catch(x){}
  b.textContent=i>-1?"♡ Guardar":"♥ Guardada"; toast(i>-1?"Removida das guardadas":"Bolsa guardada!");
});
function bolsaCard(b){ return '<div class="card hv"><span class="tag">'+esc(b.pais)+'</span><h2>'+esc(b.titulo)+'</h2><p class="mut">'+esc(b.descricao.slice(0,80))+'…</p><a class="btn" href="bolsa-detalhes.html?id='+b.id+'">Ver detalhes</a> '+favBtn(b.id)+'</div>'; }
function avatar(m){
  if(m.foto) return '<img class="av" src="'+esc(m.foto)+'" alt="">';
  var ini=m.mentor.split(" ").filter(function(w){return w.indexOf(".")<0}).map(function(w){return w[0]}).slice(0,2).join("");
  return '<div class="av">'+esc(ini)+'</div>';
}

// ---- tradutor (PT → EN / FR): troca textos da interface; o conteúdo das bolsas fica em PT ----
var R=[["Painel","Dashboard","Tableau de bord"],["Início","Home","Accueil"],["Bolsas","Scholarships","Bourses"],["Mentorias","Mentoring","Mentorat"],["Perfil","Profile","Profil"],["Gerir bolsas","Manage scholarships","Gérer les bourses"],["Sair","Log out","Quitter"],["Entrar","Sign in","Se connecter"],["Criar conta","Create account","Créer un compte"],["Registar","Register","S'inscrire"],["Senha","Password","Mot de passe"],["Nome","Name","Nom"],["Voltar ao login","Back to login","Retour"],["Sem conta?","No account?","Pas de compte ?"],
["Bolsas disponíveis","Available scholarships","Bourses disponibles"],["Escolhe uma bolsa para ver os detalhes.","Pick a scholarship to see the details.","Choisissez une bourse pour voir les détails."],["Ver detalhes","View details","Voir les détails"],["Falar com mentor","Talk to mentor","Parler au mentor"],["Falar com um mentor","Talk to a mentor","Parler à un mentor"],["♡ Guardar","♡ Save","♡ Enregistrer"],["♥ Guardada","♥ Saved","♥ Enregistrée"],["Guardadas","Saved","Enregistrées"],["Recomendadas para ti","Recommended for you","Recommandées pour vous"],["Este é o teu painel.","This is your dashboard.","Voici votre tableau de bord."],["Mensagens enviadas","Messages sent","Messages envoyés"],
["Mentores","Mentors","Mentors"],["Mentores que te podem ajudar na candidatura.","Mentors who can help with your application.","Des mentors pour vous aider dans votre candidature."],["Enviar","Send","Envoyer"],["O meu perfil","My profile","Mon profil"],["Terminar sessão","Log out","Se déconnecter"],
["Painel de administração","Admin dashboard","Tableau de bord admin"],["Utilizadores","Users","Utilisateurs"],["Subscritores","Subscribers","Abonnés"],["Bolsas por país","Scholarships by country","Bourses par pays"],["Últimos utilizadores","Latest users","Derniers utilisateurs"],["Nova bolsa","New scholarship","Nouvelle bourse"],["Criar bolsa","Create scholarship","Créer la bourse"],["Remover","Remove","Supprimer"],["Título","Title","Titre"],["País","Country","Pays"],["Descrição","Description","Description"],
["Newsletter de bolsas","Scholarship newsletter","Newsletter des bourses"],["Recebe as novas bolsas e prazos no teu email.","Get new scholarships and deadlines by email.","Recevez les nouvelles bourses par e-mail."],["Subscrever","Subscribe","S'abonner"],["Todos os direitos reservados.","All rights reserved.","Tous droits réservés."],
["Novas bolsas externas","New external scholarships","Nouvelles bourses à l'étranger"],["Portugal, Hungria, Itália, Brasil e mais destinos.","Portugal, Hungary, Italy, Brazil and more.","Portugal, Hongrie, Italie, Brésil et plus."],["Fala com um mentor","Talk to a mentor","Parlez à un mentor"],["Prepara a tua candidatura com apoio de orientadores.","Prepare your application with expert support.","Préparez votre candidature avec de l'aide."],["Guarda as tuas favoritas","Save your favourites","Gardez vos favorites"],["Acompanha as bolsas que te interessam no teu painel.","Follow the scholarships you like on your dashboard.","Suivez vos bourses préférées."]];
var DICT={en:{},fr:{}}; R.forEach(function(r){DICT.en[r[0]]=r[1];DICT.fr[r[0]]=r[2];});
var seen=new WeakMap(), obs, tm;
function trNode(n){
  var s=seen.get(n),cur=n.data,orig=(s&&s.t===cur)?s.o:cur,key=orig.trim();
  var tr=LANG==="pt"?null:DICT[LANG][key], out=tr?orig.replace(key,tr):orig;
  if(out!==cur) n.data=out; seen.set(n,{o:orig,t:out});
}
function run(){
  obs.disconnect();
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;
  while(n=w.nextNode()){ var p=n.parentNode.nodeName; if(p!=="SCRIPT"&&p!=="STYLE"&&p!=="OPTION") trNode(n); }
  obs.observe(document.body,{childList:true,subtree:true,characterData:true});
}

// ---- newsletter + slider + rodapé + seletor de idioma ----
var SL=[["🎓","Novas bolsas externas","Portugal, Hungria, Itália, Brasil e mais destinos.","linear-gradient(135deg,#F26B21,#1f3a5f)"],["🧭","Fala com um mentor","Prepara a tua candidatura com apoio de orientadores.","linear-gradient(135deg,#1f3a5f,#4a4f57)"],["💡","Guarda as tuas favoritas","Acompanha as bolsas que te interessam no teu painel.","linear-gradient(135deg,#4a4f57,#F26B21)"]];
window.addEventListener("load",function(){
  var nav=document.getElementById("nav"), sel=document.createElement("select");
  sel.className="lang"; sel.innerHTML='<option value="pt">🌐 PT</option><option value="en">EN</option><option value="fr">FR</option>'; sel.value=LANG;
  sel.onchange=function(){ LANG=sel.value; try{localStorage.setItem("lang",LANG);}catch(e){} document.documentElement.lang=LANG; run(); };
  nav.appendChild(sel);
  if((usuarioAtual()||document.querySelector(".wide")) && !/chat\.html/.test(location.pathname)){
    document.body.insertAdjacentHTML("beforeend",'<section class="news"><div class="news-in"><div class="slides">'+
      SL.map(function(s,i){return '<div class="sl'+(i?"":" on")+'" style="--g:'+s[3]+'"><span>'+s[0]+'</span><h3>'+s[1]+'</h3><p>'+s[2]+'</p></div>'}).join("")+
      '<div class="dots">'+SL.map(function(s,i){return '<i class="'+(i?"":"on")+'"></i>'}).join("")+'</div></div>'+
      '<form class="nl" id="nl"><h2>Newsletter de bolsas</h2><p class="mut">Recebe as novas bolsas e prazos no teu email.</p><input type="email" required placeholder="email@exemplo.com"><button class="btn full">Subscrever</button></form></div></section>');
    var sl=document.querySelectorAll(".sl"),dt=document.querySelectorAll(".dots i"),k=0;
    function ir(i){ sl[k].classList.remove("on"); dt[k].classList.remove("on"); k=i; sl[k].classList.add("on"); dt[k].classList.add("on"); }
    dt.forEach(function(d,i){d.onclick=function(){ir(i)}}); setInterval(function(){ir((k+1)%sl.length)},4000);
    document.getElementById("nl").onsubmit=function(e){ e.preventDefault(); var inp=e.target.querySelector("input"), l=[];
      try{l=JSON.parse(localStorage.getItem("newsletter")||"[]"); l.push(inp.value); localStorage.setItem("newsletter",JSON.stringify(l));}catch(x){}
      inp.value=""; toast("Subscrição feita! Obrigado."); };
  }
  document.body.insertAdjacentHTML("beforeend",'<footer><div class="ft3"><div><b>ISPTEC · Bolsas</b><span>Plataforma de bolsas de estudo.</span></div><div><b>Plataforma</b><a href="index.html">Início</a><a href="bolsas.html">Bolsas</a><a href="mentorias.html">Mentorias</a></div><div><b>Candidatos</b><a href="index.html#como">Como candidatar-se</a><a href="cadastro.html">Criar conta</a><a href="login.html">Entrar</a></div><div><b>Contacto</b><span>contacto@exemplo.com</span><span>+244 000 000 000</span></div></div><div class="ft2">© 2026 · Todos os direitos reservados.</div></footer>');
  obs=new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(run,30)}); run();
});

// ---- países: bandeira, cidade da foto e nome do ficheiro em img/ ----
var PAISES={"Angola":["🇦🇴","Luanda"],"Portugal":["🇵🇹","Lisboa"],"Hungria":["🇭🇺","Budapeste"],"Itália":["🇮🇹","Milão"],"Brasil":["🇧🇷","Brasília"],"África do Sul":["🇿🇦","Cidade do Cabo"],"Namíbia":["🇳🇦","Windhoek"],"França":["🇫🇷","Paris"],"Estados Unidos":["🇺🇸","Washington"]};
function paisInfo(p){ var x=PAISES[p]||["🌍",""]; return {flag:x[0],cap:x[1],img:p.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g,"-")}; }
[["Saiba mais","Learn more","En savoir plus"],["Meu painel","My dashboard","Mon tableau de bord"],["Como candidatar-se","How to apply","Comment postuler"],["Informações para candidatos","Information for applicants","Infos pour les candidats"],["Links úteis","Useful links","Liens utiles"],["Ver todas as bolsas","See all scholarships","Voir toutes les bourses"],["Falar com mentores","Talk to mentors","Parler aux mentors"],["Países","Countries","Pays"],["Plataforma","Platform","Plateforme"],["Candidatos","Applicants","Candidats"],["Contacto","Contact","Contact"],["Cria a tua conta","Create your account","Créez votre compte"],["Escolhe a bolsa","Pick a scholarship","Choisissez une bourse"],["Prepara a candidatura","Prepare your application","Préparez votre candidature"]].forEach(function(r){DICT.en[r[0]]=r[1];DICT.fr[r[0]]=r[2];});
