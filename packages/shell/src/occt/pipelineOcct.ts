import {
  Session,
  evaluateurProvisoire,
  rejouables,
  union,
  type EntiteEsquisse,
  type Esquisse,
  type Maillage,
  type MaillageOmbre,
  type Operation,
} from '@opencad/api-parametrique'
import { runBatch, type KernelBatchOp, type OcctKernelModule } from './chargerKernel.ts'
import { polylinesDepuisEsquisse } from './esquissePolylines.ts'
import { accrocherSolide, opsCouper, opsExtrude, opsRevolution } from './opsDepuisFonction.ts'
import { maillageDepuisTessellate } from './maillageDepuisTessellate.ts'

type EtatEsquisse = { support: string; entites: EntiteEsquisse[] }

function appliquerCote(entite: EntiteEsquisse, cible: string, expression: string) {
  if (cible === 'diametre') entite.diametre = expression
  if (cible === 'ecart') entite.ecart = expression
  if (cible === 'debord') entite.debord = expression
  if (cible === 'largeur') entite.largeur = expression
  if (cible === 'rayon') entite.rayon = expression
  if (cible === 'hauteur') entite.hauteur = expression
  if (cible === 'longueur') entite.longueur = expression
}

function tesselle(occt: OcctKernelModule, ops: KernelBatchOp[], solidAs: string): Maillage {
  const out = runBatch(occt, [
    { op: 'arena_clear' },
    ...ops,
    { op: 'tessellate', args: [{ handle: solidAs }, 'normal'], as: 'mesh' },
  ])
  if (!out.ok) throw new Error(out.error ?? 'pipeline occt failed')
  const mesh = out.aliases?.mesh as { ok?: boolean; error?: string; meshes?: unknown[] }
  if (mesh && mesh.ok === false) throw new Error(mesh.error ?? 'tessellate failed')
  return maillageDepuisTessellate(mesh)
}

function filetHote(parametres: Map<string, string>, profilScript: string): MaillageOmbre {
  const session = new Session()
  const lignes = ['piece filet']
  for (const [nom, expression] of parametres) {
    lignes.push(`param ${nom} ${expression}`)
  }
  lignes.push(profilScript, 'revolution', 'pas')
  session.executer(lignes.join('\n'))
  const maille = session.maillage()
  if (!maille.normales) throw new Error('filet sans normales')
  return {
    positions: maille.positions,
    normales: maille.normales,
    indices: maille.indices,
    faces: maille.faces,
  }
}

function scriptProfil(entites: EntiteEsquisse[]): string {
  const lignes = ['esquisse plan.12h']
  for (const e of entites) {
    if (e.sorte !== 'segment' || e.rayon === undefined || e.hauteur === undefined) continue
    lignes.push('segment', `cote rayon ${e.rayon}`, `cote hauteur ${e.hauteur}`)
  }
  return lignes.join('\n')
}

type Compilation = {
  ops: KernelBatchOp[]
  solidAs: string
  pas: boolean
  parametres: Map<string, string>
  entitesPas: EntiteEsquisse[] | null
}

