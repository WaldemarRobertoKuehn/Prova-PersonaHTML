# Rotas do orçamento de corrida de Seu Valdir, separadas em outro arquivo com o APIRouter.
# Elas espelham as regras do CONTRATO.md: estado, iniciar, parar, cobrança e reiniciar.
import json
from pathlib import Path

from fastapi import APIRouter

from rotas.adicionais import ADICIONAIS

# O caminho do arquivo que guarda o estado entre uma abertura da tela e outra.
# É um arquivo simples, não um banco de dados.
ARQUIVO_DADOS = Path(__file__).parent.parent / "data.json"

# Estado da tela antes de qualquer interação do usuário.
ESTADO_INICIAL = {
    "total": 0,
    "corridaIniciada": False,
    "valorKm": "",
    "valorMinuto": "",
    "aviso": "Inicie o trajeto para adicionar valores.",
    "detalhes": "Aguardando o início do trajeto.",
}

# A distância e o tempo do trajeto simulado ficam fixos, como na tela original.
KM_FIXOS = 8
MINUTOS_FIXOS = 20

# O prefixo "/api" deixa cada caminho pronto: /api/estado, /api/iniciar e assim por diante.
router = APIRouter(prefix="/api", tags=["Corrida"])


def carregar_estado():
    # Lê o que ficou gravado na última corrida; se não existe ou está com erro, volta ao início.
    if ARQUIVO_DADOS.exists():
        try:
            salvo = json.loads(ARQUIVO_DADOS.read_text(encoding="utf-8"))
            return {**ESTADO_INICIAL, **salvo}
        except (json.JSONDecodeError, TypeError, ValueError):
            pass
    return dict(ESTADO_INICIAL)


estado = carregar_estado()


def salvar_estado():
    # Grava o estado atual para a próxima abertura da tela continuar de onde parou.
    ARQUIVO_DADOS.write_text(
        json.dumps(estado, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def estado_atual():
    # Junta o estado com a lista de cobranças que os botões da tela precisam mostrar.
    return {**estado, "adicionais": ADICIONAIS}


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


@router.get("/estado")
def obter_estado():
    # Devolve tudo que a tela usa para se desenhar e a lista de cobranças dos botões.
    return estado_atual()


@router.post("/iniciar")
def iniciar(dados: dict):
    # O corpo da requisição chega pronto como um dicionário (dados: dict), sem classe de validação.
    estado["valorKm"] = dados.get("valorKm", "")
    estado["valorMinuto"] = dados.get("valorMinuto", "")
    try:
        numero_km = converter_valor(estado["valorKm"])
        numero_minuto = converter_valor(estado["valorMinuto"])
    except ValueError:
        numero_km = 0.0
        numero_minuto = 0.0
    if validar_inicio(numero_km, numero_minuto):
        # A fórmula do contrato: 8 km vezes o valor do km + 20 min vezes o valor do minuto.
        estado["total"] = numero_km * KM_FIXOS + numero_minuto * MINUTOS_FIXOS
        estado["corridaIniciada"] = True
        estado["detalhes"] = (
            f"{KM_FIXOS} km × R$ {formatar(numero_km)}"
            f" + {MINUTOS_FIXOS} min × R$ {formatar(numero_minuto)}"
        )
        estado["aviso"] = "Trajeto iniciado. Pare o carro para adicionar uma cobrança."
    else:
        estado["aviso"] = "Digite um valor maior que zero para o km e para o minuto."
    salvar_estado()
    return estado_atual()


@router.post("/parar")
def parar():
    # Marca a corrida como parada para liberar pedágio e espera; o total não muda.
    estado["corridaIniciada"] = False
    estado["aviso"] = "Carro parado. Agora você pode adicionar pedágio ou espera."
    salvar_estado()
    return estado_atual()


@router.post("/cobranca")
def adicionar_cobranca(dados: dict):
    # Devolve o objeto da cobrança da lista fixa, ou None se o nome não existir.
    adicional = next(
        (a for a in ADICIONAIS if a["nome"] == dados.get("nome")),
        None,
    )
    if adicional is None:
        estado["aviso"] = "Cobrança não encontrada."
    elif estado["corridaIniciada"]:
        estado["aviso"] = "Pare o trajeto antes de adicionar uma cobrança."
    elif estado["total"] <= 0:
        estado["aviso"] = "Primeiro, calcule e inicie o trajeto."
    else:
        # Só aqui a cobrança é somada ao total: carro parado e corrida já calculada.
        estado["total"] += adicional["valor"]
        estado["detalhes"] = "Corrida e valores adicionais incluídos."
        estado["aviso"] = f"{adicional['nome']} adicionado."
    salvar_estado()
    return estado_atual()


@router.post("/reiniciar")
def reiniciar():
    # Para cada chave do estado inicial, copia o valor de volta: zera o total,
    # para a corrida, esvazia os campos e restaura o aviso e o detalhe.
    for chave, valor in ESTADO_INICIAL.items():
        estado[chave] = valor
    salvar_estado()
    return estado_atual()