(function(){
  var u=exigirAluno(); if(!u) return;
  var b=Api.listarBolsas(), f=favs(), ms=Api.listarMentorias(), env=0;
  ms.forEach(function(m){try{env+=JSON.parse(localStorage.getItem("chat_"+u.id+"_"+m.id)||"[]").filter(function(x){return x.eu}).length}catch(e){}});
  var g=b.filter(function(x){return f.indexOf(x.id)>-1}), st=[["Bolsas disponíveis",b.length],["Guardadas",g.length],["Mensagens enviadas",env],["Mentores",ms.length]];
  document.getElementById("app").innerHTML='<h1>Olá, '+esc(nomeDe(u))+' 👋</h1><p class="sub">Este é o teu painel.</p>'+
    '<div class="stats">'+st.map(function(s){return '<div class="card stat"><b>'+s[1]+'</b>'+s[0]+'</div>'}).join("")+'</div>'+
    '<h2>Guardadas</h2>'+(g.length?'<div class="cards">'+g.map(bolsaCard).join("")+'</div>':'<p class="mut">♡</p>')+
    '<h2 style="margin-top:22px">Recomendadas para ti</h2><div class="cards">'+b.slice(0,3).map(bolsaCard).join("")+'</div>';
})();
