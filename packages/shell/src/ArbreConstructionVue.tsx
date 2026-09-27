import { useEffect, useMemo, useState, type ReactElement } from 'react'
import { Icon, Panel } from '@naanouff/w3dts-editor-ui'
import { arbreConstruction, type NoeudArbre } from './arbreConstruction.ts'
import { storeShell } from './storeShell.ts'

function LigneArbre({ noeud, profondeur }: { noeud: NoeudArbre; profondeur: number }): ReactElement {
  const aEnfants = (noeud.enfants?.length ?? 0) > 0
  const [ouvert, setOuvert] = useState(true)
  const eteint = noeud.actif === false
  const vue = noeud.esquisse && storeShell.esquisseVue() === noeud.index
  return (
    <li className={`m-0 list-none ${eteint ? 'opacity-40' : ''}`}>
      <div
        className={`flex w-full items-center gap-1 rounded px-1 py-0.5 text-left font-mono text-[12px] hover:bg-[var(--color-surface-hover)] ${vue ? 'bg-[var(--color-surface-hover)]' : ''}`}
        style={{ paddingLeft: 4 + profondeur * 12 }}
      >
        {noeud.interrupteur && noeud.index !== undefined ? (
          <input
            type="checkbox"
            className="h-3 w-3 shrink-0 accent-[var(--color-text-primary)]"
            checked={!eteint}
            aria-label={`Actif ${noeud.libelle}`}
            onChange={() => storeShell.activer(noeud.index as number, eteint)}
          />
        ) : null}
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-1 text-left"
          onClick={() => {
            if (noeud.esquisse && noeud.index !== undefined) {
              storeShell.voirEsquisse(noeud.index)
              return
            }
            if (profondeur === 0) {
              storeShell.voirEsquisse(null)
              return
            }
            if (aEnfants) setOuvert((v) => !v)
          }}
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
      </div>
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
        {storeShell.esquisseVue() !== null ? (
          <button
            type="button"
            className="mb-2 rounded border border-[var(--color-border-default)] px-2 py-1 text-left text-[12px] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => storeShell.voirEsquisse(null)}
          >
            Quitter l'esquisse
          </button>
        ) : null}
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
