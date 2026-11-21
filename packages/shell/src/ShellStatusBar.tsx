import type { Maillage } from '@opencad/api-parametrique'
import { useEffect, useState, type ReactElement } from 'react'
import { StatusBar } from './ds'
import { classeKernelDe } from './selectionSegment.ts'
import { storeShell } from './storeShell.ts'
import { topologieAffichee } from './topologieAffichee.ts'

function useRevision() {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])
  return revision
}

function nomArete(maille: Maillage, id: number) {
  const arete = topologieAffichee(maille).aretes[id]
  const classe = arete ? classeKernelDe(arete, storeShell.aretesNommees()) : null
  return classe ? `${classe} (#${id})` : `arete #${id}`
}

function selectionLibelle(maille: Maillage): string {
  const survol = storeShell.survol()
  if (survol?.sorte === 'face') return survol.nom
  if (survol?.sorte === 'arete') return nomArete(maille, survol.id)
  if (survol?.sorte === 'plan' || survol?.sorte === 'axe') return survol.id
  const segment = storeShell.segmentChoisi()
  if (segment !== null) return nomArete(maille, segment)
  return storeShell.datumChoisi() ?? storeShell.faceChoisie()?.nom ?? 'Aucune sélection'
}

export function ShellStatusBar(): ReactElement {
  const revision = useRevision()
  void revision
  const hote = storeShell.hote()
  const maille = storeShell.utiliseMoteur()
    ? (storeShell.maillageAffiche() ?? { positions: [], normales: [], indices: [] })
    : hote.session.maillage()
  const esquisse = hote.session.esquisseCourante()
  const unite = hote.session.document().unite || 'mm'
  const mode = esquisse ? `Esquisse · ${esquisse.support}` : storeShell.assemblage() ? 'Assemblage' : 'Solide'
  const gauche = `${mode} · ${selectionLibelle(maille)}`

  return <StatusBar left={gauche} right={unite} />
}
