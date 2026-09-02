// StrictMode ajuda a encontrar problemas no codigo enquanto o projeto esta em desenvolvimento.
import { StrictMode } from 'react'
// createRoot liga o React ao elemento principal que existe no index.html.
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// O React procura a div com id="root" e desenha o componente App dentro dela.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
