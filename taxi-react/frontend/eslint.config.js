// eslint.config.js — configuração do ESLint, a ferramenta que aponta erros e más práticas de código
// (variáveis sem uso, JSX quebrado, dependências de hooks erradas etc.).
// Este arquivo usa o formato "flat config", padrão atual do ESLint: uma lista de blocos de configuração.

// Importa regras e plugins já prontos que serão combinados abaixo.
import js from '@eslint/js'                 // regras oficiais básicas de JavaScript
import globals from 'globals'               // define as variáveis globais de cada ambiente (browser, node...)
import reactHooks from 'eslint-plugin-react-hooks' // regras para os hooks do React (useState, useEffect...)
import reactRefresh from 'eslint-plugin-react-refresh' // regras de hot reload (codigo atualizado ao salvar sem reiniciar)
import { defineConfig, globalIgnores } from 'eslint/config'

// defineConfig recebe um array de blocos; o primeiro "ignora" a pasta dist (o build gerado),
// pois não queremos que o ESLint inspecione arquivos que são resultado de compilação.
export default defineConfig([
  globalIgnores(['dist']),

  {
    // Este bloco se aplica a todos os arquivos .js e .jsx do projeto.
    files: ['**/*.{js,jsx}'],
    // extends combina conjuntos de regras prontos nesta ordem:
    extends: [
      js.configs.recommended,              // regras básicas de JavaScript
      reactHooks.configs.flat.recommended, // regras para usar os hooks corretamente
      reactRefresh.configs.vite,           // integração com o Vite (hot reload)
    ],
    languageOptions: {
      // Informa ao ESLint quais variáveis globais do navegador existem (window, document, fetch...),
      // para ele não acusar "w is not defined" em código que roda no browser.
      globals: globals.browser,
      // Habilita o parser a entender JSX (a mistura de HTML dentro do JavaScript dos componentes).
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])