import { Hote } from './hote.ts'

type Ecouteur = () => void

const ecouteurs = new Set<Ecouteur>()

let hote = new Hote()
let revision = 0
let vueEsquisse: number | null = null

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
    vueEsquisse = null
    hote.ligne(texte)
    revision += 1
    prevenir()
  },
  executer(script: string) {
    vueEsquisse = null
    hote.executer(script)
    revision += 1
    prevenir()
  },
  annuler() {
    vueEsquisse = null
    hote.annuler()
    revision += 1
    prevenir()
  },
  rafraichir() {
    revision += 1
    prevenir()
  },
  activer(index: number, actif: boolean) {
    hote.session.activer(index, actif)
    revision += 1
    prevenir()
  },
  esquisseVue: () => vueEsquisse,
  voirEsquisse(index: number | null) {
    const suivante = index === null || vueEsquisse === index ? null : index
    if (suivante === vueEsquisse) return
    vueEsquisse = suivante
    revision += 1
    prevenir()
  },
}
