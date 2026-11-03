(function(){
  var u=usuarioAtual(); montarNav(u);
  var b=Api.listarBolsas(), ms=Api.listarMentorias();
  var G=["linear-gradient(135deg,#F26B21,#1f3a5f)","linear-gradient(135deg,#1f3a5f,#4a4f57)","linear-gradient(135deg,#4a4f57,#F26B21)"];
  var paises={}, idade=0; b.forEach(function(x){paises[x.pais]=1; idade=Math.max(idade,x.idadeMax);});
  var slides=b.map(function(x,i){ var p=paisInfo(x.pais);
    return '<div class="hs'+(i?"":" on")+'" style="background-image:url(\'img/'+p.img+'.jpg\'),'+G[i%3]+'"><div class="fl">'+p.flag+'</div><div class="tx"><span class="pill">'+esc(x.pais)+(p.cap?' · '+esc(p.cap):'')+'</span><h1>'+esc(x.titulo)+'</h1><p>'+esc(x.descricao)+'</p><a class="btn" href="bolsa-detalhes.html?id='+x.id+'">Saiba mais</a></div></div>'; }).join("");
  var st=[["Bolsas",b.length],["Países",Object.keys(paises).length],["Mentores",ms.length]];
  var pass=[["Cria a tua conta","Regista-te na plataforma."],["Escolhe a bolsa","Vê os detalhes de cada bolsa."],["Fala com um mentor","Tira dúvidas no chat."],["Prepara a candidatura","Reúne o que a bolsa pede."]];
  var inf=[["Quem pode candidatar-se","As bolsas atuais têm limite de idade até "+idade+" anos. Confirma os requisitos de cada uma em Saiba mais."],["Antes de começar","Cria a tua conta, escolhe a bolsa e prepara os documentos que ela exigir."],["Precisas de ajuda?","Fala com um mentor dentro da plataforma para tirares as tuas dúvidas."]];
  var lk=[["Ver todas as bolsas","bolsas.html"],["Falar com mentores","mentorias.html"],u?["Meu painel",u.tipo==="admin"?"admin.html":"dashboard.html"]:["Criar conta","cadastro.html"]];
  document.getElementById("app").innerHTML=
    '<div class="hero">'+(slides||'')+'<button class="ar l" aria-label="Anterior">‹</button><button class="ar r" aria-label="Seguinte">›</button><div class="dots">'+b.map(function(x,i){return '<i class="'+(i?"":"on")+'"></i>'}).join("")+'</div></div>'+
    '<div class="sec"><div class="stats">'+st.map(function(s){return '<div class="card stat"><b data-n="'+s[1]+'">0</b>'+s[0]+'</div>'}).join("")+'</div></div>'+
    '<div class="sec" id="como"><h2>Como candidatar-se</h2><div class="cards">'+pass.map(function(s,i){return '<div class="card"><b class="num">'+(i+1)+'</b><h2>'+s[0]+'</h2><p class="mut">'+s[1]+'</p></div>'}).join("")+'</div></div>'+
    '<div class="sec"><h2>Informações para candidatos</h2><div class="cards">'+inf.map(function(s){return '<div class="card hv"><h2>'+s[0]+'</h2><p class="mut">'+s[1]+'</p></div>'}).join("")+'</div></div>'+
    '<div class="sec"><h2>Links úteis</h2><div class="row">'+lk.map(function(l){return '<a class="btn" href="'+l[1]+'" style="text-align:center">'+l[0]+'</a>'}).join("")+'</div></div>';
  document.querySelectorAll("[data-n]").forEach(function(e){var n=+e.dataset.n,t0=null;(function f(ts){t0=t0||ts;var p=Math.min((ts-t0)/1200,1);e.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f);})(performance.now());});
  var sl=document.querySelectorAll(".hs"),dt=document.querySelectorAll(".hero .dots i"),k=0,tm,hero=document.querySelector(".hero");
  if(!sl.length) return;
  function ir(i){sl[k].classList.remove("on");dt[k].classList.remove("on");k=(i+sl.length)%sl.length;sl[k].classList.add("on");dt[k].classList.add("on");}
  function auto(){tm=setInterval(function(){ir(k+1)},5000);}
  dt.forEach(function(d,i){d.onclick=function(){ir(i)}});
  hero.querySelector(".l").onclick=function(){ir(k-1)}; hero.querySelector(".r").onclick=function(){ir(k+1)};
  hero.onmouseenter=function(){clearInterval(tm)}; hero.onmouseleave=auto; auto();
})();
