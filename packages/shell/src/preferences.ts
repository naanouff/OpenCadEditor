/** Préférences shell persistées (localStorage). */

const CLE_MCP = 'opencad.shell.preferences.mcpSockets'

export type PreferencesShell = {
  /** When false, the MCP WebSocket is closed and does not reconnect. */
  mcpSockets: boolean
}

const defaut: PreferencesShell = {
  mcpSockets: true,
}

type Ecouteur = (prefs: PreferencesShell) => void

const ecouteurs = new Set<Ecouteur>()

function lireStockage(): PreferencesShell {
  if (typeof localStorage === 'undefined') return { ...defaut }
  try {
    const brut = localStorage.getItem(CLE_MCP)
    if (brut === null) return { ...defaut }
    return { mcpSockets: brut === '1' || brut === 'true' }
  } catch {
    return { ...defaut }
  }
}

let courant = lireStockage()

function ecrireStockage(prefs: PreferencesShell) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(CLE_MCP, prefs.mcpSockets ? '1' : '0')
  } catch {
    /* private mode */
  }
}

function prevenir() {
  for (const ecouteur of ecouteurs) ecouteur({ ...courant })
}

export function preferences(): PreferencesShell {
  return { ...courant }
}

export function poserPreferences(partial: Partial<PreferencesShell>) {
  courant = { ...courant, ...partial }
  ecrireStockage(courant)
  prevenir()
}

export function souscrirePreferences(ecouteur: Ecouteur) {
  ecouteurs.add(ecouteur)
  return () => {
    ecouteurs.delete(ecouteur)
  }
}
