import {
  datumsOrigine,
  estDatumOrigine,
  evaluateurProvisoire,
  Session,
  type Operation,
} from '@opencad/api-parametrique'
import { cadompart } from './gen/cadompart.js'

const v0 = cadompart.v0_2

const CONNUES = new Set([
  'param',
  'ouvrir',
  'cercle',
  'rectangle',
  'segment',
  'arc',
  'concentrique',
  'symetrie',
  'cote',
  'extrude',
  'enlever',
  'revolution',
  'pas',
])

const COTES = ['diametre', 'ecart', 'debord', 'largeur', 'longueur', 'rayon', 'hauteur'] as const

type Cote = (typeof COTES)[number]

type Entite = {
  sorte: 'cercle' | 'rectangle' | 'segment' | 'arc'
  diametre?: string
  largeur?: string
  longueur?: string
  rayon?: string
  hauteur?: string
  ecart?: string
  debord?: string
  concentrique?: string
}

type EsquisseOuverte = {
  support: string
  entites: Entite[]
  symetries: Array<'vertical' | 'horizontal'>
}

export class ErreurFichier extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ErreurFichier'
  }
}

export type Lecture = {
  script: string
  eteins: number[]
}

type Lignes = {
  lignes: string[]
  eteins: number[]
  index: number
  pousser(ligne: string, compte?: boolean, eteint?: boolean): void
}

export function ecrire(session: Session): Uint8Array {
  const historique = session.historique()
  for (const operation of historique) {
    if (!CONNUES.has(operation.type)) {
      throw new ErreurFichier(`${operation.type} non enregistré`)
    }
  }

  const document = session.document()
  const parametres = new Map<string, string>()
  const parameters: cadompart.v0_2.IParameter[] = []
  const features: cadompart.v0_2.IFeature[] = []
  let esquisse: EsquisseOuverte | null = null
  let dernierSupport: string | null = null
  let rangEsquisse = 0
  let rangSolide = 0
  let rangHelice = 0
  let derniereRevolution: string | null = null

  const poserEsquisse = () => {
    if (!esquisse) throw new ErreurFichier('aucune esquisse')
    const id = `sketch-${++rangEsquisse}`
    features.push(featureEsquisse(id, esquisse, parametres))
    esquisse = null
    return id
  }

  const assurerEsquisse = () => {
    if (esquisse) return
    if (!dernierSupport) throw new ErreurFichier('aucune esquisse')
    esquisse = { support: dernierSupport, entites: [], symetries: [] }
  }

  for (const operation of historique) {
    if (operation.type === 'param') {
      const nom = operation.arguments.nom
      const expression = operation.arguments.expression
      parameters.push({
        id: nom,
        name: nom,
        type: v0.ParamType.PARAM_TYPE_FLOAT,
        floatValue: evaluer(expression, parametres),
        unit: 'mm',
        expression,
      })
      parametres.set(nom, expression)
      continue
    }
    if (operation.type === 'ouvrir') {
      if (esquisse) poserEsquisse()
      dernierSupport = operation.arguments.support
      esquisse = { support: dernierSupport, entites: [], symetries: [] }
      continue
    }
    if (
      operation.type === 'cercle' ||
      operation.type === 'rectangle' ||
      operation.type === 'segment' ||
      operation.type === 'arc'
    ) {
      assurerEsquisse()
      esquisse!.entites.push({ sorte: operation.type })
      continue
    }
    if (operation.type === 'concentrique') {
      assurerEsquisse()
      const entite = esquisse!.entites.at(-1)
      if (!entite) throw new ErreurFichier('esquisse vide')
      entite.concentrique = operation.arguments.cible
      continue
    }
    if (operation.type === 'symetrie') {
      if (!esquisse) continue
      const axe = operation.arguments.axe
      if (axe !== 'vertical' && axe !== 'horizontal') throw new ErreurFichier(`axe inconnu: ${axe}`)
      esquisse.symetries.push(axe)
      continue
    }
    if (operation.type === 'cote') {
      assurerEsquisse()
      const entite = esquisse!.entites.at(-1)
      if (!entite) throw new ErreurFichier('esquisse vide')
      poserCote(entite, operation.arguments.cible, operation.arguments.expression)
      continue
    }
    if (operation.type === 'extrude' || operation.type === 'enlever' || operation.type === 'revolution') {
      const id = poserEsquisse()
      if (operation.type === 'revolution') derniereRevolution = id
      features.push(featureSolide(operation, id, parametres, ++rangSolide))
      continue
    }
    if (operation.type === 'pas') {
      const pitch = parametres.has('pas') ? evaluer('pas', parametres) : 0
      features.push({
        id: `helix-${++rangHelice}`,
        name: 'pas',
        suppressed: operation.actif === false,
        helix: {
          profileSketchId: derniereRevolution ?? '',
          axisOrigin: { x: 0, y: 0, z: 0 },
          axisDirection: { x: 0, y: 1, z: 0 },
          pitch,
        },
      })
    }
  }
  if (esquisse) poserEsquisse()

  const fichier: cadompart.v0_2.ICadompartFile = {
    versionMajor: 0,
    versionMinor: 2,
    name: session.pieceCourante() ?? '',
    units: v0.LengthUnit.LENGTH_UNIT_MILLIMETRES,
    upAxis: v0.UpAxis.UP_AXIS_Y,
    parameters,
    datumPlanes: datumsOrigine(document.repere).map((datum) => ({
      id: datum.id,
      name: datum.libelle,
      origin: vec3(document.repere.origine),
      normal: vec3(datum.normale),
    })),
    features,
  }
  return v0.CadompartFile.encode(fichier).finish()
}

