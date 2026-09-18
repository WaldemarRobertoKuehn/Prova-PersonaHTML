# Regras do projeto para a IA

Atualizado até a **aula 3** da UC4. Salve na raiz do seu repositório com o nome `REGRAS.md`,
por cima do arquivo da aula anterior. Só vale a versão mais nova.

## O projeto

- Duas pastas na raiz: `backend/`, com a API em FastAPI, e `frontend/`, com o React da UC5.
- O `frontend/` só muda onde ele busca os dados.
- Estrutura do `backend/`, e nenhuma pasta além destas:
  - `main.py`: cria o `app`, registra o CORS e liga os routers com `include_router`. Nenhuma rota nele.
  - `rotas/<recurso>.py`, no plural: o `APIRouter`, as rotas do recurso e a lista em memória.
  - `esquemas/<recurso>.py`, no singular: os esquemas Pydantic de entrada e de saída do recurso.
- Código, nomes de variáveis, comentários e respostas sempre em português do Brasil.
- Persona atendida: Seu Valdir, motorista de táxi, precisa calcular na hora o orçamento da corrida (8 km + 20 min) e somar pedágio e espera, para mostrar o valor final ao passageiro sem fazer conta de cabeça.

## O que já foi visto, e pode usar

- `venv`, `fastapi dev main.py`, `/docs`, rotas com `def` comum.
- Os quatro métodos, status 200, 201, 404 e 422, `HTTPException`, `APIRouter`.
- Parâmetro de caminho e de consulta, com tipo declarado.
- Filtro de lista com laço `for` e `append`, ou com compreensão de lista.
- Pydantic: `BaseModel`, `Field` com restrições (`min_length`, `max_length`, `gt`, `ge`, `le`),
  esquema de entrada diferente do de saída, sempre na pasta `esquemas/`.
- `model_dump()` e `**` para montar o dicionário a partir do esquema.
- `response_model` e `status_code=201` no decorador.
- CORS liberado apenas para o endereço exato do meu front.

## O que ainda não foi visto, e não deve aparecer

- Banco de dados, SQL, SQLAlchemy ou qualquer ORM. Os dados ficam em lista na memória.
- Separação em camadas, pastas `servicos/` ou `repositorios/`, `__init__.py`, `Depends`, arquivo `.env`.
- Validação na mão com `if` e `isinstance` dentro da rota. Quem valida agora é o esquema.
- Autenticação, login, JWT, hash de senha.
- `allow_origins=["*"]`. Isso é erro, e foi apresentado como erro em aula.
- `async def`. Use `def` normal.

## Como escrever o código

- Todo código que você gerar vem comentado em português. Um comentário curto acima de cada rota,
  função ou bloco, dizendo o que ele faz e por que está ali.
- O comentário explica a intenção. Não repita o que a linha já diz: `# retorna a lista` em cima
  de `return lista` não ensina nada.
- Na primeira vez que aparecer algo novo para mim (um decorador, um tipo, um parâmetro), explique
  em uma linha, no próprio comentário.
- Os comentários ficam no código que eu entrego. É por eles que eu estudo antes da arguição.
- Depois do código, escreva um resumo curto: quais arquivos você criou ou alterou, o que mudou em
  cada um e como eu testo, com a URL ou o comando e o que deve aparecer na tela.

## Como responder

- Uma coisa por vez. Não adiante etapa que eu não pedi.
- Se a tarefa exigir algo da lista de cima, avise antes de escrever código e proponha a versão simples.
- Justifique cada decisão em uma linha. Eu preciso conseguir defender esse código na arguição.
