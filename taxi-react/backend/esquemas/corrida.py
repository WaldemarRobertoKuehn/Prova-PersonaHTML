# Esquemas de entrada e saída da corrida, importados pelas rotas de rotas/corridas.py.
# Os valores de entrada mantêm o mesmo formato que a tela envia hoje (textos com vírgula).
from pydantic import BaseModel

from esquemas.adicional import AdicionalSaida


class CorridaInicio(BaseModel):
    valorKm: str = ""
    valorMinuto: str = ""


class CorridaCobranca(BaseModel):
    nome: str | None = None


class CorridaSaida(BaseModel):
    total: int | float
    corridaIniciada: bool
    valorKm: str
    valorMinuto: str
    aviso: str
    detalhes: str
    adicionais: list[AdicionalSaida]