export function lire(octets: Uint8Array): Lecture {
  let fichier: cadompart.v0_2.CadompartFile
  try {
    fichier = v0.CadompartFile.decode(octets)
  } catch (erreur) {
    throw new ErreurFichier(erreur instanceof Error ? erreur.message : 'fichier illisible')
  }
  if (fichier.versionMajor !== 0 || fichier.versionMinor !== 2) {
    throw new ErreurFichier('version non lue')
  }
  if (fichier.configurations.length > 0) throw new ErreurFichier('configuration non lue')

  const ids = new Set<string>()
  const exiger = (id: string) => {
    if (!id) throw new ErreurFichier('id vide')
    if (ids.has(id)) throw new ErreurFichier(`id dupliqué: ${id}`)
    ids.add(id)
  }
  for (const parametre of fichier.parameters) exiger(parametre.id ?? '')
  for (const plan of fichier.datumPlanes) exiger(plan.id ?? '')
  for (const feature of fichier.features) exiger(feature.id ?? '')

  const echelle = facteur(fichier.units)
  const script = lignes()
  const nom = fichier.name.trim() || 'piece'
  if (nom.includes('\n')) throw new ErreurFichier('nom illisible')
  script.pousser(`piece ${nom}`, false)

  const textes = new Map<string, string>()
  for (const parametre of fichier.parameters) {
    const littéral = valeurParametre(parametre, echelle)
    const source = (parametre.expression ?? '').trim()
    const texte = echelle === 1 && source && !source.includes('\n') ? source : littéral
    textes.set(parametre.id ?? '', texte)
    script.pousser(`param ${parametre.id} ${texte}`)
  }

  const supports = new Map<string, string>()
  for (const feature of fichier.features as cadompart.v0_2.Feature[]) {
    if (!feature.body) throw new ErreurFichier('feature sans corps')
    if (feature.body === 'sketch') {
      if (feature.suppressed) throw new ErreurFichier('esquisse éteinte non lue')
      const sketch = feature.sketch
      if (!sketch) throw new ErreurFichier('feature sans corps')
      const support = feature.name || sketch.datumPlaneId
      if (!support) throw new ErreurFichier('esquisse sans support')
      supports.set(feature.id, support)
      ecrireEsquisse(script, support, sketch, echelle)
      continue
    }
    if (feature.body === 'extrude') {
      const extrude = feature.extrude
      if (!extrude) throw new ErreurFichier('feature sans corps')
      const support = supports.get(extrude.profileSketchId)
      if (!support) throw new ErreurFichier('esquisse absente')
      const distance = expressionSolide(feature.name, (extrude.distance ?? 0) * echelle, textes, echelle)
      const verbe =
        extrude.endCondition === v0.EndCondition.END_CONDITION_THROUGH_ALL
          ? 'enleve travers'
          : extrude.cut
            ? 'enleve'
            : 'extrude'
      script.pousser(`${verbe} ${distance}`, true, feature.suppressed === true)
      continue
    }
    if (feature.body === 'revolve') {
      const revolve = feature.revolve
      if (!revolve) throw new ErreurFichier('feature sans corps')
      if (!supports.has(revolve.profileSketchId)) throw new ErreurFichier('esquisse absente')
      script.pousser('revolution', true, feature.suppressed === true)
      continue
    }
    if (feature.body === 'helix') {
      if (feature.name !== 'pas') throw new ErreurFichier('hélice non lue')
      script.pousser('pas', true, feature.suppressed === true)
      continue
    }
    throw new ErreurFichier(`feature non reconnue: ${feature.body}`)
  }

  return { script: script.lignes.join('\n'), eteins: script.eteins }
}

