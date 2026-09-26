import type { Document, Vecteur } from '@opencad/api-parametrique'

export type LigneDocument = {
  id: string
  libelle: string
  valeur: string
}

function texte(vecteur: Vecteur) {
  return vecteur.join(' ')
}

/** Lignes du panneau Document : auteur, version, unité, puis origine et axes du repère. */
export function lignesDocument(document: Document): LigneDocument[] {
  return [
    { id: 'auteur', libelle: 'Auteur', valeur: document.auteur },
    { id: 'version', libelle: 'Version', valeur: document.version },
    { id: 'unite', libelle: 'Unité', valeur: document.unite },
    { id: 'origine', libelle: 'Origine', valeur: texte(document.repere.origine) },
    { id: 'x', libelle: 'X · 3 h', valeur: texte(document.repere.x) },
    { id: 'y', libelle: 'Y · verticale', valeur: texte(document.repere.y) },
    { id: 'z', libelle: 'Z · 12 h', valeur: texte(document.repere.z) },
  ]
}
