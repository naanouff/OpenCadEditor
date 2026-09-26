import { describe, expect, it } from 'vitest'
import { ombrer } from '../src/ombre.ts'
import type { FaceExacte } from '../src/types.ts'

describe('paroi de perçage', () => {
  it('oriente la normale et le winding vers l’axe du trou', () => {
    const faces: FaceExacte[] = [
      { sorte: 'boite', xmin: 0, xmax: 4, ymin: 0, ymax: 4, zmin: 0, zmax: 4 },
      { sorte: 'traverse', rayon: 1, debut: -0.5, fin: 4.5, y: 2, z: 2, dehors: -1 },
    ]
    const { positions, normales, indices } = ombrer(faces)
    let surParoi = 0
    for (let i = 0; i < positions.length; i += 3) {
      const ecart = Math.hypot(positions[i + 1] - 2, positions[i + 2] - 2)
      if (Math.abs(ecart - 1) > 0.05) continue
      if (Math.abs(normales[i]) > 0.2) continue
      surParoi += 1
      const versAxe = [0, 2 - positions[i + 1], 2 - positions[i + 2]]
      const produit = normales[i] * versAxe[0] + normales[i + 1] * versAxe[1] + normales[i + 2] * versAxe[2]
      expect(produit).toBeGreaterThan(0)
    }
    expect(surParoi).toBeGreaterThan(0)

    let accord = 0
    let trou = 0
    for (let i = 0; i < indices.length; i += 3) {
      const a = indices[i] * 3
      const b = indices[i + 1] * 3
      const c = indices[i + 2] * 3
      const pa = [positions[a], positions[a + 1], positions[a + 2]]
      const pb = [positions[b], positions[b + 1], positions[b + 2]]
      const pc = [positions[c], positions[c + 1], positions[c + 2]]
      const milieu = [(pa[0] + pb[0] + pc[0]) / 3, (pa[1] + pb[1] + pc[1]) / 3, (pa[2] + pb[2] + pc[2]) / 3]
      const ecart = Math.hypot(milieu[1] - 2, milieu[2] - 2)
      const nx = (normales[a] + normales[b] + normales[c]) / 3
      if (Math.abs(ecart - 1) > 0.15 || Math.abs(nx) > 0.3) continue
      const u = [pb[0] - pa[0], pb[1] - pa[1], pb[2] - pa[2]]
      const v = [pc[0] - pa[0], pc[1] - pa[1], pc[2] - pa[2]]
      const geometrique = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
      const versAxe = [0, 2 - milieu[1], 2 - milieu[2]]
      accord += geometrique[0] * versAxe[0] + geometrique[1] * versAxe[1] + geometrique[2] * versAxe[2]
      trou += 1
    }
    expect(trou).toBeGreaterThan(0)
    expect(accord).toBeGreaterThan(0)
  })
})
