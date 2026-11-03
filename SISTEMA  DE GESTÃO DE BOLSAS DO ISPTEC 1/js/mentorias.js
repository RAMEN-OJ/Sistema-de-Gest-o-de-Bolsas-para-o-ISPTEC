(function(){
  if(!exigirAluno()) return;
  document.getElementById("lista").innerHTML=Api.listarMentorias().map(function(m){
    return '<div class="card"><div class="mh">'+avatar(m)+'<div><h2 style="margin:0">'+esc(m.mentor)+'</h2><span class="tag">'+esc(m.area||m.tipoBolsa)+'</span></div></div>'+
      '<p class="mut">'+esc(m.bio||"")+'</p><p><b>'+esc(m.preco)+'</b></p><a class="btn" href="chat.html?id='+m.id+'">Falar com mentor</a></div>';
  }).join("");
})();
