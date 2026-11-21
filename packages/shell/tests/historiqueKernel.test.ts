import { describe, expect, it } from 'vitest'
import type { Operation } from '@opencad/api-parametrique'
import { historiqueVersKernel } from '../src/occt/historiqueKernel.ts'

const op = (type: string, args: Record<string, string> = {}): Operation =>
  ({ type, arguments: args, noms: [] }) as unknown as Operation

const boite = [
  op('ouvrir', { support: 'plan.dessus' }),
  op('rectangle'),
  op('cote', { cible: 'longueur', expression: '50' }),
  op('cote', { cible: 'largeur', expression: '30' }),
  op('extrude', { expression: '15' }),
]

describe('historiqueVersKernel', () => {
  it('passe un fillet sur toutes les arêtes', () => {
    const dto = historiqueVersKernel([...boite, op('fillet', { expression: '2' })])
    expect(dto?.at(-1)).toEqual({ type: 'fillet', rayon: '2' })
  })

  it('laisse au pipeline local un fillet qui sélectionne ses arêtes', () => {
    expect(historiqueVersKernel([...boite, op('fillet', { expression: '20', aretes: 'arete.vertical' })])).toBeNull()
  })
})
