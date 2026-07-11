import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App'

// Modo captura (QA visual): ?flat compacta las alturas de viewport.
if (new URLSearchParams(location.search).has('flat')) {
  document.documentElement.classList.add('flat-capture')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
