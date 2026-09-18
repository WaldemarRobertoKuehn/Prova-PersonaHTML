# Ponto de entrada da API do orçamento de corrida de Seu Valdir.
# Cria o app, registra o CORS com o endereço vindo da configuração e liga os routers;
# nenhuma rota é escrita neste arquivo.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from configuracao import ORIGEM_FRONT
from rotas.adicionais import router as adicionais_router
from rotas.corridas import router as corrida_router

app = FastAPI(title="Orçamento da corrida", version="1.0.0")

# O CORS libera só a origem exata do front, vinda do .env por meio de configuracao.py.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ORIGEM_FRONT],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cada include_router coloca no aplicativo as rotas de um arquivo da pasta rotas,
# informando o prefixo e as tags de cada recurso.
app.include_router(adicionais_router, prefix="/api/adicionais", tags=["Adicionais"])
app.include_router(corrida_router, prefix="/api", tags=["Corrida"])