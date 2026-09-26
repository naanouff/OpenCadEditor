# Sprint 14 — faces rognées

Porte le booléen sur les faces exactes, comme décrit dans [faces-rognees.md](../veille/faces-rognees.md). Le code est dans `packages/api-parametrique`. Le shell tessellise face par face et trace les courbes de la topologie.

## But

La carrure reste un seul volume, avec une paroi ronde et des cercles nets. La finesse suit une flèche en millimètres, pas un nombre de segments.

## Périmètre

1. Test rouge, puis code. Une face porte des contours dans son espace : `u` et `v` sur un plan, angle et longueur sur un cylindre. Une face sans contour est entière.
2. Test rouge : la joue d’une corne est rognée par la paroi. Son contour s’arrête à deux sommets au rayon extérieur. La paroi perd la fenêtre angulaire occupée par la corne.
3. Test rouge : le dessus de l’anneau et le dessus des quatre cornes forment une seule face. L’aire de son contour vaut la couronne plus les quatre empreintes, moins leur recouvrement.
4. Test rouge : le trou de tige rogne la paroi et le passage. La courbe est paramétrée par l’angle du petit cylindre, et son sommet a la même cote sur les deux faces.
5. Test rouge : la tessellation suit la flèche. À 0,2 mm la paroi a moins de pans qu’à 0,02 mm, et l’écart au rayon exact reste sous la flèche demandée. Les normales d’un cylindre sont radiales, celles d’un plan constantes.
6. Le fil de fer vient des contours. Les cercles des couronnes sont à la tolérance des courbes, sans les cordes de la paroi. `aretesVives` sort du chemin d’affichage.

Hors sprint : congés, silhouettes, arêtes tangentes, surfaces autres que plan et cylindre, intersection comme commande. L’arbre BSP reste pour mesurer un volume dans les tests.

## Terminé quand

- Les contours et la tessellation à flèche passent dans `packages/api-parametrique`.
- Le maillage de la carrure garde les cornes fondues, les quatre trous de barrette ouverts et la tige à travers la paroi.
- `packages/shell` reste vert.
- Le viewport montre une paroi ronde et des cercles nets.
- Le journal dit que le booléen porte sur les faces, et que le maillage n’est plus qu’un affichage.
