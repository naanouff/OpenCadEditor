import { evaluateurProvisoire } from './evaluateur.ts'
import type { Frontiere, Maillage, NoyauGeometrique, Solide } from './types.ts'

function avecFaces(solide: Solide | null): Solide {
  const suivant: Solide = solide
    ? {
        faces: new Set(solide.faces),
        extrusions: solide.extrusions,
        enlevementsBorgnes: solide.enlevementsBorgnes,
        enlevements: [...solide.enlevements],
      }
    : { faces: new Set(), extrusions: 0, enlevementsBorgnes: 0, enlevements: [] }
  suivant.faces.add('face.dessus')
  suivant.faces.add('face.dessous')
  return suivant
}

/** Poses des faces nommées, sans solide exact. */
export const noyauProvisoire: NoyauGeometrique = {
  extruder(solide) {
    const suivant = avecFaces(solide)
    suivant.extrusions += 1
    return suivant
  },
  enlever(solide, coupe) {
    const suivant = avecFaces(solide)
    suivant.enlevements.push(coupe)
    if (!coupe.traverse) suivant.enlevementsBorgnes += 1
    return suivant
  },
  aFace(solide, face) {
    return solide?.faces.has(face) ?? false
  },
  mailler(solide, parametres) {
    if (!solide) return { positions: [], indices: [] }
    const diametre = evaluateurProvisoire.evaluer('diametre_boite', parametres)
    const paroi = evaluateurProvisoire.evaluer('epaisseur_paroi', parametres)
    const hauteur = evaluateurProvisoire.evaluer('hauteur_carrure', parametres)
    return anneau(diametre / 2, diametre / 2 - paroi, hauteur)
  },
  decrire(solide, parametres) {
    if (!solide) return { faces: [] }
    const diametre = evaluateurProvisoire.evaluer('diametre_boite', parametres)
    const paroi = evaluateurProvisoire.evaluer('epaisseur_paroi', parametres)
    const hauteur = evaluateurProvisoire.evaluer('hauteur_carrure', parametres)
    const rayonExt = diametre / 2
    const rayonInt = rayonExt - paroi
    const dessus = solide.enlevements.find((coupe) => !coupe.traverse && coupe.support === 'face.dessus')
    const portee = dessus && dessus.rayon > rayonInt && dessus.rayon < rayonExt ? dessus : null
    const fond = portee ? hauteur - portee.profondeur : hauteur
    const faces: Frontiere['faces'] = [
      { sorte: 'cylindre', rayon: rayonExt, bas: 0, haut: hauteur },
      { sorte: 'cylindre', rayon: rayonInt, bas: 0, haut: fond },
      { sorte: 'couronne', rayonExt, rayonInt, y: 0 },
    ]
    if (!portee) {
      faces.push({ sorte: 'couronne', rayonExt, rayonInt, y: hauteur })
      return { faces }
    }
    faces.push(
      { sorte: 'cylindre', rayon: portee.rayon, bas: fond, haut: hauteur },
      { sorte: 'couronne', rayonExt, rayonInt: portee.rayon, y: hauteur },
      { sorte: 'couronne', rayonExt: portee.rayon, rayonInt, y: fond },
    )
    return { faces }
  },
  poser(esquisse, solide, parametres) {
    const cercles = esquisse.entites
      .filter((entite) => entite.sorte === 'cercle' && entite.diametre)
      .map((entite) => ({
        rayon: evaluateurProvisoire.evaluer(entite.diametre as string, parametres) / 2,
        y: hauteurDuPlan(esquisse.support, solide, parametres),
      }))
    return { support: esquisse.support, cercles }
  },
}

/** Les plans d'origine sont au niveau zéro. Les faces d'un solide sont à ses bornes. */
function hauteurDuPlan(support: string, solide: Solide | null, parametres: Map<string, string>) {
  if (!solide || support !== 'face.dessus') return 0
  return evaluateurProvisoire.evaluer('hauteur_carrure', parametres)
}

function anneau(rayonExt: number, rayonInt: number, hauteur: number): Maillage {
  const segments = 8
  const positions: number[] = []
  const indices: number[] = []
  const couronne = (rayon: number, y: number) => {
    const debut = positions.length / 3
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      positions.push(Math.cos(angle) * rayon, y, Math.sin(angle) * rayon)
    }
    return debut
  }
  const basExt = couronne(rayonExt, 0)
  const hautExt = couronne(rayonExt, hauteur)
  couronne(rayonInt, 0)
  couronne(rayonInt, hauteur)
  for (let i = 0; i < segments; i++) {
    const j = (i + 1) % segments
    indices.push(basExt + i, hautExt + i, hautExt + j, basExt + i, hautExt + j, basExt + j)
  }
  return { positions, indices }
}
