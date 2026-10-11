import '@naanouff/w3dts-editor-ui/styles.css'
import './tailwind.css'
import { createRoot } from 'react-dom/client'
import {
  applyResolvedThemeToDocument,
  loadThemeFromStorage,
  resolveThemeForDom,
} from '@naanouff/w3dts-editor-ui'
import { App } from './App.tsx'

const theme = resolveThemeForDom(loadThemeFromStorage())
applyResolvedThemeToDocument(theme)

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root')
createRoot(root).render(<App />)

if (import.meta.env.DEV) {
  void import('./pontMcp.ts').then((module) => module.brancherPontMcp())
}
