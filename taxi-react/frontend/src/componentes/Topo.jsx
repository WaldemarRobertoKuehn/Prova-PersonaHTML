// As chaves nos parametros separam as props que o Topo recebeu do App.
function Topo({ modoNoturno, aoAlternarTema }) {
  return (
    <header className="topo">
      <div><p className="identificacao">TAXI · SEU VALDIR</p><h1 id="titulo">Orcamento da corrida</h1></div>
      {/* DECISAO SUA: o tema fica no topo e traz texto, pois o sol atrapalha e um icone sozinho nao seria claro. */}
      {/* onClick recebe a funcao sem parenteses para executa-la somente quando houver o clique. */}
      <button className="botao botao-tema" type="button" aria-pressed={modoNoturno} onClick={aoAlternarTema}>
        {/* O operador ternario troca o icone e o texto conforme o estado recebido. */}
        <span aria-hidden="true">{modoNoturno ? '☀' : '☾'}</span>{' '}{modoNoturno ? 'Modo diurno' : 'Modo noturno'}
      </button>
    </header>
  )
}

// export default permite que o App importe este componente com o nome Topo.
export default Topo
