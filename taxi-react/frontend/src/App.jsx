import { useState } from 'react'
import Topo from './componentes/Topo'
import Trajeto from './componentes/Trajeto'
import Adicionais from './componentes/Adicionais'
import Resumo from './componentes/Resumo'
import adicionais from './dados/adicionais'
import './estilo.css'

function App() {
  // Cada useState guarda uma informacao que pode mudar e causar uma atualizacao da tela.
  // O primeiro nome e o valor atual; o segundo e a funcao usada para alterar esse valor.
  const [modoNoturno, setModoNoturno] = useState(false)
  const [corridaIniciada, setCorridaIniciada] = useState(false)
  // Os campos comecam como texto vazio porque tudo que o usuario digita em um input chega como texto.
  const [valorKm, setValorKm] = useState('')
  const [valorMinuto, setValorMinuto] = useState('')
  const [total, setTotal] = useState(0)
  // Aviso orienta a proxima acao; detalhes explica como o valor exibido foi formado.
  const [aviso, setAviso] = useState('Inicie o trajeto para adicionar valores.')
  const [detalhes, setDetalhes] = useState('Aguardando o inicio do trajeto.')

  // O input entrega "2,50" como texto. O calculo precisa de 2.50 como numero.
  function converterValor(valor) {
    return Number(valor.replace(',', '.'))
  }

  function alternarTema() {
    // O sinal ! inverte o valor: false vira true e true vira false.
    setModoNoturno(!modoNoturno)
  }

  function iniciarCorrida() {
    // Antes de calcular, os dois textos digitados sao convertidos em numeros.
    const numeroKm = converterValor(valorKm)
    const numeroMinuto = converterValor(valorMinuto)

    // && significa "e": os dois valores precisam ser maiores que zero.
    if (numeroKm > 0 && numeroMinuto > 0) {
      // O total soma o custo dos 8 km ao custo dos 20 minutos fixos do trajeto.
      setTotal(numeroKm * 8 + numeroMinuto * 20)
      // Ao mudar este estado, status, mapa, campos e botao principal mudam juntos.
      setCorridaIniciada(true)
      // A crase permite colocar valores dentro do texto usando ${}.
      setDetalhes(`8 km x R$ ${numeroKm.toFixed(2).replace('.', ',')} + 20 min x R$ ${numeroMinuto.toFixed(2).replace('.', ',')}`)
      setAviso('Trajeto iniciado. Pare o carro para adicionar uma cobranca.')
    } else {
      // Se algum valor for vazio, zero ou invalido, a corrida nao comeca.
      setAviso('Digite um valor maior que zero para o km e para o minuto.')
    }
  }

  function finalizarTrajeto() {
    // A persona adiciona cobrancas com o carro parado; por isso o estado volta para false.
    setCorridaIniciada(false)
    setAviso('Carro parado. Agora voce pode adicionar pedagio ou espera.')
  }

  function adicionarValor(valor, nome) {
    // !corridaIniciada quer dizer "corrida nao iniciada", ou seja, carro parado.
    // total > 0 confirma que uma corrida ja foi calculada antes de aceitar adicionais.
    if (!corridaIniciada && total > 0) {
      // O novo total usa o valor anterior mais o adicional recebido pelo clique.
      setTotal(total + valor)
      setDetalhes('Corrida e valores adicionais incluidos.')
      setAviso(`${nome} adicionado.`)
    } else if (corridaIniciada) {
      // Este caso protege a regra da persona, mesmo que a funcao seja chamada durante o trajeto.
      setAviso('Pare o trajeto antes de adicionar uma cobranca.')
    } else {
      // Este ultimo caso acontece quando ainda nao existe uma corrida calculada.
      setAviso('Primeiro, calcule e inicie o trajeto.')
    }
  }

  function comecarDeNovo() {
    // Todos os estados voltam aos mesmos valores usados quando a pagina foi aberta.
    setTotal(0)
    setCorridaIniciada(false)
    setValorKm('')
    setValorMinuto('')
    setDetalhes('Aguardando o inicio do trajeto.')
    setAviso('Inicie o trajeto para adicionar valores.')
  }

  return (
    /* A expressao condicao ? valor1 : valor2 escolhe a classe de acordo com o tema. */
    <div className={modoNoturno ? 'noturno' : ''}>
      <main className="app" aria-labelledby="titulo">
        {/* Props levam valores e funcoes do App para os componentes menores. */}
        <Topo modoNoturno={modoNoturno} aoAlternarTema={alternarTema} />
        <Trajeto corridaIniciada={corridaIniciada} valorKm={valorKm} valorMinuto={valorMinuto} aoMudarValorKm={setValorKm} aoMudarValorMinuto={setValorMinuto} aoIniciar={iniciarCorrida} aoFinalizar={finalizarTrajeto} />
        <Adicionais adicionais={adicionais} corridaIniciada={corridaIniciada} corridaCalculada={total > 0} aviso={aviso} aoAdicionar={adicionarValor} />
        <Resumo total={total} detalhes={detalhes} aoReiniciar={comecarDeNovo} />
      </main>
    </div>
  )
}

export default App
