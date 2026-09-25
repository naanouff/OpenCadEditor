# Cornes, barrette et tube

L’anneau, la portée de lunette et la portée du fond sont déjà dans `decrire`. La suite du script de [commandes-milgauss.md](commandes-milgauss.md) est les cornes, le trou de barrette et le tube de couronne. Le geste est dans [flux-construction-parametrique.md](flux-construction-parametrique.md). Le sprint qui le code est [sprint 12](../sprints/sprint-12-cornes-barrette-tube.md).

```
esquisse plan.dessus
rectangle
cote ecart entrecorne
cote debord longueur_corne
cote largeur largeur_corne
symetrie vertical
symetrie horizontal
extrude hauteur_carrure

esquisse plan.12h
cercle
cote diametre diametre_barrette
enleve travers largeur_corne
symetrie horizontal

esquisse plan.3h
cercle
cote diametre diametre_tube
extrude longueur_tube
cercle
concentrique tube
cote diametre diametre_tige
enleve travers longueur_tube
```

Ces lignes sont dans l’historique. `decrire` ne les dessine pas. `FaceExacte` ne connaît qu’un cylindre vertical et une couronne. `cote` ne retient que `diametre`. `extrude` n’incrémente qu’un compteur. `enleve travers` est stocké et ignoré.

Hors de cet incrément : soustraction booléenne, congés, chanfrein de lunette, verre, fond vissé, bracelet.

## Géométrie

Les figures sont écrites d’avance, comme les deux portées. Elles ne sont pas le résultat d’une soustraction.

Les cornes sont quatre boîtes, de `y = 0` à `hauteur_carrure`. Elles partent du cercle extérieur (`diametre_boite / 2`) et dépassent de `longueur_corne`. L’écart intérieur d’une paire est `entrecorne`, la largeur `largeur_corne`. Une paire est à 12 h, l’autre à 6 h, par symétrie. `diametre_boite` repousse leur départ. `entrecorne` ne change que l’écart.

La barrette est un cylindre d’axe 3 h–9 h, diamètre `diametre_barrette` (1,5 mm), à travers chaque corne. L’axe passe au milieu de la hauteur et au milieu du débord. Le script n’a pas de cote de position : ce milieu est la position pédagogique. Quatre trous, un par corne.

Le tube est un cylindre d’axe 3 h–9 h, rayon `diametre_tube / 2` (2 mm), depuis l’extérieur jusqu’à `longueur_tube` (2 mm), centré à mi-hauteur. Le trou de tige, rayon `diametre_tige / 2` (0,6 mm), traverse ce tube. Il est dessiné dans le tube. Il ne perce pas le maillage de la paroi de la carrure.

## Données

`EntiteEsquisse` retient `ecart`, `debord` et `largeur`, comme `diametre` pour le cercle. À l’`extrude`, le profil évalué est copié sur le solide : support, cotes, longueur. `decrire` lit cet ajout et les enlèvements déjà stockés avec `traverse`.

Deux faces nouvelles, sans changer le cylindre vertical :

- `boite`, bornes `x`, `y`, `z` ;
- `traverse`, axe `x`, rayon, `debut`, `fin`, centre `y` et `z`, `dehors`.

Le mailleur de [documentCad.ts](../../packages/shell/src/documentCad.ts) dessine les six faces de la boîte et le cylindre le long de X. `filDeFer` ajoute les arêtes de la boîte et les deux cercles de la traversée. La boîte de cadrage ±30 mm contient le débord (25 mm) et le tube (22 mm).

## Tests

Un test rouge, d’abord, enchaîne le rectangle jusqu’à `extrude hauteur_carrure` : quatre boîtes. `entrecorne` à 22 mm ne change que l’écart. `diametre_boite` à 42 mm repousse le départ.

Le suivant enchaîne `enleve travers` de la barrette : quatre traversées de rayon 0,75.

Le dernier enchaîne l’extrusion du tube puis le trou de tige : traversée de rayon 2, de 20 à 22 mm, et traversée de rayon 0,6. Un test du shell vérifie qu’une boîte et une traversée posent des sommets hors de l’anneau.
