import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { arbreConstruction } from '../src/arbreConstruction.ts'
import { SCRIPT_VIS } from '../src/scriptVis.ts'

describe('script de vis', () => {
  it('tourne le corps, pose le pas dessus, puis ajoute la tête à part', () => {
    const session = new Session()
    session.executer(SCRIPT_VIS)
    const types = session.historique().map((operation) => operation.type)
    expect(types).not.toContain('vis')
    expect(types.filter((type) => type === 'revolution')).toHaveLength(2)
    expect(types).toContain('pas')
    expect(types).toContain('enlever')
    expect(SCRIPT_VIS).not.toContain('cote rayon 1.75')

    const maille = session.maillage()
    let yMax = -Infinity
    let rayonMax = 0
    let crete = false
    let ame = false
    let centre = false
    const rayonsAuFût: number[] = []
    const rayonsTete: number[] = []
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]
      const rayon = Math.hypot(maille.positions[i], maille.positions[i + 2])
      yMax = Math.max(yMax, y)
      rayonMax = Math.max(rayonMax, rayon)
      if (Math.abs(y - 18.2) < 0.02) rayonsAuFût.push(rayon)
      if (Math.abs(y - 28.5) < 0.05 && rayon > 4) rayonsTete.push(rayon)
      if (y > 14 && y < 24 && Math.abs(rayon - 3) < 0.08) crete = true
      if (y > 14 && y < 24 && Math.abs(rayon - 1.75) < 0.15) ame = true
      if (Math.abs(y - 30) < 0.05 && rayon < 0.3) centre = true
    }
    expect(yMax).toBeCloseTo(30, 1)
    expect(rayonMax).toBeCloseTo(6, 1)
    expect(crete).toBe(true)
    expect(ame).toBe(true)
    expect(centre).toBe(false)
    expect(Math.max(...rayonsAuFût)).toBeGreaterThan(2.9)
    expect(Math.min(...rayonsAuFût)).toBeLessThan(1.9)
    // Crête vive : à un angle donné, une seule crête par pas, espacées de 2,60.
    const cretesA0 = new Set<number>()
    for (let i = 0; i < maille.positions.length; i += 3) {
      const x = maille.positions[i]
      const y = maille.positions[i + 1]
      const z = maille.positions[i + 2]
      if (Math.abs(z) > 1e-4 || x < 0 || y < 12 || y > 26) continue
      if (Math.abs(x - 3) < 0.02) cretesA0.add(Math.round(y * 100) / 100)
    }
    const hauteursCrete = [...cretesA0].sort((a, b) => a - b)
    expect(hauteursCrete.length).toBeGreaterThanOrEqual(4)
    for (let i = 1; i < hauteursCrete.length; i++) {
      expect(hauteursCrete[i] - hauteursCrete[i - 1]).toBeCloseTo(2.6, 1)
    }
    const levre: number[] = []
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]
      const rayon = Math.hypot(maille.positions[i], maille.positions[i + 2])
      if (Math.abs(y - 27) < 0.01 && rayon > 2.2) levre.push(rayon)
    }
    expect(levre.length).toBeGreaterThan(0)
    expect(Math.max(...levre) - Math.min(...levre)).toBeLessThan(0.3)
    const pente = Math.tan((15 * Math.PI) / 180)
    let horsCone = 0
    let surLaPointe = 0
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]
      const rayon = Math.hypot(maille.positions[i], maille.positions[i + 2])
      if (y < 2 || y > 6) continue
      surLaPointe += 1
      if (rayon > 1e-3 && Math.abs(rayon - y * pente) > 0.02) horsCone += 1
    }
    expect(surLaPointe).toBeGreaterThan(0)
    expect(horsCone).toBe(0)
    expect(rayonsTete.length).toBeGreaterThan(0)
    expect(Math.max(...rayonsTete) - Math.min(...rayonsTete)).toBeLessThan(0.2)

    const libelles = arbreConstruction(session.pieceCourante(), session.historique())[0]!.enfants!.map(
      (noeud) => noeud.libelle,
    )
    expect(libelles.filter((libelle) => libelle === 'Révolution')).toHaveLength(2)
    expect(libelles).toContain('Pas de vis')
    expect(libelles).toContain('Enlèvement profondeur_pozi')
  })

  it('éteint un opérateur sans le retirer de l’arbre', () => {
    const session = new Session()
    session.executer(SCRIPT_VIS)
    const enfants = () => arbreConstruction(session.pieceCourante(), session.historique())[0]!.enfants!
    const pas = enfants().find((noeud) => noeud.libelle === 'Pas de vis')!
    const revolution = enfants().find((noeud) => noeud.libelle === 'Révolution')!
    expect(pas.interrupteur).toBe(true)
    expect(revolution.interrupteur).toBe(true)
    expect(pas.actif).toBe(true)

    session.activer(pas.index!, false)
    expect(enfants().find((noeud) => noeud.libelle === 'Pas de vis')!.actif).toBe(false)
    const maille = session.maillage()
    const rayons: number[] = []
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]
      const rayon = Math.hypot(maille.positions[i], maille.positions[i + 2])
      if (Math.abs(y - 6.53) < 0.4 && rayon > 0.5) rayons.push(rayon)
    }
    expect(rayons.length).toBeGreaterThan(0)
    expect(Math.max(...rayons)).toBeLessThan(2)
    expect(Math.max(...rayons) - Math.min(...rayons)).toBeLessThan(0.2)

    session.activer(pas.index!, true)
    expect(enfants().some((noeud) => noeud.libelle === 'Pas de vis' && noeud.actif)).toBe(true)
  })
})