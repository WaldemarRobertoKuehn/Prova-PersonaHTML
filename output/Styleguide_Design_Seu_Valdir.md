# Styleguide de design para a landing page Seu Valdir

Versão 1.0 · 9 de setembro de 2026

Este guia orienta o design e a futura implementação da landing page do projeto de orçamento de corridas para taxistas. A direção é uma interface legível, direta e fácil de tocar, com identidade amarela e azul e uma demonstração clara do cálculo. O visitante deve entender a proposta, reconhecer sua utilidade e encontrar a ação **Experimentar a simulação**.

O documento serve como referência para layouts, componentes e revisão visual. As medidas da landing page abaixo são propostas de design; a paleta e as características indicadas como existentes vêm do projeto atual.

## 1 Persona e decisões de design

Seu Valdir é taxista. Mantém o celular no suporte do painel, a aproximadamente meio metro dos olhos, enfrenta incidência de sol pela lateral, acrescenta valores com o carro parado e mostra o valor final ao passageiro.

> “O celular fica ali no painel, longe. Se a letra for daquele tamanhinho, eu tenho que tirar do suporte para ler, e aí eu paro de olhar a rua.”

Não atribuir idade, escolaridade ou familiaridade digital à persona sem pesquisa. A dificuldade documentada é a leitura e a interação no contexto de uso.

| Evidência da persona | Regra de design | Aplicação na landing page |
|---|---|---|
| Celular distante dos olhos | Hierarquia forte e texto grande | Corpo de 18 px e demonstração com valor destacado |
| Letras pequenas dificultam a leitura | Evitar textos essenciais em tamanho reduzido | Benefícios, botões e instruções legíveis sem ampliar |
| Sol lateral | Contraste e opção de tema | Controle de tema visível e imagens dos dois modos |
| Acrescenta valores com o carro parado | Explicar quando a ação está disponível | Benefício e demonstração devem comunicar essa condição |
| Mostra o total ao passageiro | Dar protagonismo ao resultado | Bloco amarelo com rótulo e valor em reais |

A landing page é uma página de apresentação, consultada com o veículo parado. Fotografias e textos devem reforçar esse contexto. Na demonstração, o estado PARADO é controlado pela interface; ele não representa detecção física do veículo.

## 2 Identidade e posicionamento

**Nome de apresentação proposto:** Táxi Seu Valdir. Deriva da identificação “TAXI · SEU VALDIR” já usada no protótipo. Usar assinatura tipográfica simples até existir uma marca gráfica aprovada.

**Descrição do produto:** simulador de orçamento de corrida com tarifas por quilômetro e minuto, adicionais e apresentação do total.

**Personalidade visual:** prática, clara e próxima do cotidiano do taxista. A clareza deve vir de títulos objetivos, bom contraste e poucos elementos por bloco.

**Mensagem central proposta:** “Veja o valor da corrida com clareza”. Apoiar a frase com explicação concreta da simulação. Evitar expressões como “revolucionário”, “o melhor do mercado” e promessas de aumento de renda.

O protótipo usa percurso fixo de **8 km e 20 minutos**. Não apresentar o mapa como GPS, o cálculo como medição real ou os adicionais como tarifas oficiais. Não anunciar aplicativo para download, cadastro, pagamentos, disponibilidade comercial, avaliações ou clientes sem que esses recursos e informações existam.

## 3 Paleta de cores

Preservar as cores existentes como base. O amarelo identifica a ação principal e o resultado; o azul apoia navegação e controles; os neutros sustentam a leitura. Usar superfícies predominantemente claras no modo diurno, sem preencher toda a página de amarelo.

