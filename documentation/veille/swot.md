# SWOT — OpenCadEditor

Périmètre évalué : OpenCadEditor, éditeur web (client Electron prévu) sur le shell `@naanouff/w3dts-viewer-editor` et les extensions EDEX. Il exploite les formats OpenCAD de la branche [develop](https://github.com/naanouff/OpenCAD/tree/develop). CADOM (`.cadom`) est le format d’assemblage, pas l’éditeur. L’intention paramétrique est `.cadompart`, recalculée par **occt-kernel** (bootstrap OpenCAD Kernel K3 — [noyau-occt.md](noyau-occt.md), [feuille-de-route.md](../suivi/feuille-de-route.md)). L’affichage sans noyau est `.cadomesh`. Le STEP est hors du modèle de vérité.

## Forces

- Le rendu WebGPU, la sélection et le shell Dockview existent déjà dans w3dts. OpenCadEditor n’a pas à les réécrire.
- Le viewer STEP du même dépôt lit l’ISO 10303 pour l’import et la consultation. Ce n’est pas le document de travail OpenCAD.
- `.cadom` porte le graphe d’assemblage (transforms column-major, mètres, Y-up). `.cadompart` porte l’historique. Le contrat vient de la doctrine du 2026-09-16, pas d’un MVP sans noyau.
- Electron peut réutiliser le même renderer. Il n’y a pas deux interfaces à maintenir pour le bureau et le navigateur.
- EDEX (`activate`, `registerSystem`, `emitUi`) ajoute des fonctions sans fork du shell.

## Faiblesses

- Le recalcul B-Rep est occt-kernel (filet encore hybride). Pipeline générique + GCS faits ([direction-modeleur.md](direction-modeleur.md)) ; barrette / tube et `noyauProvisoire` restent (P1). Kernel produit OpenCAD = extraction ultérieure (O2), pas un second moteur.
- Le SDK et la spec continuent d’évoluer sur `develop` (CADOM v0.3.3 au moment de la lecture). L’éditeur dépend de ce contrat.
- w3dts affiche des maillages. Il ne recalcule pas un `.cadompart`.
- La connaissance fonctionnelle de la modélisation paramétrique n’est pas acquise dans l’équipe. Copier l’interface d’un SolidWorks sans en comprendre l’arbre de construction produirait un faux modeleur.

## Opportunités

- Les formats séparent déjà le graphe, l’intention, le maillage et le solide figé. L’éditeur peut les exploiter un par un, sans inventer un nouveau document.
- EDEX ajoute une fonction d’édition sans modifier le shell w3dts.
- Le viewer STEP sert à l’import. Le document de travail reste OpenCAD.

## Risques

- Viser un modeleur paramétrique dans le navigateur implique un noyau B-Rep (Open CASCADE / WASM, comme Chili3D, ou un service externe). Ce n’est pas une extension d’affichage : taille, licence, fidélité STEP et solveur de contraintes deviennent le projet.
- Étendre `.cadom` pour y stocker l’arbre de pièce mélangerait l’assemblage et l’intention. L’intention a déjà son fichier : `.cadompart`.
- Prendre le STEP comme géométrie de travail contredit la doctrine : le STEP est un import, pas la vérité OpenCAD.
- Confondre viewer et modeleur dans l’interface : l’utilisateur croit éditer une cote alors qu’il ne déplace qu’un maillage.

## Alternative à trancher

OpenCadEditor exploite des formats. Il n’est pas ces formats. Deux façons de commencer restent ouvertes pour l’éditeur, pas pour le modèle de vérité (les deux capacités sont déjà co-primaires dans la doctrine) :

1. **Exploiter le graphe.** Placer les occurrences, les transforms et les surcharges d’un `.cadom`, afficher le `.cadomesh`. Pas encore de reconstruction.
2. **Exploiter l’intention.** Esquisser, coter, reconstruire via `.cadompart` et **occt-kernel**, puis figer un `.cadombrep` (cache BREP).

La voie 2 est engagée (sprints 03–36). Suite : [feuille-de-route.md](../suivi/feuille-de-route.md). Moteur : [noyau-occt.md](noyau-occt.md).
