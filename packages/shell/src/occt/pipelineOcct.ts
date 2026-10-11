import {
  Session,
  datumParId,
  evaluateurProvisoire,
  rejouables,
  union,
  type EntiteEsquisse,
  type Esquisse,
  type Maillage,
  type MaillageOmbre,
  type Operation,
} from '@opencad/api-parametrique'
import { opsBarrettesPedagogiques } from '@opencad/kernel/barrettes'
import { opsElevationCornes } from '@opencad/kernel/elevation'
import { runBatch, type KernelBatchOp, type OcctKernelModule } from './chargerKernel.ts'
import { polylinesDepuisEsquisse, type Polyline3 } from './esquissePolylines.ts'
import { indicesDepuisSelecteurs, parseSelecteursAretes, type AreteKernel } from './aretesOcct.ts'
import { accrocherSolide, opsCouper, opsExtrude, opsFillet, opsRevolution } from './opsDepuisFonction.ts'
import { compilerViaKernel } from './historiqueKernel.ts'
import { maillageDepuisTessellate } from './maillageDepuisTessellate.ts'
import {
  directionCoupe,
  faceDepuisBornesY,
  yPlanCoupe,
  yPlanFace,
  type RegistreFaces,
} from './registreFaces.ts'

/** Chevauchement peau pour fuse du tube latéral (mm). */
const CHEVAUCHE_TUBE = 0.3

function directionDatum(
  support: string,
  profondeur: number,
): readonly [number, number, number] {
  const datum = datumParId(support)
  if (!datum) return [0, profondeur, 0]
  const n = datum.normale
  return [n[0] * profondeur || 0, n[1] * profondeur || 0, n[2] * profondeur || 0]
}

/** Décalage monde pour centrer le tube à mi-hauteur de carrure (GCS cercle à u=v=0). */
function decalerPolylines(polys: Polyline3[], dx: number, dy: number, dz: number): Polyline3[] {
  if (dx === 0 && dy === 0 && dz === 0) return polys
  return polys.map((poly) => {
    const out: number[] = []
    for (let i = 0; i < poly.length; i += 3) {
      out.push(poly[i]! + dx, poly[i + 1]! + dy, poly[i + 2]! + dz)
    }
    return out
  })
}

/**
 * Altitude du wire sur un datum (le long de la normale).
 * Tube `plan.3h` : peau extérieure − chevauchement, si `diametre_boite` est connu.
 */
function altitudeDatum(
  support: string,
  evaluer: (e: string) => number,
  parametres: Map<string, string>,
): number {
  if (support === 'plan.3h' && parametres.has('diametre_boite')) {
    return evaluer('diametre_boite') / 2 - CHEVAUCHE_TUBE
  }
  return 0
}

function decalageTube(
  support: string,
  evaluer: (e: string) => number,
  parametres: Map<string, string>,
): readonly [number, number, number] {
  if (support === 'plan.3h' && parametres.has('hauteur_carrure')) {
    return [0, evaluer('hauteur_carrure') / 2, 0]
  }
  return [0, 0, 0]
}

const ENTITES_ESQUISSE = new Set([
  'cercle',
  'rectangle',
  'segment',
  'arc',
  'octogone',
  'hexagone',
  'polygone',
])

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
  if (cible === 'entreplat') entite.entreplat = expression
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

type FilletEnAttente = {
  expression: string
  selecteurs: string[]
}

type Compilation = {
  ops: KernelBatchOp[]
  solidAs: string
  pas: boolean
  parametres: Map<string, string>
  entitesPas: EntiteEsquisse[] | null
  fillets: FilletEnAttente[]
  yMin: number
  yMax: number
}

