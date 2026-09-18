# Rotas dos adicionais (pedágio e espera); o APIRouter agrupa as URLs deste recurso.
# A rota só traduz a requisição em chamada ao serviço e decide o status de resposta.

from fastapi import APIRouter, HTTPException

from esquemas.adicional import AdicionalSaida
from servicos import adicional as adicional_servico

router = APIRouter()


@router.get("/buscar")
def buscar_adicionais(valor_maximo: float) -> list[AdicionalSaida]:
    # O parâmetro de consulta chega com tipo declarado (float) na URL:
    # /api/adicionais/buscar?valor_maximo=7
    # Quem filtra a lista é o serviço, não a rota.
    return adicional_servico.filtrar_por_valor_maximo(valor_maximo)


@router.get("/{id}")
def obter_adicional(id: int) -> AdicionalSaida:
    # id é um parâmetro de caminho com tipo declarado: /api/adicionais/1
    # Quando o serviço devolve None, a rota responde com 404 — o status é decisão da rota.
    adicional = adicional_servico.buscar_por_id(id)
    if adicional is None:
        raise HTTPException(status_code=404, detail="Adicional não encontrado.")
    return adicional


@router.get("")
def listar_adicionais() -> list[AdicionalSaida]:
    # Devolve a lista completa, com os valores que os botões da tela mostram.
    return adicional_servico.listar()