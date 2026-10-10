#!/usr/bin/env node
/**
 * Télécharge les artefacts occt-kernel de la release épinglée dans vendor/occt-wasm.
 * Usage : node scripts/fetch-occt-kernel.mjs
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const sousModule = join(racine, 'vendor', 'occt-wasm')
const sortie = join(racine, 'packages', 'shell', 'occt')
const tag = execFileSync('git', ['-C', sousModule, 'describe', '--tags', '--exact-match'], {
  encoding: 'utf8',
}).trim()

await mkdir(sortie, { recursive: true })
execFileSync(
  'gh',
  [
    'release',
    'download',
    tag,
    '--repo',
    'naanouff/occt-wasm',
    '--pattern',
    'occt-kernel.*',
    '--pattern',
    'LICENSE*',
    '--pattern',
    'OCCT_LGPL*',
    '--pattern',
    'link-libs.txt',
    '--dir',
    sortie,
    '--clobber',
  ],
  { stdio: 'inherit' },
)

const libs = await readFile(join(sortie, 'link-libs.txt'), 'utf8')
if (/TKOpenGl/i.test(libs)) {
  console.error('link-libs.txt contains TKOpenGl')
  process.exit(1)
}
await writeFile(join(sortie, 'VERSION'), `${tag}\n`, 'utf8')
console.log(`occt-kernel ${tag} → ${sortie}`)
