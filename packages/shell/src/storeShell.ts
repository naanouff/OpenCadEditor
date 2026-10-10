import type { MaillageOmbre } from '@opencad/api-parametrique'
import { ecrire, lire } from '@opencad/format-opencad'
import { selecteurCourant } from './fichierShell.ts'
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
  pointe(cible: number | 'fin') {
    vueEsquisse = null
    hote.session.poserPointe(cible)
    envoyer((sequence) => moteur?.pointe(cible, sequence))
    revision += 1
    prevenir()
  },
  enregistrer() {
    return ecrire(hote.session)
  },
  ouvrir(octets: Uint8Array) {
    const lecture = lire(octets)
    const suivant = new Hote(navigateur ? { geometrie: false } : undefined)
    suivant.executer(lecture.script)
    for (const index of lecture.eteins) suivant.session.activer(index, false)
    vueEsquisse = null
    maillageAffiche = null
    hote = suivant
    envoyer((sequence) => moteur?.ouvrir(lecture.script, lecture.eteins, sequence))
    revision += 1
    prevenir()
  },
  async demanderOuverture() {
    const octets = await selecteurCourant().ouvrir()
    if (!octets) return
    this.ouvrir(octets)
  },
  async demanderEnregistrement() {
    const octets = ecrire(hote.session)
    const nom = `${hote.session.pieceCourante() ?? 'piece'}.cadompart`
    await selecteurCourant().enregistrer(octets, nom)
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
