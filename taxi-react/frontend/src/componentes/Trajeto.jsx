// Este componente nao guarda estado: ele recebe os valores e as funcoes do App por props.
function Trajeto({ corridaIniciada, valorKm, valorMinuto, aoMudarValorKm, aoMudarValorMinuto, aoIniciar, aoFinalizar }) {
  return (
    <section className="trajeto" aria-labelledby="tituloTrajeto">
      <div className="titulo-secao">
        <div><p className="etiqueta">TRAJETO SIMULADO</p><h2 id="tituloTrajeto">Centro → Rodoviária</h2></div>
        {/* O mesmo estado decide a classe visual e o texto do status. */}
        <span className={corridaIniciada ? 'estado ativo' : 'estado'}>{corridaIniciada ? 'EM TRAJETO' : 'PARADO'}</span>
      </div>
      <div className={corridaIniciada ? 'mapa em-viagem' : 'mapa'} aria-label="Representação do trajeto entre o Centro e a Rodoviária">
        {/* A classe em-viagem ativa no CSS a mudanca de posicao do taxi. */}
        <div className="rota"></div><span className="ponto inicio" aria-hidden="true">A</span><span className="carro" aria-hidden="true">🚕</span><span className="ponto chegada" aria-hidden="true">B</span>
      </div>
      <div className="dados-trajeto"><div><span>Distância</span><strong>8 km</strong></div><div><span>Tempo</span><strong>20 min</strong></div></div>
      {/* DECISAO SUA: os campos sao grandes para permitir informar as tarifas sem retirar o celular do suporte. */}
      <div className="campos-valores" aria-labelledby="tituloValores">
        <h3 id="tituloValores">Digite os valores da corrida</h3>
        <div className="grade-campos">
          {/* value mostra o estado; onChange envia cada novo texto de volta ao App. */}
          {/* disabled bloqueia a digitacao enquanto o carro esta em trajeto. */}
          <label>Valor por km<span className="campo-dinheiro"><span>R$</span><input value={valorKm} onChange={(evento) => aoMudarValorKm(evento.target.value)} disabled={corridaIniciada} inputMode="decimal" autoComplete="off" placeholder="0,00" aria-label="Valor por quilômetro em reais" /></span></label>
          <label>Valor por minuto<span className="campo-dinheiro"><span>R$</span><input value={valorMinuto} onChange={(evento) => aoMudarValorMinuto(evento.target.value)} disabled={corridaIniciada} inputMode="decimal" autoComplete="off" placeholder="0,00" aria-label="Valor por minuto em reais" /></span></label>
        </div>
      </div>
      {/* O mesmo botao inicia quando esta parado e finaliza quando esta em trajeto. */}
      <button className="botao botao-principal" type="button" onClick={corridaIniciada ? aoFinalizar : aoIniciar}>{corridaIniciada ? 'Parar trajeto' : 'Calcular e iniciar trajeto'}</button>
    </section>
  )
}

export default Trajeto
