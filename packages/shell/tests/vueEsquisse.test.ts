import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { SCRIPT_VIS } from '../src/scriptVis.ts'
import { arbreConstruction } from '../src/arbreConstruction.ts'
import { documentCad } from '../src/documentCad.ts'
import { storeShell } from '../src/storeShell.ts'

describe('vue esquisse', () => {
  it('réaffiche une esquisse déjà consommée, sans toucher au solide', () => {
    const session = new Session()
    session.executer(`
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
`)
    expect(session.esquisseCourante()).toBeNull()
    const index = session.historique().findIndex((operation) => operation.type === 'ouvrir')
    const posee = session.esquisseDepuis(index)
    expect(posee?.support).toBe('plan.12h')
    expect(posee?.traits).toEqual([0, 0, 2, 5, 2, 5, 0, 5])
    expect(posee?.cotesLineaires?.map((cote) => cote.texte).sort()).toEqual(['2', '5'])
    const document = documentCad({ faces: [] }, posee, session.maillage())
    expect(document.maillage.indices).toEqual([])
    expect(document.brepWireframe.segmentCount).toBe(0)
    expect(document.cotes.segmentCount).toBeGreaterThan(0)
    const trait = document.esquisse.position.array
    expect(trait[0]).toBeCloseTo(0)
    expect(trait[1]).toBeCloseTo(0)
    expect(trait[3]).toBeCloseTo(0.002)
    expect(trait[4]).toBeCloseTo(0.005)
    let yMax = -Infinity
    const maille = session.maillage()
    for (let i = 1; i < maille.positions.length; i += 3) yMax = Math.max(yMax, maille.positions[i])
    expect(yMax).toBeCloseTo(5, 1)
  })

  it('ouvre la vue au clic et la referme au second clic', () => {
    storeShell.executer(`
piece p
esquisse plan.dessus
cercle
cote diametre 10
`)
    const esquisse = arbreConstruction(storeShell.hote().session.pieceCourante(), storeShell.hote().session.historique())[0]!
      .enfants!.find((noeud) => noeud.esquisse)
    expect(esquisse?.index).toBeTypeOf('number')
    storeShell.voirEsquisse(esquisse!.index!)
    expect(storeShell.esquisseVue()).toBe(esquisse!.index)
    storeShell.voirEsquisse(esquisse!.index!)
    expect(storeShell.esquisseVue()).toBeNull()
    storeShell.voirEsquisse(esquisse!.index!)
    storeShell.voirEsquisse(null)
    expect(storeShell.esquisseVue()).toBeNull()
  })

  it('relit l’esquisse de la vis sans mailler le volume', () => {
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_VIS)
    expect(session.maillage().indices).toEqual([])
    const index = session.historique().findIndex((operation) => operation.type === 'ouvrir')
    expect(session.esquisseDepuis(index)?.support).toBe('plan.12h')
    expect(session.maillage().indices).toEqual([])
  })

  it('ouvre l’esquisse déjà consommée sans refaire le booléen', () => {
    const session = new Session()
    session.executer(SCRIPT_VIS)
    const index = session.historique().map((operation) => operation.type).lastIndexOf('ouvrir')
    const debut = performance.now()
    const posee = session.esquisseDepuis(index)
    expect(performance.now() - debut).toBeLessThan(500)
    expect(posee?.support).toBe('plan.dessus')
    expect(session.maillage().indices.length).toBeGreaterThan(0)
  })
})