| Token | Diurno | Noturno | Uso |
|---|---|---|---|
| `fundo` | `#F3F1EB` | `#07121F` | Fundo da página |
| `superficie` | `#FFFFFF` | `#122236` | Cartões e campos |
| `texto` | `#152033` | `#F7F9FC` | Texto principal |
| `texto-suave` | `#556070` | `#C2CCDA` | Texto complementar legível |
| `borda` | `#C7CED8` | `#52647B` | Divisórias e contornos decorativos |
| `amarelo` | `#F7C948` | `#F7C948` | CTA principal e painel de resultado |
| `amarelo-forte` | `#E7AB00` | `#E7AB00` | Contorno do painel amarelo |
| `azul` | `#123B67` | `#8FC8FF` | Links, foco e contornos ativos |
| `verde` | `#16734B` | `#16734B` | Texto do estado ativo sobre fundo verde claro |

Combinações específicas existentes: texto `#171717` sobre amarelo; estado ativo com `#16734B` sobre `#D6F5E6`; estado parado com `#152033` sobre `#E7EBF0`. Preservar essas duplas explicitamente nos dois temas, sem herdar texto claro sobre o fundo claro do status.

**Extensão proposta para erros:** texto `#B42318` sobre `#FEF3F2` no modo diurno; texto `#FDA29B` sobre `#3B1515` no noturno. Sempre acompanhar a cor de mensagem textual.

### Regras de aplicação

- Usar texto escuro nos botões amarelos em ambos os temas.
- Reservar azul claro para superfícies escuras e azul escuro para superfícies claras.
- Não usar a borda neutra como único indicador de um campo interativo. Para campos da landing page, propor contorno `#556070` no diurno e `#C2CCDA` no noturno.
- Usar links sublinhados em parágrafos. A cor sozinha não deve indicar que um texto é clicável.
- Como critério de projeto, verificar contraste mínimo de 4,5:1 para textos e de 3:1 para indicadores essenciais de controles. Validar as combinações e os estados no layout final; este guia não constitui uma auditoria de acessibilidade do aplicativo.

## 4 Tipografia

**Família:** Arial, Helvetica, sans-serif, preservando o projeto e evitando dependência de fonte externa. Usar pesos 400 para leitura e 700 para títulos, botões e valores. O CSS existente pede também pesos 800 e 900; padronizar visualmente em negrito quando a fonte disponível não distinguir esses pesos.

| Estilo proposto | Celular | Desktop | Entrelinha | Peso |
|---|---|---|---|---|
| Título principal | 36 px | 52 px | 1,1 | 700 |
| Título de seção | 28 px | 36 px | 1,2 | 700 |
| Título de cartão | 22 px | 24 px | 1,25 | 700 |
| Corpo e perguntas frequentes | 18 px | 18 px | 1,5 | 400 |
| Rótulos e botões | 18 px | 20 px | 1,3 | 700 |
| Notas secundárias | 16 px | 16 px | 1,5 | 400 |
| Valor na demonstração | 40 a 56 px | 64 px | 1,1 | 700 |

Os tamanhos são referências de design em pixels. Na implementação, convertê-los para rem considerando a raiz efetiva. No projeto atual, definir 18 px no `body` não altera automaticamente o valor de 1 rem.

Limitar os parágrafos a aproximadamente 60 caracteres por linha. Alinhar textos longos à esquerda. Evitar caixa alta em frases inteiras; reservar para rótulos curtos, como PARADO. Valores monetários seguem o padrão brasileiro: **R$ 42,50**. Se um valor longo não couber, ampliar o espaço ou ajustar o layout antes de reduzir a legibilidade.

## 5 Espaçamento e composição responsiva

**Escala proposta:** 4, 8, 12, 16, 24, 32, 48, 64 e 96 px. Usar 8 px entre rótulo e campo, 16 px entre controles, 24 px dentro de cartões e 48 a 96 px entre seções.

| Faixa proposta | Grade | Margens laterais | Intervalo entre seções |
|---|---|---|---|
| Até 767 px | Uma coluna | 20 px; 16 px em telas de 320 px | 48 px |
| 768 a 1023 px | Até duas colunas | 32 px | 64 px |
| A partir de 1024 px | Grade de 12 colunas, conteúdo até 1120 px | Pelo menos 40 px | 96 px |

No celular, apresentar título, explicação, CTA e demonstração nessa ordem. Botões principais ocupam a largura disponível. Em telas grandes, o primeiro bloco pode ter texto à esquerda e demonstração à direita, com intervalo de 48 px.

