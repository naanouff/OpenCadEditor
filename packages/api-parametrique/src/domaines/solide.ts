import { ErreurApi, type Contexte, type Domaine } from '../types.ts'

function exigerEsquisse(contexte: Contexte) {
  if (!contexte.esquisse) throw new ErreurApi('aucune esquisse')
  const etat = contexte.solveur.etat(contexte.esquisse)
  if (!etat.ferme || etat.degres > 0) {
    throw new ErreurApi('esquisse non contrainte')
  }
}

export const domaineSolide: Domaine = {
  id: 'solide',
  verbes: {
    extrude: (reste) => ({ type: 'extrude', arguments: { expression: reste }, noms: [] }),
    'enleve travers': (reste) => ({
      type: 'enlever',
      arguments: { expression: reste, traverse: 'oui' },
      noms: [],
    }),
    enleve: (reste) => ({
      type: 'enlever',
      arguments: { expression: reste, traverse: 'non' },
      noms: [],
    }),
  },
  operations: {
    extrude: {
      dansHistorique: true,
      faire(contexte, operation) {
        exigerEsquisse(contexte)
        contexte.evaluateur.evaluer(operation.arguments.expression, contexte.parametres)
        const support = contexte.esquisse?.support
        contexte.solide = contexte.noyau.extruder(contexte.solide)
        contexte.piece.solide = contexte.solide
        contexte.esquisse = null
        contexte.piece.esquisse = null
        if (support === 'plan.3h') contexte.noms.set('tube', 'tube')
        else if (!contexte.noms.has('anneau')) contexte.noms.set('anneau', 'axe')
      },
      defaire() {},
    },
    enlever: {
      dansHistorique: true,
      faire(contexte, operation) {
        exigerEsquisse(contexte)
        if (!contexte.solide) throw new ErreurApi('aucun solide')
        const esquisse = contexte.esquisse
        if (!esquisse) throw new ErreurApi('aucune esquisse')
        const cercle = [...esquisse.entites].reverse().find((entite) => entite.sorte === 'cercle')
        if (!cercle?.diametre) throw new ErreurApi('profil sans diamètre')
        const diametre = contexte.evaluateur.evaluer(cercle.diametre, contexte.parametres)
        const profondeur = contexte.evaluateur.evaluer(operation.arguments.expression, contexte.parametres)
        contexte.solide = contexte.noyau.enlever(contexte.solide, {
          support: esquisse.support,
          rayon: diametre / 2,
          profondeur,
          traverse: operation.arguments.traverse === 'oui',
        })
        contexte.piece.solide = contexte.solide
        contexte.esquisse = null
        contexte.piece.esquisse = null
        if (contexte.solide.enlevementsBorgnes >= 2) {
          const hauteur = contexte.evaluateur.evaluer('hauteur_carrure', contexte.parametres)
          const lunette = contexte.evaluateur.evaluer('profondeur_lunette', contexte.parametres)
          const fond = contexte.evaluateur.evaluer('profondeur_fond', contexte.parametres)
          if (hauteur - lunette - fond <= 0) throw new ErreurApi('collerette invalide')
        }
      },
      defaire() {},
    },
  },
}
