import { indexesFonctions, type Operation } from '@opencad/api-parametrique'

/**
 * P4 / sprint 60 — ruban. Les boutons émettent les lignes du terminal.
 * Cotes de départ : rectangle 10×20, cercle Ø 10, extrusion 8, enlèvement 2, congé 1.
 */
export type OngletRuban = 'esquisse' | 'fonctions'

export type ProfilRuban = 'vide' | 'rectangle' | 'cercle'

export type EtatRuban = {
  onglet: OngletRuban
  piece: boolean
  support: string | null
  profil: ProfilRuban
  arete: string | null
  assemblage: boolean
}

export type BoutonRuban = {
  id: string
  libelle: string
  lignes: string[]
}

const RECTANGLE = ['rectangle', 'cote largeur 10', 'cote longueur 20', 'cote ecart 0']
const CERCLE = ['cercle', 'cote diametre 10']

export function boutonsRuban(etat: EtatRuban): BoutonRuban[] {
  if (etat.assemblage) return []
  if (etat.onglet === 'esquisse') return boutonsEsquisse(etat)
  return boutonsFonctions(etat)
}

function boutonsEsquisse(etat: EtatRuban): BoutonRuban[] {
  if (!etat.support) {
    const lignes = etat.piece ? ['esquisse plan.dessus'] : ['piece piece', 'esquisse plan.dessus']
    return [{ id: 'plan-dessus', libelle: 'Plan dessus', lignes }]
  }
  if (etat.profil !== 'vide') return []
  if (etat.support.startsWith('face.')) {
    return [{ id: 'cercle', libelle: 'Cercle', lignes: CERCLE }]
  }
  return [{ id: 'rectangle', libelle: 'Rectangle', lignes: RECTANGLE }]
}

function boutonsFonctions(etat: EtatRuban): BoutonRuban[] {
  if (etat.support && etat.profil === 'rectangle') {
    return [{ id: 'extrude', libelle: 'Extruder', lignes: ['extrude 8'] }]
  }
  if (etat.support?.startsWith('face.') && etat.profil === 'cercle') {
    return [{ id: 'enleve', libelle: 'Enlever', lignes: ['enleve 2'] }]
  }
  if (!etat.support && etat.arete) {
    return [{ id: 'fillet', libelle: 'Congé', lignes: [`fillet 1 ${etat.arete}`] }]
  }
  return []
}

/** Dernière fonction qui porte une expression (extrude, enlève, congé, pas), avec son rang 1-based. */
export function reglageFonction(historique: Operation[]): { rang: number; expression: string } | null {
  const indexes = indexesFonctions(historique)
  for (let rang = indexes.length; rang >= 1; rang--) {
    const expression = historique[indexes[rang - 1]!]!.arguments.expression
    if (expression) return { rang, expression }
  }
  return null
}

/** Ligne qui règle la fonction de ce rang. */
export function ligneReglage(rang: number, expression: string) {
  return `regle ${rang} ${expression.trim()}`
}
