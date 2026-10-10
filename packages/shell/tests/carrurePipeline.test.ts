import { describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { ecrire, lire } from '@opencad/format-opencad'
import { chargerKernel } from '../src/occt/chargerKernel.ts'
import {
  historiqueCompatibleOcct,
  historiqueCornesSession,
  maillagePipelineOcct,
} from '../src/occt/pipelineOcct.ts'
import { SCRIPT_CARRURE } from '../src/scriptCarrure.ts'

/** Préfixe anneau + lunette + fond + cornes (sans barrette / tube). */
export const SCRIPT_CARRURE_NOYAU = `
piece carrure
param diametre_boite 40
param epaisseur_paroi 2.5
param hauteur_carrure 8
param diametre_lunette 36
param profondeur_lunette 1.2
param diametre_fond 34
param profondeur_fond 1
param entrecorne 20
param longueur_corne 4.2
param largeur_bout 2.2
param largeur_racine 6
param rayon_racine 3
param plongee_bout 1.2
param epaisseur_bout 2

esquisse plan.dessus
cercle
cote diametre diametre_boite
cercle
concentrique cercle.exterieur
cote diametre diametre_boite - 2 * epaisseur_paroi
extrude hauteur_carrure

esquisse face.dessus
cercle
concentrique anneau
cote diametre diametre_lunette
enleve profondeur_lunette

esquisse face.dessous
cercle
concentrique anneau
cote diametre diametre_fond
enleve profondeur_fond

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
extrude hauteur_carrure
`.trim()

function rayonMax(maille: { positions: number[] }) {
  let max = 0
  for (let i = 0; i < maille.positions.length; i += 3) {
    max = Math.max(max, Math.hypot(maille.positions[i]!, maille.positions[i + 2]!))
  }
  return max
}

function yExtent(maille: { positions: number[] }) {
  let yMin = Infinity
  let yMax = -Infinity
  for (let i = 0; i < maille.positions.length; i += 3) {
    const y = maille.positions[i + 1]!
    yMin = Math.min(yMin, y)
    yMax = Math.max(yMax, y)
  }
  return { yMin, yMax }
}

describe('carrure pipeline OCCT', () => {
  it('compile le préfixe anneau + poches + cornes', () => {
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_CARRURE_NOYAU)
    expect(historiqueCompatibleOcct(session.historique(), session.pointeCourante())).toBe(true)
    // Affichage : maillage Session (= BREP), pas le prisme OCCT.
    expect(historiqueCornesSession(session.historique(), session.pointeCourante())).toBe(true)
  })

  it('produit un anneau (pas un disque plein) puis des cornes', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_CARRURE_NOYAU)
    const maille = maillagePipelineOcct(occt, session)
    expect(maille.indices.length).toBeGreaterThan(0)
    const { yMax } = yExtent(maille)
    expect(yMax).toBeGreaterThan(7)
    expect(yMax).toBeLessThan(9)
    // Paroi : sommets près du Ø ext. 40 et un trou (pas de matière au centre bas)
    expect(rayonMax(maille)).toBeGreaterThan(19)
    let auCentreBas = false
    for (let i = 0; i < maille.positions.length; i += 3) {
      const r = Math.hypot(maille.positions[i]!, maille.positions[i + 2]!)
      const y = maille.positions[i + 1]!
      if (r < 5 && y < 2) auCentreBas = true
    }
    expect(auCentreBas).toBe(false)
    // Cornes : matière au-delà du rayon peau (20), joue coupée (pas le coin du rectangle)
    expect(rayonMax(maille)).toBeGreaterThan(22)
    let coinRectangle = false
    let yBoutMax = 0
    for (let i = 0; i < maille.positions.length; i += 3) {
      const x = Math.abs(maille.positions[i]!)
      const y = maille.positions[i + 1]!
      const z = Math.abs(maille.positions[i + 2]!)
      if (x > 15.2 && x < 16.5 && z > 23) coinRectangle = true
      if (x > 10 && x < 13 && z > 23) yBoutMax = Math.max(yBoutMax, y)
    }
    expect(coinRectangle).toBe(false)
    // Élévation : le bout n’occupe plus toute la hauteur de carrure
    expect(yBoutMax).toBeGreaterThan(2)
    expect(yBoutMax).toBeLessThan(4)
  }, 180_000)

  it('accepte et maille le script carrure shell via OCCT', async () => {
    const occt = await chargerKernel()
    const session = new Session({ geometrie: false })
    session.executer(SCRIPT_CARRURE)
    expect(historiqueCompatibleOcct(session.historique(), session.pointeCourante())).toBe(true)
    const maille = maillagePipelineOcct(occt, session)
    expect(maille.indices.length).toBeGreaterThan(100)
    expect(rayonMax(maille)).toBeGreaterThan(18)
  }, 180_000)

  it('rouvre le .cadompart de la carrure avec le même maillage OCCT', async () => {
    const occt = await chargerKernel()
    const depart = new Session({ geometrie: false })
    depart.executer(SCRIPT_CARRURE)
    const lecture = lire(ecrire(depart))
    const relu = new Session({ geometrie: false })
    relu.executer(lecture.script)
    for (const index of lecture.eteins) relu.activer(index, false)
    const avant = maillagePipelineOcct(occt, depart)
    const apres = maillagePipelineOcct(occt, relu)
    expect(apres.indices.length).toBe(avant.indices.length)
    expect(apres.positions.length).toBe(avant.positions.length)
    const somme = (valeurs: number[]) => valeurs.reduce((total, valeur) => total + valeur, 0)
    expect(somme(apres.positions)).toBeCloseTo(somme(avant.positions), 4)
  }, 180_000)
})
