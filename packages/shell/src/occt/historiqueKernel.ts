/**
 * Pont historique Session → `@opencad/kernel/compiler` (O2-9+).
 * Motifs supportés : plan.dessus / plan.12h / plan.3h, face.dessus/dessous,
 * rectangle/cercle/polygone/segment, extrude / revolution / enlever / fillet.
 * Hors scope : pas, corne, concentrique…
 */
import {
  compilerHistorique,
  type CompilationKernel,
  type OperationKernel,
} from '@opencad/kernel/compiler'
import { rejouables, type Operation } from '@opencad/api-parametrique'

const SUPPORTS = new Set([
  'plan.dessus',
  'plan.12h',
  'plan.3h',
  'face.dessus',
  'face.dessous',
])

const TYPES = new Set([
  'param',
  'ouvrir',
  'rectangle',
  'cercle',
  'polygone',
  'hexagone',
  'octogone',
  'segment',
  'cote',
  'extrude',
  'revolution',
  'enlever',
  'fillet',
])

const COTES = new Set(['longueur', 'largeur', 'rayon', 'hauteur', 'diametre', 'entreplat'])

/** Convertit un préfixe rejouable ; `null` si une op / support n’est pas géré. */
export function historiqueVersKernel(
  historique: Operation[],
  pointe: number | null = null,
): OperationKernel[] | null {
  const ops = rejouables(historique, pointe)
  if (ops.length === 0) return null
  if (ops.some((o) => o.type === 'pas' || o.type === 'concentrique' || o.type === 'symetrie')) {
    return null
  }
  const out: OperationKernel[] = []
  for (const op of ops) {
    if (!TYPES.has(op.type)) return null
    const a = op.arguments
    if (op.type === 'param') {
      out.push({ type: 'param', nom: a.nom!, expression: a.expression! })
      continue
    }
    if (op.type === 'ouvrir') {
      const support = a.support ?? 'plan.dessus'
      if (!SUPPORTS.has(support)) return null
      out.push({ type: 'ouvrir', support })
      continue
    }
    if (op.type === 'rectangle') {
      out.push({ type: 'rectangle' })
      continue
    }
    if (op.type === 'cercle') {
      out.push({ type: 'cercle' })
      continue
    }
    if (op.type === 'segment') {
      out.push({ type: 'segment' })
      continue
    }
    if (op.type === 'polygone') {
      const pans = Number(a.pans)
      if (!(pans >= 3)) return null
      out.push({ type: 'polygone', pans })
      continue
    }
    if (op.type === 'hexagone') {
      out.push({ type: 'hexagone' })
      continue
    }
    if (op.type === 'octogone') {
      out.push({ type: 'octogone' })
      continue
    }
    if (op.type === 'cote') {
      const cible = a.cible
      if (!cible || !COTES.has(cible)) return null
      out.push({
        type: 'cote',
        cible: cible as
          | 'longueur'
          | 'largeur'
          | 'rayon'
          | 'hauteur'
          | 'diametre'
          | 'entreplat',
        expression: a.expression!,
      })
      continue
    }
    if (op.type === 'extrude') {
      out.push({ type: 'extrude', profondeur: a.expression! })
      continue
    }
    if (op.type === 'revolution') {
      out.push({ type: 'revolution' })
      continue
    }
    if (op.type === 'enlever') {
      out.push({
        type: 'enlever',
        profondeur: a.expression!,
        traverse: a.traverse === 'oui',
      })
      continue
    }
    if (op.type === 'fillet') {
      out.push({ type: 'fillet', rayon: a.expression! })
      continue
    }
    return null
  }
  return out
}

/** Compile via kernel (mm) ; `null` si hors scope. */
export function compilerViaKernel(
  historique: Operation[],
  pointe: number | null = null,
): CompilationKernel | null {
  const dto = historiqueVersKernel(historique, pointe)
  if (!dto) return null
  try {
    return compilerHistorique(dto, { unite: 'mm' })
  } catch {
    return null
  }
}
