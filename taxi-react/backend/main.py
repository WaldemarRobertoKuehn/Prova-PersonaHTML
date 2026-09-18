# Ponto de entrada da API do orçamento de corrida de Seu Valdir.
# A criação do FastAPI, o CORS e a ligação dos routers ficam aqui; nenhuma rota é escrita neste arquivo.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from rotas.adicionais import router as adicionais_router
from rotas.corridas import router as corrida_router

app = FastAPI(title="Orçamento da corrida", version="1.0.0")

# O CORS libera só a origem exata do front em desenvolvimento, o servidor do Vite.
# Pôr a origem exata, e não "*", impede que qualquer site chame esta API pelo navegador.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cada include_router coloca no aplicativo as rotas de um arquivo da pasta rotas,
# informando o prefixo e as tags de cada recurso.
app.include_router(adicionais_router, prefix="/api/adicionais", tags=["Adicionais"])
app.include_router(corrida_router, prefix="/api", tags=["Corrida"])