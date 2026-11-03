(function(){
  var u=exigirAluno(); if(!u) return;
  var id=parseInt(new URLSearchParams(location.search).get("id"),10);
  var m=Api.listarMentorias().find(function(x){return x.id===id});
  if(!m){document.getElementById("app").innerHTML='<div class="center"><div class="big">404</div><h1>Mentor não encontrado</h1></div>';return;}
  var K="chat_"+u.id+"_"+id, box=document.getElementById("msgs"), msgs=[];
  try{msgs=JSON.parse(localStorage.getItem(K)||"[]")}catch(e){}
  if(!msgs.length) msgs=[{eu:false,t:"Olá! Sou "+m.mentor+". Como posso ajudar com a tua candidatura?"}];
  document.getElementById("topo").innerHTML=avatar(m)+'<div><h2 style="margin:0">'+esc(m.mentor)+'</h2><span class="mut">'+esc(m.area||"")+'</span></div>';
  function save(){try{localStorage.setItem(K,JSON.stringify(msgs))}catch(e){}}
  function draw(){box.innerHTML=msgs.map(function(x){return '<div class="m '+(x.eu?"eu":"el")+'">'+esc(x.t)+'</div>'}).join("");box.scrollTop=box.scrollHeight;}
  var R=["Boa pergunta! Podes enviar-me mais detalhes?","Vamos ver os requisitos da bolsa juntos.","Recomendo preparares primeiro a carta de motivação.","Posso rever o teu currículo, se quiseres."];
  document.getElementById("f").addEventListener("submit",function(e){
    e.preventDefault(); var i=document.getElementById("t"), v=i.value.trim(); if(!v) return;
    msgs.push({eu:true,t:v}); i.value=""; save(); draw();
    setTimeout(function(){msgs.push({eu:false,t:R[Math.floor(Math.random()*R.length)]});save();draw()},1100);
  });
  draw();
})();
