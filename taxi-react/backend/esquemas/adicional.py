# Esquemas de saída do recurso adicionais, no singular (adicional).
# Ficam aqui os modelos Pydantic que as rotas usam; nenhuma rota é escrita neste arquivo.
from pydantic import BaseModel


class AdicionalSaida(BaseModel):
    id: int
    nome: str
    valor: float
    valorExibido: str