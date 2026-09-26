import { describe, expect, it } from 'vitest'
import { Session } from '../src/index.ts'
import { script } from './carrure.test.ts'

describe('bout du tube', () => {
  it('ferme le tube par un anneau et une paroi, laisse le perçage ouvert', () => {
    const session = new Session()
    session.executer(script)
    const { positions, normales, indices } = session.maillage()
    let anneau = 0
    let paroiTube = 0
    let bordInterieur = 0
    for (let i = 0; i < positions.length; i += 3) {
      const ecart = Math.hypot(positions[i + 1] - 4, positions[i + 2])
      if (Math.abs(positions[i] - 22) < 0.08 && normales[i] > 0.9 && ecart > 0.65 && ecart < 1.95) anneau += 1
      if (Math.abs(ecart - 2) < 0.1 && Math.abs(normales[i]) < 0.25 && positions[i] > 20 && positions[i] < 22) {
        paroiTube += 1
      }
      if (Math.abs(positions[i] - 22) < 0.08 && Math.abs(ecart - 0.6) < 0.05) bordInterieur += 1
    }
    expect(anneau).toBeGreaterThan(0)
    expect(paroiTube).toBeGreaterThan(0)
    expect(bordInterieur).toBeGreaterThan(0)

    let accord = 0
    let pans = 0
    for (let i = 0; i < indices.length; i += 3) {
      const a = indices[i] * 3
      const b = indices[i + 1] * 3
      const c = indices[i + 2] * 3
      const pa = [positions[a], positions[a + 1], positions[a + 2]]
      const pb = [positions[b], positions[b + 1], positions[b + 2]]
      const pc = [positions[c], positions[c + 1], positions[c + 2]]
      const milieu = [(pa[0] + pb[0] + pc[0]) / 3, (pa[1] + pb[1] + pc[1]) / 3, (pa[2] + pb[2] + pc[2]) / 3]
      const ecart = Math.hypot(milieu[1] - 4, milieu[2])
      if (Math.abs(ecart - 2) > 0.15 || milieu[0] < 20.2 || milieu[0] > 21.8) continue
      if (Math.abs((normales[a] + normales[b] + normales[c]) / 3) > 0.3) continue
      const u = [pb[0] - pa[0], pb[1] - pa[1], pb[2] - pa[2]]
      const v = [pc[0] - pa[0], pc[1] - pa[1], pc[2] - pa[2]]
      const geo = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
      const dehors = [0, milieu[1] - 4, milieu[2]]
      accord += geo[0] * dehors[0] + geo[1] * dehors[1] + geo[2] * dehors[2]
      pans += 1
    }
    expect(pans).toBeGreaterThan(0)
    expect(accord).toBeGreaterThan(0)
  })
})
