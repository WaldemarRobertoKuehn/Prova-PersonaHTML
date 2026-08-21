# DESENVOLVIMENTO WEB COM IA · UC5 FRONT-END DE PROJETOS WEB

## Folha de acompanhamento

### Aula guiada: a tela de orçamento do Seu Antônio

**Nome:** Waldemar Roberto Kuehn  
**Data:** 20 / 08 / 2026

> **Como usar esta folha**  
> Hoje ninguém digita código. A aula é demonstrada no quadro e esta folha é preenchida à mão, durante a explicação. Ela vai ser o seu material de consulta na próxima aula, quando cada um receber uma persona diferente para resolver sozinho.

## A persona

### Persona 10 — Seu Valdir, taxista

Mantém o celular no suporte do painel, a cerca de meio metro dos olhos. Acrescenta valores à corrida conforme acontecem, sempre com o carro parado. O sol entra pela lateral em boa parte do trajeto. Mostra o valor final para o passageiro.

**A frase dele:**

> “O celular fica ali no painel, longe. Se a letra for daquele tamanhinho, eu tenho que tirar do suporte para ler, e aí eu paro de olhar a rua.”

**Restrição técnica:** apenas HTML, CSS e JavaScript com `let`, `if`, `function` e evento de clique. Sem biblioteca, sem framework.

## Etapa 1: da frase ao requisito

Preencher junto com a turma, durante a discussão no quadro.

| O que a persona diz | O que a tela é obrigada a ter |
|---|---|
| O celular fica longe | |
| A letra é pequena | Letras maiores |
| O sol entra na lateral | Opção de modo diurno e noturno |
| Mostra o valor final para o passageiro | Valor final da corrida |
| | |

## Etapa 2: o prompt

Copiar o prompt escrito no quadro. Marcar com um círculo a parte que veio da persona.

> Seu Valdir, Taxista tem o telefone fixado a meio metro de distancia dos olhos, acrescenta valores com o carro parado. O sol é um problema porque entra na lateral quase todo o trajeto. Mostra o valor no final para o passageiro.
>
> Precisa de uma tela de toque fácil, com letras e números maiores, campo para digitar o valor do km e dos minutos.
>
> Preciso simular um trajeto do ponto de partida até a chegada, para calcular km e tempo e apresentar o valor final para o passageiro. Gere a simulação de trajeto no css.
>
> Restrição: Apenas HTML, CSS, Java script, contendo let, if, function e evento de clipe e campo de digitar valor km e minuto. Sem biblioteca, framework.

## Etapa 3: o que a IA ignorou

Anotar cada ponto do prompt que o código gerado desobedeceu.

1. ______________________________________________________________________

2. ______________________________________________________________________

3. ______________________________________________________________________

## Os cinco passos do JavaScript

Anotar, em cada passo, o que apareceu na tela ou no console depois de rodar.

| Passo | O que foi escrito | O que aconteceu ao rodar |
|---:|---|---|
| 1 | `let total = 0` | |
| 2 | A função e o `addEventListener` | |
| 3 | `textContent` no lugar do console | |
| 4 | A segunda função, do alinhamento | |
| 5 | A função de começar de novo | |

## Glossário: com as suas palavras

Escrever a explicação de cada símbolo do jeito que você diria para alguém de fora da área. Copiar a definição do professor não vale.

| Símbolo | O que ele faz |
|---|---|
| `let` | |
| `document.querySelector` | |
| `textContent` | |
| `function` | |
| `addEventListener` | |
| `"click"` | |
| o nome sem parênteses | |

## As três perguntas de hoje

Responder por escrito antes de sair da sala. São as mesmas perguntas que vão ser feitas em voz alta na próxima aula, sobre a sua persona.

### 1. Por que essa tela não tem nenhum campo para digitar valor?

________________________________________________________________________

________________________________________________________________________

### 2. Por que `somarTrocaOleo` aparece sem parênteses dentro do `addEventListener`?

________________________________________________________________________

________________________________________________________________________

### 3. O botão de começar de novo não estava na tabela de requisitos. De onde ele apareceu?

________________________________________________________________________

________________________________________________________________________

> **O que fica desta aula**  
> Rodar sem erro e servir para a pessoa são duas perguntas diferentes. A IA responde ao prompt, não à persona. Quem confere se a resposta atende à pessoa é quem leu a frase dela.

> **Próxima aula**  
> Cada aluno recebe uma persona diferente e percorre sozinho as mesmas quatro etapas: extrair os requisitos, escrever o prompt, revisar o que a IA entregou e defender três linhas do código em voz alta. A nota mora na primeira etapa e na defesa.
