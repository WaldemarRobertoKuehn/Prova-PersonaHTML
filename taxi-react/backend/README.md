# Backend

API do orçamento de corrida, feita com FastAPI. Ela espelha as regras da tela
registradas no CONTRATO.md: iniciar e parar o trajeto, adicionar pedágio/espera
e reiniciar. O estado atual é gravado em `data.json`.

A organização segue a estrutura do curso até a aula 3: cada recurso tem um
arquivo de rotas na pasta `rotas/` (nome no plural) e um arquivo de esquemas
na pasta `esquemas/` (nome no singular), e o `main.py` apenas cria o app,
registra o CORS e liga os routers com `include_router` informando prefixo e tags.

```
rotas/
├── adicionais.py   router, rotas e a lista de cobranças na memória
└── corridas.py     router e rotas do orçamento da corrida
esquemas/
├── adicional.py    esquema de saída AdicionalSaida
└── corrida.py      esquemas de entrada CorridaInicio/CorridaCobranca e de saída CorridaSaida
```

## Como rodar

A partir desta pasta:

```sh
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\fastapi dev main.py
```

A API fica em `http://127.0.0.1:8000`. A documentação interativa com os
endpoints está em `http://127.0.0.1:8000/docs`.

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
(`{}`). Os corpos e as respostas são validados pelos esquemas Pydantic de
`esquemas/`. As três rotas de adicionais são apenas leitura dos dados fixos em
memória, que ficam no próprio arquivo de rotas.

## Como o frontend se conecta

O Vite usa um proxy configurado em `frontend/vite.config.js`: todas as chamadas
`/api/...` feitas pelo navegador são repassadas para `http://127.0.0.1:8000`.
O backend também libera o CORS para qualquer origem, em `main.py`. Para rodar
os dois juntos: suba o backend acima e, em outra janela, execute
`npm run dev` dentro de `frontend/`.