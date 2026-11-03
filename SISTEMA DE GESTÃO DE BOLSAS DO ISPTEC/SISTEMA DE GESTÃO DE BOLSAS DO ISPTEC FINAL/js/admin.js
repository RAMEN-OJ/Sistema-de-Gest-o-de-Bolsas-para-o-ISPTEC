(function(){
  var u=exigirAdmin(); if(!u) return;
  var b=Api.listarBolsas(), us=Api.listarUsuario(), subs=0;
  try{subs=JSON.parse(localStorage.getItem("newsletter")||"[]").length}catch(e){}
  var por={}; b.forEach(function(x){por[x.pais]=(por[x.pais]||0)+1});
  var ks=Object.keys(por), cores=["var(--or)","var(--nv)","var(--gr)"];
  var bars=ks.map(function(k,i){return '<div class="bar"><span>'+esc(k)+'</span><div class="t"><i style="width:'+(por[k]/Math.max(1,b.length)*100*Math.min(ks.length,4)/ Math.min(ks.length,4))+'%;background:'+cores[i%3]+'"></i></div><em>'+por[k]+'</em></div>'}).join("");
  var rows=us.slice(-5).reverse().map(function(x){return '<tr><td>'+esc(nomeDe(x))+'</td><td>'+esc(x.email)+'</td><td>'+esc(x.tipo)+'</td></tr>'}).join("");
  var st=[["Bolsas",b.length],["Utilizadores",us.length],["Mentores",Api.listarMentorias().length],["Subscritores",subs]];
  document.getElementById("app").innerHTML='<h1>Painel de administração</h1><p class="sub">Bem-vindo, '+esc(nomeDe(u))+'.</p>'+
    '<div class="stats">'+st.map(function(s){return '<div class="card stat"><b>'+s[1]+'</b>'+s[0]+'</div>'}).join("")+'</div>'+
    '<div class="row"><div class="card"><h2>Bolsas por país</h2>'+bars+'</div><div class="card tw"><h2>Últimos utilizadores</h2><table><tbody>'+rows+'</tbody></table></div></div>'+
    '<p style="margin-top:16px"><a class="btn" href="admin-bolsas.html">Gerir bolsas</a></p>';
})();
