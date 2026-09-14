let total = 0;
let corridaIniciada = false;
let modoNoturno = false;

let botaoIniciar = document.querySelector("#iniciarCorrida");
let botaoPedagio = document.querySelector("#adicionarPedagio");
let botaoEspera = document.querySelector("#adicionarEspera");
let botaoReiniciar = document.querySelector("#reiniciar");
let botaoTema = document.querySelector("#alternarTema");
let valorFinal = document.querySelector("#valorFinal");
let detalhesValor = document.querySelector("#detalhesValor");
let aviso = document.querySelector("#aviso");
let estadoCorrida = document.querySelector("#estadoCorrida");
let mapa = document.querySelector("#mapa");
let campoValorKm = document.querySelector("#valorKm");
let campoValorMinuto = document.querySelector("#valorMinuto");

function mostrarTotal() {
  valorFinal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function iniciarCorrida() {
  if (corridaIniciada == false) {
    let valorKm = Number(campoValorKm.value.replace(",", "."));
    let valorMinuto = Number(campoValorMinuto.value.replace(",", "."));

    if (valorKm > 0 && valorMinuto > 0) {
      total = valorKm * 8 + valorMinuto * 20;
      corridaIniciada = true;
      estadoCorrida.textContent = "EM TRAJETO";
      estadoCorrida.classList.add("ativo");
      mapa.classList.add("em-viagem");
      botaoIniciar.textContent = "Finalizar trajeto";
      campoValorKm.disabled = true;
      campoValorMinuto.disabled = true;
      detalhesValor.textContent = "8 km × R$ " + valorKm.toFixed(2).replace(".", ",") + " + 20 min × R$ " + valorMinuto.toFixed(2).replace(".", ",");
      aviso.textContent = "Trajeto iniciado. Pare o carro para adicionar uma cobrança.";
      mostrarTotal();
    }

    if (valorKm <= 0 || valorMinuto <= 0) {
      aviso.textContent = "Digite um valor maior que zero para o km e para o minuto.";
      campoValorKm.focus();
    }
  }
}

function finalizarCorrida() {
  corridaIniciada = false;
  estadoCorrida.textContent = "PARADO";
  estadoCorrida.classList.remove("ativo");
  mapa.classList.remove("em-viagem");
  botaoIniciar.textContent = "Calcular e iniciar trajeto";
  campoValorKm.disabled = false;
  campoValorMinuto.disabled = false;
  aviso.textContent = "Carro parado. Agora você pode adicionar pedágio ou espera.";
}

function alternarTrajeto() {
  if (corridaIniciada == false) {
    iniciarCorrida();
  } else {
    finalizarCorrida();
  }
}

function adicionarPedagio() {
  if (corridaIniciada == true) {
    aviso.textContent = "Pare o trajeto antes de adicionar uma cobrança.";
  }
  if (corridaIniciada == false && total > 0) {
    total = total + 6.5;
    aviso.textContent = "Pedágio de R$ 6,50 adicionado.";
    detalhesValor.textContent = "Corrida e valores adicionais incluídos.";
    mostrarTotal();
  }
  if (corridaIniciada == false && total == 0) {
    aviso.textContent = "Primeiro, toque em Iniciar trajeto.";
  }
}

function adicionarEspera() {
  if (corridaIniciada == true) {
    aviso.textContent = "Pare o trajeto antes de adicionar uma cobrança.";
  }
  if (corridaIniciada == false && total > 0) {
    total = total + 5;
    aviso.textContent = "Espera de R$ 5,00 adicionada.";
    detalhesValor.textContent = "Corrida e valores adicionais incluídos.";
    mostrarTotal();
  }
  if (corridaIniciada == false && total == 0) {
    aviso.textContent = "Primeiro, toque em Iniciar trajeto.";
  }
}

function alternarTema() {
  if (modoNoturno == false) {
    document.body.classList.add("noturno");
    botaoTema.innerHTML = "<span aria-hidden=\"true\">☀</span> Modo diurno";
    botaoTema.setAttribute("aria-pressed", "true");
    modoNoturno = true;
  } else {
    document.body.classList.remove("noturno");
    botaoTema.innerHTML = "<span aria-hidden=\"true\">☾</span> Modo noturno";
    botaoTema.setAttribute("aria-pressed", "false");
    modoNoturno = false;
  }
}

function comecarDeNovo() {
  total = 0;
  corridaIniciada = false;
  estadoCorrida.textContent = "PARADO";
  estadoCorrida.classList.remove("ativo");
  mapa.classList.remove("em-viagem");
  botaoIniciar.textContent = "Calcular e iniciar trajeto";
  campoValorKm.disabled = false;
  campoValorMinuto.disabled = false;
  campoValorKm.value = "";
  campoValorMinuto.value = "";
  detalhesValor.textContent = "Aguardando o início do trajeto.";
  aviso.textContent = "Inicie o trajeto para adicionar valores.";
  mostrarTotal();
}

botaoIniciar.addEventListener("click", alternarTrajeto);
botaoPedagio.addEventListener("click", adicionarPedagio);
botaoEspera.addEventListener("click", adicionarEspera);
botaoTema.addEventListener("click", alternarTema);
botaoReiniciar.addEventListener("click", comecarDeNovo);
