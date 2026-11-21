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
        oc: {
          bg: 'var(--oc-bg)',
          panel: 'var(--oc-panel)',
          'panel-2': 'var(--oc-panel-2)',
          line: 'var(--oc-line)',
          text: 'var(--oc-text)',
          muted: 'var(--oc-muted)',
          accent: 'var(--oc-accent)',
          editor: 'var(--oc-editor)',
          sketch: 'var(--oc-sketch)',
          select: 'var(--oc-select)',
          preview: 'var(--oc-preview)',
          add: 'var(--oc-add)',
          cut: 'var(--oc-cut)',
          proposal: 'var(--oc-proposal)',
          ok: 'var(--oc-ok)',
          disabled: 'var(--oc-disabled)',
          'brand-open': 'var(--oc-brand-open)',
        },
      },
      borderColor: {
        ui: 'var(--color-border-default)',
      },
      borderRadius: {
        oc: 'var(--oc-radius)',
      },
      fontFamily: {
        ui: ['var(--oc-font)', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Cascadia Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
