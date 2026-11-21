import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@naanouff/w3dts-editor-ui/styles.css'
import './tailwind.css'
import { App } from './App'
import { applyOcTheme, loadOcTheme } from './ds'

applyOcTheme(loadOcTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