export function ouvrirSession(octets: Uint8Array): Session {
  const lecture = lire(octets)
  const session = new Session()
  session.executer(lecture.script)
  for (const index of lecture.eteins) session.activer(index, false)
  return session
}

function lignes(): Lignes {
  const sortie: Lignes = {
    lignes: [],
    eteins: [],
    index: 0,
    pousser(ligne, compte = true, eteint = false) {
      const ici = this.index
      this.lignes.push(ligne)
      if (compte) this.index += 1
      if (eteint) this.eteins.push(ici)
    },
  }
  return sortie
}

function facteur(unite: cadompart.v0_2.LengthUnit): number {
  if (unite === v0.LengthUnit.LENGTH_UNIT_MILLIMETRES) return 1
  if (
    unite === v0.LengthUnit.LENGTH_UNIT_METRES ||
    unite === v0.LengthUnit.LENGTH_UNIT_UNSPECIFIED
  ) {
    return 1000
  }
  if (unite === v0.LengthUnit.LENGTH_UNIT_INCHES) return 25.4
  throw new ErreurFichier('unité non lue')
}

function valeurParametre(parametre: cadompart.v0_2.IParameter, echelle: number): string {
  if (parametre.type === v0.ParamType.PARAM_TYPE_ANGLE) return nombre(parametre.floatValue ?? 0)
  if (
    parametre.type === v0.ParamType.PARAM_TYPE_FLOAT ||
    parametre.type === v0.ParamType.PARAM_TYPE_UNSPECIFIED
  ) {
    return nombre((parametre.floatValue ?? 0) * echelle)
  }
  throw new ErreurFichier('paramètre non lu')
}

function ecrireEsquisse(
  script: Lignes,
  support: string,
  sketch: cadompart.v0_2.ISketchFeature,
  echelle: number,
) {
  script.pousser(`esquisse ${support}`)
  const courbes = (sketch.curves ?? []) as cadompart.v0_2.SketchCurve[]
  if (courbes.length > 0 && courbes.every((courbe) => courbe.circle)) {
    courbes.forEach((courbe, index) => {
      const cercle = courbe.circle
      const diametre = ((cercle?.radius ?? 0) * 2) * echelle
      const nom = sketch.constraints?.find(
        (contrainte) => contrainte.id === `diametre-${index}` || (index === 0 && contrainte.id === 'diametre'),
      )?.parameterId
      script.pousser('cercle')
      const lien = sketch.constraints?.find((contrainte) => contrainte.id?.startsWith(`concentrique:${index}:`))
      if (lien?.id) script.pousser(`concentrique ${lien.id.slice(`concentrique:${index}:`.length)}`)
      script.pousser(`cote diametre ${nom || nombre(diametre)}`)
    })
    ecrireSymetries(script, sketch)
    return
  }
  if (estRectangle(sketch)) {
    const groupes = groupesRectangle(sketch)
    groupes.forEach((indices, index) => {
      const { largeur, longueur } = bornes(sketch, indices, echelle)
      const nomLargeur = texteCote(sketch, index, 'largeur')
      const nomLongueur = texteCote(sketch, index, 'longueur')
      script.pousser('rectangle')
      script.pousser(`cote largeur ${nomLargeur || nombre(largeur)}`)
      script.pousser(`cote longueur ${nomLongueur || nombre(longueur)}`)
    })
    ecrireSymetries(script, sketch)
    return
  }
  if (esquisseRejouable(sketch)) {
    rejouerEsquisse(script, sketch, echelle)
    return
  }
  if (courbes.length === 0) throw new ErreurFichier('esquisse vide')
  for (const courbe of courbes) {
    if (courbe.curve && courbe.curve !== 'line') throw new ErreurFichier(`courbe non lue: ${courbe.curve}`)
    const ligne = courbe.line
    if (!ligne?.b) throw new ErreurFichier('courbe non lue: line')
    script.pousser('segment')
    script.pousser(`cote rayon ${nombre((ligne.b.x ?? 0) * echelle)}`)
    script.pousser(`cote hauteur ${nombre((ligne.b.y ?? 0) * echelle)}`)
  }
}

