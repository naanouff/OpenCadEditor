import type { Config } from 'tailwindcss'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ici = path.dirname(fileURLToPath(import.meta.url))
const editorUi = path.resolve(ici, '../../vendor/w3dts/packages/editor-ui/src')

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    path.join(editorUi, '**/*.{ts,tsx}').replace(/\\/g, '/'),
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background-page)',
        foreground: 'var(--color-text-primary)',
        accent: 'var(--theme-accent-color)',
      },
      borderColor: {
        ui: 'var(--color-border-default)',
      },
      fontFamily: {
        ui: ['var(--font-family-ui)'],
        mono: ['var(--font-family-mono)'],
      },
    },
  },
  plugins: [],
}

export default config
