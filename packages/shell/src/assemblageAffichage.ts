import { planLateLoad, type CadomDocument, type LateLoadPlan } from '@opencad/cadom'
import type { LigneDocument } from './documentAffichage.ts'

function idCourt(id: string) {
  return id.length > 8 ? id.slice(0, 8) : id
}

/** Lignes Document pour un graphe `.cadom` (nœuds + plan late-load). */
export function lignesAssemblage(
  doc: CadomDocument,
  plan: LateLoadPlan = planLateLoad(doc),
): LigneDocument[] {
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

  if (plan.assets.length > 0) {
    lignes.push({
      id: 'cadom-assets',
      libelle: 'Assets',
      valeur: `${plan.assets.length} · late-load`,
    })
    for (const asset of plan.assets) {
      lignes.push({
        id: `asset-${asset.assetId}`,
        libelle: `· ${asset.role}`,
        valeur: asset.uri,
      })
    }
  }
  return lignes
}
