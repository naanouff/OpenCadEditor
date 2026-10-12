import { preferences, souscrirePreferences } from './preferences.ts'
import { storeShell } from './storeShell.ts'

export type MessageEntrant = {
  type: string
  origine?: string
  id?: string
  texte?: string
  script?: string
  journal?: boolean
  index?: number
  actif?: boolean
  cible?: number | 'fin'
}

export type Accuse = {
  type: 'accuse'
  id: string
  triangles: number
  erreur: string | null
}

function attendreFin() {
  if (!storeShell.utiliseMoteur() || !storeShell.construction()) return Promise.resolve<string | null>(null)
  return new Promise<string | null>((resolve) => {
    const fin = setTimeout(() => {
      arret()
      resolve('délai dépassé')
    }, 60_000)
    const arret = storeShell.souscrire(() => {
      if (storeShell.construction()) return
      clearTimeout(fin)
      arret()
      resolve(null)
    })
  })
}

/** Applique un message venu du MCP. Les messages de l'éditeur sont ignorés. */
export async function recevoirMessage(message: MessageEntrant, accuser: (accuse: Accuse) => void) {
  if (message.origine === 'shell' || message.type === 'accuse' || message.type === 'bonjour') return
  storeShell.recevoir(() => {
    if (message.type === 'ligne' && message.texte) storeShell.ligne(message.texte)
    else if (message.type === 'executer' && message.script !== undefined) storeShell.executer(message.script)
    else if (message.type === 'annuler') {
      if (message.journal) storeShell.annuler()
      else storeShell.annulerSession()
    } else if (message.type === 'refaire') {
      if (message.journal) storeShell.refaire()
      else storeShell.refaireSession()
    } else if (message.type === 'activer' && message.index !== undefined && message.actif !== undefined) {
      storeShell.activer(message.index, message.actif)
    } else if (message.type === 'pointe' && message.cible !== undefined) storeShell.pointe(message.cible)
    else if (message.type === 'remplacer' && message.script !== undefined) storeShell.remplacer(message.script)
  })
  const erreur = await attendreFin()
  if (!message.id) return
  const maille = storeShell.maillageAffiche()
  accuser({
    type: 'accuse',
    id: message.id,
    triangles: maille ? maille.indices.length / 3 : 0,
    erreur,
  })
}

export type EtatPontMcp = {
  /** Preference: sockets allowed. */
  autorise: boolean
  /** Live WebSocket open. */
  connecte: boolean
}

type EcouteurEtat = (etat: EtatPontMcp) => void

const ecouteursEtat = new Set<EcouteurEtat>()

let socket: WebSocket | null = null
let fermeVolontaire = false
let attente: ReturnType<typeof setTimeout> | null = null
let urlCourante = `ws://127.0.0.1:${import.meta.env.VITE_OPENCAD_MCP_PORT ?? '47321'}`
let pontPublie = false

function etatCourant(): EtatPontMcp {
  return {
    autorise: preferences().mcpSockets,
    connecte: socket?.readyState === WebSocket.OPEN,
  }
}

function prevenirEtat() {
  const etat = etatCourant()
  for (const ecouteur of ecouteursEtat) ecouteur(etat)
}

function couperSocket() {
  fermeVolontaire = true
  if (attente) {
    clearTimeout(attente)
    attente = null
  }
  const ws = socket
  socket = null
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    ws.close()
  }
  prevenirEtat()
}

function connecter() {
  if (!preferences().mcpSockets) return
  fermeVolontaire = false
  const ws = new WebSocket(urlCourante)
  socket = ws
  ws.onopen = () => {
    if (socket !== ws) return
    const script = storeShell
      .hote()
      .journal.filter((entree) => entree.erreur === null)
      .map((entree) => entree.ligne)
      .join('\n')
    ws.send(JSON.stringify({ type: 'bonjour', script }))
    prevenirEtat()
  }
  ws.onmessage = (event) => {
    if (socket !== ws) return
    void recevoirMessage(JSON.parse(String(event.data)) as MessageEntrant, (accuse) => {
      if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(accuse))
    })
  }
  ws.onclose = () => {
    if (socket === ws) socket = null
    prevenirEtat()
    if (fermeVolontaire || !preferences().mcpSockets) return
    attente = setTimeout(connecter, 1000)
  }
  ws.onerror = () => {
    /* onclose handles retry */
  }
}

function assurerPontPublication() {
  if (pontPublie) return
  pontPublie = true
  storeShell.brancherPont((mutation) => {
    if (!preferences().mcpSockets) return
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ ...mutation, origine: 'shell' }))
    }
  })
}

/** Apply preference: connect or tear down the MCP WebSocket. */
export function synchroniserPontMcp() {
  assurerPontPublication()
  if (preferences().mcpSockets) {
    if (socket?.readyState === WebSocket.OPEN || socket?.readyState === WebSocket.CONNECTING) {
      prevenirEtat()
      return
    }
    connecter()
  } else {
    couperSocket()
  }
}

export function etatPontMcp() {
  return etatCourant()
}

export function souscrireEtatPontMcp(ecouteur: EcouteurEtat) {
  ecouteursEtat.add(ecouteur)
  ecouteur(etatCourant())
  return () => {
    ecouteursEtat.delete(ecouteur)
  }
}

/**
 * Connexion locale vers le serveur MCP (dev). Honors preferences.mcpSockets
 * and reconnects/disconnects when the preference changes.
 */
export function brancherPontMcp(url = `ws://127.0.0.1:${import.meta.env.VITE_OPENCAD_MCP_PORT ?? '47321'}`) {
  urlCourante = url
  assurerPontPublication()
  const arretPrefs = souscrirePreferences(() => synchroniserPontMcp())
  synchroniserPontMcp()
  return () => {
    arretPrefs()
    couperSocket()
    storeShell.brancherPont(null)
    pontPublie = false
  }
}