function ecrireSymetries(script: Lignes, sketch: cadompart.v0_2.ISketchFeature) {
  for (const contrainte of sketch.constraints ?? []) {
    if (!contrainte.id?.startsWith('symetrie:')) continue
    script.pousser(`symetrie ${contrainte.id.slice('symetrie:'.length)}`)
  }
}

function esquisseRejouable(sketch: cadompart.v0_2.ISketchFeature) {
  return (sketch.constraints ?? []).some((contrainte) => contrainte.id?.startsWith('cote:'))
}

function rejouerEsquisse(script: Lignes, sketch: cadompart.v0_2.ISketchFeature, echelle: number) {
  const courbes = (sketch.curves ?? []) as cadompart.v0_2.SketchCurve[]
  courbes.forEach((courbe, index) => {
    if (courbe.circle) script.pousser('cercle')
    else if (courbe.arc) script.pousser('arc')
    else if (courbe.line) script.pousser('segment')
    else throw new ErreurFichier(`courbe non lue: ${courbe.curve ?? 'vide'}`)
    const lien = sketch.constraints?.find((contrainte) => contrainte.id?.startsWith(`concentrique:${index}:`))
    if (lien?.id) script.pousser(`concentrique ${lien.id.slice(`concentrique:${index}:`.length)}`)
    for (const cible of COTES) {
      const cote = sketch.constraints?.find((contrainte) => contrainte.id === `cote:${index}:${cible}`)
      if (!cote) continue
      script.pousser(`cote ${cible} ${cote.parameterId || nombre((cote.value ?? 0) * echelle)}`)
    }
  })
  ecrireSymetries(script, sketch)
}

function estRectangle(sketch: cadompart.v0_2.ISketchFeature): boolean {
  return groupesRectangle(sketch).length > 0
}

function groupesRectangle(sketch: cadompart.v0_2.ISketchFeature): number[][] {
  const courbes = sketch.curves ?? []
  const boucles = (sketch.loops ?? []).filter((boucle) => boucle.outer && (boucle.curveIndices?.length ?? 0) === 4)
  if (boucles.length === 0 || !courbes.every((courbe) => courbe.line && !courbe.line.construction)) return []
  const indices = boucles.flatMap((boucle) => boucle.curveIndices ?? [])
  if (indices.length !== courbes.length || new Set(indices).size !== courbes.length) return []
  return boucles.map((boucle) => (boucle.curveIndices ?? []) as number[])
}

function texteCote(sketch: cadompart.v0_2.ISketchFeature, index: number, cible: string): string {
  const ids = index === 0 ? [`${cible}-0`, cible] : [`${cible}-${index}`]
  return sketch.constraints?.find((contrainte) => ids.includes(contrainte.id ?? ''))?.parameterId ?? ''
}

function bornes(sketch: cadompart.v0_2.ISketchFeature, indices: number[], echelle: number) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const index of indices) {
    const courbe = sketch.curves?.[index]
    for (const point of [courbe?.line?.a, courbe?.line?.b]) {
      if (!point) continue
      minX = Math.min(minX, point.x ?? 0)
      maxX = Math.max(maxX, point.x ?? 0)
      minY = Math.min(minY, point.y ?? 0)
      maxY = Math.max(maxY, point.y ?? 0)
    }
  }
  return { longueur: (maxX - minX) * echelle, largeur: (maxY - minY) * echelle }
}

function featureEsquisse(
  id: string,
  esquisse: EsquisseOuverte,
  parametres: Map<string, string>,
): cadompart.v0_2.IFeature {
  const sketch = courbesDe(esquisse, parametres)
  return {
    id,
    name: esquisse.support,
    sketch: {
      ...sketch,
      datumPlaneId: estDatumOrigine(esquisse.support) ? esquisse.support : '',
    },
  }
}

