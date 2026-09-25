import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const ici = path.dirname(fileURLToPath(import.meta.url))
const paquets = path.resolve(ici, '../../vendor/w3dts/packages')

export default defineConfig({
  publicDir: path.resolve(paquets, 'viewer-editor/public'),
  resolve: {
    alias: {
      '@naanouff/w3dts-core': path.resolve(paquets, 'core/src/index.ts'),
      '@naanouff/w3dts-logger': path.resolve(paquets, 'logger/src/index.ts'),
      '@naanouff/w3dts-vector-lines': path.resolve(paquets, 'vector-lines/src/index.ts'),
      '@naanouff/w3dts-animation': path.resolve(paquets, 'animation/src/index.ts'),
      '@naanouff/w3dts-loader-hdr': path.resolve(paquets, 'loader-hdr/src/index.ts'),
      '@naanouff/w3dts-input': path.resolve(paquets, 'input/src/index.ts'),
      'gl-matrix': path.resolve(ici, '../../vendor/w3dts/node_modules/gl-matrix'),
    },
  },
  optimizeDeps: {
    exclude: ['@opencad/api-parametrique'],
  },
  server: {
    fs: {
      allow: [path.resolve(ici, '../..')],
    },
  },
})
