# Sprint 18 — contour en plan des cornes Oyster

Produit le contour en plan estimé dans [geometrie-cornes-references.md](../veille/geometrie-cornes-references.md) : corne en coin effilé, flanc droit, congé creux à la racine. Le code est dans `packages/api-parametrique` (`solide.ts`, `noyau.ts`, `corne.ts`, `ombre.ts`) ; le shell trace le contour dans `filDeFer`.

## But

Vue de dessus, chaque corne part large de l’anneau et s’effile jusqu’à un bout étroit. Le flanc extérieur est un plan droit ; il rejoint la peau par un congé creux. La face intérieure reste droite à `entrecorne / 2`. Les congés de bout en élévation restent. Les quatre barrettes restent ouvertes, percées près du bout.

## Cotes retenues

Le noyau mesure le débord depuis `diametre_boite / 2`, le long de l’axe 12 h–6 h. La note mesure 7,5 mm depuis la peau en face du bout ; la peau y vaut 16,6 mm, le bout tombe donc à 24,1 mm du centre, soit un débord noyau de 4,2 mm.

Le flanc est la droite qui joint le coin extérieur du bout au point de la peau situé à `largeur_racine` de la face intérieure. Son angle découle des deux largeurs : 17° avec l’axe. La mesure directe de 22° sert de contrôle ; à 22°, la droite passe à 20,4 mm du centre et manque la peau, les deux largeurs font donc foi.

| Paramètre | Rôle | Valeur |
|-----------|------|--------|
| `longueur_corne` | Débord du bout depuis `diametre_boite / 2` | `4.2` |
| `largeur_bout` | Largeur au bout, remplace `largeur_corne` | `2.2` |
| `largeur_racine` | Largeur à la peau, avant le congé | `6` |
| `rayon_racine` | Congé creux flanc / peau | `3` |
| `rayon_bout_haut` | Congé haut du bout | `1` |
| `rayon_bout_bas` | Congé bas du bout | `0.8` |
| `diametre_barrette` | Trou de barrette | `1.1` |
| `recul_barrette` | Axe du trou, compté depuis le bout | `1.2` |

`rayon_joue` sort du script : le plan de flanc prend la place du cylindre de joue.

## Esquisse

Le geste reste esquisse → cotes → extrude. Le profil en plan devient :

```text
esquisse plan.dessus
segment
cote ecart entrecorne
segment
cote debord longueur_corne
cote largeur largeur_bout
segment
cote largeur largeur_racine
arc
cote rayon rayon_racine
arc
concentrique cercle.exterieur
symetrie vertical
symetrie horizontal
extrude hauteur_carrure
```

Le premier segment est la face intérieure, le deuxième le bout, le troisième le flanc. Le premier arc est le congé de racine, le second l’appui sur la peau.

## Périmètre

1. Test rouge, puis code : l’ajout `profil` porte `largeurBout`, `largeurRacine` et `rayonRacine` lus sur les segments et l’arc cotés. Le script de carrure porte les valeurs du tableau.
2. Test rouge : au débord du bout, la corne mesure `largeur_bout` ; tous les sommets restent du côté intérieur du plan de flanc ; aucun sommet au coin extérieur de l’ancien rectangle.
3. Test rouge : les sommets du congé de racine sont à `rayon_racine` de son axe ; cet axe est à `diametre_boite / 2 + rayon_racine` du centre et à `rayon_racine` du plan de flanc.
4. Test rouge : l’axe de chaque trou de barrette est à `recul_barrette` du bout, à mi-hauteur du bout ; les quatre trous restent ouverts avec `diametre_barrette` 1,1.
5. `pansDeCorne` reçoit le profil en plan (face intérieure, flanc, congé de racine) à la place de `rayonJoue`. Le pan de flanc remplace la joue et le côté extérieur ; le congé de racine est un pan cylindrique creux d’axe Y. Les pans voisins partagent leurs échantillons, comme au sprint 17.
6. `ombrer` et `filDeFer` maillent et tracent le flanc et le congé de racine. Un test du shell trouve le segment de flanc et l’arc de racine. Le maillage reste sous la limite des index 16 bits.

Hors sprint : dessous creusé en arc et chute du dessus (sprint 19), chanfrein poli du flanc (sprint 20), esquisse d’élévation cotée, cotes du profil à l’écran.

## Terminé quand

- Le script de carrure porte les paramètres du tableau.
- `packages/api-parametrique` et `packages/shell` restent verts.
- Le viewport montre des cornes effilées, flanc droit et racine creuse, proches de ref02 et ref08.
- Le journal dit que le contour en plan suit les références Oyster.
