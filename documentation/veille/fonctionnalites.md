# Fonctionnalités par logiciel

Liste alignée sur les mêmes capacités, pour comparer ensuite dans [matrice-swot.md](matrice-swot.md). Le contexte (fichier, navigateur) est dans [existant.md](existant.md).

Légende utilisée dans les listes : la capacité est présente, partielle, ou absente du métier principal du logiciel.

## PTC

### Creo Parametric

- Esquisse 2D contrainte.
- Arbre de fonctions et régénération quand une cote change.
- Édition directe limitée à côté de l’historique.
- Paramètres nommés, y compris entre pièce et assemblage.
- Assemblages contraints (placement, mécanismes).
- Mises en plan.
- Solide exact, export STEP.
- Surfaces avancées.
- PMI / MBD dans le modèle.
- API et scripts.
- Pas d’édition native dans une page web tierce.
- PLM associé : Windchill, à part du modeleur.

Source : [Creo](https://www.ptc.com/en/products/creo).

### Onshape

- Esquisse contrainte, feature list, paramètres, assemblages, mises en plan.
- Solide exact, export STEP et Parasolid, sans emporter la feature list.
- Versions et branches dans le document.
- Édition dans le navigateur, noyau hébergé par PTC.
- Pas un viewer de STEP externes : le document Onshape est la source.
- Le PLM léger est le document lui-même, pas Windchill.

Source : [Onshape](https://www.onshape.com/en/).

### Windchill

PLM, pas un modeleur.

- Coffres, versions, droits, nomenclatures, processus de validation.
- Référence les fichiers Creo. Ne crée ni esquisse ni solide.

Source : [Windchill](https://www.ptc.com/en/products/windchill).

## Dassault Systèmes

### CATIA

- Esquisse, arbre de spécification, assemblages de grande taille.
- Surfaces complexes (carrosserie, aéronautique) en plus des solides.
- Paramètres et connaissances métier (règles, catalogues).
- Mises en plan, PMI.
- STEP en échange, pas comme document de travail.
- Client bureau ou plateforme 3DEXPERIENCE, pas une page ouverte.

Source : [CATIA](https://www.3ds.com/products/catia).

### SOLIDWORKS

- Esquisse contrainte, arbre de fonctions, assemblages contraints, mises en plan.
- Paramètres et configurations de pièces.
- Solide exact, STEP sans l’arbre.
- Surfaces et tôlerie présentes, moins centrales que dans CATIA.
- PMI disponibles, moins au cœur du produit que dans CATIA ou NX.
- API (macros). Pas de client web équivalent au bureau.

Source : [SOLIDWORKS](https://www.solidworks.com/).

### 3DEXPERIENCE

Plateforme, pas un modeleur de plus.

- Héberge les documents CATIA et une partie de SOLIDWORKS.
- Collaboration, versions, cycle de vie.
- L’édition géométrique reste celle de CATIA ou de SOLIDWORKS.

Source : [3DEXPERIENCE](https://www.3ds.com/3dexperience).

## Autodesk

### Inventor

- Esquisse contrainte, historique, assemblages, mises en plan.
- Paramètres et iProperties pour les familles de pièces.
- Solide exact, STEP sans historique.
- PMI présentes de façon partielle face à NX ou CATIA.
- API. Client bureau.

Source : [Inventor](https://www.autodesk.com/products/inventor/overview).

### AutoCAD

- Dessin 2D : calques, blocs, cotes, habillage.
- Solides 3D simples, sans feature tree mécanique.
- Le DWG conserve le dessin, pas une intention de pièce reconstruite.
- AutoCAD Web édite le DWG dans le navigateur.
- Ni assemblage contraint de CAO, ni PMI AP242, ni STEP comme document natif.

Source : [AutoCAD](https://www.autodesk.com/products/autocad/overview).

### Fusion 360

- Esquisse, timeline, paramètres nommés, assemblages.
- Mises en plan.
- Solides exacts et maillages dans le même document, plus un volet fabrication.
- Export STEP / f3d : la timeline ne voyage pas.
- Édition dans le client Autodesk (bureau ou web selon l’offre), pas dans une page tierce.

Source : [Fusion](https://www.autodesk.com/products/fusion-360/overview).

## Siemens

### NX

- Historique ordonné et synchronous technology (édition directe, y compris sur un solide importé sans arbre).
- Esquisse contrainte, assemblages, mises en plan.
- Surfaces complexes, PMI / MBD, STEP et JT.
- API. Client bureau.
- PLM associé : Teamcenter.

Source : [NX](https://www.siemens.com/en-us/products/nx/).

### Solid Edge

- Ordered (historique) et synchronous (édition directe), même couple que NX sur un périmètre plus proche de SOLIDWORKS.
- Esquisse, assemblages contraints, mises en plan, STEP.
- PMI moins centrales que dans NX.
- Client bureau.

Source : [Solid Edge](https://www.siemens.com/en-us/products/solid-edge/).

### Teamcenter

PLM, pas un modeleur.

- Référentiel NX et Solid Edge, nomenclatures, processus, visualisation JT.
- Ne reconstruit pas une pièce.

Source : [Teamcenter](https://www.siemens.com/en-us/products/teamcenter/).

## Outils ouverts, code et navigateur

### FreeCAD

- Esquisse contrainte (Sketcher) et feature tree (PartDesign).
- Assemblage dans un atelier séparé, moins unifié que SOLIDWORKS.
- Mises en plan (TechDraw), STEP via Open CASCADE.
- Surfaces et PMI partielles.
- Python. Bureau. Pas le logiciel de référence en page web.

Source : [FreeCAD](https://www.freecad.org/).

### SolveSpace

- Esquisses et solides contraints, petits assemblages.
- Paramètres par les cotes du solveur.
- Export STEP / STL. Mises en plan sommaires.
- Pas de surfaces complexes, pas de PMI, pas de navigateur.
- Le solveur est le produit.

Source : [SolveSpace](https://solvespace.com/).

### OpenSCAD

- Le modèle est un script : primitives, transformations, booléens, variables.
- Pas d’esquisse interactive, pas d’arbre graphique, pas d’assemblage contraint, pas de mise en plan.
- L’export usuel est un maillage (STL), pas un feature tree.
- Bureau.

Source : [OpenSCAD](https://openscad.org/).

### CadQuery

- Script Python : esquisses, extrusions, sélecteurs de faces, paramètres dans le code.
- Solide exact et STEP via Open CASCADE.
- Pas de mise en plan, pas de PMI, pas d’interface de timeline.
- Édition naturelle : un éditeur de texte. Exécution possible hors navigateur ou via WASM, sans shell CAO.

Source : [CadQuery](https://cadquery.readthedocs.io/).

### Chili3D

- Opérations de solide dans le navigateur, noyau Open CASCADE en WebAssembly, affichage Three.js.
- Esquisse et historique présents mais loin d’une CAO industrielle (pas de mise en plan, pas de PMI, assemblage limité).
- Le document et le noyau sont dans la page : c’est un modeleur, pas un viewer.

Source : [Chili3D](https://github.com/xiangechen/chili3d).

### Viewer STEP w3dts

D’après [l’analyse fonctionnelle](../../vendor/w3dts/documentation/domains/step-viewer/functional-analysis.md) (2026-05-27).

- Ouverture STEP AP203 / AP214 / AP242, tessellation, affichage WebGPU.
- Sélection de faces, PMI AP242 en lecture, mesures.
- Unités mètre, passage Z-up vers Y-up.
- Pas d’esquisse, pas d’arbre, pas de modification de cote, pas de réécriture du STEP.
- TOROIDAL / NURBS incomplets.

### Formats OpenCAD (pas un éditeur)

D’après la doctrine sur [develop](https://github.com/naanouff/OpenCAD/tree/develop) (2026-09-16). CADOM est un format de travail et d’exploitation. L’édition est le rôle d’OpenCadEditor.

- `.cadom` : graphe d’assemblage plat (UUID), transforms, surcharges non destructives, extensions opaques, chargement tardif.
- `.cadompart` : intention paramétrique (esquisse, extrusion, révolution, trou, booléen dans le périmètre Required du noyau).
- `.cadombrep` : solide exact figé, produit par le noyau, pour l’archive et la métrologie.
- `.cadomesh` : affichage sans noyau.
- Le STEP n’est pas la géométrie normative. Il peut entrer à l’import ; les écrits OpenCAD ne le posent pas comme vérité.
- Pas de mise en plan dans ces formats. Les contraintes d’assemblage sont une extension prévue, pas le cœur du `.cadom`.
