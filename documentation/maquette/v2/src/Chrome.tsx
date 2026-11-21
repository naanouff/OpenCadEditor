import {
  Bell,
  FolderOpen,
  History,
  Moon,
  Redo2,
  Save,
  Search,
  Share2,
  Sun,
  Undo2,
  User,
} from 'lucide-react'
import { BrandMark } from './BrandMark'
import { Badge, Button, IconButton } from './ds'
import { useMock, type Workspace } from './mockState'

const WORKSPACES: { id: Workspace; label: string }[] = [
  { id: 'design', label: 'Design' },
  { id: 'cam', label: 'CAM' },
  { id: 'ctrl', label: 'CTRL' },
  { id: 'render', label: 'Render' },
]

function titleFor(workspace: Workspace, scene: string): { name: string; badge: string } {
  if (workspace === 'cam') return { name: 'Boîte — Gamme', badge: 'CAM' }
  if (workspace === 'ctrl') return { name: 'Carrure — Rattrapage', badge: 'CTRL' }
  if (workspace === 'render') return { name: 'Carrure — Studio', badge: 'Render' }
  if (scene === 'sketch') return { name: 'Carrure — Sketch 1', badge: 'Unsaved sketch' }
  return { name: 'Carrure', badge: 'Solide' }
}

export function Chrome() {
  const { theme, setTheme, scene, setScene, workspace, setWorkspace } = useMock()
  const title = titleFor(workspace, scene)

  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-oc-line bg-[var(--oc-chrome)] px-2 py-1.5">
      <div className="pr-2">
        <BrandMark />
      </div>

      <div className="flex items-center gap-0.5">
        <IconButton label="Nouveau">
          <span className="text-[14px] font-semibold leading-none">+</span>
        </IconButton>
        <IconButton label="Ouvrir">
          <FolderOpen className="h-4 w-4" />
        </IconButton>
        <IconButton label="Enregistrer">
          <Save className="h-4 w-4" />
        </IconButton>
        <IconButton label="Historique versions">
          <History className="h-4 w-4" />
        </IconButton>
        <IconButton label="Partager">
          <Share2 className="h-4 w-4" />
        </IconButton>
      </div>

      <div className="mx-1 h-5 w-px bg-oc-line" />

      <div className="flex items-center gap-0.5">
        <IconButton label="Annuler">
          <Undo2 className="h-4 w-4" />
        </IconButton>
        <IconButton label="Rétablir">
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
          label={theme === 'light' ? 'Thème sombre' : 'Thème clair'}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </IconButton>
        <IconButton label="Notifications">
          <Bell className="h-4 w-4" />
        </IconButton>
        <IconButton label="Compte">
          <User className="h-4 w-4" />
        </IconButton>
      </div>

      <div className="flex items-center gap-1" role="group" aria-label="Espace de travail">
        {WORKSPACES.map((item) => (
          <Button
            key={item.id}
            variant={workspace === item.id ? 'accent' : 'ghost'}
            className="!py-1 text-[11px]"
            onClick={() => setWorkspace(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {workspace === 'design' ? (
        <div className="flex items-center gap-1" role="group" aria-label="État Design">
          <Button
            variant={scene === 'sketch' ? 'accent' : 'ghost'}
            className="!py-1 text-[11px]"
            onClick={() => setScene('sketch')}
          >
            A · Esquisse
          </Button>
          <Button
            variant={scene === 'extrude' ? 'accent' : 'ghost'}
            className="!py-1 text-[11px]"
            onClick={() => setScene('extrude')}
          >
            B · Extrusion
          </Button>
        </div>
      ) : null}
    </header>
  )
}