A largura máxima de 430 px do aplicativo atual pode ser usada para a prévia do produto. Ela não deve limitar a largura da landing page inteira. A moldura de celular existente é apropriada à prévia, sem envolver toda a página de apresentação.

Permitir quebra e empilhamento quando o conteúdo exigir, mesmo antes dos pontos de mudança previstos. Não usar alturas fixas para blocos de texto nem rolagem horizontal. Evitar cabeçalho ou CTA flutuante que cubra conteúdo em telas pequenas.

## 6 Formas e acabamento

| Elemento | Especificação |
|---|---|
| Cartão | Raio de 18 px, borda de 2 px, preenchimento de 24 px |
| Botão | Raio de 14 px, altura mínima de 60 px, preenchimento de 14 × 20 px |
| Campo | Raio de 12 px, altura mínima de 64 px, borda de 3 px |
| Etiqueta de estado | Raio de 999 px, texto explícito, preenchimento de 9 × 13 px |
| Sombra diurna existente | `0 10px 28px rgba(21, 32, 51, 0.12)` |
| Sombra noturna existente | `0 10px 28px rgba(0, 0, 0, 0.35)` |

Usar sombras apenas para separar superfícies importantes. Evitar brilho, efeitos de vidro e texturas atrás de texto. Controles próximos devem manter pelo menos 12 px de separação para reduzir toques acidentais.

## 7 Componentes e estados

### Botão principal

Rótulo da landing page: **Experimentar a simulação**. Fundo amarelo, texto `#171717`, altura mínima de 60 px e largura total no celular. Destino: demonstração incorporada ou endereço real da simulação, a definir na implementação. O botão precisa chegar a uma experiência funcional.

### Botão secundário e controle de tema

Usar superfície do tema, contorno de 2 a 3 px e texto principal. Rótulo secundário: **Como funciona**, apontando para a seção explicativa. O controle de tema mostra a ação disponível: **Modo noturno** quando o modo diurno estiver ativo e **Modo diurno** no caso inverso. Ícone opcional, sempre acompanhado do texto; mudança em um toque.

| Estado | Tratamento proposto |
|---|---|
| Padrão | Cores e dimensões do componente |
| Ponteiro sobre o botão | Escurecimento discreto; nunca a única indicação da ação |
| Pressionado | Pequena alteração visual sem deslocar o restante da página |
| Foco por teclado | Contorno de 4 px com afastamento de 3 px; escuro no diurno e claro no noturno |
| Indisponível | Aparência neutra, sem ação, acompanhada do motivo em texto legível |
| Erro de entrada | Campo identificado, mensagem próxima e orientação para correção |

Na implementação, usar elementos semânticos: link para navegar e botão para executar ações. A aparência pode ser compartilhada. O estado indisponível não deve depender apenas de diminuir a opacidade de todo o bloco.

### Demonstração e campos

Manter rótulos visíveis **Valor por km** e **Valor por minuto**, prefixo R$, teclado decimal e exemplo `0,00`. Placeholder complementa o rótulo. No estado EM TRAJETO, manter campos e adicionais visíveis, mas indisponíveis conforme a lógica atual.

Mensagem de entrada proposta: “Digite um valor maior que zero para o km e para o minuto.” Orientação dos adicionais: “Pare o trajeto para adicionar pedágio ou espera.” Antes do primeiro cálculo: “Primeiro, calcule e inicie o trajeto.”

Se a prévia for apenas uma imagem, identificá-la como **Exemplo da simulação**. Não apresentar controles da imagem como se estivessem ativos.

### Painel de resultado

Usar fundo amarelo, contorno amarelo forte, texto escuro e valor como elemento de maior peso. Exibir o rótulo **Valor final** e explicar que se trata do resultado da simulação. Manter a condição “Trajeto simulado de 8 km e 20 min” próxima à prévia.

