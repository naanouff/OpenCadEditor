# Sprint 20 — élévation elliptique des cornes

Remplace les arcs de cercle du sprint 19 par des quarts d’ellipse, pour que la corne plonge autant que le montrent [ref12](../references/ref12.jpg) et la vue de côté de [plan01.jpg](../references/plan01.jpg). Le contour en plan du sprint 18 reste. Le code est dans `packages/api-parametrique` (`corne.ts`, `ombre.ts`, `volumes.ts`).

## But

La vue de côté du plan montre une arête haute qui quitte le flanc **en haut de la carrure** et rejoint le bout 5,5 mm plus bas, sur 4,5 mm de débord. Un arc de cercle tangent à l’horizontale ne descend jamais plus que son propre débord : le sprint 19 plafonnait donc la chute à 2,8 mm, et le bout restait au-dessus de la mi-hauteur. L’arche `(1 + cos πt) / 2` descend autant qu’on veut, garde la tangente horizontale à la peau et la retrouve au bout : la corne y est une lame, et le trou de barrette la perce.

## Géométrie

Le dessus est le quart d’ellipse de demi-axes `débord utile` et `chute` :

```
y(u) = yBoutHaut + chute · (1 + cos(π · d / débord)) / 2,  d = u − rayonPeau
```

L’arche vaut `hauteur_carrure` à la peau, la mi-chute à mi-débord, et `plongee_bout + epaisseur_bout` au bout, avec une tangente horizontale aux deux extrémités. Le quart d’ellipse, vertical au bout, laissait un mur puis une boule autour du trou ; l’arche garde le bout en lame. Le dessous suit la même loi, d’amplitude `plongee_bout`. Les congés de bout restent en deçà du trou : `rayon_bout_haut` 0,4 et `rayon_bout_bas` 0,2.

## Cotes retenues

| Paramètre | Rôle | Valeur |
|-----------|------|--------|
| `plongee_bout` | Hauteur du bas du bout au-dessus du fond | `0.5` |
| `epaisseur_bout` | Épaisseur au bout, entre les congés | `2` |

La corne occupe toute la hauteur de la carrure à la racine : il n’y a pas de paramètre d’épaisseur de racine.

## Périmètre

1. Test rouge, puis code : `geometrieElevation` rend les deux quarts d’ellipse et leurs pentes. La chute dépasse le débord sans borne ; `yHautPlan` vaut `hauteur_carrure` à la peau et `plongee_bout + epaisseur_bout` au bout.
2. Test rouge : les pans du dessus et du dessous suivent l’ellipse, échantillonnés par angle pour que la partie verticale du bout reste lisse. Leurs normales suivent la pente.
3. Test rouge : sur le maillage complet, la corne touche `hauteur_carrure` à la racine, aucun sommet ne sort au-dessus de l’ellipse, et le bout tient entre `plongee_bout` et `plongee_bout + epaisseur_bout`.
4. `volumes.ts` gagne un prisme fermé le long de x, décrit colonne par colonne : c’est le rognage d’un profil quelconque, l’ellipse comprise.
5. `ombrer` rogne la corne au-dessus de l’ellipse haute et au-dessous de l’ellipse basse avec ce prisme, à partir de la peau pour laisser l’anneau entier.
6. Le maillage reste sous la limite des index 16 bits.

Hors sprint : chanfrein poli du flanc, gradins de lunette et de fond visibles de profil, filetage de fond M28 × 0,5, dépassement du tube de couronne.

## Terminé quand

- Le script de carrure porte `plongee_bout` 0,5 et `epaisseur_bout` 2, sans borne sur la chute.
- `packages/api-parametrique` et `packages/shell` restent verts.
- Le viewport montre une corne qui sort du flanc sur toute la hauteur et dont le bout plonge au ras du fond, comme la vue de côté du plan.
- Le journal dit que l’élévation est elliptique.
