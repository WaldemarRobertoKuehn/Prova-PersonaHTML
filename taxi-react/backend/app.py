# API do orçamento de corrida de Seu Valdir.
# Espelha as regras da tela registradas no CONTRATO.md.
import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

ARQUIVO_DADOS = Path(__file__).parent / "data.json"

ESTADO_INICIAL = {
    "total": 0,
    "corridaIniciada": False,
    "valorKm": "",
    "valorMinuto": "",
    "aviso": "Inicie o trajeto para adicionar valores.",
    "detalhes": "Aguardando o início do trajeto.",
}

ADICIONAIS = [
    {"id": 1, "nome": "Pedágio", "valor": 6.5, "valorExibido": "+ R$ 6,50"},
    {"id": 2, "nome": "Espera", "valor": 5.0, "valorExibido": "+ R$ 5,00"},
]

KM_FIXOS = 8
MINUTOS_FIXOS = 20

app = FastAPI(title="Orçamento da corrida", version="1.0.0")

# Permite que o navegador chame a API durante o desenvolvimento do Vite.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class IniciarTrajeto(BaseModel):
    valorKm: str
    valorMinuto: str


class AdicionarCobranca(BaseModel):
    nome: str


def carregar_estado():
    if ARQUIVO_DADOS.exists():
        try:
            salvo = json.loads(ARQUIVO_DADOS.read_text(encoding="utf-8"))
            return {**ESTADO_INICIAL, **salvo}
        except (json.JSONDecodeError, TypeError, ValueError):
            pass
    return dict(ESTADO_INICIAL)


def salvar_estado():
    ARQUIVO_DADOS.write_text(
        json.dumps(estado, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def estado_atual():
    return {**estado, "adicionais": ADICIONAIS}


def converter_valor(texto):
    texto = str(texto).replace(",", ".").strip()
    return float(texto) if texto else 0.0


def formatar(valor):
    return f"{valor:.2f}".replace(".", ",")


estado = carregar_estado()


@app.get("/api/estado")
def obter_estado():
    return estado_atual()


@app.post("/api/iniciar")
def iniciar(dados: IniciarTrajeto):
    estado["valorKm"] = dados.valorKm
    estado["valorMinuto"] = dados.valorMinuto
    try:
        numero_km = converter_valor(dados.valorKm)
        numero_minuto = converter_valor(dados.valorMinuto)
    except ValueError:
        numero_km = 0.0
        numero_minuto = 0.0
    if numero_km > 0 and numero_minuto > 0:
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


@app.post("/api/parar")
def parar():
    estado["corridaIniciada"] = False
    estado["aviso"] = "Carro parado. Agora você pode adicionar pedágio ou espera."
    salvar_estado()
    return estado_atual()


@app.post("/api/cobranca")
def adicionar_cobranca(dados: AdicionarCobranca):
    adicional = next((a for a in ADICIONAIS if a["nome"] == dados.nome), None)
    if adicional is None:
        estado["aviso"] = "Cobrança não encontrada."
    elif estado["corridaIniciada"]:
        estado["aviso"] = "Pare o trajeto antes de adicionar uma cobrança."
    elif estado["total"] <= 0:
        estado["aviso"] = "Primeiro, calcule e inicie o trajeto."
    else:
        estado["total"] += adicional["valor"]
        estado["detalhes"] = "Corrida e valores adicionais incluídos."
        estado["aviso"] = f"{adicional['nome']} adicionado."
    salvar_estado()
    return estado_atual()


@app.post("/api/reiniciar")
def reiniciar():
    for chave, valor in ESTADO_INICIAL.items():
        estado[chave] = valor
    salvar_estado()
    return estado_atual()