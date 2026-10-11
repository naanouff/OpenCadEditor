import type { CadomDocument } from '@opencad/cadom'
import type { LigneDocument } from './documentAffichage.ts'

function idCourt(id: string) {
  return id.length > 8 ? id.slice(0, 8) : id
}

/** Lignes Document pour un graphe `.cadom` (profondeur via préfixe). */
export function lignesAssemblage(doc: CadomDocument): LigneDocument[] {
  const lignes: LigneDocument[] = [
    {
      id: 'cadom-meta',
      libelle: 'Assemblage',
      valeur: `v${doc.versionMajor}.${doc.versionMinor} · ${doc.units} · ${doc.upAxis}-up`,
    },
  ]
  const visiter = (id: string, profondeur: number) => {
    const node = doc.nodes.get(id)
    if (!node) return
    const indent = profondeur === 0 ? '' : `${'· '.repeat(profondeur)}`
    lignes.push({
      id: `node-${id}`,
      libelle: `${indent}${node.name || '(sans nom)'}`,
      valeur: idCourt(id),
    })
    for (const enfant of doc.getChildren(id)) visiter(enfant, profondeur + 1)
  }
  for (const root of doc.rootIds) visiter(root, 0)
  return lignes
}
