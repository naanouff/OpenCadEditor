# Sprint 19 — profil d’élévation des cornes Oyster

Produit le dessus et le dessous en arcs estimés dans [geometrie-cornes-references.md](../veille/geometrie-cornes-references.md) d’après ref10–ref12. Le contour en plan du sprint 18 reste. Le code est dans `packages/api-parametrique` (`solide.ts`, `noyau.ts`, `corne.ts`, `ombre.ts`) ; le shell trace les bords dans `filDeFer`.

## But

Vue de côté, chaque corne dessine un croissant : le dessus descend en arc convexe, le dessous remonte en arc creux, les deux se rejoignent au bout. L’épaisseur au bout vaut environ 40 % de `hauteur_carrure`. Les congés de bout restent. Les quatre barrettes restent ouvertes, percées à mi-épaisseur du bout.

## Cotes retenues

| Paramètre | Rôle | Valeur |
|-----------|------|--------|
| `plongee_bout` | Hauteur du bas du bout au-dessus du fond | `3.2` |
| `epaisseur_bout` | Épaisseur au bout, entre les congés | `2` |

Le bas du bout est à `plongee_bout`, le haut à `plongee_bout + epaisseur_bout`. Le dessus est un arc tangent à y = `hauteur_carrure` à la peau (`diametre_boite / 2`) et passant par le haut du bout ; sa chute vaut `hauteur_carrure - plongee_bout - epaisseur_bout`. Le dessous est un arc tangent à y = 0 à la peau et passant par le bas du bout. Les deux arcs ont pour axe la largeur du bout.

Un arc tangent au dessus descend au plus de son propre débord : la chute est donc bornée à 80 % du débord utile (`longueur_corne - rayon_bout_haut`), et `plongee_bout` remonte d’autant si la valeur demandée descend plus bas. Avec `hauteur_carrure` 8 et `longueur_corne` 4,5, la plongée minimale vaut 3,2.

## Périmètre

1. Test rouge, puis code : l’ajout `profil` porte `plongeeBout` et `epaisseurBout` lus sur les paramètres. Le script de carrure porte les valeurs du tableau. La boîte exacte porte `elevation`.
2. Test rouge : au bout, hors congés, le dessous est à `plongee_bout` ; le dessus est à `plongee_bout + epaisseur_bout`.
3. Test rouge : les sommets du dessus et du dessous entre la peau et le bout suivent leurs arcs ; aucun sommet hors de ces arcs.
4. Test rouge : l’axe de chaque trou de barrette est à mi-épaisseur du bout ; les quatre trous restent ouverts.
5. `pansDeCorne` reçoit le profil d’élévation. Les pans du dessus et du dessous suivent les arcs ; flanc, racine et congés de bout s’appuient sur ces bords. Les pans voisins partagent leurs échantillons.
6. `ombrer` rogne le volume de la corne au-dessus de l’arc haut et au-dessous de l’arc bas. `filDeFer` trace ces bords. Le maillage reste sous la limite des index 16 bits.

Hors sprint : chanfrein poli du flanc (sprint 20), esquisse d’élévation cotée, cotes du profil à l’écran.

## Terminé quand

- Le script de carrure porte `plongee_bout` et `epaisseur_bout`, ainsi que les cotes du plan (`diametre_boite` 36, `longueur_corne` 4,5, `diametre_barrette` 0,9, `diametre_tige` 3).
- `packages/api-parametrique` et `packages/shell` restent verts.
- Le viewport montre des cornes en croissant, proches de ref10, ref11 et ref12.
- Le journal dit que le profil d’élévation suit les références Oyster.
