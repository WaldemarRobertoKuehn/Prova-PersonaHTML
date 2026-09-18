# Rotas do orçamento de corrida de Seu Valdir, separadas em outro arquivo com o APIRouter.
# Elas espelham as regras do CONTRATO.md e repassam tudo ao serviço;
# aqui não há lista de dados nem conta nenhuma.

from fastapi import APIRouter

from esquemas.corrida import CorridaCobranca, CorridaInicio, CorridaSaida
from servicos import corrida as corrida_servico

router = APIRouter()


@router.get("/estado")
def obter_estado() -> CorridaSaida:
    # Devolve tudo que a tela usa para se desenhar e a lista de cobranças dos botões.
    return corrida_servico.montar_estado()


@router.post("/iniciar")
def iniciar(dados: CorridaInicio) -> CorridaSaida:
    # O corpo da requisição é validado pelo esquema CorridaInicio, importado de esquemas/corrida.py.
    # O serviço confere os valores, calcula o total e grava o novo estado no repositório.
    return corrida_servico.iniciar(dados)


@router.post("/parar")
def parar() -> CorridaSaida:
    # Marca a corrida como parada para liberar pedágio e espera; o total não muda.
    return corrida_servico.parar()


@router.post("/cobranca")
def adicionar_cobranca(dados: CorridaCobranca) -> CorridaSaida:
    # Pede ao serviço para tentar somar a cobrança; ele decide quando isso pode acontecer.
    return corrida_servico.adicionar_cobranca(dados.nome)


@router.post("/reiniciar")
def reiniciar() -> CorridaSaida:
    # Zera a corrida e restaura os avisos iniciais, pela regra do botão "Começar de novo".
    return corrida_servico.reiniciar()