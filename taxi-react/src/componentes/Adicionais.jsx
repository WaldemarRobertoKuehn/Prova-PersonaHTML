function Adicionais({ adicionais, corridaIniciada, corridaCalculada, aviso, aoAdicionar }) {
  return (
    <section className="adicionais" aria-labelledby="tituloAdicionais">
      <div className="titulo-secao"><div><p className="etiqueta">VALORES COM O CARRO PARADO</p><h2 id="tituloAdicionais">Adicionar cobranca</h2></div></div>
      {/* DECISAO SUA: as cobrancas ficam indisponiveis durante o trajeto porque Seu Valdir as acrescenta com o carro parado. */}
      <div className="grade-botoes">
        {/* map percorre a lista e devolve um botao para cada objeto encontrado. */}
        {adicionais.map((adicional) => (
          /* key usa o id para o React reconhecer cada item mesmo que a lista mude.
             A funcao com seta espera o clique antes de enviar valor e nome. */
          <button className="botao botao-valor" type="button" key={adicional.id} disabled={corridaIniciada || !corridaCalculada} onClick={() => aoAdicionar(adicional.valor, adicional.nome)}>
            <span>{adicional.nome}</span><strong>{adicional.valorExibido}</strong>
          </button>
        ))}
      </div>
      {/* aria-live pede ao leitor de tela que anuncie quando o aviso mudar. */}
      <p className="aviso" role="status" aria-live="polite">{aviso}</p>
    </section>
  )
}

export default Adicionais
