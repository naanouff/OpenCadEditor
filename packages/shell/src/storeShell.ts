import type { MaillageOmbre } from '@opencad/api-parametrique'
import { Hote } from './hote.ts'
import { reponseUtile } from './moteur/moteur.ts'
import { moteurWorker } from './moteur/moteurWorker.ts'

type Ecouteur = () => void

const ecouteurs = new Set<Ecouteur>()

const navigateur = typeof window !== 'undefined'
let hote = new Hote(navigateur ? { geometrie: false } : undefined)
let revision = 0
let vueEsquisse: number | null = null
let attendue = 0
let construction = false
let maillageAffiche: MaillageOmbre | null = null

const moteur = navigateur
  ? moteurWorker((maillage, sequence) => {
      if (!reponseUtile(sequence, attendue)) return
      maillageAffiche = {
        positions: maillage.positions,
        normales: maillage.normales ?? [],
        indices: maillage.indices,
        faces: maillage.faces,
      }
      construction = false
      revision += 1
      prevenir()
    })
  : null

function envoyer(faire: (sequence: number) => void) {
  if (!moteur) return
  attendue += 1
  construction = true
  faire(attendue)
}

function prevenir() {
  for (const ecouteur of ecouteurs) ecouteur()
}

export const storeShell = {
  hote: () => hote,
  revision: () => revision,
  construction: () => construction,
  utiliseMoteur: () => moteur !== null,
  maillageAffiche: () => maillageAffiche,
  souscrire(ecouteur: Ecouteur) {
    ecouteurs.add(ecouteur)
    return () => {
      ecouteurs.delete(ecouteur)
    }
  },
  ligne(texte: string) {
    vueEsquisse = null
    hote.ligne(texte)
    if (texte.trim()) envoyer((sequence) => moteur?.ligne(texte, sequence))
    revision += 1
    prevenir()
  },
  executer(script: string) {
    vueEsquisse = null
    hote.executer(script)
    envoyer((sequence) => moteur?.executer(script, sequence))
    revision += 1
    prevenir()
  },
  annuler() {
    vueEsquisse = null
    hote.annuler()
    envoyer((sequence) => moteur?.annuler(sequence))
    revision += 1
    prevenir()
  },
  rafraichir() {
    revision += 1
    prevenir()
  },
  activer(index: number, actif: boolean) {
    hote.session.activer(index, actif)
    envoyer((sequence) => moteur?.activer(index, actif, sequence))
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
