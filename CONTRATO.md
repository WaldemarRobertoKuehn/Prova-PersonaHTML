# CONTRATO — Orçamento da corrida de Seu Valdir

Base de leitura: componentes em `frontend/src/componentes/` (`Topo.jsx`, `Trajeto.jsx`, `Adicionais.jsx`, `Resumo.jsx`), estado em `frontend/src/App.jsx` e dados fixos em `frontend/src/dados/adicionais.js`.

Itens marcados com `?` foram inferidos da leitura do código (não estão escritos em nenhum lugar como regra explícita do negócio).

## 1. Dados que a tela exibe

| Campo | Tipo | Onde aparece |
|---|---|---|
| Identificação "TÁXI · SEU VALDIR" | texto | Topo, no alto do app |
| Título "Orçamento da corrida" | texto | Topo, título principal (h1) |
| Botão de tema ("Modo noturno"/"Modo diurno" + ícone ☾/☀) | texto | Topo, botão que reflete o estado booleano do tema |
| Etiqueta "TRAJETO SIMULADO" | texto | Seção do trajeto |
| Trajeto "Centro → Rodoviária" | texto | Título da seção do trajeto (h2) |
| Estado da corrida ("EM TRAJETO"/"PARADO") | booleano | Selo colorido no canto da seção do trajeto |
| Mapa com ponto A, rota, carro (🚕) e ponto B | visual | Dentro da seção do trajeto |
| "Distância" (mostrando "8 km") | número | Bloco de dados do trajeto |
| "Tempo" (mostrando "20 min") | número | Bloco de dados do trajeto |
| Campo "Valor por km" (pref. R$, modelo 0,00) | número digitado como texto | Grade "Digite os valores da corrida" |
| Campo "Valor por minuto" (pref. R$, modelo 0,00) | número digitado como texto | Grade "Digite os valores da corrida" |
| Botão "Calcular e iniciar trajeto" / "Parar trajeto" | texto | Seção do trajeto |
| Etiqueta "VALORES COM O CARRO PARADO" | texto | Seção de cobranças |
| Título "Adicionar cobrança" | texto | Título da seção de cobranças (h2) |
| Cobranças "Pedágio + R$ 6,50" e "Espera + R$ 5,00" | lista | Botões da seção "Adicionar cobrança" |
| Aviso (mensagem orientadora) | texto | Abaixo dos botões de cobrança |
| Etiqueta "MOSTRE AO PASSAGEIRO" e título "Valor final" | texto | Título da seção do resumo (h2) |
| Valor final (ex.: "R$ 50,50") | número | Destaque na seção do resumo |
| Detalhes da conta (como o total foi formado) | texto | Seção do resumo, abaixo do valor |
| Botão "Começar de novo" | texto | Seção do resumo |

## 2. Ações que o usuário dispara

1. Abrir a tela — o app pede ao servidor o estado salvo e desenha a tela com ele (o app espera receber valores, status da corrida, total, aviso, detalhes e a lista de cobranças). `?` comportamento do estado salvo
2. Clicar no botão de tema no topo — alterna entre modo noturno e diurno; muda só a aparência, não é enviado ao servidor.
3. Digitar no campo "Valor por km" — o valor digitado passa a aparecer no campo.
4. Digitar no campo "Valor por minuto" — o valor digitado passa a aparecer no campo.
5. Clicar em "Calcular e iniciar trajeto" — os dois valores são enviados ao servidor; se ambos forem maiores que zero, o total é calculado, o trajeto entra "EM TRAJETO", o carro no mapa se move e o resumo mostra o total e o detalhe da conta; se não, aparece um aviso pedindo valores maiores que zero.
6. Clicar em "Parar trajeto" — o servidor é avisado que a corrida parou; o selo volta a "PARADO" e os botões de cobrança ficam disponíveis.
7. Clicar em "Pedágio" — a cobrança de R$ 6,50 é somada ao total.
8. Clicar em "Espera" — a cobrança de R$ 5,00 é somada ao total.
9. Clicar em "Começar de novo" — o servidor é avisado; tudo volta ao estado inicial (total R$ 0,00, corrida parada, campos vazios, aviso e detalhe iniciais).

## 3. O que o servidor precisaria fazer

1. Ao abrir a tela — devolver o estado atual (valores dos campos, se a corrida está em trajeto, total, aviso, detalhes) e a lista de cobranças com os valores para os botões. Se não houver nada salvo, devolver o estado inicial.
2. Ao receber "Calcular e iniciar trajeto" — guardar os valores digitados e conferir se ambos são maiores que zero. Se sim: calcular o total como 8 km × valor por km + 20 min × valor por minuto, marcar a corrida como em trajeto e devolver o total, o detalhe do cálculo ("8 km × R$ X + 20 min × R$ Y") e um aviso de trajeto iniciado. Se não: não iniciar e devolver um aviso pedindo valores maiores que zero. O servidor entende o valor escrito com vírgula (3,50) ou com ponto (3.50). `?` aceitar os dois formatos
3. Ao receber "Parar trajeto" — marcar a corrida como parada e devolver um aviso de que agora já dá para adicionar pedágio ou espera. O total não muda.
4. Ao receber "Pedágio" ou "Espera" — conferir se a cobrança existe na lista. Se a corrida ainda não foi calculada/iniciada, avisar para calcular primeiro; se a corrida estiver em andamento, avisar para parar primeiro; se estiver tudo certo, somar o valor da cobrança ao total e devolver um aviso de que foi adicionada.
5. Ao receber "Começar de novo" — zerar o total, marcar a corrida como parada, esvaziar os campos, restaurar o aviso e o detalhe iniciais.
6. Ao longo de tudo — guardar o estado que mudou, para que a próxima abertura da tela continue de onde parou. `?` persistir o estado

## 4. Dúvidas para o professor

1. Distância "8 km" e tempo "20 min" estão fixos no código do front e do servidor. É regra definitiva ou deveriam ser configuráveis/informados pelo usuário?
2. A fórmula do total é 8 km × valor por km + 20 min × valor por minuto. Confirma a regra de negócio?
3. A tela só habilita cobranças quando o total é maior que zero (o código usa "total > 0" como "corrida calculada"). Se o usuário digitar 0,00 em algum campo, não calcula nem inicia. É o comportamento esperado?
4. As cobranças podem ser somadas várias vezes na mesma corrida (cada clique soma de novo). É permitido cobrar "Pedágio" ou "Espera" mais de uma vez?
5. O modo noturno/diurno é só visual e não é guardado — ao recarregar a página, volta ao tema claro. Deve ser lembrado?
6. O servidor mantém o estado da última vez (a tela recarrega de onde parou). É desejável persistir entre sessões ou começar do zero a cada uso?
7. Os campos mostram o modelo "0,00" (vírgula). Qual é o formato oficial de digitação aceito?
8. Os textos de aviso e do detalhe da conta estão hoje duplicados no front e no servidor. Qual deles é a fonte de verdade dessas mensagens, e os textos exatos fazem parte do contrato?
9. Os campos "Valor por km" e "Valor por minuto" ficam desabilitados durante o trajeto — não dá para corrigir a tarifa depois de iniciar. Manter assim?
10. Depois de "Parar trajeto" o total permanece e só é possível adicionar cobranças ou reiniciar — não existe ação de retomar/continuar. É correto?