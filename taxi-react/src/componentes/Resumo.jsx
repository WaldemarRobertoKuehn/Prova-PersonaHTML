function Resumo({ total, detalhes, aoReiniciar }) {
  // toLocaleString transforma, por exemplo, 50.5 no texto "R$ 50,50".
  const totalExibido = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <section className="resumo" aria-labelledby="tituloResumo">
      <div className="resumo-linha">
        <div><p className="etiqueta">MOSTRE AO PASSAGEIRO</p><h2 id="tituloResumo">Valor final</h2></div>
        {/* DECISAO SUA: o maior texto da tela permite a leitura a distancia pelo motorista e pelo passageiro. */}
        <output aria-live="polite">{totalExibido}</output>
      </div>
      {/* As chaves colocam dentro do JSX o texto guardado na prop detalhes. */}
      <p>{detalhes}</p>
      {/* aoReiniciar aponta para comecarDeNovo, que esta no App e limpa todos os estados. */}
      <button className="botao botao-reiniciar" type="button" onClick={aoReiniciar}>Comecar de novo</button>
    </section>
  )
}

export default Resumo
