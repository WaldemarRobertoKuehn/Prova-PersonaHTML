# Ponto de entrada da API do orçamento de corrida de Seu Valdir.
# A criação do FastAPI fica aqui e cada arquivo da pasta rotas entrega um APIRouter,
# que o include_router monta no aplicativo. Assim as rotas ficam separadas em mais de um arquivo.
from fastapi import FastAPI

from rotas.adicionais import router as adicionais_router
from rotas.corrida import router as corrida_router

app = FastAPI(title="Orçamento da corrida", version="1.0.0")

# Cada include_router coloca no aplicativo as rotas de um arquivo da pasta rotas.
app.include_router(adicionais_router)
app.include_router(corrida_router)