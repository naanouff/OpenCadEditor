import { describe, expect, it } from 'vitest'
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
})
