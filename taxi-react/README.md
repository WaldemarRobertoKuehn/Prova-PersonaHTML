# Taxi

Projeto organizado em frontend e backend independentes.

```text
taxi-react/
├── frontend/       # Aplicação React + Vite
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
├── backend/        # Espaço reservado para a API
└── README.md
```

## Frontend

Execute os comandos a partir da raiz do projeto:

```sh
cd frontend
npm ci
npm run dev
```

Dentro de `frontend/`, também estão disponíveis:

```sh
npm run build   # Gera a versão de produção em frontend/dist/
npm run preview # Serve o build de produção localmente
npm run lint    # Verifica o código com ESLint
```

## Backend

A pasta `backend/` está reservada para a futura implementação da API, com suas próprias dependências e configurações.
