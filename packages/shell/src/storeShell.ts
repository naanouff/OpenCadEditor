import type { Maillage, MaillageOmbre } from '@opencad/api-parametrique'
import { bornesYMilieux, nommerAretes, type AreteKernel, type AreteNommee } from './occt/aretesOcct.ts'
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
let aretesNommees: AreteNommee[] = []
let areteChoisie: string | null = null
/** Carreau tessellé sélectionné (sprint 62). */
let faceChoisie: { id: number; nom: string } | null = null
/** Arête BRep sélectionnée (index dans `aretesBrepGroupees`). */
let segmentChoisi: number | null = null
/** Survol courant, sans muter le modèle. */
let survol:
  | { sorte: 'face'; id: number; nom: string }
  | { sorte: 'arete'; id: number }
  | { sorte: 'plan'; id: string }
  | { sorte: 'axe'; id: string }
  | null = null
/** Plan ou axe d’origine sélectionné. */
let datumChoisi: string | null = null
let assemblage: CadomDocument | null = null

function retenirAretes(aretes: AreteKernel[] | undefined) {
  const bornes = bornesYMilieux(aretes ?? [])
  aretesNommees = bornes ? nommerAretes(aretes ?? [], bornes.yMin, bornes.yMax) : []
  if (areteChoisie && !aretesNommees.some((a) => a.id === areteChoisie)) areteChoisie = null
}

function oublierAretes() {
  aretesNommees = []
  areteChoisie = null
}

function oublierFace() {
  faceChoisie = null
  segmentChoisi = null
  datumChoisi = null
  survol = null
}

function validerFaceChoisie(maille: MaillageOmbre | null) {
  if (!faceChoisie) return
  const faces = maille?.faces
  if (!faces || !faces.includes(faceChoisie.id)) faceChoisie = null
}

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
      retenirAretes((maillage as Maillage & { aretes?: AreteKernel[] }).aretes)
      validerFaceChoisie(maillageAffiche)
      segmentChoisi = null
      survol = null
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
    let maille: MaillageOmbre | null = null
    // Dynamic import: keep protobuf / cadomesh writer out of the main browser graph.
    const { maillageDepuisCadomesh, octetsMeshDepuisStatuts } = await import('./assemblageCadomesh.ts')
    const meshOctets = octetsMeshDepuisStatuts(doc, statutsAssets)
    if (meshOctets.size > 0) {
      try {
        maille = maillageDepuisCadomesh(doc, meshOctets)
      } catch {
        maille = null
      }
    }
    maille ??= await maillageDepuisAssemblage(doc)
    if (generation !== generationAssemblage || assemblage !== doc) return
    maillageAffiche = maille
    oublierAretes()
    oublierFace()
  } catch (erreur) {
    if (generation !== generationAssemblage) return
    console.error(erreur instanceof Error ? erreur.message : String(erreur))
    maillageAffiche = null
    oublierAretes()
    oublierFace()
  } finally {
    if (generation === generationAssemblage) {
      construction = false
      revision += 1
      prevenir()
    }
  }
}

function chargerAssemblage(octets: Uint8Array, reconstruire = true) {
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
  oublierAretes()
  vueEsquisse = null
  revision += 1
  prevenir()
  if (reconstruire) void reconstruireMaillageAssemblage()
}

