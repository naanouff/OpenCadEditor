# Sprint 13 — soustraction booléenne

Calcule l’union et la différence décrites dans [booleen-carrure.md](../veille/booleen-carrure.md). Le code est dans `packages/api-parametrique`. Le shell lit le maillage et en tire les arêtes vives.

## But

La carrure est un seul volume. Les cornes se fondent dans l’anneau, les trous de barrette percent les cornes, et le trou de tige débouche dans le passage intérieur.

## Périmètre

1. Test rouge, puis code. `csg.ts` : deux cubes qui se recouvrent donnent l’union, somme moins intersection. Un cube moins un cylindre central perd le volume de ce cylindre.
2. Test rouge : `volumes.ts` rend le tube, la boîte et le cylindre en maillages fermés. Chaque arête y est partagée par deux triangles. Sur un résultat de BSP, la mesure est le volume et l’absence de triangle plat : les sommets en T restent.
3. Test rouge : après le script complet, aucun sommet de corne ne reste entre le passage et le rayon extérieur sur la hauteur de la collerette.
4. Test rouge : le trou de tige traverse la paroi. Des triangles de rayon 0,6 existent au rayon du passage.
5. `param entrecorne 22` puis `param diametre_boite 42` reconstruisent sans trou dans la surface.
6. `filDeFer` lit le maillage booléen et garde les arêtes dont les deux triangles font un angle net. Un test du shell trouve des arêtes au raccord corne-anneau, absentes du tube nu.

Hors sprint : intersection comme commande, congés, chanfrein de lunette, cotes de rectangle à l’écran, verre, fond, couronne, bracelet, arbre de reprise.

## Terminé quand

- `csg.ts` et `volumes.ts` passent dans `packages/api-parametrique`.
- Le maillage de la carrure est fermé, et les quatre trous de barrette et le trou de tige sont ouverts.
- `packages/shell` reste vert, arêtes vives comprises.
- Le viewport montre un seul volume : plus de boîte à travers l’anneau.
- Le journal dit que le noyau calcule enfin la soustraction.
