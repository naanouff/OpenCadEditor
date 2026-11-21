import { Circle, Minus, Ruler, Scissors, Square, Zap } from 'lucide-react'
import { Tool } from './ds'
import { useMock } from './mockState'

export function Toolbar() {
  const { scene, activeTool, setActiveTool } = useMock()

  if (scene === 'extrude') {
    return (
      <div className="flex flex-wrap gap-1.5 border-t border-oc-line bg-oc-panel px-3 py-2">
        <Tool label="Extruder" icon={<Zap className="h-3.5 w-3.5" />} active />
        <Tool label="Enlever" icon={<Scissors className="h-3.5 w-3.5" />} />
        <Tool
          label="Congé"
          icon={<Minus className="h-3.5 w-3.5" />}
          disabled
          reason="Choisissez une arête"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-1.5 border-t border-oc-line bg-oc-panel px-3 py-2">
      <Tool
        label="Ligne"
        icon={<Minus className="h-3.5 w-3.5" />}
        active={activeTool === 'ligne'}
        onClick={() => setActiveTool('ligne')}
      />
      <Tool
        label="Cercle"
        icon={<Circle className="h-3.5 w-3.5" />}
        active={activeTool === 'cercle'}
        onClick={() => setActiveTool('cercle')}
      />
      <Tool
        label="Coïncidence"
        icon={<Square className="h-3.5 w-3.5" />}
        active={activeTool === 'coincidence'}
        onClick={() => setActiveTool('coincidence')}
      />
      <Tool
        label="Cote"
        icon={<Ruler className="h-3.5 w-3.5" />}
        active={activeTool === 'cote'}
        onClick={() => setActiveTool('cote')}
      />
      <Tool
        label="Extruder"
        icon={<Zap className="h-3.5 w-3.5" />}
        disabled
        reason="Profil ouvert"
      />
      <Tool
        label="Congé"
        icon={<Minus className="h-3.5 w-3.5" />}
        disabled
        reason="Pas d’arête"
      />
    </div>
  )
}
