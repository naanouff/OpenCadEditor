import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { DockviewApi, IDockviewPanelProps } from 'dockview'
import { EditorDock, type ResolvedThemeId } from '@naanouff/w3dts-editor-ui'
import { applyOcTheme, loadOcTheme, type OcTheme } from './ds'
import { DebugVue } from './DebugVue.tsx'
import { PreferencesVue } from './PreferencesVue.tsx'
import {
  altitudeSupport,
  diametreDepuisUv,
  dimensionsRectangleDepuisUv,
  outilEsquissePointeur,
  pointSurPlan,
  rayonVersMm,
  MM_PAR_METRE,
  uvDepuisMonde,
} from './esquissePointeur.ts'
import type { Maillage } from '@opencad/api-parametrique'
import type { CalqueTopo } from './apparenceCad.ts'
import { carreauSousPointeur, nomCarreau } from './selectionCarreau.ts'
import { rayonOrthoDepuisNdc } from './selectionFace.ts'
import {
  areteBrepSousPointeur,
  classeKernelDe,
  SEUIL_SEGMENT_MM,
} from './selectionSegment.ts'
import { topologieAffichee } from './topologieAffichee.ts'
import { traitsDe, traitsVides } from './traitsArete.ts'
import { axeSousPointeur, planSousPointeur } from './selectionDatum.ts'
import { Chrome } from './Chrome.tsx'
import { BrowserPanel } from './panels/BrowserPanel.tsx'
import { InspectorPanel } from './panels/InspectorPanel.tsx'
import { TimelinePanel } from './panels/TimelinePanel.tsx'
import { RubanVue } from './RubanVue.tsx'
import { ShellStatusBar } from './ShellStatusBar.tsx'
import { storeShell } from './storeShell.ts'
import { TerminalMonaco } from './TerminalMonaco.tsx'
import { afficher, cadreCameraPick, cadrerVue, pivoterVue } from './viewportW3dts.ts'

const STORAGE_KEY = 'opencad.shell.dockview.layout.v6'
const REQUIRED = ['viewport', 'browser', 'inspector', 'timeline', 'terminal'] as const

function nomArete(maille: Maillage, id: number) {
  const arete = topologieAffichee(maille).aretes[id]
  const classe = arete ? classeKernelDe(arete, storeShell.aretesNommees()) : null
  return classe ? `${classe} (#${id})` : `arete #${id}`
}

function libelleTopo(maille: Maillage) {
  const survol = storeShell.survol()
  if (survol?.sorte === 'face') return survol.nom
  if (survol?.sorte === 'arete') return nomArete(maille, survol.id)
  if (survol?.sorte === 'plan' || survol?.sorte === 'axe') return survol.id
  const segment = storeShell.segmentChoisi()
  if (segment !== null) return nomArete(maille, segment)
  return storeShell.datumChoisi() ?? storeShell.faceChoisie()?.nom ?? ''
}

const MM = 0.001
/** Demi-largeur de capture d’une arête ou d’un axe, en pixels CSS. */
const SEUIL_TRAIT_PX = 5

function calqueAffiche(maille: Maillage): CalqueTopo {
  const survol = storeShell.survol()
  const { aretes, fil } = topologieAffichee(maille)
  const trait = (id: number | null) => {
    const arete = id === null ? undefined : aretes[id]
    return arete ? traitsDe([arete], MM) : traitsVides
  }
  return {
    survolFace: survol?.sorte === 'face' ? survol.id : null,
    selectionFace: storeShell.faceChoisie()?.id ?? null,
    fil,
    survolArete: trait(survol?.sorte === 'arete' ? survol.id : null),
    selectionArete: trait(storeShell.segmentChoisi()),
    datumSurvol: survol?.sorte === 'plan' || survol?.sorte === 'axe' ? survol.id : null,
    datumChoisi: storeShell.datumChoisi(),
  }
}

function useStoreShell() {
  const [revision, setRevision] = useState(() => storeShell.revision())
  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])
  return { hote: storeShell.hote(), revision }
}

function buildDefaultLayout(api: DockviewApi): void {
  const viewport = api.addPanel({
    id: 'viewport',
    component: 'viewport',
    title: 'Viewport',
    params: { hideClose: true },
    minimumWidth: 200,
    minimumHeight: 200,
    initialWidth: 720,
    initialHeight: 420,
  })
  api.addPanel({
    id: 'browser',
    component: 'browser',
    title: 'Browser',
    position: { referencePanel: 'viewport', direction: 'left' },
    params: { hideClose: true },
  })
  api.addPanel({
    id: 'inspector',
    component: 'inspector',
    title: 'Inspector',
    position: { referencePanel: 'viewport', direction: 'right' },
    params: { hideClose: true },
  })
  api.addPanel({
    id: 'timeline',
    component: 'timeline',
    title: 'Timeline',
    position: { referencePanel: 'viewport', direction: 'below' },
    params: { hideClose: true },
    initialHeight: 72,
  })
  api.addPanel({
    id: 'terminal',
    component: 'terminal',
    title: 'Terminal',
    position: { referencePanel: 'timeline', direction: 'below' },
    params: { hideClose: true },
    initialHeight: 140,
  })
  viewport.api.setActive()
}

