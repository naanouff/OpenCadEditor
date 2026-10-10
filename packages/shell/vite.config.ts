import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import monacoEditorPluginPkg from 'vite-plugin-monaco-editor'

const monacoEditorPlugin =
  typeof monacoEditorPluginPkg === 'function'
    ? monacoEditorPluginPkg
    : (monacoEditorPluginPkg as { default: typeof monacoEditorPluginPkg }).default

const ici = path.dirname(fileURLToPath(import.meta.url))
const paquets = path.resolve(ici, '../../vendor/w3dts/packages')
const coreSrc = path.resolve(paquets, 'core/src')
const editorUi = path.resolve(paquets, 'editor-ui/src')
const occtWasm = path.resolve(ici, '../../vendor/occt-wasm')
const occtArtefacts = path.resolve(ici, 'occt')

function surchargeCamera(): Plugin {
  const fichiers: Record<string, string> = {
    buildCameraProjectionMatrix: path.resolve(ici, 'src/surcharges/buildCameraProjectionMatrix.ts'),
    OrbitalCameraController: path.resolve(ici, 'src/surcharges/OrbitalCameraController.ts'),
  }
  return {
    name: 'opencad-surcharge-camera',
    enforce: 'pre',
    resolveId(source) {
      const base = source.split('?')[0]!.replace(/\\/g, '/')
      for (const [nom, cible] of Object.entries(fichiers)) {
        if (base.endsWith(`/${nom}.ts`) || base.endsWith(`/${nom}`)) return cible
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin({ languageWorkers: ['editorWorkerService'] }),
    surchargeCamera(),
  ],
  publicDir: path.resolve(paquets, 'viewer-editor/public'),
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
      {
        find: '@opencad/api-parametrique',
        replacement: path.resolve(ici, '../api-parametrique/src/index.ts'),
      },
      {
        find: '@opencad/format-opencad',
        replacement: path.resolve(ici, '../format-opencad/src/index.ts'),
      },
      {
        find: '@naanouff/occt-wasm/kernel/batch',
        replacement: path.resolve(occtWasm, 'js/kernel-batch.mjs'),
      },
      {
        find: '@naanouff/occt-wasm/kernel',
        replacement: path.resolve(occtArtefacts, 'occt-kernel.js'),
      },
      { find: '@w3dts-core-src', replacement: coreSrc },
      {
        find: '@naanouff/w3dts-core',
        replacement: path.resolve(paquets, 'core/src/index.ts'),
      },
      {
        find: '@naanouff/w3dts-logger',
        replacement: path.resolve(paquets, 'logger/src/index.ts'),
      },
      {
        find: '@naanouff/w3dts-vector-lines',
        replacement: path.resolve(paquets, 'vector-lines/src/index.ts'),
      },
      {
        find: '@naanouff/w3dts-text-mesh',
        replacement: path.resolve(paquets, 'text-mesh/src/index.ts'),
      },
      {
        find: '@naanouff/w3dts-animation',
        replacement: path.resolve(paquets, 'animation/src/index.ts'),
      },
      {
        find: '@naanouff/w3dts-loader-hdr',
        replacement: path.resolve(paquets, 'loader-hdr/src/index.ts'),
      },
      {
        find: '@naanouff/w3dts-input',
        replacement: path.resolve(paquets, 'input/src/index.ts'),
      },
      {
        find: 'gl-matrix',
        replacement: path.resolve(ici, '../../vendor/w3dts/node_modules/gl-matrix'),
      },
    ],
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    exclude: [
      '@opencad/api-parametrique',
      '@opencad/format-opencad',
      '@naanouff/w3dts-editor-ui',
      '@naanouff/occt-wasm/kernel',
    ],
  },
  assetsInclude: ['**/*.wasm'],
  server: {
    fs: {
      allow: [path.resolve(ici, '../..')],
    },
  },
  test: {
    testTimeout: 120_000,
    hookTimeout: 120_000,
  },
})

