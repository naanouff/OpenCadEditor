import type { NoyauGeometrique, Solide } from './types.ts'

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
}
