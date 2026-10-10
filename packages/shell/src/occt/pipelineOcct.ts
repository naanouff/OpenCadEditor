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
import { polylinesDepuisEsquisse, type Polyline3 } from './esquissePolylines.ts'
import { accrocherSolide, opsCouper, opsExtrude, opsRevolution } from './opsDepuisFonction.ts'
import { maillageDepuisTessellate } from './maillageDepuisTessellate.ts'
import {
  directionCoupe,
  faceDepuisBornesY,
  yPlanCoupe,
  type RegistreFaces,
} from './registreFaces.ts'

type EtatEsquisse = {
  support: string
  entites: EntiteEsquisse[]
  symetries: Array<'vertical' | 'horizontal'>
}

function appliquerCote(entite: EntiteEsquisse, cible: string, expression: string) {
  if (cible === 'diametre') entite.diametre = expression
  if (cible === 'ecart') entite.ecart = expression
  if (cible === 'debord') entite.debord = expression
  if (cible === 'largeur') entite.largeur = expression
  if (cible === 'rayon') entite.rayon = expression
  if (cible === 'hauteur') entite.hauteur = expression
  if (cible === 'longueur') entite.longueur = expression
}

/** Rayon max d’une polyline XZ (pour classer anneau extérieur / intérieur). */
function rayonPolyline(poly: number[]): number {
  let max = 0
  for (let i = 0; i < poly.length; i += 3) {
    max = Math.max(max, Math.hypot(poly[i]!, poly[i + 2]!))
  }
  return max
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

/** Rectangle XZ à altitude `y`, enroulement pour extrusion +Y. */
function rectangleXz(
  a0: number,
  a1: number,
  u0: number,
  u1: number,
  y: number,
  sx: number,
  sz: number,
): Polyline3 {
  let pts: [number, number, number][] = [
    [sx * a0, y, sz * u0],
    [sx * a1, y, sz * u0],
    [sx * a1, y, sz * u1],
    [sx * a0, y, sz * u1],
  ]
  let aire = 0
  for (let i = 0; i < 4; i++) {
    const p = pts[i]!
    const q = pts[(i + 1) % 4]!
    aire += p[0] * q[2] - q[0] * p[2]
  }
  if (aire < 0) pts = pts.reverse()
  const xyz: number[] = []
  for (const p of pts) xyz.push(p[0], p[1], p[2])
  xyz.push(pts[0]![0], pts[0]![1], pts[0]![2])
  return xyz
}

/**
 * Découpe le bout des cornes (plongee / épaisseur) après l’extrusion prismatique,
 * pour que le solide OCCT suive la découpe d’élévation déjà visible en fil de fer Session.
 */
function opsElevationCornes(
  solidAs: string,
  parametres: Map<string, string>,
  evaluer: (expression: string) => number,
  uid: () => string,
): { ops: KernelBatchOp[]; solidAs: string } {
  if (!parametres.has('epaisseur_bout') || !parametres.has('plongee_bout')) {
    return { ops: [], solidAs }
  }
  const H = evaluer('hauteur_carrure')
  const plongee = evaluer('plongee_bout')
  const epaisseur = evaluer('epaisseur_bout')
  if (!(epaisseur > 0) || !(H > plongee + epaisseur)) return { ops: [], solidAs }
  const rayonPeau = evaluer('diametre_boite') / 2
  const a0 = evaluer('entrecorne') / 2
  const debord = parametres.has('longueur_corne') ? evaluer('longueur_corne') : 4.2
  const largeurRacine = parametres.has('largeur_racine') ? evaluer('largeur_racine') : 6
  const yTipBas = plongee
  const yTipHaut = plongee + epaisseur
  const a1 = a0 + largeurRacine + 1
  const u0 = rayonPeau - 0.2
  const u1 = rayonPeau + debord + 1
  const ops: KernelBatchOp[] = []
  let courant = solidAs
  for (const sx of [1, -1] as const) {
    for (const sz of [1, -1] as const) {
      const haut = opsExtrude(
        rectangleXz(a0 - 0.05, a1, u0, u1, yTipHaut, sx, sz),
        [0, H - yTipHaut + 1, 0],
        uid(),
      )
      ops.push(...haut.ops)
      const cutH = opsCouper(courant, haut.as, uid())
      ops.push(...cutH.ops)
      courant = cutH.solidAs
      if (yTipBas > 1e-6) {
        const bas = opsExtrude(
          rectangleXz(a0 - 0.05, a1, u0, u1, 0, sx, sz),
          [0, yTipBas, 0],
          uid(),
        )
        ops.push(...bas.ops)
        const cutB = opsCouper(courant, bas.as, uid())
        ops.push(...cutB.ops)
        courant = cutB.solidAs
      }
    }
  }
  return { ops, solidAs: courant }
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
  let dernierSupport: string | null = null
  let solidAs: string | null = null
  const ops: KernelBatchOp[] = []
  let uid = 0
  let yMax = 0
  let yMin = 0
  let faces: RegistreFaces = new Map()
  const opsRejouees = rejouables(historique, pointe)
  const pas = opsRejouees.some((op) => op.type === 'pas')
  let entitesPas: EntiteEsquisse[] | null = null
  let revolutions = 0

  const evaluer = (expression: string) => evaluateurProvisoire.evaluer(expression, parametres)
  const assurerEsquisse = () => {
    if (esquisse) return
    if (!dernierSupport) throw new Error('entité hors esquisse')
    esquisse = { support: dernierSupport, entites: [], symetries: [] }
  }

  for (const operation of opsRejouees) {
    if (operation.type === 'param') {
      parametres.set(operation.arguments.nom, operation.arguments.expression)
      continue
    }
    if (operation.type === 'ouvrir') {
      esquisse = { support: operation.arguments.support, entites: [], symetries: [] }
      dernierSupport = operation.arguments.support
      continue
    }
    if (operation.type === 'cercle' || operation.type === 'rectangle' || operation.type === 'segment' || operation.type === 'arc') {
      assurerEsquisse()
      esquisse!.entites.push({ id: `${operation.type}.${uid++}`, sorte: operation.type, degres: 0 })
      continue
    }
    if (operation.type === 'cote') {
      const entite = esquisse?.entites.at(-1)
      if (!entite) throw new Error('cote sans entité')
      appliquerCote(entite, operation.arguments.cible, operation.arguments.expression)
      continue
    }
    if (operation.type === 'concentrique') {
      const entite = esquisse?.entites.at(-1)
      if (entite) entite.concentrique = operation.arguments.cible
      continue
    }
    if (operation.type === 'symetrie') {
      const axe = operation.arguments.axe
      if (esquisse && (axe === 'vertical' || axe === 'horizontal')) esquisse.symetries.push(axe)
      continue
    }
    if (operation.type === 'pas') continue

    if (!esquisse) throw new Error(`fonction ${operation.type} sans esquisse`)
    const sketch: Esquisse = {
      support: esquisse.support,
      entites: esquisse.entites,
      symetries: esquisse.symetries,
    }

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
      // Tube latéral : hors v1 carrure OCCT (fuse/cut sur plan.3h dégrade l’anneau).
      if (sketch.support === 'plan.3h') {
        esquisse = null
        continue
      }
      let polys
      try {
        polys = polylinesDepuisEsquisse(sketch, parametres, { yPlan: 0 })
      } catch {
        // Esquisse non encore supportée (ex. cercle sur plan.12h) : saute la feature.
        esquisse = null
        continue
      }
      const dir = ([0, profondeur, 0] as const)
      const cercles = sketch.entites.filter((e) => e.sorte === 'cercle')
      // Anneau : deux cercles concentriques → extrude l’extérieur, coupe l’intérieur.
      if (cercles.length >= 2 && polys.length >= 2 && sketch.support !== 'plan.3h') {
        const classes = polys
          .map((poly) => ({
            poly,
            r: rayonPolyline(poly),
          }))
          .sort((a, b) => b.r - a.r)
        const exterieur = classes[0]!
        const feat = opsExtrude(exterieur.poly, dir, String(uid++))
        ops.push(...feat.ops)
        const acc = accrocherSolide(solidAs, feat.as, String(uid++))
        ops.push(...acc.ops)
        solidAs = acc.solidAs
        for (const interieur of classes.slice(1)) {
          const outil = opsExtrude(interieur.poly, [0, profondeur + 0.4, 0], String(uid++))
          ops.push(...outil.ops)
          const cut = opsCouper(solidAs, outil.as, String(uid++))
          ops.push(...cut.ops)
          solidAs = cut.solidAs
        }
      } else {
        for (const poly of polys) {
          const feat = opsExtrude(poly, dir, String(uid++))
          ops.push(...feat.ops)
          const acc = accrocherSolide(solidAs, feat.as, String(uid++))
          ops.push(...acc.ops)
          solidAs = acc.solidAs
        }
        const profilCorne = sketch.entites.some((e) => e.sorte === 'segment' && e.ecart)
        if (profilCorne && solidAs) {
          const elev = opsElevationCornes(solidAs, parametres, evaluer, () => String(uid++))
          ops.push(...elev.ops)
          solidAs = elev.solidAs
        }
      }
      if (sketch.support !== 'plan.3h') {
        yMax = Math.max(yMax, profondeur)
        yMin = Math.min(yMin, 0)
        faces = faceDepuisBornesY(yMin, yMax)
      }
      esquisse = null
      continue
    }

    if (operation.type === 'enlever') {
      if (!solidAs) throw new Error('enlever sans solide')
      const profondeur = evaluer(operation.arguments.expression)
      const traverse = operation.arguments.traverse === 'oui'
      const face = faces.get(sketch.support)
      try {
        if (traverse && sketch.support === 'plan.12h') {
          // Barrette : hors v1 — esquisse + feature ignorées pour garder le reste en OCCT.
          esquisse = null
          continue
        }
        if (traverse && sketch.support === 'plan.3h') {
          esquisse = null
          continue
        }
        const yCut = face ? yPlanCoupe(face, profondeur) : yMax - profondeur
        const polys = polylinesDepuisEsquisse(sketch, parametres, { yPlan: yCut })
        const dir = face
          ? directionCoupe(face, profondeur)
          : ([0, profondeur + 0.4, 0] as const)
        for (const poly of polys) {
          const feat = opsExtrude(poly, dir, String(uid++))
          ops.push(...feat.ops)
          const cut = opsCouper(solidAs, feat.as, String(uid++))
          ops.push(...cut.ops)
          solidAs = cut.solidAs
        }
      } catch {
        esquisse = null
        continue
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

/**
 * Cornes profilées (ecart / debord / largeurs) : le BREP Session (`decrire` / fil de fer)
 * porte déjà joue + élévation. Le solide OCCT (extrude prismatique) diverge — le worker
 * affiche alors le maillage Session pour coller au BREP.
 */
export function historiqueCornesSession(historique: Operation[], pointe: number | null = null): boolean {
  const ops = rejouables(historique, pointe)
  let ecart = false
  let debord = false
  let largeurs = 0
  for (const op of ops) {
    if (op.type === 'ouvrir') {
      ecart = false
      debord = false
      largeurs = 0
      continue
    }
    if (op.type === 'cote') {
      if (op.arguments.cible === 'ecart') ecart = true
      if (op.arguments.cible === 'debord') debord = true
      if (op.arguments.cible === 'largeur') largeurs += 1
    }
    if (op.type === 'extrude' && ecart && debord && largeurs >= 2) return true
  }
  return false
}
