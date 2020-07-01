let posicao={

}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.target.style.opacity=0.1
}

function calculatePosition(){

}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let bolinha =document.getElementById(data)
  let antigo = bolinha.parentNode
  let novo = ev.target
  
  while (antigo.firstChild) {
    antigo.removeChild(antigo.lastChild);
  }
  bolinha.style.opacity=1

  if(!novo.className.includes('item')){
    alert('Epa menino, joga fora as peça não')
    antigo.appendChild(bolinha)
    return
  }
  if(novo.className.includes('bolinha') || (!(novo.childNodes.length === 0))){
    alert('opa, já há uma dama nesta posiçao, escolha outra')
    antigo.appendChild(bolinha)
    return
  }
  
  if(novo.className.split(" ")[1] != antigo.className.split(" ")[1])
  {
    alert('Ande na diagonal')
    antigo.appendChild(bolinha)
    return
  }
 


  novo.appendChild(bolinha);
  
  
  
}
