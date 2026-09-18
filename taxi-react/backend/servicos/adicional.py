# Decisões e filtros do recurso adicional. A rota chama aqui; quando a cobrança
# não existe, o serviço devolve None e a rota decide o status de resposta.

from repositorios import adicional as adicional_repositorio


def listar():
    # Repassa a lista completa do repositório para a rota exibir os botões.
    return adicional_repositorio.listar_todos()


def buscar_por_id(id):
    # Procura pela identificação; devolve None quando não encontra (a rota trata o 404).
    return adicional_repositorio.buscar_por_id(id)


def filtrar_por_valor_maximo(valor_maximo):
    # Filtra a lista pelo valor máximo pedido na consulta; a regra de negócio fica aqui.
    return [
        adicional
        for adicional in adicional_repositorio.listar_todos()
        if adicional["valor"] <= valor_maximo
    ]