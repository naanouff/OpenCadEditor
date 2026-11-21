import type { IDockviewPanelProps } from 'dockview'
import type { Maillage } from '@opencad/api-parametrique'
import { useEffect, useState, type ReactElement } from 'react'
import { Hint, PanelSection } from '../ds'
import { ligneReglage, reglageFonction } from '../ruban.ts'
import { classeKernelDe } from '../selectionSegment.ts'
import { storeShell } from '../storeShell.ts'
import { topologieAffichee } from '../topologieAffichee.ts'

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

function selectionTexte(maille: Maillage): string {
  const survol = storeShell.survol()
  if (survol?.sorte === 'face') return survol.nom
  if (survol?.sorte === 'arete') return nomArete(maille, survol.id)
  if (survol?.sorte === 'plan' || survol?.sorte === 'axe') return survol.id
  const segment = storeShell.segmentChoisi()
  if (segment !== null) return nomArete(maille, segment)
  return storeShell.datumChoisi() ?? storeShell.faceChoisie()?.nom ?? 'Aucune sélection'
}

function prochainesEtapes(): string[] {
  if (storeShell.assemblage()) {
    return ['Consultation assemblage — éditez une pièce pour modifier la géométrie.']
  }
  const session = storeShell.hote().session
  const piece = session.pieceCourante()
  const esquisse = session.esquisseCourante()
  if (!piece) return ['Créez une pièce (Plan dessus) pour commencer.']
  if (!esquisse) {
    if (storeShell.areteChoisie()) {
      return ['Congé ou chanfrein sur l’arête choisie (onglet SOLIDE).']
    }
    if (storeShell.faceChoisie()) {
      return ['Double-cliquez le plan ou la face pour ouvrir une esquisse.']
    }
    return ['Ouvrez une esquisse sur un plan, ou choisissez une arête / face.']
  }
  const profil =
    esquisse.cercles.length > 0
      ? 'cercle'
      : (esquisse.traits?.length ?? 0) >= 8
        ? 'rectangle'
        : 'vide'
  if (profil === 'vide') {
    if (esquisse.support.startsWith('face.')) {
      return ['Posez un cercle, puis Enlever (SOLIDE).']
    }
    return ['Posez un rectangle, puis Extruder (SOLIDE).']
  }
  if (profil === 'rectangle') return ['Extrudez le profil (onglet SOLIDE).']
  return ['Enlevez le profil sur la face (onglet SOLIDE).']
}

export function InspectorPanel(_props: IDockviewPanelProps): ReactElement {
  const revision = useRevision()
  void revision
  const hote = storeShell.hote()
  const maille = storeShell.utiliseMoteur()
    ? (storeShell.maillageAffiche() ?? { positions: [], normales: [], indices: [] })
    : hote.session.maillage()
  const reglage =
    storeShell.assemblage() === null ? reglageFonction(hote.session.historique()) : null
  const [valeur, setValeur] = useState(reglage?.expression ?? '')
  const cle = reglage ? `${reglage.rang}:${reglage.expression}` : ''
  const [cleVue, setCleVue] = useState(cle)
  if (cleVue !== cle) {
    setCleVue(cle)
    setValeur(reglage?.expression ?? '')
  }
  const etapes = prochainesEtapes()

  return (
    <aside className="h-full overflow-auto bg-oc-panel font-ui text-[13px] text-oc-text">
      <PanelSection title="Sélection">
        <p className="m-0 px-1 font-mono text-[12px] text-oc-text">{selectionTexte(maille)}</p>
      </PanelSection>

      {reglage ? (
        <PanelSection title="Expression">
          <form
            className="px-1"
            onSubmit={(event) => {
              event.preventDefault()
              const suivante = valeur.trim()
              if (!suivante || suivante === reglage.expression) return
              storeShell.ligne(ligneReglage(reglage.rang, suivante))
              if (storeShell.hote().journal.at(-1)?.erreur) setValeur(reglage.expression)
            }}
          >
            <label className="grid gap-1 text-[12px]">
              <span className="text-oc-muted">Fonction {reglage.rang}</span>
              <input
                aria-label="Expression"
                className="rounded-oc border border-oc-line bg-oc-panel-2 px-2 py-1.5 font-mono text-[12px] text-oc-text outline-none focus:border-oc-accent"
                value={valeur}
                onChange={(event) => setValeur(event.target.value)}
              />
            </label>
          </form>
        </PanelSection>
      ) : null}

      <PanelSection title="Prochaines étapes">
        <div className="space-y-1 px-0">
          {etapes.map((etape) => (
            <Hint key={etape}>{etape}</Hint>
          ))}
        </div>
      </PanelSection>
    </aside>
  )
}
