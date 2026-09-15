// ===== Estado geral do app =====
// Variáveis que guardam os valores que mudam durante o uso. Como este script é uma
// versão simples (sem framework), o estado vive em variáveis globais que as funções relêem.
let total = 0;               // Valor acumulado da corrida, em reais.
let corridaIniciada = false; // true quando o táxi está em trajeto; false quando está parado.
let modoNoturno = false;     // true quando o tema escuro está ativo.

// ===== Referências aos elementos do HTML =====
// document.querySelector recebe um seletor CSS (aqui, o id com #) e devolve o elemento
// correspondente. Guardamos cada um numa variável para não precisar procurá-lo de novo.
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

// Atualiza o texto do elemento <output> com o total formatado como moeda brasileira.
// Ex.: total = 50.5 vira "R$ 50,50". toLocaleString("pt-BR") aplica as regras de
// formatação de dinheiro do Brasil (vírgula como separador decimal).
function mostrarTotal() {
  valorFinal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",   // formata como dinheiro
    currency: "BRL"      // moeda: real brasileiro
  });
}

// Lê as tarifas digitadas, valida e, se forem maiores que zero, calcula o total e
// inicia o trajeto. Os números "8" e "20" são os valores fixos simulados (8 km e 20 min).
function iniciarCorrida() {
  // Só inicia se ainda não estiver em trajeto; evita recalcular com um segundo clique.
  if (corridaIniciada == false) {
    // O input chega como texto; Number() converte em número e replace troca a vírgula
    // "3,50" por ponto "3.50", que é o formato decimal que o JavaScript entende.
    let valorKm = Number(campoValorKm.value.replace(",", "."));
    let valorMinuto = Number(campoValorMinuto.value.replace(",", "."));

    // Validação: os dois valores precisam ser maiores que zero para a corrida começar.
    if (valorKm > 0 && valorMinuto > 0) {
      // Cálculo do total: distância fixa (8 km × valor por km) + tempo fixo (20 min × valor por minuto).
      total = valorKm * 8 + valorMinuto * 20;
      corridaIniciada = true;

      // Mudanças visuais: selo, mapa, botão e campos.
      estadoCorrida.textContent = "EM TRAJETO";
      estadoCorrida.classList.add("ativo");          // ativa a cor verde do selo definida no CSS
      mapa.classList.add("em-viagem");               // anima o carro se movendo no mapa
      botaoIniciar.textContent = "Finalizar trajeto"; // troca o texto do botão principal
      campoValorKm.disabled = true;                  // bloqueia a digitação durante o trajeto
      campoValorMinuto.disabled = true;

      // Detalhe da conta: mostra o cálculo com vírgula no lugar do ponto (3,25 em vez de 3.25).
      detalhesValor.textContent = "8 km × R$ " + valorKm.toFixed(2).replace(".", ",") + " + 20 min × R$ " + valorMinuto.toFixed(2).replace(".", ",");
      aviso.textContent = "Trajeto iniciado. Pare o carro para adicionar uma cobrança.";
      mostrarTotal(); // atualiza o valor exibido no resumo
    }

    // Se algum valor for zero ou negativo, orienta o motorista e devolve o foco ao campo.
    if (valorKm <= 0 || valorMinuto <= 0) {
      aviso.textContent = "Digite um valor maior que zero para o km e para o minuto.";
      campoValorKm.focus(); // coloca o cursor no campo para facilitar a correção
    }
  }
}

// Para o trajeto: volta a tela ao estado "parado" e reabilita os campos e as cobranças.
function finalizarCorrida() {
  corridaIniciada = false;
  estadoCorrida.textContent = "PARADO";
  estadoCorrida.classList.remove("ativo");      // tira a cor verde do selo
  mapa.classList.remove("em-viagem");           // o carro volta ao início do mapa
  botaoIniciar.textContent = "Calcular e iniciar trajeto";
  campoValorKm.disabled = false;                // reabilita a digitação
  campoValorMinuto.disabled = false;
  aviso.textContent = "Carro parado. Agora você pode adicionar pedágio ou espera.";
}

// Decide qual ação executar ao clicar no botão principal, dependendo do estado atual.
// Um único botão funciona como "ligar/desligar" (toggle).
function alternarTrajeto() {
  if (corridaIniciada == false) {
    iniciarCorrida();
  } else {
    finalizarCorrida();
  }
}

// Soma a cobrança de pedágio (+ R$ 6,50) ao total, mas só com o carro PARADO e a
// corrida já calculada (total > 0). As três condições abaixo cobrem os três casos possíveis.
function adicionarPedagio() {
  // Caso 1: o carro está em trajeto — não pode cobrar.
  if (corridaIniciada == true) {
    aviso.textContent = "Pare o trajeto antes de adicionar uma cobrança.";
  }
  // Caso 2: carro parado e corrida calculada — soma e atualiza a tela.
  if (corridaIniciada == false && total > 0) {
    total = total + 6.5;
    aviso.textContent = "Pedágio de R$ 6,50 adicionado.";
    detalhesValor.textContent = "Corrida e valores adicionais incluídos.";
    mostrarTotal();
  }
  // Caso 3: corrida ainda não foi calculada (total 0) — primeiro é preciso iniciar.
  if (corridaIniciada == false && total == 0) {
    aviso.textContent = "Primeiro, toque em Iniciar trajeto.";
  }
}

// Mesmo comportamento de adicionarPedagio, mas com a cobrança de espera (+ R$ 5,00).
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

// Alterna entre os temas claro/noturno ajustando o <body>, o texto e o ícone do botão.
function alternarTema() {
  if (modoNoturno == false) {
    document.body.classList.add("noturno"); // a classe .noturno no CSS aplica as cores escuras
    botaoTema.innerHTML = "<span aria-hidden=\"true\">☀</span> Modo diurno";
    botaoTema.setAttribute("aria-pressed", "true"); // marca o botão como "pressionado"
    modoNoturno = true;
  } else {
    document.body.classList.remove("noturno");
    botaoTema.innerHTML = "<span aria-hidden=\"true\">☾</span> Modo noturno";
    botaoTema.setAttribute("aria-pressed", "false");
    modoNoturno = false;
  }
}

// Zera a corrida: restaura todos os elementos ao estado inicial da tela.
function comecarDeNovo() {
  total = 0;
  corridaIniciada = false;
  estadoCorrida.textContent = "PARADO";
  estadoCorrida.classList.remove("ativo");
  mapa.classList.remove("em-viagem");
  botaoIniciar.textContent = "Calcular e iniciar trajeto";
  campoValorKm.disabled = false;
  campoValorMinuto.disabled = false;
  campoValorKm.value = "";        // apaga o texto digitado
  campoValorMinuto.value = "";
  detalhesValor.textContent = "Aguardando o início do trajeto.";
  aviso.textContent = "Inicie o trajeto para adicionar valores.";
  mostrarTotal();
}

// ===== Ligação dos eventos =====
// addEventListener associa cada botão à função que deve executar quando houver clique.
// O navegador chama a função automaticamente a cada clique no elemento.
botaoIniciar.addEventListener("click", alternarTrajeto);
botaoPedagio.addEventListener("click", adicionarPedagio);
botaoEspera.addEventListener("click", adicionarEspera);
botaoTema.addEventListener("click", alternarTema);
botaoReiniciar.addEventListener("click", comecarDeNovo);