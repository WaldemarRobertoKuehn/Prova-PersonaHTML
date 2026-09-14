import { useEffect, useState } from 'react'
import Topo from './componentes/Topo'
import Trajeto from './componentes/Trajeto'
import Adicionais from './componentes/Adicionais'
import Resumo from './componentes/Resumo'
import adicionais from './dados/adicionais'
import './estilo.css'

// A API do FastAPI cuida do estado da corrida e do cálculo.
const API = '/api'

function App() {
  // Cada useState guarda uma informacao que pode mudar e causar uma atualizacao da tela.
  const [modoNoturno, setModoNoturno] = useState(false)
  const [corridaIniciada, setCorridaIniciada] = useState(false)
  // Os campos comecam como texto vazio porque tudo que o usuario digita em um input chega como texto.
  const [valorKm, setValorKm] = useState('')
  const [valorMinuto, setValorMinuto] = useState('')
  const [total, setTotal] = useState(0)
  // Aviso orienta a proxima acao; detalhes explica como o valor exibido foi formado.
  const [aviso, setAviso] = useState('Inicie o trajeto para adicionar valores.')
  const [detalhes, setDetalhes] = useState('Aguardando o início do trajeto.')
  // A lista comeca com os dados fixos e pode ser substituida pela que a API devolve.
  const [adicionaisEstado, setAdicionaisEstado] = useState(adicionais)

  // O que o servidor devolve vira estado local e atualiza os componentes.
  function aplicarEstado(dados) {
    setTotal(dados.total)
    setCorridaIniciada(dados.corridaIniciada)
    setValorKm(dados.valorKm ?? '')
    setValorMinuto(dados.valorMinuto ?? '')
    setAviso(dados.aviso)
    setDetalhes(dados.detalhes)
    if (dados.adicionais) {
      setAdicionaisEstado(dados.adicionais)
    }
  }

  // Ao abrir a tela, o App busca na API o estado salvo na ultima vez.
  useEffect(() => {
    async function carregarEstado() {
      try {
        const resposta = await fetch(`${API}/estado`)
        aplicarEstado(await resposta.json())
      } catch {
        setAviso('Não foi possível conectar ao servidor.')
      }
    }
    carregarEstado()
  }, [])

  async function chamarAPI(caminho, corpo) {
    try {
      const resposta = await fetch(`${API}/${caminho}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo),
      })
      aplicarEstado(await resposta.json())
    } catch {
      setAviso('Não foi possível conectar ao servidor.')
    }
  }

  function alternarTema() {
    // O sinal ! inverte o valor: false vira true e true vira false.
    setModoNoturno(!modoNoturno)
  }

  function iniciarCorrida() {
    // O servidor valida os valores, calcula o total e devolve o novo estado.
    chamarAPI('iniciar', { valorKm, valorMinuto })
  }

  function finalizarTrajeto() {
    chamarAPI('parar', {})
  }

  function adicionarValor(nome) {
    chamarAPI('cobranca', { nome })
  }

  function comecarDeNovo() {
    chamarAPI('reiniciar', {})
  }

  return (
    /* A expressao condicao ? valor1 : valor2 escolhe a classe de acordo com o tema. */
    <div className={modoNoturno ? 'noturno' : ''}>
      <main className="app" aria-labelledby="titulo">
        {/* Props levam valores e funcoes do App para os componentes menores. */}
        <Topo modoNoturno={modoNoturno} aoAlternarTema={alternarTema} />
        <Trajeto corridaIniciada={corridaIniciada} valorKm={valorKm} valorMinuto={valorMinuto} aoMudarValorKm={setValorKm} aoMudarValorMinuto={setValorMinuto} aoIniciar={iniciarCorrida} aoFinalizar={finalizarTrajeto} />
        <Adicionais adicionais={adicionaisEstado} corridaIniciada={corridaIniciada} corridaCalculada={total > 0} aviso={aviso} aoAdicionar={adicionarValor} />
        <Resumo total={total} detalhes={detalhes} aoReiniciar={comecarDeNovo} />
      </main>
    </div>
  )
}

export default App