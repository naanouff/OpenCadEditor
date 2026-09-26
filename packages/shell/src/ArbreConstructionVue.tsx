import { useEffect, useMemo, useState, type ReactElement } from 'react'
import { Icon, Panel } from '@naanouff/w3dts-editor-ui'
import { arbreConstruction, type NoeudArbre } from './arbreConstruction.ts'
import { storeShell } from './storeShell.ts'

function LigneArbre({ noeud, profondeur }: { noeud: NoeudArbre; profondeur: number }): ReactElement {
  const aEnfants = (noeud.enfants?.length ?? 0) > 0
  const [ouvert, setOuvert] = useState(true)
  return (
    <li className="m-0 list-none">
      <button
        type="button"
        className="flex w-full items-center gap-1 rounded px-1 py-0.5 text-left font-mono text-[12px] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
        style={{ paddingLeft: 4 + profondeur * 12 }}
        onClick={() => aEnfants && setOuvert((v) => !v)}
      >
        {aEnfants ? (
          <Icon name={ouvert ? 'chevron-down' : 'chevron-right'} size={10} />
        ) : (
          <span className="inline-block w-2.5" />
        )}
        <span className={profondeur === 0 ? 'font-semibold text-accent' : 'text-[var(--color-text-primary)]'}>
          {noeud.libelle}
        </span>
      </button>
      {aEnfants && ouvert ? (
        <ul className="m-0 p-0">
          {noeud.enfants!.map((enfant) => (
            <LigneArbre key={enfant.id} noeud={enfant} profondeur={profondeur + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function ArbreConstructionVue(): ReactElement {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])

  const arbre = useMemo(() => {
    const session = storeShell.hote().session
    return arbreConstruction(session.pieceCourante(), session.historique())
  }, [revision])

  return (
    <aside className="h-full overflow-auto bg-[var(--color-surface-panel)] p-3 font-ui text-[13px] text-foreground">
      <Panel title="Construction" collapsible={false}>
        {arbre.length === 0 ? (
          <p className="m-0 text-[var(--color-text-secondary)]">Aucune pièce</p>
        ) : (
          <ul className="m-0 p-0">
            {arbre.map((noeud) => (
              <LigneArbre key={noeud.id} noeud={noeud} profondeur={0} />
            ))}
          </ul>
        )}
      </Panel>
    </aside>
  )
}
