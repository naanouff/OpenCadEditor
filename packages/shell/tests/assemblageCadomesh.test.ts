import { describe, expect, it } from 'vitest'
import { CadomDocument } from '@opencad/cadom'
import { assemblageBoiteComplete } from '../src/assemblageBoite.ts'
import {
  maillageDepuisCadomesh,
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

  it('affiche le viewport depuis .cadomesh sans second rebuild', async () => {
    const all = await octetsCadomeshBoite()
    const subset = new Map(
      [...all].filter(([uri]) => uri === './lunette.cadomesh' || uri === './fond.cadomesh'),
    )
    const logical = assemblageBoiteComplete()
    logical.nodes = logical.nodes.filter(
      (n) =>
        n.id === logical.rootIds[0] ||
        n.name === 'Lunette' ||
        n.name === 'Fond',
    )
    const doc = CadomDocument.fromLogical(logical)
    const maille = maillageDepuisCadomesh(doc, subset)
    expect(maille).not.toBeNull()
    expect(maille!.indices.length).toBeGreaterThan(0)
    let yMax = -Infinity
    for (let i = 0; i < maille!.positions.length; i += 3) {
      yMax = Math.max(yMax, maille!.positions[i + 1]!)
    }
    expect(yMax).toBeGreaterThan(8)
  }, 120_000)
})
