# Carrega as variáveis do arquivo .env e entrega para o resto do projeto.
# O endereço do front não fica escrito em nenhum arquivo .py: ele vem daqui, do .env.
import os

from dotenv import load_dotenv

load_dotenv()

# Origem exata do front em desenvolvimento, lida da chave ORIGEM_FRONT do .env.
ORIGEM_FRONT = os.getenv("ORIGEM_FRONT")