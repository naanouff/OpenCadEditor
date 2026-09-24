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
