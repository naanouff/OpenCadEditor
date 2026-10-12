import { describe, expect, it } from 'vitest'
import {
  altitudeSupport,
  diametreDepuisUv,
  dimensionsRectangleDepuisUv,
  facesVersMetres,
  outilEsquissePointeur,
  pointSurPlan,
  rayonVersMm,
  uvDepuisMonde,
} from '../src/esquissePointeur.ts'
import { faceSousPointeur, facesDepuisMaillage, type Rayon3 } from '../src/selectionFace.ts'
import { storeShell } from '../src/storeShell.ts'

/** Simulate viewport short-click: open support if needed, then place entity from UV. */
function clicEsquisse(rayonM: Rayon3, positionsMm: number[]) {
  let yMax = 0
  for (let i = 1; i < positionsMm.length; i += 3) yMax = Math.max(yMax, positionsMm[i]!)
  let esquisse = storeShell.hote().session.esquisseCourante()
  if (!esquisse) {
    const face = faceSousPointeur(facesVersMetres(facesDepuisMaillage(positionsMm)), rayonM)
    const support = face ?? 'plan.dessus'
    expect(storeShell.ouvrirEsquisseSurSupport(support)).toBe(true)
    esquisse = storeShell.hote().session.esquisseCourante()
  }
  expect(esquisse).not.toBeNull()
  const altitude =
    esquisse!.cercles[0]?.y ?? esquisse!.yPlan ?? altitudeSupport(esquisse!.support, yMax)
  const hit = pointSurPlan(rayonVersMm(rayonM), esquisse!.support, altitude)
  expect(hit).not.toBeNull()
  const { u, v } = uvDepuisMonde(hit!, esquisse!.support, altitude)
  if (outilEsquissePointeur(esquisse!) === 'rectangle') {
    const { longueur, largeur } = dimensionsRectangleDepuisUv(u, v)
    expect(storeShell.poserRectangle(longueur, largeur)).toBe(true)
  } else {
    expect(storeShell.poserCercleDiametre(diametreDepuisUv(u, v))).toBe(true)
  }
}

describe('esquisse pointeur — flux UI', () => {
  it('sans solide : clic → plan.dessus + rectangle overlay', () => {
    storeShell.executer('piece flux-rect')
    // Camera above origin looking down ; offset so UV ≠ 0
    const rayonM: Rayon3 = {
      origine: [0.01, 0.05, -0.005],
      direction: [0, -1, 0],
    }
    clicEsquisse(rayonM, [])
    const posee = storeShell.hote().session.esquisseCourante()
    expect(posee?.support).toBe('plan.dessus')
    expect(outilEsquissePointeur(posee!)).toBe('rectangle')
    expect(posee?.traits?.length).toBeGreaterThanOrEqual(8)
  })

  it('après extrude : clic face.dessus → cercle (même geste)', () => {
    storeShell.executer(`piece flux-cercle
esquisse plan.dessus
rectangle
cote largeur 20
cote longueur 30
extrude 8
`)
    expect(storeShell.hote().session.esquisseCourante()).toBeNull()
    // Mesh proxy: top at y=8 mm
    const positions = [0, 0, 0, 1, 0, 0, 0, 8, 0, 1, 8, 0]
    const rayonM: Rayon3 = {
      origine: [0.005, 0.02, 0],
      direction: [0, -1, 0],
    }
    clicEsquisse(rayonM, positions)
    const posee = storeShell.hote().session.esquisseCourante()
    expect(posee?.support).toBe('face.dessus')
    expect(outilEsquissePointeur(posee!)).toBe('cercle')
    expect(posee!.cercles.length).toBeGreaterThan(0)
    expect(posee!.cercles[0]!.y).toBeCloseTo(8)
  })
})
