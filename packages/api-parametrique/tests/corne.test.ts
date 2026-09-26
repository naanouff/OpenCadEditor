import { describe, expect, it } from 'vitest'
import { contourPan, geometriePlan, maillerPan, pansDeCorne } from '../src/corne.ts'

const plan = { largeurBout: 2.2, largeurRacine: 6, rayonRacine: 3 }
const Rp = 20
const a0 = 10
const u1 = 24.2
const RH = 1
const RB = 0.8
const geo = geometriePlan({ a0, u1, plan, rayonPeau: Rp })
const boite = {
  sorte: 'boite' as const,
  xmin: 10,
  xmax: Math.max(geo.Qt[0], geo.peau[0]) + 0.05,
  ymin: 0,
  ymax: 8,
  zmin: 10.5,
  zmax: u1,
  plan,
}

/** Point dans la corne : profil en plan (flanc + racine) et profil en élévation (congés de bout). */
function dansCorne([x, y, z]: number[]) {
  const e = 1e-4
  if (x < a0 - e || y < -e || y > 8 + e || z < 10.5 - e || z > u1 + e) return false
  const cote = geo.N[0] * (x - geo.Ptip[0]) + geo.N[1] * (z - geo.Ptip[1])
  const distRacine = Math.hypot(x - geo.C[0], z - geo.C[1])
  if (cote > e && Math.abs(distRacine - geo.Rr) > e) return false
  if (distRacine < geo.Rr - e) return false
  if (z > u1 - RH && y > 8 - RH && Math.hypot(y - (8 - RH), z - (u1 - RH)) > RH + e) return false
  if (z > u1 - RB && y < RB && Math.hypot(y - RB, z - (u1 - RB)) > RB + e) return false
  return true
}

describe('pans de corne', () => {
  const pans = pansDeCorne(boite, { haut: RH, bas: RB }, plan, undefined, Rp)

  it('borne chaque sommet sur la corne exacte', () => {
    for (const pan of pans) {
      const { positions } = maillerPan(pan)
      for (let i = 0; i < positions.length; i += 3) {
        expect(dansCorne([positions[i], positions[i + 1], positions[i + 2]])).toBe(true)
      }
    }
  })

  it('oriente chaque triangle vers l’extérieur de sa surface', () => {
    for (const pan of pans) {
      const { positions, indices } = maillerPan(pan)
      for (let i = 0; i < indices.length; i += 3) {
        const p = [0, 1, 2].map((k) => positions.slice(indices[i + k] * 3, indices[i + k] * 3 + 3))
        const u = p[1].map((v, k) => v - p[0][k])
        const v = p[2].map((w, k) => w - p[0][k])
        const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
        const centre = [0, 1, 2].map((k) => (p[0][k] + p[1][k] + p[2][k]) / 3) as [number, number, number]
        const attendue = pan.normale(centre)
        expect(n[0] * attendue[0] + n[1] * attendue[1] + n[2] * attendue[2]).toBeGreaterThan(0)
      }
    }
  })

  it('pose le flanc droit jusqu’au congé de racine', () => {
    const flanc = pans.find((pan) => {
      const n = pan.normale([0, 0, 0])
      return Math.abs(n[0] - geo.N[0]) < 1e-6 && Math.abs(n[2] - geo.N[1]) < 1e-6
    })
    expect(flanc).toBeDefined()
    expect(flanc!.colonnes.length).toBeGreaterThan(2)
    const bout = flanc!.colonnes[flanc!.colonnes.length - 1]
    expect(bout[0][0]).toBeCloseTo(geo.aBout, 5)
    expect(bout[0][2]).toBeCloseTo(u1, 5)
  })

  it('pose le congé de racine sur son cylindre', () => {
    const racine = pans.find((pan) =>
      pan.colonnes.every(([p, q]) => {
        const dp = Math.hypot(p[0] - geo.C[0], p[2] - geo.C[1])
        const dq = Math.hypot(q[0] - geo.C[0], q[2] - geo.C[1])
        return Math.abs(dp - geo.Rr) < 1e-6 && Math.abs(dq - geo.Rr) < 1e-6
      }),
    )
    expect(racine).toBeDefined()
    expect(racine!.colonnes.length).toBeGreaterThan(2)
  })

  it('suit l’arc du congé haut sur la largeur du bout', () => {
    const arcs = pans.flatMap(contourPan).flat()
    const surArc = arcs.filter(
      (p) => p[1] > 8 - RH + 1e-3 && p[2] > u1 - RH + 1e-3 && p[0] <= geo.aBout + 1e-3,
    )
    expect(surArc.length).toBeGreaterThan(4)
    for (const p of surArc) expect(Math.hypot(p[1] - (8 - RH), p[2] - (u1 - RH))).toBeCloseTo(RH, 5)
  })

  it('suit les miroirs de la carrure', () => {
    const miroir = { ...boite, xmin: -boite.xmax, xmax: -boite.xmin, zmin: -boite.zmax, zmax: -boite.zmin }
    for (const pan of pansDeCorne(miroir, { haut: RH, bas: RB }, plan, undefined, Rp)) {
      const { positions } = maillerPan(pan)
      for (let i = 0; i < positions.length; i += 3) {
        expect(dansCorne([-positions[i], positions[i + 1], -positions[i + 2]])).toBe(true)
      }
    }
  })
})