function compiler(historique: Operation[], pointe: number | null = null): Compilation {
  const parametres = new Map<string, string>()
  let esquisse: EtatEsquisse | null = null
  let solidAs: string | null = null
  const ops: KernelBatchOp[] = []
  let uid = 0
  let yMax = 0
  const opsRejouees = rejouables(historique, pointe)
  const pas = opsRejouees.some((op) => op.type === 'pas')
  let entitesPas: EntiteEsquisse[] | null = null
  let revolutions = 0

  const evaluer = (expression: string) => evaluateurProvisoire.evaluer(expression, parametres)

  for (const operation of opsRejouees) {
    if (operation.type === 'param') {
      parametres.set(operation.arguments.nom, operation.arguments.expression)
      continue
    }
    if (operation.type === 'ouvrir') {
      esquisse = { support: operation.arguments.support, entites: [] }
      continue
    }
    if (operation.type === 'cercle' || operation.type === 'rectangle' || operation.type === 'segment' || operation.type === 'arc') {
      if (!esquisse) throw new Error('entité hors esquisse')
      esquisse.entites.push({ id: `${operation.type}.${uid++}`, sorte: operation.type, degres: 0 })
      continue
    }
    if (operation.type === 'cote') {
      const entite = esquisse?.entites.at(-1)
      if (!entite) throw new Error('cote sans entité')
      appliquerCote(entite, operation.arguments.cible, operation.arguments.expression)
      continue
    }
    if (operation.type === 'concentrique' || operation.type === 'symetrie' || operation.type === 'pas') continue

    if (!esquisse) throw new Error(`fonction ${operation.type} sans esquisse`)
    const sketch: Esquisse = { support: esquisse.support, entites: esquisse.entites }

    if (operation.type === 'revolution') {
      const polys = polylinesDepuisEsquisse(sketch, parametres)
      const feat = opsRevolution(polys[0]!, String(uid++))
      revolutions += 1
      for (const e of esquisse.entites) {
        if (e.hauteur) yMax = Math.max(yMax, evaluer(e.hauteur))
      }
      if (revolutions === 1) {
        entitesPas = esquisse.entites.map((e) => ({ ...e }))
        if (!pas) {
          ops.push(...feat.ops)
          const acc = accrocherSolide(solidAs, feat.as, String(uid++))
          ops.push(...acc.ops)
          solidAs = acc.solidAs
        }
      } else {
        ops.push(...feat.ops)
        const acc = accrocherSolide(solidAs, feat.as, String(uid++))
        ops.push(...acc.ops)
        solidAs = acc.solidAs
      }
      esquisse = null
      continue
    }

    if (operation.type === 'extrude') {
      const profondeur = evaluer(operation.arguments.expression)
      const polys = polylinesDepuisEsquisse(sketch, parametres, { yPlan: 0 })
      const dir =
        sketch.support === 'plan.3h'
          ? ([profondeur, 0, 0] as const)
          : ([0, profondeur, 0] as const)
      for (const poly of polys) {
        const feat = opsExtrude(poly, dir, String(uid++))
        ops.push(...feat.ops)
        const acc = accrocherSolide(solidAs, feat.as, String(uid++))
        ops.push(...acc.ops)
        solidAs = acc.solidAs
      }
      yMax = Math.max(yMax, profondeur)
      esquisse = null
      continue
    }

    if (operation.type === 'enlever') {
      if (!solidAs) throw new Error('enlever sans solide')
      const profondeur = evaluer(operation.arguments.expression)
      const yCut = yMax - profondeur
      const polys = polylinesDepuisEsquisse(sketch, parametres, { yPlan: yCut })
      const dy = profondeur + 0.4
      for (const poly of polys) {
        const feat = opsExtrude(poly, [0, dy, 0], String(uid++))
        ops.push(...feat.ops)
        const cut = opsCouper(solidAs, feat.as, String(uid++))
        ops.push(...cut.ops)
        solidAs = cut.solidAs
      }
      esquisse = null
      continue
    }
  }

  if (!solidAs || ops.length === 0) throw new Error('pipeline: aucune feature OCCT')
  return { ops, solidAs, pas, parametres, entitesPas }
}

/**
 * Historique Session → wires → runBatch OCCT → maillage.
 * `pas` : OCCT ne porte que tête + Pozi ; le filet hôte fournit le fût (pas d'hélice kernel v1).
 */
export function maillagePipelineOcct(occt: OcctKernelModule, session: Session): MaillageOmbre {
  const compilation = compiler(session.historique(), session.pointeCourante())
  const occtPart = tesselle(occt, compilation.ops, compilation.solidAs)
  if (!compilation.pas) {
    if (!occtPart.normales) throw new Error('maillage sans normales')
    return {
      positions: occtPart.positions,
      normales: occtPart.normales,
      indices: occtPart.indices,
      faces: occtPart.faces,
    }
  }
  if (!compilation.entitesPas) throw new Error('pas sans profil de corps')
  const filete = filetHote(compilation.parametres, scriptProfil(compilation.entitesPas))
  const maille = union(filete, occtPart)
  if (!maille.normales) throw new Error('hybride sans normales')
  return {
    positions: maille.positions,
    normales: maille.normales,
    indices: maille.indices,
    faces: maille.faces,
  }
}

/** True si l'historique se compile en ops OCCT (sinon le worker garde Session / noyauProvisoire). */
export function historiqueCompatibleOcct(historique: Operation[], pointe: number | null = null): boolean {
  try {
    compiler(historique, pointe)
    return true
  } catch {
    return false
  }
}
