export type SelecteurFichier = {
  ouvrir(): Promise<Uint8Array | null>
  enregistrer(octets: Uint8Array, nom: string): Promise<void>
}

const TYPES = [
  {
    description: 'OpenCAD',
    accept: { 'application/octet-stream': ['.cadompart', '.cadom'] },
  },
]

type PoigneeLecture = { getFile(): Promise<File> }
type PoigneeEcriture = {
  createWritable(): Promise<{ write(data: Uint8Array): Promise<void>; close(): Promise<void> }>
}

type FenetreFichier = Window & {
  showOpenFilePicker?: (options: {
    multiple?: boolean
    types?: typeof TYPES
  }) => Promise<PoigneeLecture[]>
  showSaveFilePicker?: (options: {
    suggestedName?: string
    types?: typeof TYPES
  }) => Promise<PoigneeEcriture>
}

function estAbandon(erreur: unknown) {
  return erreur instanceof Error && erreur.name === 'AbortError'
}

function choisirViaChamp(): Promise<Uint8Array | null> {
  return new Promise((resolve) => {
    const champ = document.createElement('input')
    champ.type = 'file'
    champ.accept = '.cadompart,.cadom'
    champ.onchange = () => {
      const fichier = champ.files?.[0]
      if (!fichier) {
        resolve(null)
        return
      }
      void fichier.arrayBuffer().then((buffer) => resolve(new Uint8Array(buffer)))
    }
    champ.click()
  })
}

function telecharger(octets: Uint8Array, nom: string) {
  const url = URL.createObjectURL(new Blob([octets]))
  const lien = document.createElement('a')
  lien.href = url
  lien.download = nom
  lien.click()
  URL.revokeObjectURL(url)
}

export const selecteurNavigateur: SelecteurFichier = {
  async ouvrir() {
    const fenetre = window as FenetreFichier
    if (!fenetre.showOpenFilePicker) return choisirViaChamp()
    try {
      const [poignee] = await fenetre.showOpenFilePicker({ multiple: false, types: TYPES })
      if (!poignee) return null
      const fichier = await poignee.getFile()
      return new Uint8Array(await fichier.arrayBuffer())
    } catch (erreur) {
      if (estAbandon(erreur)) return null
      throw erreur
    }
  },
  async enregistrer(octets, nom) {
    const fenetre = window as FenetreFichier
    if (!fenetre.showSaveFilePicker) {
      telecharger(octets, nom)
      return
    }
    try {
      const poignee = await fenetre.showSaveFilePicker({ suggestedName: nom, types: TYPES })
      const flux = await poignee.createWritable()
      await flux.write(octets)
      await flux.close()
    } catch (erreur) {
      if (estAbandon(erreur)) return
      throw erreur
    }
  },
}

let selecteur: SelecteurFichier = selecteurNavigateur

export function definirSelecteur(suivant: SelecteurFichier) {
  selecteur = suivant
}

export function selecteurCourant() {
  return selecteur
}
