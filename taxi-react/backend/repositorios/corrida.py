# Estado da corrida em memória (não há banco de dados) e as funções que leem e gravam nele.
# O repositório não toma decisão nem calcula nada; isso é do serviço.

ESTADO_INICIAL = {
    "total": 0,
    "corridaIniciada": False,
    "valorKm": "",
    "valorMinuto": "",
    "aviso": "Inicie o trajeto para adicionar valores.",
    "detalhes": "Aguardando o início do trajeto.",
}

estado = dict(ESTADO_INICIAL)


def obter_estado():
    # Devolve uma cópia do estado para o serviço decidir sobre ele sem mexer no original.
    return dict(estado)


def gravar_estado(novo_estado):
    # Substitui o estado guardado pelo dicionário que o serviço montou.
    estado.clear()
    estado.update(novo_estado)


def reiniciar_estado():
    # Volta o estado memorizado para o ESTADO_INICIAL, como o botão "Começar de novo" precisa.
    estado.clear()
    estado.update(ESTADO_INICIAL)