import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { ecrire, lire } from '@opencad/format-opencad'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import { maillagePipelineOcct } from '../src/occt/pipelineOcct.ts'
import { SCRIPT_VIS } from '../src/scriptVis.ts'

function stats(maille: { positions: number[] }) {
  let yMax = -Infinity
  let rayonMax = 0
  for (let i = 0; i < maille.positions.length; i += 3) {
    yMax = Math.max(yMax, maille.positions[i + 1]!)
    rayonMax = Math.max(rayonMax, Math.hypot(maille.positions[i]!, maille.positions[i + 2]!))
  }
  return { yMax, rayonMax, triangles: maille.positions.length > 0 ? 0 : 0 }
}

describe('pipeline historique → OCCT', () => {
  it('extrude un rectangle sans script pièce', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
cote ecart 0
extrude 8
`)
    const maille = maillagePipelineOcct(occt, session)
    expect(maille.indices.length).toBeGreaterThan(0)
    const { yMax } = stats(maille)
    expect(yMax).toBeGreaterThan(7)
    expect(yMax).toBeLessThan(9)
  }, 120_000)

  it('reconstruit la vis via le pipeline (hybride pas)', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_VIS)
    const maille = maillagePipelineOcct(occt, session)
    const { yMax, rayonMax } = stats(maille)
    expect(yMax).toBeCloseTo(30, 0)
    expect(rayonMax).toBeCloseTo(6, 0)
    let crete = false
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]!
      const r = Math.hypot(maille.positions[i]!, maille.positions[i + 2]!)
      if (y > 14 && y < 24 && Math.abs(r - 3) < 0.15) crete = true
    }
    expect(crete).toBe(true)
  }, 180_000)

  it('rouvre le .cadompart de la vis avec le même maillage OCCT', async () => {
    const occt = await chargerKernel()
    const depart = new Session({ geometrie: false })
    depart.executer(SCRIPT_VIS)
    const lecture = lire(ecrire(depart))
    const relu = new Session({ geometrie: false })
    relu.executer(lecture.script)
    for (const index of lecture.eteins) relu.activer(index, false)
    const avant = maillagePipelineOcct(occt, depart)
    const apres = maillagePipelineOcct(occt, relu)
    expect(apres.indices.length).toBe(avant.indices.length)
    expect(apres.positions.length).toBe(avant.positions.length)
  }, 180_000)

  it('pointe avant pas : pas de filet dans le maillage OCCT', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_VIS)
    session.commande('pointe 1')
    const maille = maillagePipelineOcct(occt, session)
    let crete = false
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]!
      const r = Math.hypot(maille.positions[i]!, maille.positions[i + 2]!)
      if (y > 14 && y < 24 && Math.abs(r - 3) < 0.15) crete = true
    }
    expect(crete).toBe(false)
    expect(stats(maille).rayonMax).toBeLessThan(3.5)
  }, 180_000)

  it('poche sur face.dessus après extrude', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 20
cote longueur 20
cote ecart 0
extrude 8
esquisse face.dessus
cercle
cote diametre 8
enleve 2
`)
    const maille = maillagePipelineOcct(occt, session)
    expect(maille.indices.length).toBeGreaterThan(0)
    const { yMax } = stats(maille)
    expect(yMax).toBeGreaterThan(7.5)
    expect(yMax).toBeLessThan(8.5)
    // Fond de poche : anneau du cylindre à y ≈ hauteur − profondeur (pas de sommet au centre).
    let fondPoche = false
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]!
      const r = Math.hypot(maille.positions[i]!, maille.positions[i + 2]!)
      if (Math.abs(r - 4) < 0.2 && Math.abs(y - 6) < 0.35) fondPoche = true
    }
    expect(fondPoche).toBe(true)
  }, 120_000)

  it('extrude un contour de corne résolu par le GCS', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(`
piece corne
param diametre_boite 40
param entrecorne 20
param longueur_corne 4.2
param largeur_bout 2.2
param largeur_racine 6
param rayon_racine 3
esquisse plan.dessus
cercle
cote diametre diametre_boite
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 5
extrude 2
esquisse plan.dessus
segment
cote ecart entrecorne
segment
cote debord longueur_corne
cote largeur largeur_bout
segment
cote largeur largeur_racine
arc
cote rayon rayon_racine
arc
concentrique cercle.exterieur
symetrie vertical
symetrie horizontal
extrude 8
`)
    expect(session.historique().filter((o) => o.type === 'extrude')).toHaveLength(2)
    const maille = maillagePipelineOcct(occt, session)
    expect(maille.indices.length).toBeGreaterThan(0)
    expect(stats(maille).yMax).toBeGreaterThan(7)
  }, 120_000)

  it('face.dessus suit une nouvelle hauteur d’extrusion', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(`
piece boite
esquisse plan.dessus
rectangle
cote largeur 20
cote longueur 20
cote ecart 0
extrude 12
esquisse face.dessus
cercle
cote diametre 8
enleve 3
`)
    const maille = maillagePipelineOcct(occt, session)
    expect(stats(maille).yMax).toBeGreaterThan(11.5)
    let fondPoche = false
    for (let i = 0; i < maille.positions.length; i += 3) {
      const y = maille.positions[i + 1]!
      const r = Math.hypot(maille.positions[i]!, maille.positions[i + 2]!)
      if (Math.abs(r - 4) < 0.2 && Math.abs(y - 9) < 0.35) fondPoche = true
    }
    expect(fondPoche).toBe(true)
  }, 120_000)
})
