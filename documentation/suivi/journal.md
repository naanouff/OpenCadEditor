# Journal de suivi

## 2026-09-24 — Cadrage avant développement

- Le document d’assemblage visé est CADOM (dépôt [OpenCAD](https://github.com/naanouff/OpenCAD)) : graphe d’assemblage, transforms, références vers des géométries STEP ou glTF externes. Le fichier `.cadom` ne porte pas la géométrie.
- Le rendu et l’interface viennent de w3dts : shell `@naanouff/w3dts-viewer-editor`, extensions dynamiques EDEX (`@naanouff/w3dts-viewer-extensions`). Le dépôt est présent en sous-module dans `vendor/w3dts`.
- La veille fonctionnelle précède le développement du modeleur. Aucun outil de modélisation n’est engagé tant que cette veille n’a pas été lue.

## 2026-09-24 — Veille rédigée, décision ouverte

Les trois notes sont dans [documentation/veille/](../veille/) :

- [modelisation-parametrique.md](../veille/modelisation-parametrique.md)
- [existant.md](../veille/existant.md)
- [swot.md](../veille/swot.md)

Le SWOT laisse le choix ouvert entre un éditeur d’assemblage CADOM et un modeleur paramétrique. Aucune des deux voies n’est engagée.

## 2026-09-24 — Éditeurs historiques ajoutés à la veille

[existant.md](../veille/existant.md) couvre aussi PTC (Creo, Onshape, Windchill), Dassault Systèmes (CATIA, SOLIDWORKS, 3DEXPERIENCE), Autodesk (Inventor, AutoCAD, Fusion 360) et Siemens (NX, Solid Edge, Teamcenter). Le choix d’MVP reste ouvert.

## 2026-09-24 — Fonctions et matrice comparée

- [fonctionnalites.md](../veille/fonctionnalites.md) liste les capacités de chaque logiciel de la veille.
- [matrice-swot.md](../veille/matrice-swot.md) aligne ces capacités, puis lit le champ en forces, faiblesses, opportunités et risques.

Le choix entre éditeur d’assemblage CADOM et modeleur paramétrique reste ouvert.

## 2026-09-24 — Correction : CADOM est un format

Relecture de la branche [develop](https://github.com/naanouff/OpenCAD/tree/develop), doctrine `documentation/opencad-doctrine.md` (2026-09-16).

- CADOM n’est pas un éditeur. OpenCadEditor exploite les formats.
- `.cadom` : graphe d’assemblage. `.cadompart` : intention paramétrique. Noyau OpenCAD : solide exact au recalcul. `.cadombrep` : solide exact figé. `.cadomesh` : affichage sans noyau.
- Le STEP / AP242 est hors du modèle de vérité OpenCAD.

Les notes de veille ont été alignées sur cette doctrine. L’ordre dans lequel l’éditeur exploite le graphe puis l’intention n’est pas décidé.

## 2026-09-24 — Catalogue du modeleur idéal

[modeleur-ideal.md](../veille/modeleur-ideal.md) reprend les fonctions que les utilisateurs gardent dans chaque logiciel de la veille, puis les réunit. La correction ci-dessus prime sur les formulations plus haut qui présentaient CADOM comme un éditeur ou comme un document sans intention paramétrique.

## 2026-09-24 — Flux de construction, sans décision

[flux-construction-parametrique.md](../veille/flux-construction-parametrique.md) décrit le geste à partir de l’esquisse. Le grand projet est la boîte et le bracelet d’une Milgauss : carrure, lunette, verre, fond, couronne, maillons. Les cotes sont des ordres de grandeur. Le cadran et les marquages restent hors du modèle. Aucun outil ni format n’est choisi.

## 2026-09-24 — Layout consigné, sprint 01 prêt

[maquette/plan-layout.md](../maquette/plan-layout.md) fixe les zones de l’éditeur : ruban, historique, paramètres, viewport, fonction en cours, barre d’état. Neuf propositions y sont ajoutées, à marquer dans la maquette pour pouvoir les retirer : mode esquisse ou solide, couleur du profil, cotes dans la vue, barre près de la sélection, recherche de commande, fil d’Ariane, symétrie des cornes, coupe d’affichage, aperçu fantôme de l’extrusion. [sprints/sprint-01-maquette-layout.md](../sprints/sprint-01-maquette-layout.md) décrit la page statique. Elle est dessinée : [maquette/index.html](../maquette/index.html).

## 2026-09-24 — Veille d’interfaces consignée, sprint 02 prêt

Le layout est trop tôt. [veille/plan-interfaces.md](../veille/plan-interfaces.md) décrit l’observation des interfaces du benchmark. [sprints/sprint-02-veille-interfaces.md](../sprints/sprint-02-veille-interfaces.md) collecte les captures et rédige la note. Cette veille précède toute reprise de la maquette. Les images ne sont pas encore enregistrées.

## 2026-09-24 — Veille d’interfaces écrite

[veille/interfaces.md](../veille/interfaces.md) et les fichiers de [veille/interfaces/](../veille/interfaces/). Creo, Onshape, Fusion 360, FreeCAD et AutoCAD ont une capture de page officielle. Inventor, CATIA, SOLIDWORKS, NX et Solid Edge n’ont pas de figure exploitable : la note garde l’URL et n’invente pas d’écran. SolveSpace est retiré de cette lecture d’écrans. Cette veille précède toute reprise de la maquette.

## 2026-09-25 — API de la carrure consignée, sprint 03 prêt

Le layout reste en attente. [veille/commandes-milgauss.md](../veille/commandes-milgauss.md) fixe les commandes du script de carrure et les fonctions qu’elles appellent. [veille/api-architecture.md](../veille/api-architecture.md) pose le socle : document, historique, registre de domaines, pile d’actions réversible, trois ports. [sprints/sprint-03-api-carrure.md](../sprints/sprint-03-api-carrure.md) code ce socle. Le paquet `packages/api-parametrique` exécute le script de la carrure, annule et refait les commandes, et enregistre un domaine sans modifier la session. Ce socle précède le viewport.

## 2026-09-25 — TDD

La règle de base du développement est le TDD, consignée dans [developpement.md](../developpement.md). Un comportement nouveau commence par un test qui échoue. Les tests du sprint 03 ont été écrits avec le code ; la suite de `packages/api-parametrique` part d’un test rouge.

## 2026-09-25 — Shell consigné, sprint 04 prêt

[shell/plan.md](../shell/plan.md) fixe le premier shell : hôte, registre de panneaux, terminal sur `Session`, port viewport, `maillage()` de l’anneau. [sprints/sprint-04-shell.md](../sprints/sprint-04-shell.md) le code en TDD. Le paquet n’existe pas encore. Ce socle précède le canvas WebGPU.
