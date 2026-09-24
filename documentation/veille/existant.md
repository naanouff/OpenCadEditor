# Veille de l’existant

Pour chaque outil : ce que l’utilisateur fait, ce que le fichier conserve, ce qu’un navigateur peut raisonnablement reprendre. Le vocabulaire est dans [modelisation-parametrique.md](modelisation-parametrique.md).

## Éditeurs historiques

PTC, Dassault Systèmes, Autodesk et Siemens couvrent à eux quatre la CAO mécanique industrielle. Chacun sépare le modeleur (la pièce et l’assemblage) du PLM (les versions, la nomenclature, les droits). Le PLM n’édite pas la géométrie : il range les fichiers du modeleur.

### PTC

#### Creo Parametric

- **Utilisateur.** Esquisses contraintes, feature tree, assemblages, tôlerie et mécanismes. Les paramètres nommés relient les cotes d’une pièce à celles d’une autre.
- **Fichier.** `.prt` / `.asm` propriétaires. L’historique reste dans Creo. L’échange courant est STEP ou Creo View pour la consultation.
- **Navigateur.** Creo est un client bureau. Creo View et les exports STEP/glTF se consultent ailleurs ; ils ne réouvrent pas l’arbre de fonctions.
- Source : [Creo](https://www.ptc.com/en/products/creo).

#### Onshape

- **Utilisateur.** Même geste que la CAO classique (esquisse, feature list, assemblage), entièrement dans le navigateur, avec versions et branches façon dépôt.
- **Fichier.** Document serveur PTC. L’historique paramétrique vit chez Onshape. L’export STEP ou Parasolid sort le solide, pas la feature list.
- **Navigateur.** Preuve qu’une CAO paramétrique complète peut tourner dans une page, au prix d’un noyau et d’un solveur hébergés par l’éditeur. Ce n’est pas un viewer de fichiers externes.
- Source : [Onshape](https://www.onshape.com/en/) (produit PTC).

Windchill est le PLM PTC : il référence les documents Creo, il ne les modèle pas. Source : [Windchill](https://www.ptc.com/en/products/windchill).

### Dassault Systèmes

#### CATIA

- **Utilisateur.** CAO haut de gamme : surfaces complexes, solides, assemblages de très grande taille, lien fort avec le process industriel. L’arbre de spécification joue le rôle du feature tree.
- **Fichier.** `.CATPart` / `.CATProduct`, ou document 3DEXPERIENCE. Le STEP exporte le solide exact, pas l’arbre CATIA.
- **Navigateur.** L’édition reste le client CATIA ou la plateforme 3DEXPERIENCE. Un viewer web tiers n’affiche qu’un export.
- Source : [CATIA](https://www.3ds.com/products/catia).

#### SOLIDWORKS

- **Utilisateur.** Esquisses contraintes, arbre de fonctions (extrusion, perçage, congé), assemblages avec contraintes de position, mises en plan.
- **Fichier.** `.sldprt` / `.sldasm` propriétaires. L’historique paramétrique et les contraintes restent dans le format éditeur. L’échange passe par STEP, qui garde le solide exact et perd en général l’arbre de construction.
- **Navigateur.** Pas de client web équivalent au bureau. Un navigateur peut afficher un STEP ou un glTF exporté. Il ne réédite pas le feature tree SOLIDWORKS.
- Source : [SOLIDWORKS](https://www.solidworks.com/) (Dassault Systèmes).

La plateforme [3DEXPERIENCE](https://www.3ds.com/3dexperience) héberge CATIA et une partie de SOLIDWORKS. Elle gère le document et la collaboration ; le modeleur reste celui de CATIA ou de SOLIDWORKS.

### Autodesk

#### Inventor

- **Utilisateur.** Pièces paramétriques, assemblages contraints, mises en plan. Les iProperties et les paramètres nommés portent les cotes d’une famille de pièces.
- **Fichier.** `.ipt` / `.iam`. L’historique Inventor ne survit pas à un STEP.
- **Navigateur.** Client bureau. La consultation web passe par un export ou par les viewers Autodesk, pas par une réédition de l’arbre.
- Source : [Inventor](https://www.autodesk.com/products/inventor/overview).

#### AutoCAD

- **Utilisateur.** Dessin 2D et géométrie 3D (solides ACIS simples, blocs, cotes). Ce n’est pas un feature tree de pièce mécanique au sens de Creo ou de CATIA : le fichier décrit le dessin plus que l’historique de construction.
- **Fichier.** `.dwg` / `.dxf`. Très répandu pour le plan, peu comme source d’un assemblage STEP.
- **Navigateur.** AutoCAD Web consulte et édite des DWG. Cela ne donne pas un modeleur B-Rep paramétrique.
- Source : [AutoCAD](https://www.autodesk.com/products/autocad/overview).

#### Fusion 360

- **Utilisateur.** Timeline (historique) plus paramètres nommés. Esquisse, solides, assemblages, parfois du maillage et de la fabrication dans le même document.
- **Fichier.** Document cloud Autodesk. L’export STEP / f3d ne transporte pas toute la timeline vers un autre logiciel.
- **Navigateur.** L’édition se fait dans le client Autodesk (bureau ou web selon l’offre), pas dans une page tierce. Un viewer web ne récupère que la géométrie exportée.
- Source : [Fusion 360](https://www.autodesk.com/products/fusion-360/overview).

### Siemens

#### NX

- **Utilisateur.** CAO haut de gamme. Deux gestes coexistent : l’historique ordonné (esquisse puis opérations) et la synchronous technology (pousser une face sur le solide affiché, y compris un solide importé sans arbre).
- **Fichier.** `.prt` Siemens. L’intention paramétrique reste dans NX. STEP et JT servent à l’échange et à la visualisation légère.
- **Navigateur.** NX est un client bureau. JT et STEP se visualisent sans réouvrir le modèle synchrone ni l’historique.
- Source : [NX](https://www.siemens.com/en-us/products/nx/).

#### Solid Edge

- **Utilisateur.** Même double geste que NX, sur un périmètre plus proche de SOLIDWORKS ou d’Inventor : ordered (historique) et synchronous (édition directe).
- **Fichier.** `.par` / `.asm`. L’export STEP perd les deux modes d’édition.
- **Navigateur.** Client bureau. Pas d’édition paramétrique dans une page tierce.
- Source : [Solid Edge](https://www.siemens.com/en-us/products/solid-edge/).

Teamcenter est le PLM Siemens : il référence les documents NX et Solid Edge. Source : [Teamcenter](https://www.siemens.com/en-us/products/teamcenter/).

### FreeCAD

- **Utilisateur.** Ateliers séparés. PartDesign et Sketcher couvrent l’esquisse contrainte et le feature tree. L’assemblage est un atelier distinct, moins unifié que dans SolidWorks.
- **Fichier.** `.FCStd` (zip) conserve l’arbre paramétrique FreeCAD. L’échange reste STEP / IGES.
- **Navigateur.** Application bureau (Python, noyau Open CASCADE). Des portages WASM existent en expérimentation ; le logiciel de référence n’est pas une page web.
- Source : [FreeCAD](https://www.freecad.org/), atelier [PartDesign](https://wiki.freecad.org/PartDesign_Workbench).

### SolveSpace

- **Utilisateur.** Esquisses et solides contraints dans un modèle léger. Le solveur de contraintes est le cœur du produit, y compris pour de petits assemblages.
- **Fichier.** Format propre, plus export STEP / STL. Le modèle reste paramétrique tant qu’on reste dans SolveSpace.
- **Navigateur.** Application native, pas un client web. Utile comme référence de solveur 2D/3D simple, pas comme shell.
- Source : [SolveSpace](https://solvespace.com/).

## Modélisation par le code

### OpenSCAD

- **Utilisateur.** Le modèle est un script (primitives, booléens, variables). Il n’y a pas d’esquisse interactive : on édite le texte, on prévisualise le maillage.
- **Fichier.** Le `.scad` est la source. L’export STL est un maillage, sans historique réimportable.
- **Navigateur.** Le programme est bureau. Le principe (source texte, preview) se porte bien sur le web ; le noyau CSG d’OpenSCAD, moins.
- Source : [OpenSCAD](https://openscad.org/).

### CadQuery

- **Utilisateur.** Script Python qui construit un solide exact (esquisses, extrusions, sélecteurs de faces). La pièce est paramétrique parce que le code l’est.
- **Fichier.** Le script est la source. L’export STEP porte le B-Rep, pas le script.
- **Navigateur.** S’appuie sur Open CASCADE via OCP. Exécutable côté serveur ou WASM ; l’édition naturelle reste un éditeur de code, pas une timeline graphique.
- Source : [CadQuery](https://cadquery.readthedocs.io/).

## Dans le navigateur

### Chili3D

- **Utilisateur.** Modélisation 3D dans le navigateur : opérations de solide proches d’une CAO (via Open CASCADE compilé en WebAssembly) et affichage Three.js.
- **Fichier.** Le projet vise un document éditable côté client. La géométrie exacte dépend du noyau OCCT/WASM, pas d’un simple glTF.
- **Navigateur.** C’est le précédent le plus proche d’un modeleur paramétrique web : noyau B-Rep dans la page, monorepo TypeScript. Le coût est la taille du WASM et la surface d’API du noyau.
- Source : [xiangechen/chili3d](https://github.com/xiangechen/chili3d).

### Viewer STEP w3dts

Déjà dans le sous-module, package `@naanouff/w3dts-step-viewer`. Analyse interne : [functional-analysis.md](../../vendor/w3dts/documentation/domains/step-viewer/functional-analysis.md) (2026-05-27).

- **Utilisateur.** Ouvre un fichier STEP, le regarde, sélectionne des faces, lit des PMI AP242, prend des mesures. Il ne crée pas d’esquisse et ne modifie pas une cote de construction.
- **Fichier.** STEP ISO 10303-21 (AP203 / AP214 / AP242) parsé hors thread, tessellé (`coarse` / `normal` / `fine`), affiché en WebGPU. Les unités sont ramenées au mètre, la frame Z-up vers Y-up. Les surfaces toriques et NURBS ne sont pas toutes supportées.
- **Navigateur.** C’est un viewer, pas un modeleur. Il montre ce qu’on peut reprendre sans noyau d’édition : lecture STEP, maillage, sélection, mesure. Reconstruire un feature tree ou réécrire le STEP après une cote modifiée sort de ce périmètre.

## Lecture commune

| Famille | Conserve l’intention paramétrique | Tient dans une page web sans noyau |
|---------|-----------------------------------|-------------------------------------|
| Creo, CATIA, SOLIDWORKS, Inventor, Fusion, NX, Solid Edge, Onshape, FreeCAD | Oui, dans leur document | Non pour l’édition ; oui pour un export STEP/glTF affiché. Onshape et une partie de Fusion s’éditent dans le navigateur de l’éditeur, pas dans une page tierce |
| AutoCAD | Le DWG garde le dessin, pas un feature tree mécanique | AutoCAD Web édite le DWG ; ce n’est pas un modeleur de solide paramétrique |
| OpenSCAD, CadQuery | Oui, dans le script | Seulement si le script et le noyau tournent dans la page ou sur un serveur |
| Chili3D | Oui, si le document et OCCT/WASM sont là | Oui, au prix du noyau embarqué |
| Viewer STEP w3dts | Non : il consulte un STEP | Oui pour la consultation |
| Formats OpenCAD | Oui dans `.cadompart`, recalculée par le noyau | Les fichiers oui ; l’éditeur qui les exploite est OpenCadEditor |

Un navigateur reprend facilement la **consultation** et le **placement** de géométries déjà produites. Il ne reprend l’**édition paramétrique** que si l’on embarque un noyau et un solveur, ou si l’on réduit le modèle à un script exécuté ailleurs.
