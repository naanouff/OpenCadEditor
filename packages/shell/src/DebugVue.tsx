import { useState, type ReactElement } from 'react'
import { Panel } from '@naanouff/w3dts-editor-ui'
import { encode } from '@opencad/cadom'
import { octetsCadomeshBoite } from './assemblageCadomesh.ts'
import { assemblageBoiteComplete } from './assemblageBoite.ts'
import { selecteurNavigateur } from './fichierShell.ts'
import { SCRIPT_BOITE } from './scriptBoite.ts'
import { SCRIPT_CARRURE } from './scriptCarrure.ts'
import { SCRIPT_COURONNE } from './scriptCouronne.ts'
import { SCRIPT_FOND } from './scriptFond.ts'
import { SCRIPT_LUNETTE } from './scriptLunette.ts'
import { SCRIPT_VERRE } from './scriptVerre.ts'
import { SCRIPT_VIS } from './scriptVis.ts'
import { storeShell } from './storeShell.ts'

export function DebugVue(): ReactElement {
  const [message, setMessage] = useState<string | null>(null)

  const construire = (script: string, reussi: string) => {
    try {
      storeShell.executer(script)
      setMessage(reussi)
    } catch (erreur) {
      setMessage(erreur instanceof Error ? erreur.message : String(erreur))
    }
  }

  const chargerAssemblage = () => {
    try {
      storeShell.ouvrir(encode(assemblageBoiteComplete()))
      setMessage('Boîte Complete .cadom — reconstruction 3D…')
      const wait = () => {
        if (storeShell.construction()) {
          requestAnimationFrame(wait)
          return
        }
        const n = storeShell.maillageAffiche()?.indices.length ?? 0
        setMessage(n > 0 ? 'Boîte Complete affichée' : 'Boîte Complete : graphe seul (pas de maillage)')
      }
      requestAnimationFrame(wait)
    } catch (erreur) {
      setMessage(erreur instanceof Error ? erreur.message : String(erreur))
    }
  }

  const exporterCadomesh = () => {
    void (async () => {
      try {
        setMessage('Export .cadomesh…')
        const map = await octetsCadomeshBoite()
        for (const [uri, octets] of map) {
          const nom = uri.replace(/^\.\//, '')
          await selecteurNavigateur.enregistrer(octets, nom)
        }
        setMessage(`${map.size} fichiers .cadomesh exportés`)
      } catch (erreur) {
        setMessage(erreur instanceof Error ? erreur.message : String(erreur))
      }
    })()
  }

  return (
    <aside className="h-full overflow-auto bg-[var(--color-surface-panel)] p-3 font-ui text-[13px] text-foreground">
      <Panel title="Debug" collapsible={false}>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_CARRURE, 'Carrure construite')}
          >
            Build carrure
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_VIS, 'Vis construite')}
          >
            Build vis
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_LUNETTE, 'Lunette construite')}
          >
            Build lunette
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_FOND, 'Fond construit')}
          >
            Build fond
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_VERRE, 'Verre construit')}
          >
            Build verre
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_COURONNE, 'Couronne construite')}
          >
            Build couronne
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={() => construire(SCRIPT_BOITE, 'Boîte construite')}
          >
            Build boite
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={chargerAssemblage}
          >
            Load boîte Complete
          </button>
          <button
            type="button"
            className="rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] px-3 py-1.5 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
            onClick={exporterCadomesh}
          >
            Export .cadomesh
          </button>
          {message ? (
            <p className="m-0 font-mono text-[11px] text-[var(--color-text-secondary)]">{message}</p>
          ) : null}
        </div>
      </Panel>
    </aside>
  )
}
