import { describe, expect, it } from 'vitest'
import {
  octetsCadomeshBoite,
  octetsDepuisMaillage,
  lireCadomesh,
  URI_CADOMESH,
} from '../src/assemblageCadomesh.ts'

describe('assemblage cadomesh octets', () => {
  it('mappe les cinq URI mesh vers les pièces', () => {
    expect(Object.keys(URI_CADOMESH).sort()).toEqual(
      [
        './carrure.cadomesh',
        './couronne.cadomesh',
        './fond.cadomesh',
        './lunette.cadomesh',
        './verre.cadomesh',
      ].sort(),
    )
  })

  it('encode / décode un triangle sans OCCT', () => {
    const bytes = octetsDepuisMaillage(
      [0, 0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 1, 2],
      'tri',
    )
    const file = lireCadomesh(bytes)
    expect(file.name).toBe('tri')
    expect(file.indices).toEqual([0, 1, 2])
    expect(file.units).toBe(2)
  })

  it('écrit des .cadomesh OCCT pour lunette et fond', async () => {
    const all = await octetsCadomeshBoite()
    // Full box can be slow ; assert at least lunette + fond when present
    expect(all.size).toBeGreaterThanOrEqual(2)
    for (const uri of ['./lunette.cadomesh', './fond.cadomesh'] as const) {
      const bytes = all.get(uri)
      expect(bytes, uri).toBeDefined()
      const file = lireCadomesh(bytes!)
      expect(file.positions.length).toBeGreaterThan(0)
      expect(file.indices.length).toBeGreaterThan(0)
      expect(file.indices.length % 3).toBe(0)
    }
  }, 120_000)
})
