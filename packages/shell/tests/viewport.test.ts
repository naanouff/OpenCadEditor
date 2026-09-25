import { describe, expect, it } from 'vitest'
import type { Maillage } from '@opencad/api-parametrique'
import { Hote } from '../src/hote.ts'

const script = `
piece carrure
param diametre_boite 40
param epaisseur_paroi 2.5
param hauteur_carrure 8
esquisse plan.dessus
cercle
cote diametre diametre_boite
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
extrude hauteur_carrure
`

function rayonExterieur(maillage: Maillage) {
  let max = 0
  for (let i = 0; i < maillage.positions.length; i += 3) {
    max = Math.max(max, Math.hypot(maillage.positions[i], maillage.positions[i + 2]))
  }
  return max
}

describe('viewport', () => {
  it('reçoit le maillage de l’anneau puis le remplace', () => {
    const hote = new Hote()
    hote.executer(script)
    const recus = hote.maillagesRecus()
    expect(rayonExterieur(recus.at(-1)!)).toBeCloseTo(20)
    hote.ligne('param diametre_boite 42')
    const suivant = hote.maillagesRecus()
    expect(rayonExterieur(suivant.at(-1)!)).toBeCloseTo(21)
    expect(suivant.length).toBe(recus.length + 1)
  })
})
