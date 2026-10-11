import type { MaillageOmbre } from '@opencad/api-parametrique'
import {
  CadomDocument,
  decode,
  encode,
  planLateLoad,
  type LateLoadPlan,
} from '@opencad/cadom'
import { ecrire, lire } from '@opencad/format-opencad'
import { maillageDepuisAssemblage } from './assemblageMaillage.ts'
import { chargeurCourant } from './chargeurAsset.ts'
import { selecteurCourant } from './fichierShell.ts'
import { Hote } from './hote.ts'
import { reponseUtile } from './moteur/moteur.ts'
import { moteurWorker } from './moteur/moteurWorker.ts'

type Ecouteur = () => void

export type MutationPont =
  | { type: 'ligne'; texte: string }
  | { type: 'executer'; script: string }
  | { type: 'annuler'; journal: true }
  | { type: 'refaire'; journal: true }
  | { type: 'activer'; index: number; actif: boolean }
  | { type: 'pointe'; cible: number | 'fin' }
  | { type: 'remplacer'; script: string }

const ecouteurs = new Set<Ecouteur>()
let auditeurPont: ((mutation: MutationPont) => void) | null = null
let silencePont = false

const navigateur = typeof window !== 'undefined'
let hote = new Hote(navigateur ? { geometrie: false } : undefined)
let revision = 0
let vueEsquisse: number | null = null
let attendue = 0
let construction = false
let maillageAffiche: MaillageOmbre | null = null
let assemblage: CadomDocument | null = null

export type EtatAsset = 'en_attente' | 'ok' | 'erreur'
export type StatutAsset = {
  etat: EtatAsset
  octets?: Uint8Array
  message?: string
}

let statutsAssets = new Map<string, StatutAsset>()

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

function publier(mutation: MutationPont) {
  if (silencePont) return
  auditeurPont?.(mutation)
}

function reinitialiserStatuts(plan: LateLoadPlan) {
  statutsAssets = new Map(plan.assets.map((a) => [a.assetId, { etat: 'en_attente' as const }]))
}

let generationAssemblage = 0

async function reconstruireMaillageAssemblage() {
  const doc = assemblage
  if (!doc) return
  const generation = ++generationAssemblage
  construction = true
  revision += 1
  prevenir()
  try {
    const maille = await maillageDepuisAssemblage(doc)
    if (generation !== generationAssemblage || assemblage !== doc) return
    maillageAffiche = maille
  } catch (erreur) {
    if (generation !== generationAssemblage) return
    console.error(erreur instanceof Error ? erreur.message : String(erreur))
    maillageAffiche = null
  } finally {
    if (generation === generationAssemblage) {
      construction = false
      revision += 1
      prevenir()
    }
  }
}

function chargerAssemblage(octets: Uint8Array) {
  const logical = decode(octets)
  if (
    logical.versionMajor !== 0 ||
    logical.rootIds.length === 0 ||
    logical.nodes.length === 0 ||
    logical.nodes.some((n) => !n.id)
  ) {
    throw new Error('cadom illisible')
  }
  assemblage = CadomDocument.fromLogical(logical)
  reinitialiserStatuts(planLateLoad(assemblage))
  maillageAffiche = null
  vueEsquisse = null
  revision += 1
  prevenir()
  void reconstruireMaillageAssemblage()
}