function compiler(historique: Operation[], pointe: number | null = null): Compilation {
  // O2-9 : préfixe simple → `@opencad/kernel/compiler` (mm) ; sinon chemin local.
  const viaKernel = compilerViaKernel(historique, pointe)
  if (viaKernel?.solidAs && viaKernel.ops.length > 0) {
    const entitesPas =
      viaKernel.entitesPas?.map((s) => ({
        id: s.id,
        sorte: 'segment' as const,
        degres: 0,
        rayon: s.rayon,
        hauteur: s.hauteur,
      })) ?? null
    return {
      ops: viaKernel.ops,
      solidAs: viaKernel.solidAs,
      pas: viaKernel.pas,
      parametres: viaKernel.parametres,
      entitesPas,
      fillets: [],
      yMin: viaKernel.yMin,
      yMax: viaKernel.yMax,
    }
  }

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
  const fillets: FilletEnAttente[] = []

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
    if (ENTITES_ESQUISSE.has(operation.type)) {
      assurerEsquisse()
      const pans =
        operation.type === 'polygone'
          ? Number(operation.arguments.pans)
          : operation.type === 'hexagone'
            ? 6
            : operation.type === 'octogone'
              ? 8
              : undefined
      esquisse!.entites.push({
        id: `${operation.type}.${uid++}`,
        sorte: operation.type as EntiteEsquisse['sorte'],
        degres: 0,
        ...(pans !== undefined && Number.isFinite(pans) ? { pans } : {}),
      })
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

    if (operation.type === 'fillet') {
      if (!solidAs) throw new Error('fillet sans solide')
      fillets.push({
        expression: operation.arguments.expression,
        selecteurs: parseSelecteursAretes(operation.arguments.aretes),
      })
      continue
    }

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
      // Même avec `pas` (corps hôte), les faces existent pour une tête sur face.dessus.
      yMin = Math.min(yMin, 0)
      faces = faceDepuisBornesY(yMin, yMax)
      esquisse = null
      continue
    }

    if (operation.type === 'extrude') {
      const profondeur = evaluer(operation.arguments.expression)
      const face = faces.get(sketch.support)
      const tubeLateral = sketch.support === 'plan.3h'
      // Tube : fil à la peau (− chevauchement), extrude un peu plus long pour fuse.
      const longueurExtrude = tubeLateral ? profondeur + CHEVAUCHE_TUBE : profondeur
      const yPlan = face
        ? yPlanFace(face)
        : altitudeDatum(sketch.support, evaluer, parametres)
      const dir = face
        ? ([
            face.normal[0] * longueurExtrude,
            face.normal[1] * longueurExtrude,
            face.normal[2] * longueurExtrude,
          ] as const)
        : directionDatum(sketch.support, longueurExtrude)
      let polys
      try {
        polys = polylinesDepuisEsquisse(sketch, parametres, { yPlan })
        if (tubeLateral) {
          const [dx, dy, dz] = decalageTube(sketch.support, evaluer, parametres)
          polys = decalerPolylines(polys, dx, dy, dz)
        }
      } catch {
        // Esquisse non encore supportée (ex. cercle sur plan.12h) : saute la feature.
        esquisse = null
        continue
      }
      const cercles = sketch.entites.filter((e) => e.sorte === 'cercle')
      // Anneau : deux cercles concentriques → extrude l’extérieur, coupe l’intérieur.
      if (cercles.length >= 2 && polys.length >= 2 && !tubeLateral) {
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
          const outil = opsExtrude(
            interieur.poly,
            [dir[0], dir[1] + Math.sign(dir[1] || 1) * 0.4, dir[2]],
            String(uid++),
          )
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
          const elev = opsElevationCornes(solidAs, parametres, 1, () => String(uid++))
          ops.push(...elev.ops)
          solidAs = elev.solidAs
        }
      }
      if (!tubeLateral) {
        if (face) {
          const yFin = face.origin[1] + face.normal[1] * profondeur
          yMax = Math.max(yMax, yFin, face.origin[1])
          yMin = Math.min(yMin, yFin, face.origin[1])
        } else {
          yMax = Math.max(yMax, profondeur)
          yMin = Math.min(yMin, 0)
        }
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
          const cercle = [...sketch.entites].reverse().find((e) => e.sorte === 'cercle' && e.diametre)
          if (!cercle?.diametre) throw new Error('barrette sans diamètre')
          const rayon = evaluer(cercle.diametre) / 2
          const bars = opsBarrettesPedagogiques(solidAs, rayon, parametres, 1, () => String(uid++))
          ops.push(...bars.ops)
          solidAs = bars.solidAs
          esquisse = null
          continue
        }
        const tubeLateral = sketch.support === 'plan.3h'
        let yCut: number
        let dir: readonly [number, number, number]
        if (face) {
          yCut = yPlanCoupe(face, profondeur)
          dir = directionCoupe(face, profondeur)
        } else if (tubeLateral && traverse) {
          // Tige : fil près de l’axe, coupe à travers peau + bossage.
          yCut = -CHEVAUCHE_TUBE
          const portee =
            (parametres.has('diametre_boite') ? evaluer('diametre_boite') / 2 : 0) +
            profondeur +
            CHEVAUCHE_TUBE * 2
          dir = directionDatum(sketch.support, portee)
        } else {
          yCut = yMax - profondeur
          dir = directionDatum(sketch.support, profondeur + 0.4)
        }
        let polys = polylinesDepuisEsquisse(sketch, parametres, { yPlan: yCut })
        if (tubeLateral) {
          const [dx, dy, dz] = decalageTube(sketch.support, evaluer, parametres)
          polys = decalerPolylines(polys, dx, dy, dz)
        }
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
  return { ops, solidAs, pas, parametres, entitesPas, fillets, yMin, yMax }
}

/** Applique les fillets en résolvant les sélecteurs via `list_edges`. */
function appliquerFillets(
  occt: OcctKernelModule,
  compilation: Compilation,
): { ops: KernelBatchOp[]; solidAs: string } {
  let { ops, solidAs } = compilation
  if (compilation.fillets.length === 0) return { ops, solidAs }
  const evaluer = (expression: string) =>
    evaluateurProvisoire.evaluer(expression, compilation.parametres)
  let uid = 0
  for (const fillet of compilation.fillets) {
    const rayon = evaluer(fillet.expression)
    let indices: number[] | null = null
    if (fillet.selecteurs.length > 0) {
      const listed = runBatch(occt, [
        { op: 'arena_clear' },
        ...ops,
        { op: 'list_edges', args: [{ handle: solidAs }], as: 'edges' },
      ])
      if (!listed.ok) throw new Error(listed.error ?? 'list_edges failed')
      const payload = listed.aliases?.edges as { ok?: boolean; edges?: AreteKernel[] } | undefined
      const edges = payload?.edges ?? []
      indices = indicesDepuisSelecteurs(edges, fillet.selecteurs, compilation.yMin, compilation.yMax)
    }
    const feat = opsFillet(solidAs, rayon, indices, String(uid++))
    ops = [...ops, ...feat.ops]
    solidAs = feat.solidAs
  }
  return { ops, solidAs }
}

/**
 * Historique Session → wires → runBatch OCCT → maillage.
 * `pas` : OCCT ne porte que tête + Pozi ; le filet hôte fournit le fût (pas d'hélice kernel v1).
 */
export function maillagePipelineOcct(occt: OcctKernelModule, session: Session): MaillageOmbre {
  const compilation = compiler(session.historique(), session.pointeCourante())
  const apresFillet = appliquerFillets(occt, compilation)
  const occtPart = tesselle(occt, apresFillet.ops, apresFillet.solidAs)
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