function courbesDe(
  esquisse: EsquisseOuverte,
  parametres: Map<string, string>,
): cadompart.v0_2.ISketchFeature {
  const { entites } = esquisse
  if (entites.length >= 1 && entites.every((entite) => entite.sorte === 'cercle')) {
    return esquisseCercles(esquisse, parametres)
  }
  if (entites.length >= 1 && entites.every((entite) => entite.sorte === 'rectangle')) {
    const curves: cadompart.v0_2.ISketchCurve[] = []
    const loops: cadompart.v0_2.ISketchLoop[] = []
    const constraints: cadompart.v0_2.ISketchConstraint[] = []
    entites.forEach((entite, index) => {
      const largeurExpr = entite.largeur
      const longueurExpr = entite.longueur
      if (!largeurExpr || !longueurExpr) throw new ErreurFichier('rectangle sans cote')
      const largeur = evaluer(largeurExpr, parametres)
      const longueur = evaluer(longueurExpr, parametres)
      const lu = longueur / 2
      const lv = largeur / 2
      const coins: Array<[number, number]> = [
        [-lu, -lv],
        [lu, -lv],
        [lu, lv],
        [-lu, lv],
      ]
      const base = curves.length
      coins.forEach((coin, coinIndex) => {
        const suivant = coins[(coinIndex + 1) % coins.length]!
        curves.push({
          line: { id: `ligne-${base + coinIndex}`, a: { x: coin[0], y: coin[1] }, b: { x: suivant[0], y: suivant[1] } },
        })
      })
      loops.push({ curveIndices: [base, base + 1, base + 2, base + 3], outer: true })
      constraints.push(contrainteCote(`largeur-${index}`, largeurExpr, largeur))
      constraints.push(contrainteCote(`longueur-${index}`, longueurExpr, longueur))
    })
    return { curves, loops, constraints }
  }
  return esquisseGenerique(esquisse, parametres)
}

function esquisseCercles(
  esquisse: EsquisseOuverte,
  parametres: Map<string, string>,
): cadompart.v0_2.ISketchFeature {
  const constraints: cadompart.v0_2.ISketchConstraint[] = []
  const curves = esquisse.entites.map((entite, index) => {
    if (!entite.diametre) throw new ErreurFichier('cercle sans cote')
    const valeur = evaluer(entite.diametre, parametres)
    constraints.push({
      id: `diametre-${index}`,
      kind: v0.SketchConstraintKind.SKETCH_CONSTRAINT_DIAMETER,
      curveIndices: [index],
      value: valeur,
      parameterId: lienVariable(entite.diametre),
    })
    if (entite.concentrique) {
      constraints.push({
        id: `concentrique:${index}:${entite.concentrique}`,
        kind: v0.SketchConstraintKind.SKETCH_CONSTRAINT_CONCENTRIC,
        curveIndices: [index],
      })
    }
    return { circle: { id: `cercle-${index}`, center: { x: 0, y: 0 }, radius: valeur / 2 } }
  })
  return { curves, constraints: [...constraints, ...contraintesSymetrie(esquisse)] }
}

function esquisseGenerique(
  esquisse: EsquisseOuverte,
  parametres: Map<string, string>,
): cadompart.v0_2.ISketchFeature {
  const constraints: cadompart.v0_2.ISketchConstraint[] = []
  const curves = esquisse.entites.map((entite, index) => {
    for (const cible of COTES) {
      const expression = entite[cible]
      if (!expression) continue
      constraints.push({
        id: `cote:${index}:${cible}`,
        kind:
          cible === 'diametre'
            ? v0.SketchConstraintKind.SKETCH_CONSTRAINT_DIAMETER
            : cible === 'rayon'
              ? v0.SketchConstraintKind.SKETCH_CONSTRAINT_RADIUS
              : v0.SketchConstraintKind.SKETCH_CONSTRAINT_DISTANCE,
        curveIndices: [index],
        value: evaluer(expression, parametres),
        parameterId: lienVariable(expression),
      })
    }
    if (entite.concentrique) {
      constraints.push({
        id: `concentrique:${index}:${entite.concentrique}`,
        kind: v0.SketchConstraintKind.SKETCH_CONSTRAINT_CONCENTRIC,
        curveIndices: [index],
      })
    }
    if (entite.sorte === 'cercle') {
      if (!entite.diametre) throw new ErreurFichier('cercle sans cote')
      return {
        circle: {
          id: `cercle-${index}`,
          center: { x: 0, y: 0 },
          radius: evaluer(entite.diametre, parametres) / 2,
        },
      }
    }
    if (entite.sorte === 'arc') {
      return {
        arc: {
          id: `arc-${index}`,
          center: { x: 0, y: 0 },
          radius: entite.rayon ? evaluer(entite.rayon, parametres) : 0,
          startAngleRad: 0,
          endAngleRad: Math.PI / 2,
        },
      }
    }
    if (entite.sorte === 'segment') {
      return {
        line: {
          id: `segment-${index}`,
          a: { x: 0, y: 0 },
          b: {
            x: entite.rayon ? evaluer(entite.rayon, parametres) : 0,
            y: entite.hauteur ? evaluer(entite.hauteur, parametres) : 0,
          },
        },
      }
    }
    throw new ErreurFichier('esquisse non enregistrée')
  })
  return { curves, constraints: [...constraints, ...contraintesSymetrie(esquisse)] }
}