export const storeShell = {
  hote: () => hote,
  revision: () => revision,
  construction: () => construction,
  utiliseMoteur: () => moteur !== null,
  maillageAffiche: () => maillageAffiche,
  aretesNommees: () => aretesNommees,
  areteChoisie: () => areteChoisie,
  faceChoisie: () => faceChoisie,
  segmentChoisi: () => segmentChoisi,
  survol: () => survol,
  choisirArete(nom: string) {
    if (!aretesNommees.some((a) => a.id === nom)) return false
    areteChoisie = nom
    faceChoisie = null
    segmentChoisi = null
    datumChoisi = null
    revision += 1
    prevenir()
    return true
  },
  datumChoisi: () => datumChoisi,
  choisirFace(id: number, nom: string) {
    faceChoisie = { id, nom }
    areteChoisie = null
    segmentChoisi = null
    datumChoisi = null
    revision += 1
    prevenir()
  },
  /** Arête BRep entière ; `classe` = nom kernel (`arete.haut`…) pour le ruban, si elle en a un. */
  choisirAreteBrep(id: number, classe: string | null) {
    segmentChoisi = id
    faceChoisie = null
    datumChoisi = null
    areteChoisie = classe && aretesNommees.some((a) => a.id === classe) ? classe : null
    revision += 1
    prevenir()
  },
  choisirDatum(id: string) {
    datumChoisi = id
    faceChoisie = null
    segmentChoisi = null
    areteChoisie = null
    revision += 1
    prevenir()
  },
  definirSurvol(suivant: typeof survol) {
    const identique =
      survol === suivant ||
      (survol?.sorte === suivant?.sorte &&
        survol?.id === suivant?.id &&
        (survol?.sorte !== 'face' || suivant?.sorte !== 'face' || survol.nom === suivant.nom))
    if (identique) return
    survol = suivant
    revision += 1
    prevenir()
  },
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
    areteChoisie = null
    hote.ligne(texte)
    if (texte.trim()) envoyer((sequence) => moteur?.ligne(texte, sequence))
    revision += 1
    prevenir()
    if (texte.trim()) publier({ type: 'ligne', texte })
  },
  /** Open sketch on a support (`face.*` or `plan.*`). No-op if already sketching. */
  ouvrirEsquisseSurSupport(support: string) {
    if (hote.session.esquisseCourante()) return false
    if (assemblage) return false
    this.ligne(`esquisse ${support}`)
    return hote.session.esquisseCourante()?.support === support
  },
  /** @deprecated use ouvrirEsquisseSurSupport */
  ouvrirEsquisseSurFace(faceId: string) {
    return this.ouvrirEsquisseSurSupport(faceId)
  },
  /**
   * Place or update a circle at sketch origin with the given diameter (mm).
   * GCS v1 keeps the centre at (0,0) ; the click distance drives the diameter only.
   */
  poserCercleDiametre(diametreMm: number) {
    const posee = hote.session.esquisseCourante()
    if (!posee || assemblage) return false
    if (!(diametreMm > 0) || !Number.isFinite(diametreMm)) return false
    const d = Math.round(diametreMm * 1000) / 1000
    if (posee.cercles.length === 0) this.ligne('cercle')
    this.ligne(`cote diametre ${d}`)
    return (hote.session.esquisseCourante()?.cercles.length ?? 0) > 0
  },
  /**
   * Place or update a centred rectangle (mm). GCS v1 origin = centre ;
   * click UV drives longueur (2|u|) and largeur (2|v|).
   */
  poserRectangle(longueurMm: number, largeurMm: number) {
    const posee = hote.session.esquisseCourante()
    if (!posee || assemblage) return false
    if (!(longueurMm > 0) || !(largeurMm > 0)) return false
    if (!Number.isFinite(longueurMm) || !Number.isFinite(largeurMm)) return false
    const L = Math.round(longueurMm * 1000) / 1000
    const l = Math.round(largeurMm * 1000) / 1000
    const deja = (posee.traits?.length ?? 0) >= 8
    if (!deja) this.ligne('rectangle')
    this.ligne(`cote largeur ${l}`)
    this.ligne(`cote longueur ${L}`)
    const apres = hote.session.esquisseCourante()
    return (apres?.traits?.length ?? 0) >= 8
  },
  executer(script: string) {
    vueEsquisse = null
    areteChoisie = null
    faceChoisie = null
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
    oublierAretes()
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
      oublierAretes()
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
  /**
   * Open `.cadom` then display from in-memory `.cadomesh` (no OCCT rebuild for viewport).
   * Mesh map keys are asset URIs (e.g. `./lunette.cadomesh`).
   */
  ouvrirAssemblageAvecCadomesh(
    octetsCadom: Uint8Array,
    octetsParUri: ReadonlyMap<string, Uint8Array>,
  ) {
    chargerAssemblage(octetsCadom, false)
    if (!assemblage) return
    for (const [assetId, asset] of assemblage.assets) {
      const octets = octetsParUri.get(asset.uri)
      if (!octets) continue
      statutsAssets.set(assetId, { etat: 'ok', octets })
    }
    revision += 1
    prevenir()
    void reconstruireMaillageAssemblage()
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
    void reconstruireMaillageAssemblage()
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
