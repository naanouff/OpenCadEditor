import type { Domaine } from '../types.ts'

export const domaineParametres: Domaine = {
  id: 'parametres',
  verbes: {
    param(reste) {
      const espace = reste.indexOf(' ')
      const nom = espace === -1 ? reste : reste.slice(0, espace)
      const expression = espace === -1 ? '' : reste.slice(espace + 1).trim()
      return {
        type: 'param',
        arguments: { nom, expression },
        noms: [nom],
        cle: nom,
      }
    },
  },
  operations: {
    param: {
      dansHistorique: true,
      faire(contexte, operation) {
        contexte.parametres.set(operation.arguments.nom, operation.arguments.expression)
        contexte.noms.set(operation.arguments.nom, operation.arguments.nom)
      },
      defaire(contexte, operation) {
        contexte.parametres.set(operation.arguments.nom, operation.arguments.expression)
      },
    },
  },
}
