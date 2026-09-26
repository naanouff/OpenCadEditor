# Géométrie des cornes d’après les références

Les neuf photos de [references/](../references/) montrent une carrure de type Oyster (réf. 1500) : anneau lisse, remontoir à 3 h, quatre cornes effilées. Cette note estime la forme des cornes pour la prochaine évolution du profil. Elle complète [profil-cornes.md](profil-cornes.md) (joue en plan) et [profil-elevation-cornes.md](profil-elevation-cornes.md) (congés de bout).

## Méthode

L’échelle vient du diamètre extérieur de l’anneau, pris égal à `diametre_boite`. Les mesures sont relevées en pixels sur les vues de dessus (ref02, ref08) et de côté (ref06, ref07), puis ramenées à ce diamètre. La précision est de l’ordre de 0,5 mm ; les valeurs servent de point de départ pédagogique.

| Photo | Vue | Sert à |
|-------|-----|--------|
| ref02, ref08 | dessus | contour en plan, largeur au bout, débord |
| ref05, ref09 | dessus / dessous en biais | raccord du flanc sur l’anneau |
| ref06, ref07 | côté en biais | profil d’élévation, dessous creusé, trou de barrette |
| ref01, ref03, ref04 | trois-quarts | facettes : dessus brossé, flanc poli |

## Contour en plan

- **Face intérieure** : droite, parallèle à l’axe 12 h–6 h. L’écart entre cornes vaut `entrecorne`.
- **Bout** : étroit, environ **2,2 mm** de large, légèrement arrondi.
- **Flanc extérieur** : une ligne presque droite, à peine creuse, qui s’écarte de la face intérieure en allant vers l’anneau. Elle fait environ **22°** avec l’axe 12 h–6 h.
- **Racine** : le flanc rejoint l’anneau par un congé creux, rayon estimé **3 mm**. À la peau, la corne mesure environ **6 mm** de large.
- **Débord** : le bout dépasse la peau d’environ **7,5 mm** le long de l’axe, mesuré depuis le point de la peau en face de la corne.

Les deux largeurs fixent le flanc : il joint le coin extérieur du bout au point de la peau à 6 mm de la face intérieure, soit 17° avec l’axe. La mesure de 22° sert de contrôle ; à cet angle, le flanc passe hors de la peau. Le [sprint 18](../sprints/sprint-18-contour-cornes-oyster.md) code ce contour.

La corne est donc un coin effilé. Le modèle actuel pose une largeur constante (`largeur_corne` 4) rognée par un arc convexe centré sur la montre (`rayon_joue`). La référence demande un flanc droit ou légèrement creux, plus large à la racine, et un raccord creux sur l’anneau.

## Profil d’élévation

- **Dessus** : plat et brossé. Il descend doucement vers le bout, d’environ **0,8 mm** sur la longueur du débord.
- **Dessous** : creusé en arc. Il part du dessous de la carrure à la racine et remonte vers le bout. Au bout, l’épaisseur vaut environ **60 %** de `hauteur_carrure`, soit 4,8 mm pour 8 mm.
- **Bout** : petit congé haut, rayon environ **1 mm**, et arête basse vive ou presque. Le congé actuel de 2,5 mm est plus ouvert que la référence.

## Facettes

Le flanc extérieur porte un **chanfrein poli** d’environ **45°** et **1,5 mm** de large le long de l’arête haute, du bout jusqu’à l’anneau. Le dessus reste brossé et plat. Cette arête facettée marque la silhouette sur ref01, ref03 et ref04.

## Trou de barrette

Le trou est percé depuis le flanc extérieur, environ **1,2 mm** avant le bout, à mi-épaisseur du bout. Diamètre estimé **1,1 mm**. Il traverse la corne, comme la traverse actuelle.

## Paramètres proposés

| Paramètre | Rôle | Valeur estimée |
|-----------|------|----------------|
| `largeur_bout` | Largeur de la corne au bout | `2.2` |
| `largeur_racine` | Largeur de la corne à la peau | `6` |
| `rayon_racine` | Congé creux flanc / anneau | `3` |
| `longueur_corne` | Débord au-delà de la peau | `7.5` |
| `chute_dessus` | Descente du dessus vers le bout | `0.8` |
| `epaisseur_bout` | Épaisseur au bout | `4.8` |
| `rayon_bout_haut` | Congé haut du bout | `1` |
| `chanfrein_flanc` | Largeur du chanfrein poli | `1.5` |
| `diametre_barrette` | Trou de barrette | `1.1` |

## Conséquences sur le noyau

Le flanc devient un plan incliné, plus un cylindre creux à la racine. Le dessous devient un cylindre d’axe parallèle à la largeur. Le dessus devient un plan légèrement incliné. Les pans de `corne.ts` portent déjà un profil en plan et un profil en élévation : la construction reste la même, avec d’autres fonctions de bord. Le chanfrein ajoute un neuvième pan le long de l’arête haute du flanc.
