# Backend

API do orçamento de corrida, feita com FastAPI. Ela espelha as regras da tela
registradas no CONTRATO.md: iniciar e parar o trajeto, adicionar pedágio/espera
e reiniciar. O estado atual é gravado em `data.json`.

## Como rodar

A partir desta pasta:

```sh
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python -m uvicorn app:app --port 8000
```

A API fica em `http://127.0.0.1:8000`. A documentação interativa com os
endpoints está em `http://127.0.0.1:8000/docs`.

## Endpoints

| Método | Caminho | O que faz |
|---|---|---|
| GET | `/api/estado` | Devolve o estado atual e a lista de adicionais. |
| POST | `/api/iniciar` | Recebe `valorKm` e `valorMinuto`, valida, calcula o total e inicia o trajeto. |
| POST | `/api/parar` | Para o trajeto e libera as cobranças. |
| POST | `/api/cobranca` | Recebe `nome` (Pedágio ou Espera) e soma ao total se o carro estiver parado. |
| POST | `/api/reiniciar` | Zera a corrida e restaura os avisos iniciais. |

## Como o frontend se conecta

O Vite usa um proxy configurado em `frontend/vite.config.js`: todas as chamadas
`/api/...` feitas pelo navegador são repassadas para `http://127.0.0.1:8000`.
Para rodar os dois juntos: suba o backend acima e, em outra janela, execute
`npm run dev` dentro de `frontend/`.