# Decisões e contas da corrida (8 km × valor por km + 20 min × valor por minuto).
# As rotas só repassam a requisição; quem calcula e decide é este arquivo.

from esquemas.corrida import CorridaInicio
from repositorios import adicional as adicional_repositorio
from repositorios import corrida as corrida_repositorio

# Distância e tempo do trajeto simulado ficam fixos, como na tela original.
KM_FIXOS = 8
MINUTOS_FIXOS = 20


def converter_valor(texto):
    # Troca a vírgula por ponto para entender 3,50 e 3.50 do mesmo jeito antes de virar número.
    texto = str(texto).replace(",", ".").strip()
    return float(texto) if texto else 0.0


def formatar(valor):
    # Apresenta o número no padrão brasileiro, com vírgula e duas casas decimais.
    return f"{valor:.2f}".replace(".", ",")


def validar_inicio(km, minuto):
    # Regra do CONTRATO: só inicia se os dois valores forem maiores que zero.
    return km > 0 and minuto > 0


def montar_estado():
    # Junta o estado guardado com a lista de cobranças que os botões da tela precisam mostrar.
    return {**corrida_repositorio.obter_estado(), "adicionais": adicional_repositorio.listar_todos()}


def iniciar(dados):
    # Guarda os textos digitados, confere se os dois valores são maiores que zero e, se forem,
    # calcula o total pela fórmula do contrato e marca o trajeto como iniciado.
    novo_estado = corrida_repositorio.obter_estado()
    novo_estado["valorKm"] = dados.valorKm
    novo_estado["valorMinuto"] = dados.valorMinuto
    try:
        numero_km = converter_valor(novo_estado["valorKm"])
        numero_minuto = converter_valor(novo_estado["valorMinuto"])
    except ValueError:
        numero_km = 0.0
        numero_minuto = 0.0
    if validar_inicio(numero_km, numero_minuto):
        novo_estado["total"] = numero_km * KM_FIXOS + numero_minuto * MINUTOS_FIXOS
        novo_estado["corridaIniciada"] = True
        novo_estado["detalhes"] = (
            f"{KM_FIXOS} km × R$ {formatar(numero_km)}"
            f" + {MINUTOS_FIXOS} min × R$ {formatar(numero_minuto)}"
        )
        novo_estado["aviso"] = "Trajeto iniciado. Pare o carro para adicionar uma cobrança."
    else:
        novo_estado["aviso"] = "Digite um valor maior que zero para o km e para o minuto."
    corrida_repositorio.gravar_estado(novo_estado)
    return montar_estado()


def parar():
    # Marca a corrida como parada para liberar pedágio e espera; o total não muda.
    novo_estado = corrida_repositorio.obter_estado()
    novo_estado["corridaIniciada"] = False
    novo_estado["aviso"] = "Carro parado. Agora você pode adicionar pedágio ou espera."
    corrida_repositorio.gravar_estado(novo_estado)
    return montar_estado()


def adicionar_cobranca(nome):
    # Só soma a cobrança com o carro parado e a corrida já calculada; a lista vem do repositório.
    novo_estado = corrida_repositorio.obter_estado()
    adicional = adicional_repositorio.buscar_por_nome(nome)
    if adicional is None:
        novo_estado["aviso"] = "Cobrança não encontrada."
    elif novo_estado["corridaIniciada"]:
        novo_estado["aviso"] = "Pare o trajeto antes de adicionar uma cobrança."
    elif novo_estado["total"] <= 0:
        novo_estado["aviso"] = "Primeiro, calcule e inicie o trajeto."
    else:
        novo_estado["total"] += adicional["valor"]
        novo_estado["detalhes"] = "Corrida e valores adicionais incluídos."
        novo_estado["aviso"] = f"{adicional['nome']} adicionado."
    corrida_repositorio.gravar_estado(novo_estado)
    return montar_estado()


def reiniciar():
    # Zera tudo: restaura o estado inicial guardado no repositório.
    corrida_repositorio.reiniciar_estado()
    return montar_estado()