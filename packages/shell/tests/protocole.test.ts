import { describe, expect, it } from 'vitest'
import { Session, indexesFonctions } from '@opencad/api-parametrique'
import { moteurSynchrone, reponseUtile } from '../src/moteur/moteur.ts'

describe('moteur', () => {
  it('ignore une réponse dont le numéro est dépassé', () => {
    const appliquees: number[] = []
    let attendue = 0
    const recevoir = (sequence: number) => {
      if (!reponseUtile(sequence, attendue)) return
      appliquees.push(sequence)
    }
    attendue = 2
    recevoir(1)
    recevoir(2)
    expect(appliquees).toEqual([2])
  })

  it('calcule le maillage sur le fil appelant', () => {
    const recus: number[] = []
    const moteur = moteurSynchrone((maillage) => recus.push(maillage.indices.length))
    moteur.executer(
      `
piece pointe
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 2
cote hauteur 5
segment
cote rayon 0
cote hauteur 5
revolution
`,
      1,
    )
    expect(recus).toHaveLength(1)
    expect(recus[0]).toBeGreaterThan(0)
  })

  it('applique une pointe sur le fil appelant', () => {
    const script = `
piece corps
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 2
cote hauteur 5
segment
cote rayon 0
cote hauteur 5
revolution
esquisse plan.12h
segment
cote rayon 0
cote hauteur 5
segment
cote rayon 4
cote hauteur 5
segment
cote rayon 4
cote hauteur 8
segment
cote rayon 0
cote hauteur 8
revolution
`
    const tailles: number[] = []
    const moteur = moteurSynchrone((maillage) => tailles.push(maillage.positions.length))
    moteur.executer(script, 1)
    const plein = tailles[0]!
    expect(plein).toBeGreaterThan(0)
    const miroir = new Session()
    miroir.executer(script)
    const index = indexesFonctions(miroir.historique())[0]!
    moteur.pointe(index, 2)
    expect(tailles[1]!).toBeGreaterThan(0)
    expect(tailles[1]!).toBeLessThan(plein)
  })

  it('remplacer repart d’une session vide', () => {
    const tailles: number[] = []
    const moteur = moteurSynchrone((maillage) => tailles.push(maillage.indices.length))
    moteur.executer(
      `
piece pointe
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 2
cote hauteur 5
segment
cote rayon 0
cote hauteur 5
revolution
`,
      1,
    )
    expect(tailles.at(-1)).toBeGreaterThan(0)
    moteur.remplacer('piece vide', 2)
    expect(tailles.at(-1)).toBe(0)
  })
})
