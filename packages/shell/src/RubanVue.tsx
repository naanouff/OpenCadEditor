import {
  Circle,
  Eraser,
  Minus,
  Scissors,
  Square,
  Zap,
} from 'lucide-react'
import { useEffect, useState, type ReactElement, type ReactNode } from 'react'
import { storeShell } from './storeShell.ts'
import {
  boutonsRuban,
  ligneReglage,
  reglageFonction,
  type BoutonRuban,
  type OngletRuban,
  type ProfilRuban,
} from './ruban.ts'

function useRevision() {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])
  return revision
}

type OutilVue = {
  id: string
  label: string
  icon: ReactNode
}

type GroupeVue = {
  title: string
  tools: OutilVue[]
}

const ONGLETS: { id: OngletRuban; label: string }[] = [
  { id: 'esquisse', label: 'ESQUISSE' },
  { id: 'fonctions', label: 'SOLIDE' },
]

const GROUPES_ESQUISSE: GroupeVue[] = [
  {
    title: 'Plan',
    tools: [{ id: 'plan-dessus', label: 'Plan dessus', icon: <Minus className="h-4 w-4" /> }],
  },
  {
    title: 'Créer',
    tools: [
      { id: 'rectangle', label: 'Rectangle', icon: <Square className="h-4 w-4" /> },
      { id: 'cercle', label: 'Cercle', icon: <Circle className="h-4 w-4" /> },
    ],
  },
]

const GROUPES_SOLIDE: GroupeVue[] = [
  {
    title: 'Créer',
    tools: [
      { id: 'extrude', label: 'Extruder', icon: <Zap className="h-4 w-4" /> },
      { id: 'enleve', label: 'Enlever', icon: <Scissors className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Modifier',
    tools: [
      { id: 'fillet', label: 'Congé', icon: <Eraser className="h-4 w-4" /> },
      { id: 'chanfrein', label: 'Chanfrein', icon: <Eraser className="h-4 w-4 rotate-45" /> },
    ],
  },
]

function raisonOutil(
  id: string,
  etat: {
    support: string | null
    profil: ProfilRuban
    arete: string | null
    assemblage: boolean
  },
): string | undefined {
  if (etat.assemblage) return 'Pas disponible en assemblage'
  if (id === 'plan-dessus') {
    if (etat.support) return 'Esquisse déjà ouverte'
    return undefined
  }
  if (id === 'rectangle') {
    if (!etat.support) return 'Ouvrez un plan d’abord'
    if (etat.support.startsWith('face.')) return 'Rectangle sur un plan, pas une face'
    if (etat.profil !== 'vide') return 'Profil déjà posé'
    return undefined
  }
  if (id === 'cercle') {
    if (!etat.support?.startsWith('face.')) return 'Choisissez une face'
    if (etat.profil !== 'vide') return 'Profil déjà posé'
    return undefined
  }
  if (id === 'extrude') {
    if (!(etat.support && etat.profil === 'rectangle')) return 'Il faut un rectangle fermé'
    return undefined
  }
  if (id === 'enleve') {
    if (!(etat.support?.startsWith('face.') && etat.profil === 'cercle')) {
      return 'Il faut un cercle sur une face'
    }
    return undefined
  }
  if (id === 'fillet' || id === 'chanfrein') {
    if (etat.support) return 'Quittez l’esquisse'
    if (!etat.arete) return 'Choisissez une arête'
    return undefined
  }
  return 'Non disponible'
}

export function RubanVue(): ReactElement {
  const revision = useRevision()
  const [onglet, setOnglet] = useState<OngletRuban>('esquisse')
  const posee = storeShell.hote().session.esquisseCourante()
  const profil: ProfilRuban =
    (posee?.cercles.length ?? 0) > 0 ? 'cercle' : (posee?.traits?.length ?? 0) >= 8 ? 'rectangle' : 'vide'
  const etat = {
    onglet,
    piece: storeShell.hote().session.pieceCourante() !== null,
    support: posee?.support ?? null,
    profil,
    arete: storeShell.areteChoisie(),
    assemblage: storeShell.assemblage() !== null,
  }
  const boutons = boutonsRuban(etat)
  const parId = new Map<string, BoutonRuban>(boutons.map((b) => [b.id, b]))
  const groupes = onglet === 'esquisse' ? GROUPES_ESQUISSE : GROUPES_SOLIDE
  const reglage =
    onglet === 'fonctions' && !etat.assemblage
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
    <div className="border-b border-oc-line bg-[var(--oc-ribbon)]">
      <div className="flex items-end gap-1 px-2 pt-1">
        {ONGLETS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setOnglet(tab.id)}
            className={`rounded-t px-3 py-1.5 text-[11px] font-semibold tracking-wide ${
              onglet === tab.id
                ? 'bg-oc-select text-oc-accent'
                : 'text-oc-muted hover:bg-oc-panel-2 hover:text-oc-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-stretch gap-0 px-2 pb-2 pt-1">
        <div className="flex min-w-0 flex-1 flex-wrap items-stretch">
          {groupes.map((groupe, i) => (
            <div key={groupe.title} className="flex items-stretch">
              {i > 0 ? <div className="mx-1.5 w-px self-stretch bg-oc-line" /> : null}
              <div className="flex flex-col">
                <div className="flex flex-wrap gap-0.5">
                  {groupe.tools.map((outil) => {
                    const bouton = parId.get(outil.id)
                    const reason = bouton ? undefined : raisonOutil(outil.id, etat)
                    const disabled = !bouton
                    const title =
                      disabled && reason ? `${outil.label} — ${reason}` : outil.label
                    return (
                      <button
                        key={outil.id}
                        type="button"
                        title={title}
                        disabled={disabled}
                        onClick={() => {
                          if (!bouton) return
                          storeShell.executer(bouton.lignes.join('\n'))
                        }}
                        className={`flex min-w-[2.75rem] flex-col items-center gap-0.5 rounded-oc px-1.5 py-1.5 text-[9px] text-oc-text transition hover:bg-oc-panel-2 disabled:cursor-not-allowed disabled:text-oc-disabled disabled:hover:bg-transparent`}
                      >
                        {outil.icon}
                        <span className="max-w-[4.5rem] truncate">{outil.label}</span>
                      </button>
                    )
                  })}
                </div>
                <span className="mt-0.5 text-center text-[9px] uppercase tracking-wider text-oc-muted">
                  {groupe.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {reglage ? (
          <form
            className="ml-auto flex items-end gap-1.5 pb-0.5 pl-2"
            onSubmit={(event) => {
              event.preventDefault()
              const suivante = valeur.trim()
              if (!suivante || suivante === reglage.expression) return
              storeShell.ligne(ligneReglage(reglage.rang, suivante))
              if (storeShell.hote().journal.at(-1)?.erreur) setValeur(reglage.expression)
            }}
          >
            <label className="grid gap-0.5 text-[10px] text-oc-muted">
              Fonction {reglage.rang}
              <input
                aria-label="Expression"
                className="w-20 rounded-oc border border-oc-line bg-oc-panel-2 px-2 py-1 font-mono text-[12px] text-oc-text outline-none focus:border-oc-accent"
                value={valeur}
                onChange={(event) => setValeur(event.target.value)}
              />
            </label>
          </form>
        ) : null}
      </div>
    </div>
  )
}
