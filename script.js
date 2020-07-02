let posicao = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.target.style.opacity = 0.1
}

function validaPosicao(posicao) {
  if(document.getElementById(posicao) != null){
  return true
  } 
  return false
}


function validaPonto(time, posicao, prox) {
  let time_=""
  let t=document.getElementById(posicao).childNodes
  for(let a in t){
    if(!!t[a].className)
    time_=t[a].className.split(" ")[1]
  }
  if ((document.getElementById(posicao)!=null) && (document.getElementById(prox) !=null)) {
    if ((document.getElementById(posicao).childNodes.length > 0) && (document.getElementById(prox).childNodes.length == 0)) {
      if(time_!=time)
        return true
     
    }
  }
    return false


}

function calculatePositionRed(antigo) {
  let letra = antigo.split('')[0]
  let numero = Number(antigo.split('')[1])
  let response = []
  let proxLetra = posicao.indexOf(letra) + 1
  let pos1 = posicao[proxLetra] + (numero + 1)
  let pos2 = posicao[proxLetra] + (numero - 1)
  let proxPos1 = posicao[proxLetra + 1] + (numero + 2)
  let proxPos2 = posicao[proxLetra + 1] + (numero - 2)
  if (validaPosicao(pos1) && validaPosicao(pos2)) {
    if (validaPonto('red', pos1, proxPos1)) {
      response.push(proxPos1)
      response.push({pos:proxPos1,remove:pos1})
    }
    else {
      response.push(pos1)
    }

    if (validaPonto('red', pos2, proxPos2)) {
      response.push(proxPos2)
      response.push({pos:proxPos2,remove:pos2})
    }
    else {
      response.push(pos2)
    }

  }
  else if (validaPosicao(pos1)) {
    if (validaPonto('red', pos1, proxPos1)) {
      response.push(proxPos1)
      response.push({pos:proxPos1,remove:pos1})
    }
    else {
      response.push(pos1)
    }
  }
  else if (validaPosicao(pos2)) {
    if (validaPonto('red', pos2, proxPos2)) {
      response.push(proxPos2)
      response.push({pos:proxPos2,remove:pos2})
    }
    else {
      response.push(pos2)
    }
  }

  return response
}

function calculatePositionBlue(antigo) {
  let letra = antigo.split('')[0]
  let numero = Number(antigo.split('')[1])
  let response = []
  let proxLetra = posicao.indexOf(letra) - 1
  let pos1 = posicao[proxLetra] + (numero - 1)
  let pos2 = posicao[proxLetra] + (numero + 1)
  let proxPos1 = posicao[proxLetra - 1] + (numero - 2)
  let proxPos2 = posicao[proxLetra - 1] + (numero + 2)
  if (validaPosicao(pos1) && validaPosicao(pos2)) {
    if (validaPonto('blue', pos1, proxPos1)) {
      response.push(proxPos1)
      response.push({pos:proxPos1,remove:pos1})
    }
    else {
      response.push(pos1)
    }

    if (validaPonto('blue', pos2, proxPos2)) {
      response.push(proxPos2)
      response.push({pos:proxPos2,remove:pos2})
    }
    else {
      response.push(pos2)
    }

  }
  else if (validaPosicao(pos1)) {
    if (validaPonto('blue', pos1, proxPos1)) {
      response.push(proxPos1)
      response.push({pos:proxPos1,remove:pos1})
    }
    else {
      response.push(pos1)
    }
  }
  else if (validaPosicao(pos2)) {
    if (validaPonto('blue', pos2, proxPos2)) {
      response.push(proxPos2)
      response.push({pos:proxPos2,remove:pos2})
    }
    else {
      response.push(pos2)
    }
  }

  return response
}


function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let bolinha = document.getElementById(data)
  let time = bolinha.className.split(' ')[1]
  bolinha.style.opacity = 1
  let antigo = bolinha.parentNode
  let novo = ev.target
  let proximas = []
  let remove = ''

  if (novo.parentNode === antigo)
    return

  if (novo.className.includes('bolinha') || (!(novo.childNodes.length === 0))) {
    alert('opa, já há uma dama nesta posiçao, escolha outra')
    antigo.appendChild(bolinha)
    return
  }

  if (time === "red") {
    proximas = calculatePositionRed(antigo.id)
  }
  else {
    proximas = calculatePositionBlue(antigo.id)
  }


  for (let p in proximas) {
    if (typeof (proximas[p]) != 'object') {
      if (proximas.indexOf(novo.id) == -1) {
        alert('movimento Inválido')
        antigo.appendChild(bolinha)
        return
      }
    } else {
      if(proximas[p].pos===novo.id)
      remove=proximas[p].remove
    }

  }



  novo.appendChild(bolinha);
  while (antigo.firstChild) {
    antigo.removeChild(antigo.lastChild);
  }
  if (!!remove) {
    let divRemove = document.getElementById(remove)
    while (divRemove.firstChild) {
      divRemove.removeChild(divRemove.lastChild);
    }
  }



}
