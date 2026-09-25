import { ErreurApi, type Evaluateur } from './types.ts'

/** Expressions arithmétiques et noms de paramètres. Rien d'autre n'est accepté. */
export const evaluateurProvisoire: Evaluateur = {
  evaluer(expression, parametres) {
    const noms = [...parametres.keys()].sort((a, b) => b.length - a.length)
    let formule = expression.trim()
    for (const nom of noms) {
      formule = formule.replaceAll(nom, parametres.get(nom) ?? '')
    }
    if (!/^[\d+\-*/().\s]+$/.test(formule)) {
      throw new ErreurApi(`expression inconnue: ${expression}`)
    }
    const valeur = Function(`"use strict"; return (${formule})`)() as number
    if (typeof valeur !== 'number' || Number.isNaN(valeur)) {
      throw new ErreurApi(`expression invalide: ${expression}`)
    }
    return valeur
  },
}
