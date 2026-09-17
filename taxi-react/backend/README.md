# Backend

API do orçamento de corrida, feita com FastAPI. Ela espelha as regras da tela
registradas no CONTRATO.md: iniciar e parar o trajeto, adicionar pedágio/espera
e reiniciar. O estado atual é gravado em `data.json`.

O código segue o corte de `REGRAS_AULA2.md` da UC4: só `def` comum, devolvendo
dicionário, sem banco, sem Pydantic, sem CORS e sem `async`. O corpo da
requisição chega como um dicionário (`dados: dict`) — e o frontend consegue
acessar a API porque o Vite tem um proxy configurado, então CORS não é preciso.

As rotas ficam divididas em dois arquivos com `APIRouter`:

| Arquivo | Rotas |
|---|---|
| `rotas/adicionais.py` | Três rotas com dados fixos na memória (pedágio e espera), incluindo uma com parâmetro de caminho que devolve 404. |
| `rotas/corrida.py` | Rotas do orçamento: estado, iniciar, parar, cobrança e reiniciar. |

`main.py` só cria o aplicativo e monta os dois routers com `include_router`.

## Como rodar

A partir desta pasta:

```sh
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\fastapi dev main.py
```

A API fica em `http://127.0.0.1:8000`. A documentação interativa com os
endpoints está em `http://127.0.0.1:8000/docs`. Também funciona com o
`uvicorn`: `.venv\Scripts\python -m uvicorn main:app --port 8000`.

## Endpoints

| Método | Caminho | O que faz |
|---|---|---|
| GET | `/api/estado` | Devolve o estado atual e a lista de adicionais. |
| POST | `/api/iniciar` | Recebe `valorKm` e `valorMinuto` (com vírgula ou ponto), valida, calcula o total e inicia o trajeto. |
| POST | `/api/parar` | Para o trajeto e libera as cobranças. |
| POST | `/api/cobranca` | Recebe `nome` (Pedágio ou Espera) e soma ao total se o carro estiver parado. |
| POST | `/api/reiniciar` | Zera a corrida e restaura os avisos iniciais. |
| GET | `/api/adicionais` | Devolve a lista fixa de cobranças. |
| GET | `/api/adicionais/{id}` | Devolve a cobrança pelo `id`; devolve 404 se não existir. |
| GET | `/api/adicionais/buscar?valor_maximo=7` | Devolve as cobranças com valor menor ou igual ao informado. |

O corpo de `iniciar` é `{"valorKm": "2,50", "valorMinuto": "0,75"}` e o de
`cobranca` é `{"nome": "Pedágio"}`. `parar` e `reiniciar` aceitam corpo vazio
(`{}`). As três rotas de adicionais são apenas leitura dos dados fixos na memória.

## Como o frontend se conecta

O Vite usa um proxy configurado em `frontend/vite.config.js`: todas as chamadas
`/api/...` feitas pelo navegador são repassadas para `http://127.0.0.1:8000`.
Para rodar os dois juntos: suba o backend acima e, em outra janela, execute
`npm run dev` dentro de `frontend/`.