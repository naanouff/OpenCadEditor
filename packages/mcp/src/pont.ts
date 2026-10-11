import { WebSocketServer, type WebSocket } from 'ws'
import { Controle } from './outils.ts'

type Accuse = { triangles: number; erreur: string | null }

export function creerPont(controle: Controle, options?: { port?: number; delaiMs?: number }) {
  const delaiMs = options?.delaiMs ?? 60_000
  const wss = new WebSocketServer({ host: '127.0.0.1', port: options?.port ?? 0 })
  let client: WebSocket | null = null
  let chaine = Promise.resolve()
  const pendants = new Map<string, (accuse: Accuse) => void>()
  let seq = 0

  function serie<T>(faire: () => Promise<T>): Promise<T> {
    const courant = chaine.then(faire, faire)
    chaine = courant.then(
      () => undefined,
      () => undefined,
    )
    return courant
  }

  function envoyer(message: unknown) {
    if (client?.readyState === 1) client.send(JSON.stringify(message))
  }

  function attendre(id: string) {
    return new Promise<Accuse>((resolve) => {
      const timer = setTimeout(() => {
        pendants.delete(id)
        resolve({ triangles: 0, erreur: 'délai dépassé' })
      }, delaiMs)
      pendants.set(id, (accuse) => {
        clearTimeout(timer)
        resolve(accuse)
      })
    })
  }

  async function diffuser(message: Record<string, unknown>) {
    if (!client || client.readyState !== 1) {
      controle.definirViewport(null)
      return
    }
    const id = String(++seq)
    envoyer({ ...message, id, origine: 'mcp' })
    const accuse = await attendre(id)
    controle.definirViewport({ triangles: accuse.triangles, erreur: accuse.erreur })
  }

  function resoudreAccuse(message: Record<string, unknown>) {
    if (typeof message.id !== 'string') return
    const resoudre = pendants.get(message.id)
    pendants.delete(message.id)
    resoudre?.({
      triangles: Number(message.triangles ?? 0),
      erreur: typeof message.erreur === 'string' ? message.erreur : null,
    })
  }

  async function traiter(message: Record<string, unknown>) {
    if (message.type === 'bonjour') {
      const decision = controle.bonjour(String(message.script ?? ''))
      if ('remplacer' in decision) await diffuser({ type: 'remplacer', script: decision.remplacer })
      return
    }
    if (message.origine !== 'shell') return
    try {
      if (message.type === 'ligne') controle.commande(String(message.texte ?? ''))
      else if (message.type === 'executer') controle.executer(String(message.script ?? ''))
      else if (message.type === 'annuler') controle.annuler()
      else if (message.type === 'refaire') controle.refaire()
      else if (message.type === 'activer') controle.activer(Number(message.index), Boolean(message.actif))
      else if (message.type === 'pointe') {
        controle.poserPointe(message.cible === 'fin' ? 'fin' : Number(message.cible))
      } else if (message.type === 'remplacer') controle.adopter(String(message.script ?? ''))
    } catch {
      // L'éditeur a déjà appliqué sa ligne. Un conflit laisse les deux scripts en place.
    }
  }

  wss.on('connection', (ws) => {
    client = ws
    ws.on('message', (data) => {
      const message = JSON.parse(String(data)) as Record<string, unknown>
      if (message.type === 'accuse') {
        resoudreAccuse(message)
        return
      }
      void serie(() => traiter(message))
    })
    ws.on('close', () => {
      if (client !== ws) return
      client = null
      controle.definirViewport(null)
    })
  })

  async function muter(faire: () => void, message: Record<string, unknown>) {
    await serie(async () => {
      faire()
      await diffuser(message)
    })
  }

  return {
    async pret() {
      const actuel = wss.address()
      if (actuel && typeof actuel === 'object') return
      await new Promise<void>((resolve, reject) => {
        wss.once('listening', () => resolve())
        wss.once('error', reject)
      })
    },
    port() {
      const adresse = wss.address()
      return typeof adresse === 'object' && adresse ? adresse.port : 0
    },
    async commande(ligne: string) {
      const texte = ligne.trim()
      if (!texte || texte.startsWith('#')) return
      await muter(() => controle.commande(texte), { type: 'ligne', texte })
    },
    async executer(script: string) {
      await muter(() => controle.executer(script), { type: 'executer', script })
    },
    async annuler() {
      await serie(async () => {
        const resultat = controle.annuler()
        await diffuser({ type: 'annuler', journal: resultat.journal })
      })
    },
    async refaire() {
      await serie(async () => {
        const resultat = controle.refaire()
        await diffuser({ type: 'refaire', journal: resultat.journal })
      })
    },
    async pointe(cible: number | 'fin') {
      const texte = cible === 'fin' ? 'pointe fin' : `pointe ${cible}`
      await muter(() => controle.pointe(cible), { type: 'ligne', texte })
    },
    async activer(index: number, actif: boolean) {
      await muter(() => controle.activer(index, actif), { type: 'activer', index, actif })
    },
    async aligner(source: 'mcp' | 'editeur') {
      await serie(async () => {
        const decision = controle.aligner(source)
        if ('remplacer' in decision) await diffuser({ type: 'remplacer', script: decision.remplacer })
      })
    },
    etat() {
      return controle.etat()
    },
    async fermer() {
      for (const ws of wss.clients) ws.close()
      await new Promise<void>((resolve, reject) => wss.close((erreur) => (erreur ? reject(erreur) : resolve())))
    },
  }
}
