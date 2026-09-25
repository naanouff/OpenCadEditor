# Sprint 06 — orientation des faces

Porte le côté matière dans la frontière, comme décrit dans [orientation-faces.md](../veille/orientation-faces.md). Le champ est posé dans `packages/api-parametrique` et lu dans `packages/shell`.

## But

Le shell ne devine plus de quel côté est la matière. Chaque face de la frontière porte le sens de sa normale.

## Périmètre

1. Test rouge, puis code : sur le script de la portée, la paroi extérieure porte `dehors` à `1`, le passage et la paroi de poche à `-1`, le fond de poche à `1`, la couronne du dessous à `-1`.
2. `FaceExacte` reçoit `dehors: 1 | -1`, obligatoire. `decrire` le remplit sans nouveau calcul.
3. Test rouge dans le shell : une frontière dont le petit cylindre porte `dehors: 1`, un bossage, donne des normales qui fuient l’axe ; une couronne à `y: 0` avec `dehors: 1` donne des normales vers le haut. Ces deux cas sont faux avec les règles actuelles.
4. `maillage()` lit `face.dehors` pour la normale et pour l’ordre des sommets. `rayonMax` et les tests sur l’altitude disparaissent.
5. Les frontières écrites à la main dans les tests du shell reçoivent le champ.

Hors sprint : soustraction booléenne réelle, portée du fond, cornes, barrette, tube de couronne, canvas de `dessin.ts`, largeur minimale du trait.

## Terminé quand

- Les deux paquets sont verts.
- `documentCad.ts` ne cite plus `rayonMax` ni `face.y > 0`.
- Le script de la carrure puis la portée donnent la même image qu’avant le sprint.
- Le journal dit que la frontière porte le côté matière.
