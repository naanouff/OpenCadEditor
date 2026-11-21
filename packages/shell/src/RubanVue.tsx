import { Moon, Sun } from 'lucide-react'
import { useEffect, useState, type ReactElement } from 'react'
import { IconButton, type OcTheme } from './ds'
import { storeShell } from './storeShell.ts'
import { boutonsRuban, ligneReglage, reglageFonction, type OngletRuban, type ProfilRuban } from './ruban.ts'

function useRevision() {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])
  return revision
}

type Props = {
  theme: OcTheme
  onThemeChange: (theme: OcTheme) => void
}

export function RubanVue({ theme, onThemeChange }: Props): ReactElement {
  const revision = useRevision()
  const [onglet, setOnglet] = useState<OngletRuban>('esquisse')
  const posee = storeShell.hote().session.esquisseCourante()
  const profil: ProfilRuban =
    (posee?.cercles.length ?? 0) > 0 ? 'cercle' : (posee?.traits?.length ?? 0) >= 8 ? 'rectangle' : 'vide'
  const boutons = boutonsRuban({
    onglet,
    piece: storeShell.hote().session.pieceCourante() !== null,
    support: posee?.support ?? null,
    profil,
    arete: storeShell.areteChoisie(),
    assemblage: storeShell.assemblage() !== null,
  })
  const reglage =
    onglet === 'fonctions' && storeShell.assemblage() === null
      ? reglageFonction(storeShell.hote().session.historique())
      : null
  const [valeur, setValeur] = useState(reglage?.expression ?? '')
  const cleReglage = reglage ? `${reglage.rang}:${reglage.expression}` : ''
  const [cleVue, setCleVue] = useState(cleReglage)
  if (cleVue !== cleReglage) {
    setCleVue(cleReglage)
    setValeur(reglage?.expression ?? '')
  }
  void revision

  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-oc-line bg-[var(--oc-ribbon)] px-2 py-1 font-ui text-[13px] text-oc-text">
      {(['esquisse', 'fonctions'] as const).map((id) => (
        <button
          key={id}
          type="button"
          className={
            onglet === id
              ? 'rounded-oc px-2 py-1 text-oc-text bg-oc-select'
              : 'rounded-oc px-2 py-1 text-oc-muted hover:bg-oc-panel-2 hover:text-oc-text'
          }
          onClick={() => setOnglet(id)}
        >
          {id === 'esquisse' ? 'Esquisse' : 'Fonctions'}
        </button>
      ))}
      <span className="mx-1 h-4 w-px bg-oc-line" />
      {boutons.map((bouton) => (
        <button
          key={bouton.id}
          type="button"
          className="rounded-oc border border-oc-line bg-oc-panel-2 px-2 py-1 text-oc-text hover:border-oc-accent"
          onClick={() => storeShell.executer(bouton.lignes.join('\n'))}
        >
          {bouton.libelle}
        </button>
      ))}
      {reglage ? (
        <form
          className="flex items-center gap-1"
          onSubmit={(event) => {
            event.preventDefault()
            const suivante = valeur.trim()
            if (!suivante || suivante === reglage.expression) return
            storeShell.ligne(ligneReglage(reglage.rang, suivante))
            if (storeShell.hote().journal.at(-1)?.erreur) setValeur(reglage.expression)
          }}
        >
          <input
            aria-label="Expression"
            className="w-16 rounded-oc border border-oc-line bg-oc-panel-2 px-2 py-1 font-mono text-oc-text outline-none focus:border-oc-accent"
            value={valeur}
            onChange={(event) => setValeur(event.target.value)}
          />
        </form>
      ) : null}
      <div className="ml-auto">
        <IconButton
          label={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </IconButton>
      </div>
    </div>
  )
}
