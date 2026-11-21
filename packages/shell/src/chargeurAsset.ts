/** Injected late-load fetcher (tests / future directory handle). */
export type ChargeurAsset = {
  charger(uri: string): Promise<Uint8Array>
}

const chargeurFetch: ChargeurAsset = {
  async charger(uri) {
    const reponse = await fetch(uri)
    if (!reponse.ok) throw new Error(`HTTP ${reponse.status} · ${uri}`)
    // Le serveur de dev répond index.html (200) à toute URI absente.
    if (reponse.headers.get('content-type')?.startsWith('text/html')) throw new Error(`introuvable · ${uri}`)
    return new Uint8Array(await reponse.arrayBuffer())
  },
}

let chargeur: ChargeurAsset = chargeurFetch

export function definirChargeur(suivant: ChargeurAsset) {
  chargeur = suivant
}

export function chargeurCourant() {
  return chargeur
}

export function chargeurNavigateur() {
  return chargeurFetch
}
