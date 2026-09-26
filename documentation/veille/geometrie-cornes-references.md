# Géométrie des cornes d’après les références

Les douze photos de [references/](../references/) montrent une carrure de type Oyster (réf. 1500) : anneau lisse, remontoir à 3 h, quatre cornes effilées. Cette note estime la forme des cornes pour la prochaine évolution du profil. Elle complète [profil-cornes.md](profil-cornes.md) (joue en plan) et [profil-elevation-cornes.md](profil-elevation-cornes.md) (congés de bout).

## Méthode

L’échelle vient du diamètre extérieur de l’anneau, pris égal à `diametre_boite`. Les mesures sont relevées en pixels sur les vues de dessus (ref02, ref08) et de côté (ref06, ref07, **ref10, ref11, ref12**), puis ramenées à ce diamètre. La précision est de l’ordre de 0,5 mm ; les valeurs servent de point de départ pédagogique. Les vues ref10–ref12 donnent le profil d’élévation le plus lisible : silhouette en croissant, dessus et dessous en arcs.

[plan01.jpg](../references/plan01.jpg) est un plan coté de la carrure Oyster : vue de dessus, vue de côté depuis la couronne, coupe A-A et vue isométrique. Ses annotations donnent des cotes directes, qui remplacent les estimations sur photo là où elles se recoupent.

## Cotes du plan

Annotations lisibles, à retenir :

| Cote du plan | Valeur | Paramètre du script |
|--------------|--------|---------------------|
| Diamètre de la carrure | Ø36,00 mm | `diametre_boite` |
| Écart entre cornes | 20,00 mm | `entrecorne` |
| Corne à corne | 45,00 mm | `diametre_boite + 2 × longueur_corne`, soit `longueur_corne` 4,5 |
| Épaisseur au bout de corne | 2,00 mm | `epaisseur_bout` |
| Trous de barrette percés | Ø0,90 mm | `diametre_barrette` |
| Alésage tube couronne | Ø3,00 mm | `diametre_tige`, le perçage traversant qui reçoit le tube |
| Largeur de corne en coupe A-A | 4,00 mm | contrôle du contour en plan, `largeur_bout` 2,2 au bout |
| Filetage fond de boîtier | M28 × 0,5 | à venir |
| Dépassement du tube de couronne | 1,50 mm | à venir |
| Biseau de l’arête haute | 0,50 mm sur le plan | arête vive dans le modèle |
| Matière et finitions | acier 904L, flancs polis glacé, cornes brossées | rendu, hors géométrie |

Les cotes verticales de la vue de côté (75,00 mm, 58,00 mm, 15,00 mm) ne se recoupent pas avec un diamètre de 36 mm : le plan les porte à une autre échelle. La hauteur de carrure reste estimée sur photo, à 8 mm.

## Plongée du bout et courbe du dessus

Sur ref12 et sur la vue de côté du plan, le bout de corne descend au ras du fond : la corne plonge nettement vers le bracelet. Le profil d’élévation porte donc `plongee_bout`, la hauteur du bas du bout au-dessus du fond, mesurée à **0,5 mm**.

La vue de côté montre aussi que l’arête haute quitte le flanc **en haut de la carrure** : la corne occupe toute la hauteur à la racine. Avec un bout à 0,5 mm et 2,00 mm d’épaisseur, le dessus descend donc de 5,5 mm sur 4,5 mm de débord. La courbe des références est une **arche** : tangente à l’horizontale à la peau, à mi-hauteur à mi-débord, et de nouveau horizontale au bout, où la corne est une lame mince. Le trou de barrette perce cette lame. Le congé de bout reste petit (`rayon_bout_haut` 0,4, `rayon_bout_bas` 0,2) pour que le bout reste une lame autour du trou. Le [sprint 20](../sprints/sprint-20-elevation-elliptique-cornes.md) code cette arche.

| Photo | Vue | Sert à |
|-------|-----|--------|
| ref02, ref08 | dessus | contour en plan, largeur au bout, débord |
| ref05, ref09 | dessus / dessous en biais | raccord du flanc sur l’anneau |
| ref06, ref07 | côté en biais | première estimation du profil |
| **ref10, ref11, ref12** | **côté / trois-quarts profil** | **silhouette en croissant, dessus et dessous** |
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

Sur ref10–ref12, chaque corne dessine un **croissant** :

- **Dessus** : arche `(1 + cos πt) / 2`, tangente à l’horizontale à la peau et au bout. Il part de `hauteur_carrure`, passe à mi-chute à mi-débord, et arrive à `plongee_bout + epaisseur_bout`. Le fini est brossé.
- **Dessous** : même arche, tangente à y = 0 à la peau, qui remonte jusqu’à `plongee_bout` au bout.
- **Bout** : lame de **2,00 mm**, cote du plan. Le congé haut fait 0,4 mm et le congé bas 0,2 mm, en deçà du trou de barrette, qui reste dans la lame.
- **Silhouette** : vue de côté, la corne est une aile. Le dessus et le dessous convergent sur une lame, et le trou de barrette perce cette lame.

## Facettes

Le flanc extérieur porte un **chanfrein poli** d’environ **45°** et **1,5 mm** de large le long de l’arête haute, du bout jusqu’à l’anneau. Le dessus reste brossé. Cette arête facettée marque la silhouette sur ref01, ref03, ref04 et ref10.

## Trou de barrette

Le trou est percé depuis le flanc extérieur, environ **1,2 mm** avant le bout, à mi-épaisseur du bout. Diamètre **0,90 mm**, cote du plan. Il traverse la corne, comme la traverse actuelle.

## Paramètres proposés

| Paramètre | Rôle | Valeur estimée |
|-----------|------|----------------|
| `largeur_bout` | Largeur de la corne au bout | `2.2` |
| `largeur_racine` | Largeur de la corne à la peau | `6` |
| `rayon_racine` | Congé creux flanc / anneau | `3` |
| `longueur_corne` | Débord au-delà de la peau | `4.5` |
| `plongee_bout` | Hauteur du bas du bout au-dessus du fond | `0.5` |
| `epaisseur_bout` | Épaisseur au bout | `2` |
| `rayon_bout_haut` | Congé haut du bout, en deçà du trou | `0.4` |
| `rayon_bout_bas` | Congé bas du bout, arête presque vive | `0.2` |
| `chanfrein_flanc` | Largeur du chanfrein poli | `1.5` |
| `diametre_barrette` | Trou de barrette | `0.9` |

## Conséquences sur le noyau

Le flanc reste un plan incliné, plus un cylindre creux à la racine. Le dessus et le dessous deviennent des cylindres d’axe parallèle à la largeur (arcs en élévation, tangents à la peau). Les pans de `corne.ts` portent déjà un profil en plan et un profil en élévation : la construction reste la même, avec des arcs pour les deux bords. Le chanfrein ajoute un neuvième pan le long de l’arête haute du flanc. Le [sprint 19](../sprints/sprint-19-elevation-cornes-oyster.md) code ce profil.
