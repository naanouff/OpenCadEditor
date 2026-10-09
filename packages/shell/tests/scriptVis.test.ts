import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { arbreConstruction } from '../src/arbreConstruction.ts'
import { aretesBrep } from '../src/dessin.ts'
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
    let couronne = 0
    for (let t = 0; t < maille.indices.length; t += 3) {
      const pts = [0, 1, 2].map((k) => {
        const s = maille.indices[t + k] * 3
        return [maille.positions[s], maille.positions[s + 1], maille.positions[s + 2]]
      })
      if (pts.some((p) => Math.abs(p[1] - 27) > 0.05)) continue
      const rayon = (p: number[]) => Math.hypot(p[0], p[2])
      const moyen = (rayon(pts[0]) + rayon(pts[1]) + rayon(pts[2])) / 3
      if (moyen <= 1.75 || moyen >= 3) continue
      const ny = (pts[1][2] - pts[0][2]) * (pts[2][0] - pts[0][0]) - (pts[1][0] - pts[0][0]) * (pts[2][2] - pts[0][2])
      if (ny < 0) couronne += 1
    }
    expect(couronne).toBeGreaterThan(0)
    for (let t = 0; t < maille.indices.length; t += 3) {
      for (let k = 0; k < 3; k++) {
        const ia = maille.indices[t + k] * 3
        const ib = maille.indices[t + ((k + 1) % 3)] * 3
        const y0 = maille.positions[ia + 1]
        const y1 = maille.positions[ib + 1]
        if ((y0 - 28.5) * (y1 - 28.5) > 0) continue
        const den = y1 - y0
        if (Math.abs(den) < 1e-9) continue
        const h = (28.5 - y0) / den
        if (h < 0 || h > 1) continue
        const rayon = Math.hypot(
          maille.positions[ia] + (maille.positions[ib] - maille.positions[ia]) * h,
          maille.positions[ia + 2] + (maille.positions[ib + 2] - maille.positions[ia + 2]) * h,
        )
        if (rayon > 4) rayonsTete.push(rayon)
      }
    }
    let ecartCone = 0
    let surCone = 0
    const s45 = Math.sin(Math.PI / 4)
    const c45 = Math.cos(Math.PI / 4)
    const yCone = 28.5
    for (let t = 0; t < maille.indices.length; t += 3) {
      for (let k = 0; k < 3; k++) {
        const ia = maille.indices[t + k]
        const ib = maille.indices[t + ((k + 1) % 3)]
        const y0 = maille.positions[ia * 3 + 1]
        const y1 = maille.positions[ib * 3 + 1]
        if ((y0 - yCone) * (y1 - yCone) > 0) continue
        const den = y1 - y0
        if (Math.abs(den) < 1e-9) continue
        const h = (yCone - y0) / den
        if (h < 0 || h > 1) continue
        const x = maille.positions[ia * 3] + (maille.positions[ib * 3] - maille.positions[ia * 3]) * h
        const z = maille.positions[ia * 3 + 2] + (maille.positions[ib * 3 + 2] - maille.positions[ia * 3 + 2]) * h
        const rayon = Math.hypot(x, z)
        if (rayon < 3.5) continue
        const nx = maille.normales[ia * 3] + (maille.normales[ib * 3] - maille.normales[ia * 3]) * h
        const ny = maille.normales[ia * 3 + 1] + (maille.normales[ib * 3 + 1] - maille.normales[ia * 3 + 1]) * h
        const nz = maille.normales[ia * 3 + 2] + (maille.normales[ib * 3 + 2] - maille.normales[ia * 3 + 2]) * h
        const nl = Math.hypot(nx, ny, nz) || 1
        const aligne = (nx / nl) * (x / rayon) * s45 - (ny / nl) * c45 + (nz / nl) * (z / rayon) * s45
        ecartCone = Math.max(ecartCone, Math.acos(Math.min(1, Math.max(-1, aligne))))
        surCone += 1
      }
    }
    expect(surCone).toBeGreaterThan(0)
    expect(ecartCone).toBeLessThan((3 * Math.PI) / 180)

    const fil = aretesBrep(maille)
    const segment = (i: number) => [fil[i], fil[i + 1], fil[i + 2], fil[i + 3], fil[i + 4], fil[i + 5]]
    let aretesCrete = 0
    let cercleTete = 0
    let cercleEpaule = 0
    let pozi = 0
    let prolongement = 0
    let couture = 0
    let fond = 0
    let aTraversLeCone = 0
    const dansPozi = (x: number, z: number) => Math.abs(z) < 1 || Math.abs(x) < 1
    const horsEmpreinte = (x: number, z: number) =>
      (Math.abs(Math.abs(z) - 0.825) < 0.15 && Math.abs(x) > 3.5) ||
      (Math.abs(Math.abs(x) - 0.825) < 0.15 && Math.abs(z) > 3.5)
    for (let i = 0; i < fil.length; i += 6) {
      const [x0, y0, z0, x1, y1, z1] = segment(i)
      const r0 = Math.hypot(x0, z0)
      const r1 = Math.hypot(x1, z1)
      if (Math.abs(r0 - 3) < 0.15 && Math.abs(r1 - 3) < 0.15 && Math.abs(y0 - y1) > 0.02 && y0 > 10 && y0 < 26) aretesCrete += 1
      if (Math.abs(r0 - 1.75) < 0.25 && Math.abs(r1 - 1.75) < 0.25 && Math.abs(y0 - y1) > 0.02 && y0 > 10 && y0 < 26) fond += 1
      if (Math.abs(y0 - 30) < 0.05 && Math.abs(y1 - 30) < 0.05 && Math.abs(r0 - 6) < 0.15 && Math.abs(r1 - 6) < 0.15) cercleTete += 1
      if (Math.abs(y0 - 27) < 0.05 && Math.abs(y1 - 27) < 0.05 && Math.abs(r0 - 3) < 0.15 && Math.abs(r1 - 3) < 0.15) cercleEpaule += 1
      if (Math.abs(y0 - 30) < 0.2 && Math.abs(y1 - 30) < 0.2 && Math.abs(Math.abs(z0) - 0.825) < 0.15 && Math.abs(Math.abs(z1) - 0.825) < 0.15) pozi += 1
      const surCercle = (x: number, z: number) => Math.abs(Math.hypot(x, z) - 6) < 0.2
      if (
        Math.abs(y0 - 30) < 0.2 &&
        Math.abs(y1 - 30) < 0.2 &&
        horsEmpreinte(x0, z0) &&
        horsEmpreinte(x1, z1) &&
        !(surCercle(x0, z0) && surCercle(x1, z1))
      ) {
        prolongement += 1
      }
      const surContour = (x: number, z: number) =>
        (Math.abs(Math.abs(z) - 0.825) < 0.12 && Math.abs(x) > 0.7 && Math.abs(x) < 3.5) ||
        (Math.abs(Math.abs(x) - 0.825) < 0.12 && Math.abs(z) > 0.7 && Math.abs(z) < 3.5) ||
        (Math.abs(Math.abs(x) - 3.3) < 0.15 && Math.abs(z) < 1) ||
        (Math.abs(Math.abs(z) - 3.3) < 0.15 && Math.abs(x) < 1)
      const dansBras = (x: number, z: number) =>
        (Math.abs(z) <= 0.95 && Math.abs(x) <= 3.45) || (Math.abs(x) <= 0.95 && Math.abs(z) <= 3.45)
      if (y0 > 27.4 && y1 > 27.4 && dansBras((x0 + x1) / 2, (z0 + z1) / 2) && !(surContour(x0, z0) && surContour(x1, z1))) {
        couture += 1
      }
      const surCone = (y: number, r: number) => y > 27.4 && y < 29.5 && r > 3.4 && r < 5.6
      if (surCone(y0, r0) && surCone(y1, r1) && !dansPozi(x0, z0) && !dansPozi(x1, z1)) aTraversLeCone += 1
    }
    expect(aretesCrete).toBeGreaterThan(10)
    expect(fond).toBeGreaterThan(10)
    expect(cercleTete).toBeGreaterThan(10)
    expect(cercleEpaule).toBeGreaterThan(10)
    expect(pozi).toBeGreaterThan(0)
    expect(prolongement).toBe(0)
    expect(couture).toBe(0)
    expect(aTraversLeCone).toBe(0)
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

    const debutTete = SCRIPT_VIS.indexOf('esquisse plan.12h', SCRIPT_VIS.indexOf('\npas\n'))
    const finTete = SCRIPT_VIS.lastIndexOf('esquisse plan.dessus')
    const entete = SCRIPT_VIS.slice(0, SCRIPT_VIS.indexOf('esquisse'))
    const filet = new Session()
    filet.executer(SCRIPT_VIS.slice(0, debutTete))
    const tete = new Session()
    tete.executer(`${entete}\n${SCRIPT_VIS.slice(debutTete, finTete)}`)
    const tris = (positions: { indices: number[] }) => positions.indices.length / 3
    expect(tris(maille)).toBeLessThan(1.5 * (tris(filet.maillage()) + tris(tete.maillage())))
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