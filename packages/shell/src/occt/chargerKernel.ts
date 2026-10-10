import { runBatch } from '@naanouff/occt-wasm/kernel/batch'

export type { KernelBatchOp } from '../../../../vendor/occt-wasm/types/occt-kernel.d.ts'
export type OcctKernelModule = Awaited<ReturnType<typeof chargerKernel>>

/** Charge occt-kernel depuis packages/shell/occt (artefacts release v0.2.0). */
export async function chargerKernel() {
  const factory = (await import('../../occt/occt-kernel.js')).default as (options?: {
    locateFile?: (path: string) => string
  }) => Promise<{
    HEAPU8: Uint8Array
    HEAP32: Int32Array
    UTF8ToString(ptr: number): string
    _malloc(size: number): number
    _free(ptr: number): void
    _occt_free(ptr: number): void
    _occt_make_box(dx: number, dy: number, dz: number): number
    _occt_tessellate(handle: number, preset: number): number
    [key: string]: unknown
  }>
  const wasmUrl = new URL('../../occt/occt-kernel.wasm', import.meta.url).href
  return factory({
    locateFile: (fichier) => (fichier.endsWith('.wasm') ? wasmUrl : fichier),
  })
}

export { runBatch }