function contraintesSymetrie(esquisse: EsquisseOuverte): cadompart.v0_2.ISketchConstraint[] {
  return esquisse.symetries.map((axe) => ({
    id: `symetrie:${axe}`,
    kind: v0.SketchConstraintKind.SKETCH_CONSTRAINT_SYMMETRIC,
    mirrorLineCurveId: axe,
  }))
}

function contrainteCote(id: string, expression: string, valeur: number): cadompart.v0_2.ISketchConstraint {
  return {
    id,
    kind: v0.SketchConstraintKind.SKETCH_CONSTRAINT_DISTANCE,
    value: valeur,
    parameterId: lienVariable(expression),
  }
}

function featureSolide(
  operation: Operation,
  sketchId: string,
  parametres: Map<string, string>,
  rang: number,
): cadompart.v0_2.IFeature {
  const eteint = operation.actif === false
  if (operation.type === 'revolution') {
    return {
      id: `revolve-${rang}`,
      suppressed: eteint,
      revolve: {
        profileSketchId: sketchId,
        axisOrigin: { x: 0, y: 0, z: 0 },
        axisDirection: { x: 0, y: 1, z: 0 },
        endCondition: v0.EndCondition.END_CONDITION_BLIND,
        angleRad: Math.PI * 2,
        merge: true,
      },
    }
  }
  const expression = operation.arguments.expression
  const distance = evaluer(expression, parametres)
  const traverse = operation.arguments.traverse === 'oui'
  return {
    id: `extrude-${rang}`,
    name: lienVariable(expression),
    suppressed: eteint,
    extrude: {
      profileSketchId: sketchId,
      endCondition: traverse
        ? v0.EndCondition.END_CONDITION_THROUGH_ALL
        : v0.EndCondition.END_CONDITION_BLIND,
      distance,
      cut: operation.type === 'enlever',
      merge: true,
    },
  }
}

function expressionSolide(
  nom: string,
  distance: number,
  textes: Map<string, string>,
  echelle: number,
): string {
  const texte = nom.trim()
  if (echelle === 1 && texte && !texte.includes('\n')) {
    try {
      evaluer(texte, textes)
      return texte
    } catch {
      // Un libellé de feature n’est pas une cote.
    }
  }
  return nombre(distance)
}

function lienVariable(expression: string): string {
  const texte = expression.trim()
  if (/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(texte)) return ''
  return texte
}

function poserCote(entite: Entite, cible: string, expression: string) {
  if (!(COTES as readonly string[]).includes(cible)) return
  entite[cible as Cote] = expression
}

function evaluer(expression: string, parametres: Map<string, string>): number {
  try {
    return evaluateurProvisoire.evaluer(expression, parametres)
  } catch (erreur) {
    throw new ErreurFichier(erreur instanceof Error ? erreur.message : 'expression invalide')
  }
}

function nombre(valeur: number): string {
  if (!Number.isFinite(valeur)) throw new ErreurFichier('valeur invalide')
  return String(Math.round(valeur * 1e9) / 1e9)
}

function vec3(vecteur: readonly number[]): cadompart.v0_2.IVec3 {
  return { x: vecteur[0], y: vecteur[1], z: vecteur[2] }
}
