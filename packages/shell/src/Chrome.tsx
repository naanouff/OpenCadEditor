import {
  FolderOpen,
  History,
  Moon,
  Redo2,
  Save,
  Search,
  Share2,
  Sun,
  Undo2,
} from 'lucide-react'
import { useEffect, useState, type ReactElement } from 'react'
import { BrandMark } from './BrandMark.tsx'
import { Badge, IconButton, type OcTheme } from './ds'
import { storeShell } from './storeShell.ts'

type Props = {
  theme: OcTheme
  onThemeChange: (theme: OcTheme) => void
}

function useRevision() {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])
  return revision
}

function titreDocument(): { name: string; badge: string } {
  const assemblage = storeShell.assemblage()
  if (assemblage) {
    const root = assemblage.nodes.get(assemblage.rootIds[0] ?? '')
    return { name: root?.name || 'Assemblage', badge: 'Assemblage' }
  }
  const piece = storeShell.hote().session.pieceCourante()
  if (storeShell.hote().session.esquisseCourante()) {
    return { name: piece ?? 'Pièce', badge: 'Esquisse' }
  }
  if (piece) return { name: piece, badge: 'Solide' }
  return { name: 'Sans titre', badge: 'Document' }
}

export function Chrome({ theme, onThemeChange }: Props): ReactElement {
  const revision = useRevision()
  void revision
  const title = titreDocument()
  const peutAnnuler = storeShell.hote().journal.length > 0

  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-oc-line bg-[var(--oc-chrome)] px-2 py-1.5">
      <div className="pr-2">
        <BrandMark theme={theme} />
      </div>

      <div className="flex items-center gap-0.5">
        <IconButton
          label="Nouveau"
          onClick={() => storeShell.remplacer('')}
        >
          <span className="text-[14px] font-semibold leading-none">+</span>
        </IconButton>
        <IconButton
          label="Ouvrir"
          onClick={() => {
            void storeShell.demanderOuverture()
          }}
        >
          <FolderOpen className="h-4 w-4" />
        </IconButton>
        <IconButton
          label="Enregistrer"
          onClick={() => {
            void storeShell.demanderEnregistrement()
          }}
        >
          <Save className="h-4 w-4" />
        </IconButton>
        <IconButton label="Historique versions — bientôt" disabled>
          <History className="h-4 w-4" />
        </IconButton>
        <IconButton label="Partager — bientôt" disabled>
          <Share2 className="h-4 w-4" />
        </IconButton>
      </div>

      <div className="mx-1 h-5 w-px bg-oc-line" />

      <div className="flex items-center gap-0.5">
        <IconButton
          label={peutAnnuler ? 'Annuler' : 'Annuler — rien à annuler'}
          disabled={!peutAnnuler}
          onClick={() => storeShell.annuler()}
        >
          <Undo2 className="h-4 w-4" />
        </IconButton>
        <IconButton label="Rétablir" onClick={() => storeShell.refaire()}>
          <Redo2 className="h-4 w-4" />
        </IconButton>
      </div>

      <div className="mx-1 flex min-w-0 items-center gap-2">
        <span className="truncate text-[13px] font-medium text-oc-text">{title.name}</span>
        <Badge tone="accent">{title.badge}</Badge>
      </div>

      <label className="relative mx-auto min-w-[12rem] max-w-md flex-1">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-oc-muted"
          aria-hidden
        />
        <input
          className="w-full rounded-full border border-oc-line bg-oc-panel-2 py-1.5 pl-8 pr-16 text-[12px] text-oc-text outline-none placeholder:text-oc-muted focus:border-oc-accent"
          placeholder="Rechercher une commande…"
          readOnly
          aria-label="Rechercher une commande"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-oc-line bg-oc-panel px-1.5 py-0.5 text-[10px] text-oc-muted">
          Ctrl K
        </kbd>
      </label>

      <div className="flex items-center gap-0.5">
        <IconButton
          label={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </IconButton>
      </div>
    </header>
  )
}
