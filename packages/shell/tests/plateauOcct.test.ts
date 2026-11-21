import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'
import { COTE_PLATEAU } from '../src/cotesPlateau.ts'
import { aretesBrepGroupees } from '../src/selectionSegment.ts'
import { SCRIPT_PLATEAU } from '../src/scriptPlateau.ts'
import { SCRIPT_POIGNEE } from '../src/scriptPoignee.ts'
import { BOULON_M4, ECROU_M4, SCRIPT_BOULON, SCRIPT_ECROU } from '../src/scriptBoulon.ts'

function sommets(maille: { positions: number[] }) {
  const out: [number, number, number][] = []
  for (let i = 0; i < maille.positions.length; i += 3) {
    out.push([maille.positions[i]!, maille.positions[i + 1]!, maille.positions[i + 2]!])
  }
  return out
}

describe('plateau à rebord OCCT', () => {
  it('creuse une poche à mi-épaisseur et arrondit les coins', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(`
piece plateau
esquisse plan.dessus
rectangle
cote longueur 500
cote largeur 350
extrude 15
esquisse face.dessus
rectangle
cote longueur 470
cote largeur 320
enleve 10
fillet 20 arete.vertical
fillet 5 arete.poche
`)
    const pts = sommets(maillagePipelineOcct(occt, session))
    const coinPoche = Math.min(
      ...pts.filter((p) => p[1] > 5.5).map(([x, , z]) => Math.hypot(Math.abs(x) - 235, Math.abs(z) - 160)),
    )
    expect(coinPoche).toBeGreaterThan(1.5)
    const ys = pts.map((p) => p[1])
    expect(Math.min(...ys)).toBeCloseTo(0, 3)
    expect(Math.max(...ys)).toBeCloseTo(15, 3)
    expect(pts.some(([x, y, z]) => Math.abs(y - 5) < 1e-6 && Math.abs(x) <= 235 + 1e-6 && Math.abs(z) <= 160 + 1e-6)).toBe(true)
    const coin = Math.min(...pts.map(([x, , z]) => Math.hypot(Math.abs(x) - 250, Math.abs(z) - 175)))
    expect(coin).toBeGreaterThan(8)
  }, 120_000)

  it('extrude un profil de segments et d’arc sur plan.12h', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(`
piece arche
esquisse plan.12h
segment
cote rayon 0
cote hauteur 0
segment
cote rayon 20
cote hauteur 0
segment
cote rayon 20
cote hauteur 10
arc
cote rayon 10
cote hauteur 20
segment
cote rayon 0
cote hauteur 10
extrude 5
`)
    const maille = maillagePipelineOcct(occt, session)
    const pts = sommets(maille)
    expect(Math.max(...pts.map((p) => p[1]))).toBeCloseTo(20, 1)
    const arcs = maille.aretes.filter((a) => Math.abs(a.length - Math.PI * 10) < 1e-3)
    expect(arcs).toHaveLength(2)
    const surArc = pts.filter(([x, y]) => y > 10.5 && y < 19.5)
    expect(surArc.length).toBeGreaterThan(4)
    for (const [x, y] of surArc) expect(Math.hypot(x - 10, y - 10)).toBeCloseTo(10, 3)
  }, 120_000)

  it('chanfreine le dessous et arrondit la lèvre du plateau', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_PLATEAU)
    const maille = maillagePipelineOcct(occt, session)
    const pts = sommets(maille)
    const distance = (x: number, y: number, z: number) =>
      Math.min(...pts.map((p) => Math.hypot(p[0] - x, p[1] - y, p[2] - z)))
    expect(Math.max(...pts.map((p) => p[1]))).toBeCloseTo(COTE_PLATEAU.hauteur, 1)
    expect(Math.min(...pts.map((p) => p[1]))).toBeCloseTo(0, 1)
    // Le congé R20 laisse le bord droit à 20 mm du coin : ce point disparaît une fois l’arête cassée.
    const xBord = COTE_PLATEAU.longueur / 2 - COTE_PLATEAU.rayonCoin
    const zBord = COTE_PLATEAU.largeur / 2
    expect(distance(xBord, 0, zBord)).toBeGreaterThan(0.4)
    expect(distance(xBord, COTE_PLATEAU.hauteur, zBord)).toBeGreaterThan(0.4)
    const longueur = (a: { segments: { a: readonly number[]; b: readonly number[] }[] }) =>
      a.segments.reduce((n, s) => n + Math.hypot(s.b[0]! - s.a[0]!, s.b[1]! - s.a[1]!, s.b[2]! - s.a[2]!), 0)
    const bord = aretesBrepGroupees(maille).some(
      (a) =>
        longueur(a) > 15 &&
        a.segments.some((s) => s.a[1] > COTE_PLATEAU.hauteur - 2 && s.b[1] > COTE_PLATEAU.hauteur - 2),
    )
    expect(bord).toBe(true)
  }, 120_000)

  it('dessine la poignée en D, percée et lamée à l’entraxe, pourtour arrondi', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_POIGNEE)
    const pts = sommets(maillagePipelineOcct(occt, session))
    const { largeurBras, saillie, hauteurPoignee, entraxeVis, diametreLamage, profondeurLamage, diametrePassage } =
      COTE_PLATEAU
    const e = largeurBras / 2
    const u = entraxeVis / 2
    expect(Math.max(...pts.map((p) => p[0]))).toBeCloseTo(u + e, 1)
    expect(Math.min(...pts.map((p) => p[0]))).toBeCloseTo(-u - e, 1)
    expect(Math.max(...pts.map((p) => p[1]))).toBeCloseTo(saillie + e, 1)
    expect(Math.min(...pts.map((p) => p[1]))).toBeCloseTo(-e, 1)
    expect(Math.min(...pts.map((p) => p[2]))).toBeCloseTo(0, 3)
    expect(Math.max(...pts.map((p) => p[2]))).toBeCloseTo(hauteurPoignee, 3)
    for (const s of [-1, 1]) {
      const r = (p: [number, number, number]) => Math.hypot(p[0] - s * u, p[1])
      // Lamage centré sur l’axe de vis : son fond est un anneau entre le passage et le lamage.
      const fond = pts.filter((p) => Math.abs(p[2] - profondeurLamage) < 1e-3)
      expect(fond.some((p) => Math.abs(r(p) - diametreLamage / 2) < 0.05)).toBe(true)
      expect(fond.some((p) => Math.abs(r(p) - diametrePassage / 2) < 0.05)).toBe(true)
      // Rien dans le passage.
      expect(pts.some((p) => r(p) < diametrePassage / 2 - 0.05)).toBe(false)
    }
    // Congé de pourtour : le coin vif du bras sur la face du dessus a disparu.
    const coin = Math.min(...pts.map((p) => Math.hypot(p[0] - (u + e), p[1] - 10, p[2])))
    expect(coin).toBeGreaterThan(0.25)
  }, 120_000)

  it('filete le bout du boulon et perce l’écrou', async () => {
    const occt = await chargerKernel()
    const boulon = new Session({ geometrie: false })
    boulon.executer(SCRIPT_BOULON)
    const ptsB = sommets(maillagePipelineOcct(occt, boulon))
    const rayon = (p: [number, number, number]) => Math.hypot(p[0], p[2])
    expect(Math.max(...ptsB.map((p) => p[1]))).toBeCloseTo(BOULON_M4.longueur + BOULON_M4.hauteurTete, 1)
    expect(Math.min(...ptsB.map((p) => p[1]))).toBeCloseTo(0, 1)
    expect(Math.max(...ptsB.map(rayon))).toBeGreaterThan(BOULON_M4.entreplat / 2)

    const ecrou = new Session({ geometrie: false })
    ecrou.executer(SCRIPT_ECROU)
    const ptsE = sommets(maillagePipelineOcct(occt, ecrou))
    expect(Math.max(...ptsE.map((p) => p[1]))).toBeCloseTo(ECROU_M4.hauteur, 1)
    const alesage = ptsE.filter((p) => rayon(p) < ECROU_M4.percage / 2 + 0.3 && rayon(p) > 1)
    expect(alesage.length).toBeGreaterThan(0)
    expect(Math.max(...ptsE.map(rayon))).toBeGreaterThan(ECROU_M4.entreplat / 2)
  }, 120_000)
})
