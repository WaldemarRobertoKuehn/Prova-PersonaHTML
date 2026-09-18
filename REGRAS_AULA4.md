# Regras do projeto para a IA

Atualizado até a **aula 4** da UC4. Salve na raiz do seu repositório com o nome `REGRAS.md`,
por cima do arquivo da aula anterior. Só vale a versão mais nova.

## O projeto

- Duas pastas na raiz: `backend/`, com a API em FastAPI, e `frontend/`, com o React da UC5.
- O `frontend/` só muda onde ele busca os dados.
- Estrutura do `backend/`, e nenhuma pasta além destas:
  - `.env`: o que muda de máquina para máquina. Fica fora do Git.
  - `.env.exemplo`: as mesmas chaves, sem os valores. Esse vai para o Git.
  - `configuracao.py`: o único arquivo que lê o `.env`, com `load_dotenv()` e `os.getenv`.
  - `main.py`: cria o `app`, registra o CORS lendo a configuração e liga os routers
    com `include_router`. Nenhuma rota nele.
  - `rotas/<recurso>.py`, no plural: o `APIRouter`, as rotas do recurso e nada mais.
  - `servicos/<recurso>.py`, no singular: as decisões, as contas e a montagem do dado.
  - `repositorios/<recurso>.py`, no singular: a lista em memória e as funções que leem e gravam.
  - `esquemas/<recurso>.py`, no singular: os esquemas Pydantic de entrada e de saída.
  - Um `__init__.py` vazio em cada uma dessas pastas.
- A chamada vai sempre na mesma direção: rota chama serviço, serviço chama repositório.
  Nunca o contrário, e nunca uma rota importando outra rota.
- Código, nomes de variáveis, comentários e respostas sempre em português do Brasil.
- Persona atendida: descreva aqui, em uma linha, a sua e a dor dela.

## O que já foi visto, e pode usar

- `venv`, `fastapi dev main.py`, `/docs`, rotas com `def` comum.
- Os quatro métodos, status 200, 201, 404 e 422, `HTTPException`, `APIRouter`.
- Parâmetro de caminho e de consulta, com tipo declarado.
- Filtro de lista com laço `for` e `append`, ou com compreensão de lista.
- Pydantic: `BaseModel`, `Field` com restrições, esquema de entrada diferente do de saída,
  `model_dump()` e `**`, `response_model`, `status_code=201`.
- CORS liberado apenas para o endereço exato do meu front, lido da configuração.
- Separação em três camadas, `__init__.py`, import de módulo com `as`.
- `load_dotenv()`, `os.getenv`, `.env` e `.env.exemplo`.
- `Depends` com uma função comum, para o que se repete em várias rotas.

## O que ainda não foi visto, e não deve aparecer

- Banco de dados, SQL, SQLAlchemy ou qualquer ORM. Os dados ficam em lista na memória,
  dentro do repositório.
- Migrations, relacionamento entre tabelas, paginação, ordenação.
- Exceção de domínio criada por mim, do tipo `class PedidoInvalido(Exception)`. Por enquanto,
  quando algo não é encontrado, o serviço devolve `None` e a rota decide o status.
- Regra de negócio inventada que eu não pedi. O serviço faz só o que o enunciado manda.
- Autenticação, login, JWT, hash de senha, rota protegida.
- `allow_origins=["*"]`. Isso é erro, e foi apresentado como erro em aula.
- `pydantic-settings`, `BaseSettings`, classe de configuração. A configuração é uma função
  simples que devolve um dicionário.
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
- Antes de escrever uma função, diga em qual das três camadas ela entra e por quê.
- Justifique cada decisão em uma linha. Eu preciso conseguir defender esse código na arguição.