Exemplo demonstrativo: R$ 3,00/km × 8 km + R$ 0,60/min × 20 min = **R$ 36,00**. Com o adicional de pedágio de R$ 6,50 usado no protótipo, o total é **R$ 42,50**. As tarifas de entrada são ilustrativas e não representam preços oficiais.

### Cartões e perguntas frequentes

Cada cartão apresenta um benefício, título curto e até duas frases. Ícones são opcionais e acompanham texto. Preferir perguntas frequentes abertas, evitando interação desnecessária. Se houver acordeão, prever foco visível, acionamento por teclado e indicação do estado aberto ou fechado.

## 8 Imagens e iconografia

Priorizar uma captura legível da interface, mostrando o total e os controles. Para a primeira dobra, usar uma prévia limpa no modo diurno; apresentar o modo noturno na seção de recursos, quando isso ajudar a explicar o benefício.

Fotografia, se usada, deve mostrar veículo estacionado e celular no suporte, com enquadramento simples. Evitar imagens de pessoas tocando o celular enquanto dirigem e fotografias genéricas que ocupem mais espaço que a demonstração.

O arquivo `taxi-react/src/assets/hero.png` é um candidato para avaliação visual, não uma imagem aprovada por este guia. Conferir conteúdo, resolução e direitos de uso antes de incluí-lo na landing page.

Adotar ícones de traço simples, em uma única família, com 24 ou 32 px e espessura consistente. Sol, lua, calculadora e táxi são temas possíveis. Ícone funcional sempre recebe rótulo visível; elementos decorativos não precisam ser anunciados a leitores de tela.

## 9 Linguagem e exemplos de conteúdo

Falar diretamente com o taxista, com vocabulário conhecido: corrida, valor, quilômetro, minuto, pedágio e espera. Usar português com acentuação correta, inclusive quando o protótipo atual não a utiliza. Manter frases curtas e explicar o efeito de cada ação.

| Contexto | Texto proposto |
|---|---|
| Título principal | Veja o valor da corrida com clareza |
| Texto de apoio | Informe os valores por quilômetro e minuto, experimente um trajeto simulado e veja o total em destaque. |
| CTA principal | Experimentar a simulação |
| CTA secundário | Como funciona |
| Benefício de leitura | Letras grandes para facilitar a leitura |
| Benefício de adicionais | Adicionais com o trajeto parado |
| Benefício de resultado | Total em destaque para mostrar ao passageiro |
| Explicação da demonstração | Nesta demonstração, o percurso é fixo: 8 km e 20 minutos. |
| Fechamento | Experimente o cálculo com seus valores |

Não usar “Calcular minha corrida real”, “Rastrear meu trajeto” ou “Baixar o aplicativo” para descrever a versão atual. Evitar depoimentos, números de usuários e selos sem evidência.

## 10 Estrutura proposta da landing page

1. **Cabeçalho.** Assinatura Táxi Seu Valdir, link Como funciona e controle de tema. Em telas estreitas, quebrar em linhas sem comprimir os controles.
2. **Apresentação principal.** Título e apoio da seção anterior, CTA Experimentar a simulação e prévia legível do produto. A explicação do percurso fixo acompanha a demonstração.
3. **Benefícios.** Três cartões: letras grandes, adicionais com trajeto parado e total em destaque. Associar cada benefício a um detalhe real da interface.
4. **Como funciona.** Três passos: informar tarifas; calcular o trajeto simulado; parar a simulação, acrescentar valores e consultar o total. Explicar que distância e duração são fixas.
5. **Demonstração.** Área funcional ou acesso ao protótipo. Mostrar entrada, estado do trajeto e resultado; não acrescentar formulário de contato como barreira ao teste.
6. **Perguntas frequentes.** “O trajeto é real?” — “Não. A demonstração usa 8 km e 20 minutos fixos.” “Posso adicionar pedágio e espera?” — “Sim, depois do cálculo e com o trajeto no estado PARADO.” “Posso mudar o tema?” — “Sim, pelo controle no topo.”
7. **Convite final e rodapé.** Repetir o CTA principal. Identificar o projeto e incluir apenas contatos e links efetivamente disponíveis.