function ViewportVue(_props: IDockviewPanelProps) {
  const { hote, revision } = useStoreShell()
  const ref = useRef<HTMLCanvasElement>(null)
  const pointe = useRef<{ x: number; y: number } | null>(null)
  useEffect(() => {
    const canevas = ref.current
    if (!canevas) return
    const vue = storeShell.esquisseVue()
    const posee = vue === null ? hote.session.esquisseCourante() : hote.session.esquisseDepuis(vue)
    const maille = storeShell.utiliseMoteur()
      ? (storeShell.maillageAffiche() ?? { positions: [], normales: [], indices: [] })
      : hote.session.maillage()
    // Volume moteur (OCCT) : fil via aretesBrep — pas besoin du motif decrire.
    const frontiere =
      !posee && maille.indices.length > 0 ? { faces: [] } : hote.session.frontiere()
    void afficher(canevas, frontiere, posee, maille, calqueAffiche(maille)).catch(
      (erreur: unknown) => {
        console.error(erreur instanceof Error ? (erreur.stack ?? erreur.message) : String(erreur))
      },
    )
  }, [hote, revision])
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if (e.key !== 'f' && e.key !== 'F') return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const cible = e.target as HTMLElement | null
      if (cible && (cible.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(cible.tagName))) return
      cadrerVue()
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [])

  const mailleAffichee = () =>
    storeShell.utiliseMoteur()
      ? (storeShell.maillageAffiche() ?? { positions: [], normales: [], indices: [] })
      : hote.session.maillage()

  const rayonSousPointeur = (e: ReactPointerEvent) => {
    const canevas = ref.current
    const cadre = cadreCameraPick()
    if (!canevas || !cadre) return null
    const rect = canevas.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) return null
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ndcY = 1 - ((e.clientY - rect.top) / rect.height) * 2
    return rayonOrthoDepuisNdc(
      ndcX,
      ndcY,
      cadre.eye,
      cadre.target,
      cadre.up,
      cadre.demiHauteur,
      rect.width / rect.height,
    )
  }

  /** Seuil de pick d’un trait : quelques pixels à l’écran, jamais moins que la tolérance en mm. */
  const seuilTrait = () => {
    const canevas = ref.current
    const cadre = cadreCameraPick()
    if (!canevas || !cadre || canevas.clientHeight < 1) return SEUIL_SEGMENT_MM
    const mmParPixel = (2 * cadre.demiHauteur * 1000) / canevas.clientHeight
    return Math.max(SEUIL_SEGMENT_MM, SEUIL_TRAIT_PX * mmParPixel)
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    // Bouton enfoncé : la caméra tourne, pas de survol.
    if (e.buttons !== 0) return
    if (hote.session.esquisseCourante()) {
      storeShell.definirSurvol(null)
      return
    }
    const rayonM = rayonSousPointeur(e)
    if (!rayonM) return
    const maille = mailleAffichee()
    const topo = topologieAffichee(maille)
    const rayon = rayonVersMm(rayonM)
    const seuil = seuilTrait()
    const arete = areteBrepSousPointeur(topo.aretes, rayon, seuil)
    if (arete) {
      storeShell.definirSurvol({ sorte: 'arete', id: arete.id })
      return
    }
    const hit = carreauSousPointeur(maille, rayon)
    if (hit) {
      storeShell.definirSurvol({ sorte: 'face', id: hit.faceId, nom: nomCarreau(hit.faceId, topo.noms) })
      return
    }
    const axe = axeSousPointeur(rayon, seuil)
    if (axe) {
      storeShell.definirSurvol({ sorte: 'axe', id: axe })
      return
    }
    const plan = planSousPointeur(rayon)
    storeShell.definirSurvol(plan ? { sorte: 'plan', id: plan } : null)
  }

  const onPointerLeave = () => {
    storeShell.definirSurvol(null)
  }

  /** La vue tourne autour du point de pièce saisi ; dans le vide, autour de son centre. */
  const poserPivot = (e: ReactPointerEvent) => {
    const rayonM = rayonSousPointeur(e)
    const hit = rayonM && !hote.session.esquisseCourante() ? carreauSousPointeur(mailleAffichee(), rayonVersMm(rayonM)) : null
    if (!rayonM || !hit) {
      pivoterVue(null)
      return
    }
    const t = hit.t / MM_PAR_METRE
    const { origine, direction } = rayonM
    pivoterVue([origine[0] + direction[0] * t, origine[1] + direction[1] * t, origine[2] + direction[2] * t])
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.button === 2) poserPivot(e)
    if (e.button !== 0) return
    pointe.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: ReactPointerEvent) => {
    const debut = pointe.current
    pointe.current = null
    if (e.button !== 0 || !debut) return
    if (Math.hypot(e.clientX - debut.x, e.clientY - debut.y) > 4) return
    // Assemblage : on consulte, aucune pièce n’est en édition pour recevoir une esquisse.
    const consultation = storeShell.assemblage() !== null
    const rayonM = rayonSousPointeur(e)
    if (!rayonM) return
    const maille = mailleAffichee()
    try {
      let yMax = 0
      for (let i = 1; i < maille.positions.length; i += 3) {
        yMax = Math.max(yMax, maille.positions[i]!)
      }
      let esquisse = hote.session.esquisseCourante()
      if (!esquisse) {
        const rayon = rayonVersMm(rayonM)
        const topo = topologieAffichee(maille)
        const seuil = seuilTrait()
        const arete = areteBrepSousPointeur(topo.aretes, rayon, seuil)
        if (arete) {
          storeShell.choisirAreteBrep(arete.id, classeKernelDe(arete, storeShell.aretesNommees()))
          return
        }
        const hit = carreauSousPointeur(maille, rayon)
        if (!hit) {
          const axe = axeSousPointeur(rayon, seuil)
          const plan = axe ?? planSousPointeur(rayon)
          if (plan) {
            const deja = storeShell.datumChoisi()
            storeShell.choisirDatum(plan)
            if (deja === plan && plan.startsWith('plan.') && !consultation) {
              if (!storeShell.ouvrirEsquisseSurSupport(plan)) return
              esquisse = hote.session.esquisseCourante()
              if (!esquisse) return
            } else return
          } else {
            // Le vide retire la sélection. On n’ouvre une esquisse que si rien n’était choisi.
            if (storeShell.deselectionner() || consultation) return
            if (!storeShell.ouvrirEsquisseSurSupport('plan.dessus')) return
            esquisse = hote.session.esquisseCourante()
            if (!esquisse) return
          }
        } else if (hit) {
          const nom = nomCarreau(hit.faceId, topo.noms)
          const deja = storeShell.faceChoisie()
          storeShell.choisirFace(hit.faceId, nom)
          // Premier clic : sélection visible. Second clic sur dessus/dessous : esquisse.
          const second =
            deja?.id === hit.faceId && (nom === 'face.dessus' || nom === 'face.dessous')
          if (!second || consultation) return
          if (!storeShell.ouvrirEsquisseSurSupport(nom)) return
          esquisse = hote.session.esquisseCourante()
          if (!esquisse) return
        }
      }
      const altitude =
        esquisse.cercles[0]?.y ?? esquisse.yPlan ?? altitudeSupport(esquisse.support, yMax)
      const hit = pointSurPlan(rayonVersMm(rayonM), esquisse.support, altitude)
      if (!hit) return
      const { u, v } = uvDepuisMonde(hit, esquisse.support, altitude)
      if (outilEsquissePointeur(esquisse) === 'rectangle') {
        const { longueur, largeur } = dimensionsRectangleDepuisUv(u, v)
        storeShell.poserRectangle(longueur, largeur)
      } else {
        storeShell.poserCercleDiametre(diametreDepuisUv(u, v))
      }
    } catch (erreur) {
      console.error(erreur instanceof Error ? erreur.message : String(erreur))
    }
  }

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={ref}
        className="block h-full w-full"
        style={{ background: 'var(--color-viewport-clear, #a8abad)' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      />
      {storeShell.construction() ? (
        <p className="pointer-events-none absolute left-3 top-3 m-0 font-ui text-[13px] text-[var(--color-text-primary)]">
          Construction…
        </p>
      ) : (
        <p className="pointer-events-none absolute left-3 top-3 m-0 font-ui text-[13px] text-[var(--color-text-primary)]">
          {libelleTopo(mailleAffichee())}
        </p>
      )}
    </div>
  )
}

function TerminalVue(_props: IDockviewPanelProps) {
  return <TerminalMonaco />
}

function DebugPanel(_props: IDockviewPanelProps) {
  return <DebugVue />
}

function PreferencesPanel(_props: IDockviewPanelProps) {
  return <PreferencesVue />
}

export function App() {
  const [theme, setTheme] = useState<OcTheme>(() => loadOcTheme())
  const resolvedTheme: ResolvedThemeId = theme

  useEffect(() => {
    applyOcTheme(theme)
  }, [theme])

  const components = useMemo(
    () => ({
      viewport: ViewportVue,
      browser: BrowserPanel,
      inspector: InspectorPanel,
      timeline: TimelinePanel,
      terminal: TerminalVue,
      debug: DebugPanel,
      preferences: PreferencesPanel,
    }),
    [],
  )

  return (
    <div className="shell-root">
      <Chrome theme={theme} onThemeChange={setTheme} />
      <RubanVue />
      <div className="shell-dock">
        <EditorDock
          resolvedTheme={resolvedTheme}
          components={components}
          storageKey={STORAGE_KEY}
          requiredPanelIds={REQUIRED}
          buildDefaultLayout={buildDefaultLayout}
        />
      </div>
      <ShellStatusBar />
    </div>
  )
}
