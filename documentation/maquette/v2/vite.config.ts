import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ici = path.dirname(fileURLToPath(import.meta.url))
const editorUi = path.resolve(ici, '../../../vendor/w3dts/packages/editor-ui/src')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@naanouff/w3dts-editor-ui/styles.css',
        replacement: path.resolve(editorUi, 'styles.css'),
      },
      {
        find: /^@naanouff\/w3dts-editor-ui$/,
        replacement: path.resolve(editorUi, 'index.ts'),
      },
    ],
  },
  server: {
    port: 5174,
  },
})
