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

/** Connexion locale vers le serveur MCP, en dev seulement. */
export function brancherPontMcp(url = `ws://127.0.0.1:${import.meta.env.VITE_OPENCAD_MCP_PORT ?? '47321'}`) {
  let socket: WebSocket | null = null
  let ferme = false
  let attente: ReturnType<typeof setTimeout> | null = null

  function connecter() {
    const ws = new WebSocket(url)
    socket = ws
    ws.onopen = () => {
      const script = storeShell
        .hote()
        .journal.filter((entree) => entree.erreur === null)
        .map((entree) => entree.ligne)
        .join('\n')
      ws.send(JSON.stringify({ type: 'bonjour', script }))
    }
    ws.onmessage = (event) => {
      void recevoirMessage(JSON.parse(String(event.data)) as MessageEntrant, (accuse) => {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(accuse))
      })
    }
    ws.onclose = () => {
      if (ferme || socket !== ws) return
      attente = setTimeout(connecter, 1000)
    }
  }

  storeShell.brancherPont((mutation) => {
    if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ ...mutation, origine: 'shell' }))
  })
  connecter()
  return () => {
    ferme = true
    if (attente) clearTimeout(attente)
    socket?.close()
    storeShell.brancherPont(null)
  }
}
