# Portée de lunette

L’anneau est déjà un tube : deux cylindres et deux couronnes, décrits par [le noyau provisoire](../../packages/api-parametrique/src/noyau.ts). La suite du script de [commandes-milgauss.md](commandes-milgauss.md), et seule cette suite, est la portée du dessus. Le geste est dans [flux-construction-parametrique.md](flux-construction-parametrique.md). Le sprint qui le code est [sprint 05](../sprints/sprint-05-portee-lunette.md).

```
esquisse face.dessus
cercle
concentrique anneau
cote diametre diametre_lunette
enleve profondeur_lunette
```

`diametre_lunette` vaut 36 mm. Il tombe entre le passage (35 mm) et l’extérieur (40 mm). L’enlèvement de `profondeur_lunette` (1,2 mm) ne retire que l’anneau de matière entre le passage et ce cercle. La face du dessus devient un épaulement.

Hors de cet incrément : portée du fond, cornes, trou de barrette, tube de couronne. `diametre_fond` (34 mm) est plus petit que le passage ; ce cas attend la portée du fond.

## Géométrie

`decrire` lit les paramètres, comme pour l’anneau. Tant que le solide n’a aucun enlèvement borgne, les quatre faces du tube restent. Dès le premier enlèvement borgne, la frontière est :

- cylindre extérieur, rayon `diametre_boite / 2`, de 0 à `hauteur_carrure` ;
- cylindre du passage, rayon `diametre_boite / 2 - epaisseur_paroi`, sur toute la hauteur ;
- cylindre d’épaulement, rayon `diametre_lunette / 2`, de `hauteur_carrure - profondeur_lunette` à `hauteur_carrure` ;
- couronne du dessous, inchangée, à y = 0 ;
- couronne restante du dessus, du rayon de lunette au rayon extérieur, à y = `hauteur_carrure` ;
- couronne du fond de poche, du passage au rayon de lunette, à y = `hauteur_carrure - profondeur_lunette`.

Les types `cylindre` et `couronne` suffisent. Le mailleur du shell les dessine déjà : un cylindre qui n’est pas le plus grand a sa normale vers l’axe, une couronne à y > 0 a sa normale vers le haut.

## Tests

Le test des faces exactes du tube s’arrête à `extrude hauteur_carrure`. Un test nouveau, rouge d’abord, enchaîne les cinq lignes : cylindre de rayon 18 dont le bas est à 6,8, couronne du dessus de rayon intérieur 18, couronne à y = 6,8. `diametre_lunette` à 38 mm porte le rayon d’épaulement à 19. `profondeur_lunette` à 2 mm porte le fond de poche à y = 6.
