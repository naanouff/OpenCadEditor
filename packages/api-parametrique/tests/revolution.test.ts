import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'

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
})