Não adicionar preços comerciais, planos, avaliações ou formulário de captação por padrão. O objetivo de conversão desta versão é iniciar a simulação. O caminho até o teste deve continuar simples em celular e desktop.

## 11 Movimento e acessibilidade

Usar transições discretas de 120 a 180 ms para feedback. Evitar carrossel automático, vídeo com reprodução automática e animação decorativa contínua. A animação do táxi pertence à simulação, sem sugerir localização real; respeitar a preferência por movimento reduzido.

Prever um título principal, seções em ordem lógica, navegação por teclado e foco sempre visível. Manter a ordem de leitura equivalente à ordem visual. Campos precisam de rótulos associados; mensagens de erro devem ser relacionadas ao campo; alterações de resultado devem ser anunciadas sem interromper a leitura.

Testar a composição com ampliação de 200%, textos longos e largura de 320 px. Não esconder informações essenciais para fazer o layout caber. A leitura a aproximadamente meio metro e sob luz forte deve ser avaliada em aparelho real; alternar o tema não garante, por si só, legibilidade sob o sol.

## 12 Entrega para desenvolvimento

Preparar no arquivo de design as páginas **Fundamentos**, **Componentes** e **Landing page**, com variáveis de cor por tema, estilos de texto e a escala de espaçamento. Usar nomes semânticos como `Cor/Texto/Principal`, `Cor/Acao/Principal` e `Espaco/24`.

Criar telas de referência em 390 px, 768 px e 1440 px, mais uma verificação em 320 px. Desenhar modos diurno e noturno e variantes dos controles em foco, pressionados, indisponíveis e com erro. Anotar o destino dos links e o comportamento da demonstração.

O projeto atual está em React com Vite, com componentes em `src/componentes`. A implementação futura deve respeitar `regras-modelo.md`, inclusive as limitações de bibliotecas e hooks. Este guia especifica design; não exige novas dependências nem altera a lógica de cálculo existente.

### Critérios de aceite do design

- [ ] O visitante identifica que a experiência é uma simulação de orçamento.
- [ ] O CTA principal é visível, legível e tem destino definido.
- [ ] A prévia informa 8 km e 20 minutos fixos, sem sugerir GPS.
- [ ] A paleta mantém os papéis de amarelo, azul e neutros.
- [ ] Texto essencial tem pelo menos 18 px e controles principais têm pelo menos 60 px de altura.
- [ ] Ambos os temas têm combinações de contraste verificadas, incluindo foco e estados.
- [ ] Adicionais indisponíveis continuam visíveis e têm motivo explicado.
- [ ] O total em reais está destacado e cabe nos tamanhos de tela previstos.
- [ ] A página funciona visualmente em 320 px e com ampliação de texto.
- [ ] Imagens, textos e promessas correspondem aos recursos existentes.
- [ ] O layout contém especificações suficientes para implementar os componentes e suas variantes.

## 13 Referências do projeto

- `Folha Persona (RESPONDIDA).docx`: contexto de uso, frase da persona e avaliação do protótipo original.
- `Folha Persona (PREENCHER).md`: identificação de Seu Valdir e requisitos iniciais.
- `regras-modelo.md`: requisitos da persona e diretrizes da migração para React.
- `taxi-react/src/estilo.css` e `taxi-react/src/index.css`: paleta, temas, tipografia, controles e acabamento existentes.
- `taxi-react/src/App.jsx`: cálculo fixo, controle do estado e condições para adicionais.
- `taxi-react/src/componentes/Topo.jsx`, `Trajeto.jsx` e `Resumo.jsx`: rótulos, demonstração e apresentação do resultado.
- `taxi-react/src/dados/adicionais.js`: valores demonstrativos de pedágio e espera.

A folha de atividade mantém um cabeçalho sobre Seu Antônio, mas o conteúdo da persona e o projeto implementado se referem a Seu Valdir. Este guia acompanha Seu Valdir. A limitação de adicionais apontada na avaliação do HTML já tem tratamento na lógica React consultada; a demonstração da landing page deve refletir essa versão.
