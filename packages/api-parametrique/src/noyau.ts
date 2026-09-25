import { evaluateurProvisoire } from './evaluateur.ts'
import type { Maillage, NoyauGeometrique, Solide } from './types.ts'

function avecFaces(solide: Solide | null): Solide {
  const suivant: Solide = solide
    ? {
        faces: new Set(solide.faces),
        extrusions: solide.extrusions,
        enlevementsBorgnes: solide.enlevementsBorgnes,
      }
    : { faces: new Set(), extrusions: 0, enlevementsBorgnes: 0 }
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
  enlever(solide, traverse) {
    const suivant = avecFaces(solide)
    if (!traverse) suivant.enlevementsBorgnes += 1
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
    return {
      faces: [
        { sorte: 'cylindre', rayon: rayonExt, bas: 0, haut: hauteur },
        { sorte: 'cylindre', rayon: rayonInt, bas: 0, haut: hauteur },
        { sorte: 'couronne', rayonExt, rayonInt, y: hauteur },
        { sorte: 'couronne', rayonExt, rayonInt, y: 0 },
      ],
    }
  },
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
