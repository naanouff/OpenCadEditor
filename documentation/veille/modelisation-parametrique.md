# Modélisation paramétrique — vocabulaire

Note de cadrage. Elle décrit les notions qu’un modeleur mécanique manipule, puis situe CADOM par rapport à elles. Elle ne prescrit pas d’architecture de code.

Sources : doctrine OpenCAD sur la branche [develop](https://github.com/naanouff/OpenCAD/tree/develop) (`documentation/opencad-doctrine.md`, 2026-09-16), pratique usuelle de la CAO mécanique. Les outils concrets sont détaillés dans [existant.md](existant.md).

## Ce que l’utilisateur construit

Une pièce mécanique n’est en général pas un maillage dessiné à la main. L’utilisateur décrit une **intention** : une forme de départ, des cotes, des opérations successives. Le logiciel recalcule la forme quand une cote change.

Les notions qui reviennent :

| Notion | Rôle |
|--------|------|
| Esquisse 2D | Profil plan : lignes, arcs, rectangles. C’est le dessin qui sera extrudé, révolutionné ou balayé. |
| Contrainte | Relation imposée dans l’esquisse : coïncidence, horizontalité, tangence, cote. Le solveur déplace les points jusqu’à ce que les relations soient vraies. |
| Feature tree | Historique ordonné des opérations : esquisse, extrusion, perçage, congé, coque, booléen. Chaque ligne dépend des précédentes. |
| Paramètre nommé | Cote réutilisable (`largeur = 40 mm`) branchée sur une ou plusieurs opérations. Changer le paramètre reconstruit la pièce. |
| Édition par historique | On modifie une opération ancienne. Tout ce qui en dépend est recalculé. L’ordre du tree compte. |
| Édition directe | On pousse une face ou on change une cote sur le solide affiché, sans rouvrir l’esquisse d’origine. Le logiciel traduit ce geste en modification de l’historique, ou il abandonne l’historique. |
| Assemblage | Plusieurs pièces placées les unes par rapport aux autres, avec des contraintes de position (coaxialité, appui plan, distance). La géométrie de chaque pièce reste celle de son fichier. |

## Ce qui exige un noyau B-Rep

Le **B-Rep** (boundary representation) décrit un solide par ses faces, arêtes et sommets exacts, pas par un triangle mesh. Les opérations qui produisent ou modifient ce solide exact demandent un noyau (Open CASCADE, Parasolid, ACIS, ou un noyau maison) :

- extrusion, révolution, balayage d’une esquisse vers un solide ;
- congé, chanfrein, coque, dépouille ;
- booléens exacts (union, soustraction, intersection) ;
- mesure analytique (distance entre faces, rayon d’un cylindre) ;
- export STEP fidèle, qui transporte ce B-Rep.

Sans noyau, on peut afficher un maillage, le déplacer et le mesurer approximativement. On ne peut pas reconstruire une pièce quand une cote change, ni produire un STEP éditable par SolidWorks ou FreeCAD.

## Ce qui n’exige pas de noyau

Ces tâches restent du côté du document et de la scène 3D :

- placer des pièces déjà modélisées ailleurs ;
- mémoriser une position (matrice) et un lien vers le fichier géométrique ;
- masquer une pièce, substituer un matériau d’affichage, garder des métadonnées ;
- afficher le maillage tessellé (glTF ou STEP déjà converti en triangles).

Le viewer STEP de w3dts illustre cette frontière : il lit un STEP, le tesselle et le mesure, il ne reconstruit pas l’arbre de fonctions. Voir [existant.md](existant.md).

## Où se placent les formats OpenCAD

CADOM n’est pas un éditeur. C’est le format d’assemblage de la plateforme open source [OpenCAD](https://github.com/naanouff/OpenCAD/tree/develop) : un graphe de travail et d’exploitation. L’éditeur est OpenCadEditor. Il lit et écrit ces formats ; il ne se confond pas avec eux.

La doctrine du 2026-09-16 (branche `develop`) pose deux capacités égales :

| Rôle | Vérité |
|------|--------|
| Graphe d’assemblage | `.cadom` |
| Intention de conception (historique paramétrique) | `.cadompart` |
| Solide exact au recalcul | **occt-kernel** (décision OpenCadEditor 2026-10-10 ; noyau OpenCAD déprécié) |
| Solide exact figé (archive, métrologie) | `.cadombrep` (cache BREP via OCCT) |
| Affichage sans noyau | `.cadomesh` (ou glTF) |
| STEP / AP242 | hors du modèle de vérité : import / échange seulement |

`.cadom` dit « cette occurrence est à cette position, avec ces surcharges ». `.cadompart` dit « extrude cette esquisse, perce, soustrais ». Le moteur B-Rep recalcule le solide. Dans OpenCadEditor, ce moteur est [occt-kernel](../suivi/occt-kernel.md) — détail dans [noyau-occt.md](noyau-occt.md). Le STEP n’est pas la géométrie normative.

OpenCadEditor est le logiciel qui exploite ces fichiers. Il n’est pas le format, et le format n’est pas une interface.
