import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Direciona as chamadas /api para o FastAPI durante o desenvolvimento.
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})
