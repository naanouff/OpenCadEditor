import { describe, expect, it } from 'vitest'
import { runBatch } from '../../../vendor/occt-wasm/js/kernel-batch.mjs'

async function chargerKernel() {
  const factory = (await import('../occt/occt-kernel.js')).default
  const wasmUrl = new URL('../occt/occt-kernel.wasm', import.meta.url).href
  return factory({
    locateFile: (fichier: string) => (fichier.endsWith('.wasm') ? wasmUrl : fichier),
  })
}

describe('occt-kernel', () => {
  it('tesselle une boîte via runBatch', async () => {
    const occt = await chargerKernel()
    expect(typeof occt._occt_make_box).toBe('function')
    const out = runBatch(occt, [
      { op: 'make_box', args: [10, 20, 30], as: 'body' },
      { op: 'tessellate', args: [{ handle: 'body' }, 'normal'], as: 'mesh' },
    ])
    expect(out.ok).toBe(true)
    const mesh = out.aliases?.mesh as { ok?: boolean; triangleCount?: number }
    expect(mesh?.ok).toBe(true)
    expect(mesh?.triangleCount ?? 0).toBeGreaterThan(0)
  }, 120_000)

  it('extrude un profil puis coupe', async () => {
    const occt = await chargerKernel()
    const profil = [
      0, 0, 0, 20, 0, 0, 20, 0, 10, 0, 0, 10, 0, 0, 0,
    ]
    const out = runBatch(occt, [
      { op: 'make_wire_polyline', args: [profil], as: 'wire' },
      { op: 'make_face_from_wire', args: [{ handle: 'wire' }], as: 'face' },
      { op: 'extrude', args: [{ handle: 'face' }, 0, 8, 0], as: 'solid' },
      { op: 'make_cylinder', args: [3, 20], as: 'cutter' },
      { op: 'boolean_cut', args: [{ handle: 'solid' }, { handle: 'cutter' }], as: 'cut' },
      { op: 'tessellate', args: [{ handle: 'cut' }, 'normal'], as: 'mesh' },
    ])
    expect(out.ok).toBe(true)
    const mesh = out.aliases?.mesh as { triangleCount?: number }
    expect(mesh?.triangleCount ?? 0).toBeGreaterThan(0)
  }, 120_000)

  it('extrude un profil à arc vrai', async () => {
    const occt = await chargerKernel()
    // Carré 20 × 10 coiffé d'un demi-cercle de rayon 10 passant par (10, 20).
    const profil = [0, 0, 0, 20, 0, 0, 20, 10, 0, 10, 20, 0, 0, 10, 0, 0, 0, 0]
    const out = runBatch(occt, [
      { op: 'make_wire_arcs', args: [profil, [0, 0, 0, 1, 0, 0]], as: 'wire' },
      { op: 'make_face_from_wire', args: [{ handle: 'wire' }], as: 'face' },
      { op: 'extrude', args: [{ handle: 'face' }, 0, 0, 5], as: 'solid' },
      { op: 'list_edges', args: [{ handle: 'solid' }], as: 'edges' },
    ])
    expect(out.ok).toBe(true)
    const { edges } = out.aliases?.edges as {
      edges: { length: number; ends: number[]; line: boolean }[]
    }
    const arcs = edges.filter((e) => !e.line)
    expect(arcs).toHaveLength(2)
    for (const arc of arcs) expect(arc.length).toBeCloseTo(Math.PI * 10, 3)
    const verticales = edges.filter((e) => e.line && Math.abs(e.ends[2]! - e.ends[5]!) === 5)
    expect(verticales).toHaveLength(4)
  }, 120_000)

  it('refuse deux milieux d’arc consécutifs', async () => {
    const occt = await chargerKernel()
    const out = runBatch(occt, [
      { op: 'make_wire_arcs', args: [[0, 0, 0, 10, 5, 0, 20, 0, 0, 10, -5, 0, 0, 0, 0], [0, 1, 1, 0, 0]], as: 'wire' },
    ])
    expect(out.ok).toBe(false)
  }, 120_000)
})
