import { describe, expect, it } from 'vitest'
import { Session, volume } from '@opencad/api-parametrique'

describe('révolution', () => {
  it('tourne un triangle en cône', () => {
    const session = new Session()
    session.executer(`
piece cone
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 3
cote hauteur 10
segment
cote rayon 0
cote hauteur 10
revolution
`)
    const maille = session.maillage()
    let yMax = -Infinity
    let rayonMax = 0
    for (let i = 0; i < maille.positions.length; i += 3) {
      yMax = Math.max(yMax, maille.positions[i + 1])
      rayonMax = Math.max(rayonMax, Math.hypot(maille.positions[i], maille.positions[i + 2]))
    }
    expect(yMax).toBeCloseTo(10, 1)
    expect(rayonMax).toBeCloseTo(3, 1)
    expect(session.historique().some((operation) => operation.type === 'revolution')).toBe(true)
    expect(session.historique().some((operation) => operation.type === 'vis')).toBe(false)
  })

  it('arrondit la paroi : la normale suit le rayon, sans arête à chaque facette', () => {
    const session = new Session()
    session.executer(`
piece cylindre
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 2
cote hauteur 0
segment
cote rayon 2
cote hauteur 10
segment
cote rayon 0
cote hauteur 10
revolution
`)
    const maille = session.maillage()
    let ecart = 0
    let compte = 0
    for (let i = 0; i < maille.positions.length; i += 3) {
      const x = maille.positions[i]
      const z = maille.positions[i + 2]
      const rayon = Math.hypot(x, z)
      const ny = maille.normales[i + 1]
      if (rayon < 1.5 || Math.abs(ny) > 0.5) continue
      const nx = maille.normales[i]
      const nz = maille.normales[i + 2]
      const norme = Math.hypot(nx, nz)
      if (norme < 1e-6) continue
      const aligne = (nx * x + nz * z) / (rayon * norme)
      ecart = Math.max(ecart, Math.acos(Math.min(1, Math.max(-1, aligne))))
      compte += 1
    }
    expect(compte).toBeGreaterThan(0)
    expect(ecart).toBeLessThan((4 * Math.PI) / 180)
  })

  it('oriente le cône de la pointe vers l’extérieur, comme le fût', () => {
    const session = new Session()
    session.executer(`
piece pointe
param diametre 6
param diametre_ame 3.5
param pas 2.6
param angle_filet 40
param angle_pointe 30
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 3
cote hauteur 5
segment
cote rayon 3
cote hauteur 20
segment
cote rayon 0
cote hauteur 20
revolution
pas
`)
    const maille = session.maillage()
    let cone = 0
    let fut = 0
    for (let i = 0; i < maille.positions.length; i += 3) {
      const x = maille.positions[i]
      const y = maille.positions[i + 1]
      const z = maille.positions[i + 2]
      const rayon = Math.hypot(x, z)
      if (rayon < 0.4) continue
      const radial = maille.normales[i] * x + maille.normales[i + 2] * z
      if (y > 0.8 && y < 2.2) cone = Math.min(cone === 0 ? radial : cone, radial)
      if (y > 10 && y < 15) fut = Math.min(fut === 0 ? radial : fut, radial)
    }
    expect(cone).toBeGreaterThan(0)
    expect(fut).toBeGreaterThan(0)
  })

  it('ferme le disque du dessous vers l’extérieur', () => {
    const session = new Session()
    session.executer(`
piece cylindre
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 2
cote hauteur 0
segment
cote rayon 2
cote hauteur 5
segment
cote rayon 0
cote hauteur 5
revolution
`)
    const maille = session.maillage()
    let bas = 0
    let haut = 0
    for (let t = 0; t < maille.indices.length; t += 3) {
      const pts = [0, 1, 2].map((k) => {
        const s = maille.indices[t + k] * 3
        return [maille.positions[s], maille.positions[s + 1], maille.positions[s + 2]]
      })
      const ny = (pts[1][2] - pts[0][2]) * (pts[2][0] - pts[0][0]) - (pts[1][0] - pts[0][0]) * (pts[2][2] - pts[0][2])
      if (pts.every((p) => Math.abs(p[1]) < 1e-6)) bas += Math.sign(ny)
      if (pts.every((p) => Math.abs(p[1] - 5) < 1e-6)) haut += Math.sign(ny)
    }
    expect(bas).toBeLessThan(0)
    expect(haut).toBeGreaterThan(0)
  })

  it('ajoute une seconde révolution au volume déjà tourné', () => {
    const session = new Session()
    session.executer(`
piece pile
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 1
cote hauteur 0
segment
cote rayon 1
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
cote rayon 2
cote hauteur 5
segment
cote rayon 2
cote hauteur 8
segment
cote rayon 0
cote hauteur 8
revolution
`)
    const maille = session.maillage()
    let yMax = -Infinity
    let rayonBas = 0
    let rayonHaut = 0
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]
      const rayon = Math.hypot(maille.positions[i], maille.positions[i + 2])
      yMax = Math.max(yMax, y)
      if (Math.abs(y) < 0.2) rayonBas = Math.max(rayonBas, rayon)
      if (Math.abs(y - 8) < 0.2) rayonHaut = Math.max(rayonHaut, rayon)
    }
    expect(yMax).toBeCloseTo(8, 1)
    expect(rayonBas).toBeCloseTo(1, 1)
    expect(rayonHaut).toBeCloseTo(2, 1)
  })

  it('ferme le pas et ajoute la tête sans perdre de volume', () => {
    const corps = new Session()
    corps.executer(SCRIPT_CORPS)
    const tete = new Session()
    tete.executer(SCRIPT_TETE)
    const vis = new Session()
    vis.executer(`${SCRIPT_CORPS}\n${SCRIPT_TETE_SEULE}`)
    const somme = volume(corps.maillage()) + volume(tete.maillage())
    const maille = vis.maillage()
    expect(volume(maille)).toBeCloseTo(somme, 0)
    let ecart = 0
    let compte = 0
    const s = Math.sin(Math.PI / 4)
    const c = Math.cos(Math.PI / 4)
    const yPlan = 13.5
    for (let t = 0; t < maille.indices.length; t += 3) {
      for (let k = 0; k < 3; k++) {
        const ia = maille.indices[t + k]
        const ib = maille.indices[t + ((k + 1) % 3)]
        const y0 = maille.positions[ia * 3 + 1]
        const y1 = maille.positions[ib * 3 + 1]
        if ((y0 - yPlan) * (y1 - yPlan) > 0) continue
        const den = y1 - y0
        if (Math.abs(den) < 1e-9) continue
        const h = (yPlan - y0) / den
        if (h < 0 || h > 1) continue
        const x = maille.positions[ia * 3] + (maille.positions[ib * 3] - maille.positions[ia * 3]) * h
        const z = maille.positions[ia * 3 + 2] + (maille.positions[ib * 3 + 2] - maille.positions[ia * 3 + 2]) * h
        const rayon = Math.hypot(x, z)
        if (rayon < 3.4) continue
        const nx = maille.normales[ia * 3] + (maille.normales[ib * 3] - maille.normales[ia * 3]) * h
        const ny = maille.normales[ia * 3 + 1] + (maille.normales[ib * 3 + 1] - maille.normales[ia * 3 + 1]) * h
        const nz = maille.normales[ia * 3 + 2] + (maille.normales[ib * 3 + 2] - maille.normales[ia * 3 + 2]) * h
        const nl = Math.hypot(nx, ny, nz) || 1
        const aligne = (nx / nl) * (x / rayon) * s + (ny / nl) * -c + (nz / nl) * (z / rayon) * s
        ecart = Math.max(ecart, Math.acos(Math.min(1, Math.max(-1, aligne))))
        compte += 1
      }
    }
    expect(compte).toBeGreaterThan(0)
    expect(ecart).toBeLessThan((2 * Math.PI) / 180)
  })
})

const SCRIPT_TETE_SEULE = `
esquisse plan.12h
segment
cote rayon 0
cote hauteur 12
segment
cote rayon 3
cote hauteur 12
segment
cote rayon 6
cote hauteur 15
segment
cote rayon 0
cote hauteur 15
revolution
`

const SCRIPT_CORPS = `
piece corps
param diametre 6
param diametre_ame 3.5
param pas 2.6
param angle_filet 40
param angle_pointe 30
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 1.75
cote hauteur 6.531089
segment
cote rayon 1.75
cote hauteur 12
segment
cote rayon 0
cote hauteur 12
revolution
pas
`

const SCRIPT_TETE = `
piece tete
${SCRIPT_TETE_SEULE}
`

