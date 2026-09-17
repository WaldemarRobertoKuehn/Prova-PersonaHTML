# Rotas dos adicionais (pedágio e espera), que são dados fixos guardados na memória.
# O APIRouter agrupa as rotas deste arquivo; o prefixo e as tags vêm do include_router no main.py.
from fastapi import APIRouter, HTTPException

from esquemas.adicional import AdicionalSaida

# Lista fixa de cobranças que o passageiro pode acrescentar com o carro parado.
# Ela fica na memória do processo; aqui não há banco de dados.
ADICIONAIS = [
    {"id": 1, "nome": "Pedágio", "valor": 6.5, "valorExibido": "+ R$ 6,50"},
    {"id": 2, "nome": "Espera", "valor": 5.0, "valorExibido": "+ R$ 5,00"},
]

router = APIRouter()


@router.get("/buscar")
def buscar_adicionais(valor_maximo: float) -> list[AdicionalSaida]:
    # O parâmetro de consulta chega com tipo declarado (float) na URL:
    # /api/adicionais/buscar?valor_maximo=7
    # A compreensão de lista devolve apenas os adicionais com valor menor ou igual ao pedido.
    return [adicional for adicional in ADICIONAIS if adicional["valor"] <= valor_maximo]


@router.get("/{id}")
def obter_adicional(id: int) -> AdicionalSaida:
    # id é um parâmetro de caminho com tipo declarado: /api/adicionais/1
    # O laço procura o adicional pelo id; se não achar, levanta HTTPException com 404.
    for adicional in ADICIONAIS:
        if adicional["id"] == id:
            return adicional
    raise HTTPException(status_code=404, detail="Adicional não encontrado.")


@router.get("")
def listar_adicionais() -> list[AdicionalSaida]:
    # Devolve a lista fixa completa, com os valores que os botões da tela mostram.
    return ADICIONAIS