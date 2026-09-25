# Sprint 12 — cornes, barrette et tube

Produit les trois figures décrites dans [cornes-barrette-tube.md](../veille/cornes-barrette-tube.md). Le code est dans `packages/api-parametrique` et dans le mailleur de `packages/shell`.

## But

Après les deux portées, les cornes, le trou de barrette et le tube de couronne sont visibles. Les cotes du rectangle et les diamètres du tube les pilotent.

## Périmètre

1. Test rouge, puis code. `cote` retient `ecart`, `debord` et `largeur` sur le rectangle. `extrude` copie le profil évalué sur le solide.
2. Test rouge : préfixe jusqu’aux portées, puis le rectangle, ses trois cotes, les deux symétries, `extrude hauteur_carrure`. La frontière a quatre boîtes. `entrecorne` à 22 mm ne change que l’écart. `diametre_boite` à 42 mm repousse le départ.
3. Test rouge : `esquisse plan.12h`, cercle, `cote diametre diametre_barrette`, `enleve travers largeur_corne`, `symetrie horizontal`. Quatre traversées de rayon 0,75, axe le long de X, au milieu de la hauteur et du débord.
4. Test rouge : `esquisse plan.3h`, cercle, `cote diametre diametre_tube`, `extrude longueur_tube`, puis le cercle de tige et `enleve travers longueur_tube`. Traversée de rayon 2 de 20 à 22 mm, centrée à y = 4. Traversée de rayon 0,6 dans ce tube.
5. `decrire` émet `boite` et `traverse`. Le cylindre vertical et les couronnes des portées restent. Le mailleur et `filDeFer` dessinent ces faces. Un test du shell vérifie des sommets hors de l’anneau.

Hors sprint : soustraction booléenne, congés, perçage de la paroi par le trou de tige, cotes de rectangle à l’écran, chanfrein, verre, fond, bracelet.

## Terminé quand

- Les quatre boîtes, les quatre barrettes et le tube passent dans `packages/api-parametrique`.
- `packages/shell` reste vert, boîte et traversée comprises.
- Le viewport montre les cornes et le tube après ces lignes.
- Le journal dit que la soustraction booléenne reste après.
