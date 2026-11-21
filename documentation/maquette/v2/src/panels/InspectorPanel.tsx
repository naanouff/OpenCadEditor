import type { IDockviewPanelProps } from 'dockview'
import { Aperture, ImagePlus, Pencil, Wrench } from 'lucide-react'
import { Badge, Button, Field } from '../ds'
import {
  CTRL_MBD,
  CTRL_VARS,
  ctrlRatio,
  findCam,
  mbdById,
  useMock,
  type CtrlVar,
} from '../mockState'

function DimH({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g fill="var(--oc-text)" stroke="var(--oc-text)" strokeWidth="1.1">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <polygon points={`${x1},${y} ${x1 + 6},${y - 3.2} ${x1 + 6},${y + 3.2}`} stroke="none" />
      <polygon points={`${x2},${y} ${x2 - 6},${y - 3.2} ${x2 - 6},${y + 3.2}`} stroke="none" />
      <text x={(x1 + x2) / 2} y={y - 5} textAnchor="middle" fontSize="12" stroke="none">
        {label}
      </text>
    </g>
  )
}

function DimV({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  return (
    <g fill="var(--oc-text)" stroke="var(--oc-text)" strokeWidth="1.1">
      <line x1={x} y1={y1} x2={x} y2={y2} />
      <polygon points={`${x},${y1} ${x - 3.2},${y1 + 6} ${x + 3.2},${y1 + 6}`} stroke="none" />
      <polygon points={`${x},${y2} ${x - 3.2},${y2 - 6} ${x + 3.2},${y2 - 6}`} stroke="none" />
      <text x={x + 8} y={(y1 + y2) / 2 + 4} fontSize="12" stroke="none">
        {label}
      </text>
    </g>
  )
}

function ToolProfile({ tool }: { tool: string }) {
  return (
    <svg viewBox="0 0 176 228" className="h-52 w-full" role="img" aria-label={`Profil ${tool}`}>
      <defs>
        <linearGradient id="oc-tool-shank" x1="0" x2="1">
          <stop offset="0" stopColor="#8b95a7" />
          <stop offset="0.42" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="oc-tool-cut" x1="0" x2="1">
          <stop offset="0" stopColor="#047857" />
          <stop offset="0.38" stopColor="#a7f3d0" />
          <stop offset="0.62" stopColor="#34d399" />
          <stop offset="1" stopColor="#065f46" />
        </linearGradient>
      </defs>
      <DimH x1={64} x2={86} y={14} label="C" />
      <line x1="64" y1="14" x2="64" y2="28" stroke="var(--oc-text)" strokeWidth="0.7" />
      <line x1="86" y1="14" x2="86" y2="28" stroke="var(--oc-text)" strokeWidth="0.7" />
      <path
        d="M64 40 Q64 24 75 24 Q86 24 86 40 V92 H64 Z"
        fill="url(#oc-tool-shank)"
        stroke="#334155"
        strokeWidth="0.7"
      />
      <path
        d="M64 90 H36 V100 C36 110 46 118 58 120 C66 121 68 116 68 110 V124 H40 V136 H68 V152 H60 V158 H90 V152 H82 V136 H110 V124 H82 V110 C82 116 84 121 92 120 C104 118 114 110 114 100 V90 H86 Z"
        fill="url(#oc-tool-cut)"
        stroke="#064e3b"
        strokeWidth="0.7"
      />
      <path d="M40 129 H110" stroke="#ecfdf5" strokeWidth="1.4" opacity="0.75" />
      <rect x="58" y="158" width="34" height="16" rx="3" fill="url(#oc-tool-shank)" stroke="#334155" strokeWidth="0.6" />
      <rect x="68" y="172" width="14" height="8" rx="1.5" fill="#475569" />
      <DimV x={128} y1={90} y2={158} label="B" />
      <line x1="114" y1="90" x2="128" y2="90" stroke="var(--oc-text)" strokeWidth="0.7" />
      <line x1="114" y1="158" x2="128" y2="158" stroke="var(--oc-text)" strokeWidth="0.7" />
      <DimH x1={36} x2={114} y={204} label="A" />
      <line x1="36" y1="136" x2="36" y2="204" stroke="var(--oc-text)" strokeWidth="0.7" />
      <line x1="114" y1="136" x2="114" y2="204" stroke="var(--oc-text)" strokeWidth="0.7" />
      <text x="75" y="222" textAnchor="middle" fill="var(--oc-muted)" fontSize="9">
        {tool}
      </text>
    </svg>
  )
}

function PosageSketch({ posage }: { posage: string }) {
  const vacuum = posage === 'ventouse'
  return (
    <svg viewBox="0 0 200 170" className="h-52 w-full" role="img" aria-label={`Capture posage ${posage}`}>
      <defs>
        <linearGradient id="oc-posage-metal" x1="0" x2="1">
          <stop offset="0" stopColor="#94a3b8" />
          <stop offset="0.45" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
      </defs>
      <text x="8" y="12" fill="var(--oc-muted)" fontSize="9">
        Capture
      </text>
      <ellipse cx="108" cy="152" rx="54" ry="7" fill="#000" opacity="0.28" />
      <path d="M140 78 L176 64 L176 112 L140 126 Z" fill="#dbe3ec" stroke="#64748b" strokeWidth="0.7" />
      <path d="M140 78 L140 126 L128 120 L128 72 Z" fill="#aeb8c4" stroke="#64748b" strokeWidth="0.7" />
      <path d="M128 72 L140 78 L176 64 L164 58 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="0.7" />
      <path d="M48 64 L112 40 L168 68 L104 92 Z" fill="#eef2f6" stroke="#64748b" strokeWidth="0.7" />
      <path d="M48 64 L104 92 L104 136 L48 108 Z" fill="#c5ced8" stroke="#64748b" strokeWidth="0.7" />
      <path d="M104 92 L168 68 L168 112 L104 136 Z" fill="#96a2b0" stroke="#64748b" strokeWidth="0.7" />
      <ellipse cx="74" cy="108" rx="11" ry="11" fill="#1c2128" />
      <ellipse cx="74" cy="108" rx="5.5" ry="5.5" fill="#e8eef4" />
      <path d="M22 114 L68 104 L68 114 L22 124 Z" fill="url(#oc-posage-metal)" stroke="#334155" strokeWidth="0.6" />
      <ellipse cx="22" cy="119" rx="7" ry="5.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.6" />
      {vacuum ? (
        <>
          <ellipse cx="108" cy="62" rx="34" ry="14" fill="#334155" />
          <ellipse cx="108" cy="58" rx="28" ry="11" fill="var(--oc-select)" stroke="var(--oc-accent)" strokeWidth="1.6" />
        </>
      ) : (
        <>
          <ellipse cx="108" cy="64" rx="36" ry="15" fill="#0b0d10" />
          <ellipse cx="108" cy="60" rx="36" ry="15" fill="#171b21" />
          <ellipse cx="108" cy="60" rx="18" ry="7.5" fill="var(--oc-select)" stroke="var(--oc-accent)" strokeWidth="1.6" />
          <path d="M101 56 L101 34 L115 34 L115 56" fill="url(#oc-posage-metal)" stroke="#334155" strokeWidth="0.5" />
          <ellipse cx="108" cy="34" rx="7" ry="3.2" fill="#f8fafc" stroke="#64748b" strokeWidth="0.5" />
        </>
      )}
      <g fill="#334155">
        <circle cx="66" cy="60" r="1.5" />
        <circle cx="124" cy="44" r="1.5" />
        <circle cx="150" cy="62" r="1.5" />
        <circle cx="92" cy="80" r="1.5" />
        <circle cx="156" cy="86" r="1.3" />
        <circle cx="156" cy="102" r="1.3" />
      </g>
      <text x="100" y="166" textAnchor="middle" fill="var(--oc-text)" fontSize="10">
        {posage}
      </text>
    </svg>
  )
}

function MbdCard({ feature, sentence }: { feature: CtrlVar; sentence: string }) {
  return (
    <div className="mb-3 rounded-oc border border-oc-accent/40 bg-oc-select/40 p-2 text-[11px]">
      <p className="m-0 font-semibold text-oc-accent">Définition MBD · {CTRL_MBD}</p>
      <p className="m-0 mt-1 text-oc-text">
        {feature.id} · {feature.nominal} {feature.tolerance}
      </p>
      <p className="m-0 text-oc-muted">
        {feature.matiere} · {feature.cadomat} · {feature.surface} · réf. {feature.datum}
      </p>
      <p className="m-0 mt-1 text-oc-text">{sentence}</p>
    </div>
  )
}

function CamInspector() {
  const { camNode, activeTool, simT } = useMock()
  const hit = findCam(camNode)
  const setup = hit.setup
  const operation = hit.operation
  const title = operation?.label ?? setup?.label ?? hit.part.label
  const subtitle = setup
    ? `${hit.part.label} · ${setup.machine} · ${setup.posage}`
    : hit.part.definition
  return (
    <aside className="flex h-full flex-col overflow-auto bg-oc-panel text-oc-text">
      <div className="border-b border-oc-line px-3 py-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-oc bg-oc-select text-oc-accent">
            <Wrench className="h-3.5 w-3.5" />
          </span>
          <div>
            <h2 className="m-0 text-[14px] font-semibold">{title}</h2>
            <p className="m-0 mt-0.5 text-[11px] text-oc-muted">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 px-3 py-3">
        {operation?.mbd ? (
          <MbdCard feature={mbdById(operation.mbd)} sentence={operation.mbdUse ?? mbdById(operation.mbd).camUse} />
        ) : operation ? (
          <p className="m-0 mb-3 text-[11px] text-oc-muted">
            Cette opération n’est pas encore reliée à une cote de {CTRL_MBD}.
          </p>
        ) : null}
        {setup && operation ? (
          <div className="mb-3 grid grid-cols-[1.4fr_1fr] gap-2">
            <div className="rounded-oc border border-oc-line bg-oc-panel-2 px-1">
              <ToolProfile tool={operation.tool} />
            </div>
            <div className="rounded-oc border border-oc-line bg-oc-panel-2 px-1">
              <PosageSketch posage={setup.posage} />
            </div>
          </div>
        ) : null}
        {setup ? (
          <>
            <Field label="Machine" inputProps={{ value: setup.machine, readOnly: true }} />
            <Field label="Brut" inputProps={{ value: setup.brut, readOnly: true }} />
            <Field label="Final" inputProps={{ value: setup.final, readOnly: true }} />
            <Field label="Posage" inputProps={{ value: setup.posage, readOnly: true }} />
          </>
        ) : null}
        {operation ? (
          <>
            <Field label="Parcours" inputProps={{ value: operation.parcours, readOnly: true }} />
            <Field label="Outil" inputProps={{ value: operation.tool, readOnly: true }} />
            <Field label="Avance" inputProps={{ value: operation.feed, readOnly: true }} />
            <Field label="Passe" inputProps={{ value: operation.pass, readOnly: true }} />
          </>
        ) : null}
        {activeTool === 'simuler' ? (
          <>
            <Field label="applyUntil" inputProps={{ value: `${Math.round(simT * 100)} %`, readOnly: true }} />
            <Field
              label="Stock restant"
              inputProps={{ value: `${Math.round((1 - simT) * 100)} %`, readOnly: true }}
            />
          </>
        ) : null}
        <div className="rounded-oc border border-dashed border-oc-accent/40 bg-oc-select/40 p-2 text-[11px] text-oc-accent">
          {activeTool === 'simuler'
            ? 'Enlèvement schématique · applyUntil(t) · pas le moteur voxels'
            : 'Simulation hors journal'}
        </div>
      </div>
    </aside>
  )
}

function ToleranceGauge({ variable }: { variable: CtrlVar }) {
  const ratio = ctrlRatio(variable)
  const clamp = Math.max(-1.5, Math.min(1.5, ratio))
  const at = (value: number) => 18 + ((value + 1.5) / 3) * 244
  const marker = at(clamp)
  const pct = Math.round(ratio * 100)
  const sign = pct > 0 ? '+' : ''
  return (
    <div className="mb-3 rounded-oc border border-oc-line bg-oc-panel-2 px-2 py-2">
      <div className="mb-1 flex items-baseline justify-between gap-2 text-[11px]">
        <span className="text-oc-muted">Jauge MBD</span>
        <span className={variable.inTolerance ? 'text-oc-add' : 'text-oc-proposal'}>
          {sign}
          {pct} % · {variable.inTolerance ? 'dans la bande' : 'hors bande'}
        </span>
      </div>
      <svg viewBox="0 0 280 58" className="h-14 w-full" role="img" aria-label={`Jauge ${variable.id}`}>
        <defs>
          <linearGradient id="oc-ctrl-gauge" x1="0" x2="1">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="0.17" stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#34d399" />
            <stop offset="0.83" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect x="18" y="16" width="244" height="10" rx="5" fill="url(#oc-ctrl-gauge)" />
        <line x1={at(-1)} y1="12" x2={at(-1)} y2="30" stroke="var(--oc-text)" strokeWidth="1" />
        <line x1={at(0)} y1="10" x2={at(0)} y2="32" stroke="var(--oc-text)" strokeWidth="1.5" />
        <line x1={at(1)} y1="12" x2={at(1)} y2="30" stroke="var(--oc-text)" strokeWidth="1" />
        <polygon points={`${marker},8 ${marker - 5},1 ${marker + 5},1`} fill="var(--oc-text)" />
        <text x={at(-1)} y="46" textAnchor="middle" fill="var(--oc-muted)" fontSize="9">
          mini
        </text>
        <text x={at(0)} y="46" textAnchor="middle" fill="var(--oc-text)" fontSize="9">
          nominal
        </text>
        <text x={at(1)} y="46" textAnchor="middle" fill="var(--oc-muted)" fontSize="9">
          maxi
        </text>
      </svg>
    </div>
  )
}

function CtrlInspector() {
  const { ctrlVar, rattrapageLabel, applyRattrapage, locked } = useMock()
  const variable = CTRL_VARS.find((item) => item.id === ctrlVar) ?? CTRL_VARS[0]
  return (
    <aside className="flex h-full flex-col overflow-auto bg-oc-panel text-oc-text">
      <div className="border-b border-oc-line px-3 py-3">
        <h2 className="m-0 text-[14px] font-semibold">{variable.id}</h2>
        <p className="m-0 mt-0.5 text-[11px] text-oc-muted">MBD · {CTRL_MBD}</p>
      </div>
      <div className="flex-1 px-3 py-3">
        <MbdCard
          feature={variable}
          sentence="Le relevé est comparé à cette bande. Le rattrapage n’est proposé que hors tolérance."
        />
        <ToleranceGauge variable={variable} />
        <Field label="Nominal" inputProps={{ value: variable.nominal, readOnly: true }} />
        <Field label="Tolérance MBD" inputProps={{ value: variable.tolerance, readOnly: true }} />
        <Field label="Référence" inputProps={{ value: variable.datum, readOnly: true }} />
        <Field label="État de surface" inputProps={{ value: variable.surface, readOnly: true }} />
        <Field label="Mini" inputProps={{ value: variable.mini, readOnly: true }} />
        <Field label="Maxi" inputProps={{ value: variable.maxi, readOnly: true }} />
        <Field label="Mesuré" inputProps={{ value: variable.measured, readOnly: true }} />
        <Field label="Écart" inputProps={{ value: variable.ecart, readOnly: true }} />
        <Field
          label="État"
          inputProps={{ value: variable.inTolerance ? 'Dans la tolérance' : 'Hors tolérance', readOnly: true }}
        />
        <Field
          label="Rattrapage"
          hint={variable.inTolerance ? 'Dans la bande MBD : pas de correction.' : 'Hors bande : correction vers le nominal.'}
          inputProps={{ value: variable.offset, readOnly: true }}
        />
        <p className="m-0 text-[11px] text-oc-muted">
          {rattrapageLabel ? `Libellé · ${rattrapageLabel}` : 'Appliquer met à jour le libellé seulement.'}
        </p>
      </div>
      <div className="border-t border-oc-line p-3">
        <Button
          variant="accent"
          className="w-full justify-center"
          disabled={locked}
          onClick={applyRattrapage}
        >
          Appliquer
        </Button>
      </div>
    </aside>
  )
}

function RenderInspector() {
  const { ctrlVar, renderReady, generateRender } = useMock()
  const feature = mbdById(ctrlVar)
  return (
    <aside className="flex h-full flex-col overflow-auto bg-oc-panel text-oc-text">
      <div className="border-b border-oc-line px-3 py-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-oc bg-oc-select text-oc-accent">
            <Aperture className="h-3.5 w-3.5" />
          </span>
          <div>
            <h2 className="m-0 text-[14px] font-semibold">Studio</h2>
            <p className="m-0 mt-0.5 text-[11px] text-oc-muted">
              {feature.matiere} · {feature.surface}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 px-3 py-3">
        <MbdCard
          feature={feature}
          sentence={`Le PBR « ${feature.matiere} » reprend la rugosité ${feature.roughness} de ${feature.cadomat}.`}
        />
        <Field label="Matière" inputProps={{ value: feature.matiere, readOnly: true }} />
        <Field label="État de surface" inputProps={{ value: feature.surface, readOnly: true }} />
        <Field label="Rugosité PBR" inputProps={{ value: feature.roughness, readOnly: true }} />
        <Field label="HDRI" inputProps={{ value: 'studio-navy', readOnly: true }} />
        <Field label="Résolution" inputProps={{ value: '1920×1080', readOnly: true }} />
        {renderReady ? <Badge tone="accent">Rendu 1 · 2 s</Badge> : null}
      </div>
      <div className="border-t border-oc-line p-3">
        <Button variant="accent" className="w-full justify-center" onClick={generateRender}>
          Générer
        </Button>
      </div>
    </aside>
  )
}

export function InspectorPanel(_props: IDockviewPanelProps) {
  const { scene, workspace, ctrlVar, finishSketch, cancelSketch } = useMock()
  if (workspace === 'cam') return <CamInspector />
  if (workspace === 'ctrl') return <CtrlInspector />
  if (workspace === 'render') return <RenderInspector />

  if (scene === 'sketch') {
    return (
      <aside className="flex h-full flex-col bg-oc-panel text-oc-text">
        <div className="border-b border-oc-line px-3 py-3">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-oc bg-oc-select text-oc-accent">
              <Pencil className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <h2 className="m-0 text-[14px] font-semibold">Sketch 1</h2>
              <p className="m-0 mt-0.5 text-[11px] text-oc-muted">
                On the XY plane · 1 shape
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-3 py-3">
          <MbdCard
            feature={mbdById(ctrlVar)}
            sentence="Cote, tolérance, référence, état de surface et apparence sont dans la pièce. CAM, CTRL et Render lisent cette définition."
          />
          <Field
            label="Plane offset"
            inputProps={{ defaultValue: '0 mm', readOnly: true }}
          />
          <button
            type="button"
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-oc border border-dashed border-oc-line bg-oc-panel-2 px-2 py-2 text-[12px] text-oc-muted hover:border-oc-accent hover:text-oc-text"
          >
            <ImagePlus className="h-3.5 w-3.5" />
            Add picture to trace
          </button>

          <details className="rounded-oc border border-oc-line bg-oc-panel-2 open:pb-2">
            <summary className="cursor-pointer px-2 py-2 text-[12px] font-medium text-oc-text">
              Sketching tips
            </summary>
            <ul className="m-0 list-disc space-y-1 px-5 pb-1 text-[11px] text-oc-muted">
              <li>Tapez une cote pendant le dessin (W / H).</li>
              <li>Les outils grisés diront pourquoi (maquette).</li>
              <li>Finish sketch écrit l’intention — pas encore de Session ici.</li>
            </ul>
          </details>
        </div>

        <div className="flex gap-2 border-t border-oc-line p-3">
          <Button className="flex-1 justify-center" onClick={cancelSketch}>
            Cancel
          </Button>
          <Button variant="sketch" className="flex-1 justify-center" onClick={finishSketch}>
            Finish sketch
          </Button>
        </div>
      </aside>
    )
  }

  return (
    <aside className="flex h-full flex-col overflow-auto bg-oc-panel text-oc-text">
      <div className="border-b border-oc-line px-3 py-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="m-0 text-[14px] font-semibold">Plateau</h2>
            <p className="m-0 mt-0.5 text-[11px] text-oc-muted">Extrusion en cours</p>
          </div>
          <select
            className="rounded-oc border border-oc-line bg-oc-panel-2 px-1.5 py-1 text-[11px] text-oc-text"
            defaultValue="mm"
            aria-label="Unité"
          >
            <option value="mm">Millimètres</option>
          </select>
        </div>
      </div>

      <section className="border-b border-oc-line px-3 py-3">
        <MbdCard
          feature={mbdById(ctrlVar)}
          sentence="Cote, tolérance, référence, état de surface et apparence sont dans la pièce. CAM, CTRL et Render lisent cette définition."
        />
        <h3 className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-wider text-oc-muted">
          Modèle
        </h3>
        <dl className="m-0 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 text-[12px]">
          <dt className="text-oc-muted">Fonctions</dt>
          <dd className="m-0 text-right">2</dd>
          <dt className="text-oc-muted">Corps</dt>
          <dd className="m-0 text-right">1</dd>
          <dt className="text-oc-muted">Volume</dt>
          <dd className="m-0 text-right font-mono text-[11px]">≈ 4 800 mm³</dd>
        </dl>
      </section>

      <section className="border-b border-oc-line px-3 py-3">
        <h3 className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-wider text-oc-muted">
          Extrusion
        </h3>
        <Field
          label="Distance"
          hint="Entrée écrirait extrude hauteur"
          inputProps={{ defaultValue: 'hauteur', readOnly: true }}
        />
        <div className="rounded-oc border border-dashed border-oc-preview/50 bg-oc-select/50 p-2">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] text-oc-preview">
            Aperçu
            <Badge tone="proposal">hors journal</Badge>
          </div>
        </div>
      </section>

      <section className="px-3 py-3">
        <h3 className="m-0 mb-2 text-[11px] font-semibold uppercase tracking-wider text-oc-muted">
          Prochaines étapes
        </h3>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-oc border border-oc-accent bg-oc-select px-2 py-1.5 text-left text-[12px] text-oc-accent"
        >
          Valider l’extrusion
        </button>
      </section>
    </aside>
  )
}
