# regras.md: tela de Seu Valdir em React

Este arquivo registra, item a item, como a persona deve orientar a migracao da
tela atual para React. O objetivo e manter a aparencia e o funcionamento da
versao em HTML, CSS e JavaScript, sem inventar outra interface.

## 1. Quem usa esta tela

Seu Valdir e taxista e usa o celular preso ao painel, a cerca de meio metro dos
olhos. Ele consulta e toca a tela durante o trabalho, com pouco tempo e sem poder
desviar a atencao da rua. O sol entra pela lateral durante boa parte do trajeto e
dificulta a leitura. Ele tambem precisa mostrar o valor final ao passageiro.

Frase da persona:

> "O celular fica ali no painel, longe. Se a letra for daquele tamanhinho, eu tenho que tirar do suporte para ler, e ai eu paro de olhar a rua."

## 2. O que a tela e obrigada a ter

| A persona diz ou vive | A tela e obrigada a ter |
|---|---|
| O celular fica no painel, longe | Uma coluna, informacoes principais visiveis e botoes com pelo menos 60 px de altura. |
| A letra pequena atrapalha | Texto-base de 18 px, titulos grandes e valor final entre 2,4 rem e 4 rem. |
| Precisa tirar o celular do suporte | Contraste forte, rotulos escritos e nenhum icone usado sozinho. |
| O sol entra pela lateral | Botao "Modo noturno"/"Modo diurno" no topo, acionado com um toque. |
| Mostra o valor ao passageiro | Bloco amarelo, grande e separado para o valor final. |
| Digita valor do km e dos minutos | Dois campos em reais, usados com 8 km e 20 minutos no calculo. |
| Acrescenta valores com o carro parado | Pedagio e espera so ficam disponiveis quando o trajeto esta parado. |
| Precisa simular o trajeto | Mapa com A, B, taxi e estado PARADO/EM TRAJETO; distancia e tempo continuam fixos. |

## 3. O que a tela nao pode ter

- Letras pequenas nas informacoes principais.
- Icone sem texto explicando a acao.
- Cobranca adicional disponivel enquanto o estado mostra EM TRAJETO.
- Informacao importante que dependa apenas de cor.
- Elemento essencial que desapareca depois de usado.
- Mais de um toque para trocar o tema.

## 4. O que eu ja sei e o codigo deve usar

- Projeto Vite no template React.
- Componentes com `function`, um por arquivo, em `src/componentes`.
- JSX com `className`, chaves para valores e uma raiz por `return`.
- Props recebidas com desestruturacao.
- `useState` no `App`.
- Lista renderizada com `map` e `key` vinda do `id`.
- Eventos com `onClick` e funcoes recebidas por props.
- Dados fixos em `src/dados/adicionais.js`.
- CSS anterior copiado para `src/estilo.css` sem alteracao.

## 5. O que eu ainda nao aprendi e o codigo nao pode ter

- Hooks alem de `useState`.
- Bibliotecas de componentes ou estilo.
- Rotas, estado global, `localStorage` ou `fetch`.
- `innerHTML`, `var`, `==` ou `document.querySelector`.
- `push` em lista guardada no estado.
- Funcao com seta fora de `onClick` e de `map`.
- TypeScript, testes automatizados ou animacao criada no React.

## 6. Como o codigo foi organizado

- Nomes de componentes, funcoes, variaveis e props estao em portugues, sem acento.
- Comentarios ligam decisoes aos requisitos da persona.
- Decisoes de interface aparecem marcadas com `// DECISAO SUA:`.
- As tres partes que eram exercicios foram preenchidas: calculo do total, `map` dos adicionais e formatacao da moeda.
- O projeto nao foi executado: antes de rodar, o aluno escreve o que espera ver.

## 7. Ponto de partida e destino

A origem e a tela formada por `index.html`, `script.js` e `style.css`. O destino
e o projeto Vite em `taxi-react`. O HTML foi separado em componentes React, a
manipulacao do DOM virou estado e props, e o CSS foi reaproveitado.
