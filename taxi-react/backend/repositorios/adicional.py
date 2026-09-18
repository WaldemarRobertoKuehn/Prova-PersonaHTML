# Lista fixa de cobranças em memória (não há banco de dados) e as funções que leem dela.
# O repositório não aplica regra nem responde sobre HTTP; isso é do serviço e da rota.

ADICIONAIS = [
    {"id": 1, "nome": "Pedágio", "valor": 6.5, "valorExibido": "+ R$ 6,50"},
    {"id": 2, "nome": "Espera", "valor": 5.0, "valorExibido": "+ R$ 5,00"},
]


def listar_todos():
    # Devolve a lista completa para os botões e para os filtros do serviço.
    return ADICIONAIS


def buscar_por_id(id):
    # Leitura pelo id; devolve None se não achar, para o serviço repassar a decisão.
    for adicional in ADICIONAIS:
        if adicional["id"] == id:
            return adicional
    return None


def buscar_por_nome(nome):
    # Leitura pelo nome, usada na cobrança; devolve None se não achar.
    for adicional in ADICIONAIS:
        if adicional["nome"] == nome:
            return adicional
    return None