export const storeShell = {
  hote: () => hote,
  revision: () => revision,
  construction: () => construction,
  utiliseMoteur: () => moteur !== null,
  maillageAffiche: () => maillageAffiche,
  assemblage: () => assemblage,
  /** Graph-first asset fetch plan ; null when no assembly is loaded. */
  planChargement: (): LateLoadPlan | null => (assemblage ? planLateLoad(assemblage) : null),
  statutAsset: (assetId: string) => statutsAssets.get(assetId) ?? null,
  statutsAssets: () => new Map(statutsAssets),
  souscrire(ecouteur: Ecouteur) {
    ecouteurs.add(ecouteur)
    return () => {
      ecouteurs.delete(ecouteur)
    }
  },
  brancherPont(auditeur: ((mutation: MutationPont) => void) | null) {
    auditeurPont = auditeur
  },
  recevoir(faire: () => void) {
    silencePont = true
    try {
      faire()
    } finally {
      silencePont = false
    }
  },
  ligne(texte: string) {
    vueEsquisse = null
    hote.ligne(texte)
    if (texte.trim()) envoyer((sequence) => moteur?.ligne(texte, sequence))
    revision += 1
    prevenir()
    if (texte.trim()) publier({ type: 'ligne', texte })
  },
  executer(script: string) {
    vueEsquisse = null
    hote.executer(script)
    envoyer((sequence) => moteur?.executer(script, sequence))
    revision += 1
    prevenir()
    publier({ type: 'executer', script })
  },
  annuler() {
    vueEsquisse = null
    hote.annuler()
    envoyer((sequence) => moteur?.annuler(sequence))
    revision += 1
    prevenir()
    publier({ type: 'annuler', journal: true })
  },
  annulerSession() {
    vueEsquisse = null
    try {
      hote.session.annuler()
    } catch {
      // Rien à annuler.
    }
    envoyer((sequence) => moteur?.annuler(sequence))
    revision += 1
    prevenir()
  },
  refaire() {
    vueEsquisse = null
    hote.refaire()
    envoyer((sequence) => moteur?.refaire(sequence))
    revision += 1
    prevenir()
    publier({ type: 'refaire', journal: true })
  },
  refaireSession() {
    vueEsquisse = null
    try {
      hote.session.refaire()
    } catch {
      // Rien à refaire.
    }
    envoyer((sequence) => moteur?.refaire(sequence))
    revision += 1
    prevenir()
  },
  remplacer(script: string) {
    vueEsquisse = null
    hote.session.reinitialiser()
    hote.viderJournal()
    if (script.trim()) hote.executer(script)
    maillageAffiche = null
    envoyer((sequence) => moteur?.remplacer(script, sequence))
    revision += 1
    prevenir()
    publier({ type: 'remplacer', script })
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
    publier({ type: 'activer', index, actif })
  },
  pointe(cible: number | 'fin') {
    vueEsquisse = null
    hote.session.poserPointe(cible)
    envoyer((sequence) => moteur?.pointe(cible, sequence))
    revision += 1
    prevenir()
    publier({ type: 'pointe', cible })
  },
  enregistrer() {
    if (assemblage) return encode(assemblage.toLogical())
    return ecrire(hote.session)
  },
  ouvrir(octets: Uint8Array) {
    try {
      const lecture = lire(octets)
      const suivant = new Hote(navigateur ? { geometrie: false } : undefined)
      suivant.executer(lecture.script)
      for (const index of lecture.eteins) suivant.session.activer(index, false)
      vueEsquisse = null
      maillageAffiche = null
      assemblage = null
      statutsAssets = new Map()
      hote = suivant
      envoyer((sequence) => moteur?.ouvrir(lecture.script, lecture.eteins, sequence))
      revision += 1
      prevenir()
    } catch (piece) {
      try {
        chargerAssemblage(octets)
      } catch {
        throw piece
      }
    }
  },
  async chargerAssets() {
    const plan = this.planChargement()
    if (!plan) throw new Error('aucun assemblage')
    const chargeur = chargeurCourant()
    for (const asset of plan.assets) {
      try {
        const octets = await chargeur.charger(asset.uri)
        statutsAssets.set(asset.assetId, { etat: 'ok', octets })
      } catch (erreur) {
        statutsAssets.set(asset.assetId, {
          etat: 'erreur',
          message: erreur instanceof Error ? erreur.message : String(erreur),
        })
      }
    }
    revision += 1
    prevenir()
  },
  async demanderOuverture() {
    const octets = await selecteurCourant().ouvrir()
    if (!octets) return
    this.ouvrir(octets)
  },
  async demanderEnregistrement() {
    if (assemblage) {
      const root = assemblage.nodes.get(assemblage.rootIds[0] ?? '')
      const base = (root?.name || 'assemblage').replace(/[^\w.-]+/g, '_')
      await selecteurCourant().enregistrer(encode(assemblage.toLogical()), `${base}.cadom`)
      return
    }
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
