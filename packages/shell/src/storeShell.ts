import { Hote } from './hote.ts'

type Ecouteur = () => void

const ecouteurs = new Set<Ecouteur>()

let hote = new Hote()
let revision = 0

function prevenir() {
  for (const ecouteur of ecouteurs) ecouteur()
}

export const storeShell = {
  hote: () => hote,
  revision: () => revision,
  souscrire(ecouteur: Ecouteur) {
    ecouteurs.add(ecouteur)
    return () => {
      ecouteurs.delete(ecouteur)
    }
  },
  ligne(texte: string) {
    hote.ligne(texte)
    revision += 1
    prevenir()
  },
  executer(script: string) {
    hote.executer(script)
    revision += 1
    prevenir()
  },
  annuler() {
    hote.annuler()
    revision += 1
    prevenir()
  },
  rafraichir() {
    revision += 1
    prevenir()
  },
}
