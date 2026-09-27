# Maillage de la vis : fermeture, normales, fil de fer, vitesse

Quatre défauts observés le 2026-09-27 sur la macro vis tête fraisée Pozi. Le filet balayé et la tête en seconde révolution sont déjà en place ([journal](../suivi/journal.md), entrée du 2026-09-26). Ce lot les corrige. Le sprint qui le code est [sprint 23](../sprints/sprint-23-vis-maillage.md).

La frontière de la carrure ne change pas. Il n’y a toujours pas de commande `vis`. Les paliers 2 à 4 de [arbre-fonctions.md](arbre-fonctions.md) et un filet cosmétique en sous-maillage restent hors de ce lot.

## Constat

- **Tête ouverte.** `maillerFilet` dans [revolution.ts](../../packages/api-parametrique/src/revolution.ts) ferme le corps par une couronne du Ø d’âme au Ø nominal et par un disque au Ø nominal, tous deux à l’épaulement. Sous cette couronne il n’y a pas de matière : le corps s’arrête au rayon de fût. Le disque du corps (+Y) et le fond de la tête (−Y) sont coplanaires au Ø nominal. L’union retire les deux, et la couronne est classée dans la tête. Il reste un trou entre le fût et la base du cône.
- **Normales plates.** `normalesLisses` est appelée après le booléen. Elle moyenne les normales des triangles qui partagent un sommet à la même position. Le BSP laisse des sommets en T : un sommet posé au milieu de l’arête d’un triangle voisin, qui n’a pas été découpé. Ce sommet n’a pour voisins que les triangles de sa propre facette, donc le cône de tête reste facetté.
- **Fil de fer absent.** [documentCad.ts](../../packages/shell/src/documentCad.ts) ne trace que `filDeFer(frontiere)`. La vis n’a pas de `Frontiere` : seulement `piece.volume`. L’écran n’a donc aucune arête.
- **Construction lente.** Trois causes, dans l’ordre. `Session.commande` appelle `reconstruire()` à chaque ligne ([session.ts](../../packages/api-parametrique/src/session.ts)) : l’union tête/corps et le `pas` sont rejoués pour chacune des lignes qui suivent. `union` et `difference` dans [csg.ts](../../packages/api-parametrique/src/csg.ts) insèrent tous les triangles dans les arbres et renvoient l’arbre entier : les triangles du filet, loin de la tête, sont redécoupés par des plans qui ne les touchent pas. Tout cela tourne sur le fil de l’interface.

Le maillage final de la vis compte de l’ordre de 96 000 triangles, contre environ 10 000 pour le filet seul. L’écart vient de l’union et de la différence.

## Fermeture

`pas` maille le profil jusqu’à l’épaulement et se ferme par un disque au rayon de fût. La couronne visible sous la tête est le fond de la tête, rogné par ce fût. La tête reste une révolution à part, unie au corps.

## Normales

Chaque sommet porte sa normale avant le booléen. `Maillage` gagne `normales?` (une par sommet) et `faces?` (une étiquette par triangle). `MaillageOmbre` garde `normales` obligatoire.

`csg.ts` découpe des sommets `{ p, n }`. Le point d’intersection interpole la normale, puis la renormalise. Un retournement inverse les normales. `union`, `difference`, `rogner` et `classifieur` acceptent un maillage avec ou sans normales : [ombre.ts](../../packages/api-parametrique/src/ombre.ts) ne change pas.

`revolution` lisse le solide ajouté avant l’union. `pas` lisse le filet avant de le poser. `enleve` pose des normales plates sur la boîte outil. Plus personne n’appelle `normalesLisses` après un booléen. Le pli à 50° reste : deux faces dont le produit scalaire des normales est sous le cosinus de 50° ne se moyennent pas.

## Fil de fer

Le fil de fer d’un solide maillé est celui d’un logiciel de CAO : les frontières entre faces, pas les arêtes dont l’angle dépasse un seuil. `aretesVives` dans [dessin.ts](../../packages/shell/src/dessin.ts) reste pour les tests qui l’utilisent déjà.

Les étiquettes de face sont posées à la source, et le booléen les recopie sur chaque fragment :

- `tourner` : une face par segment du profil.
- `maillerFilet` : une face de fût par segment du profil, un flanc bas, un flanc haut, le cône de naissance, le disque du collet. La crête (flanc bas contre flanc haut), les fonds (flanc contre fût) et le coude cône → fût sont donc des arêtes.
- `boite` : six faces. `couperRectangles` décale les étiquettes pour qu’elles restent uniques.

`aretesBrep` trace :

1. une arête partagée par deux triangles d’étiquettes différentes ;
2. une arête qui n’appartient qu’à un triangle, quand elle est colinéaire et chevauche une arête d’une autre étiquette (jonction en T laissée par le BSP : bord de l’empreinte Pozi, couronne sous la tête) ;
3. une arête sans aucun partenaire (maillage ouvert : le trou reste visible).

Une arête en T intérieure à une même face n’est pas tracée. Les droites porteuses sont quantifiées au millième de millimètre.

`documentCad` garde `filDeFer(frontiere)` dès que la frontière a des faces. Sinon, si un volume maillé est affiché, il trace `aretesBrep`. La vue d’esquisse continue de cacher le solide et son fil de fer.

## Vitesse

Le rendu est déjà sur le GPU (w3dts). Un booléen BSP ne se porte pas sur le GPU : la récursion est irrégulière, et le parallélisme à l’intérieur d’un booléen n’apporte rien en JavaScript. Le gain est algorithmique, puis un worker pour rendre la main à l’interface.

1. **Mesure.** Un script hors dépôt chronomètre `executer` du script vis, une union corps/tête, une différence Pozi, et `normalesLisses`. Les chiffres vont dans le journal, avant et après.
2. **Un seul recalcul par script.** `Session.lot` empile les actions ligne par ligne (l’annulation ne change pas) et n’appelle `reconstruire()` qu’à la fin. `Hote.executer` enveloppe le script. Le panneau viewport ne reçoit que le maillage final.
3. **Booléen local.** Les triangles hors de la boîte de l’autre solide sont gardés tels quels. Seuls les triangles proches passent par `retirerDedans`. Les arbres restent complets pour classer, mais leurs découpes internes ne ressortent plus. Le plan d’un nœud est pris au milieu de la liste, pour équilibrer l’arbre. Le dédoublonnage des faces coplanaires reste celui déjà en place.
4. **Replay sans géométrie.** `Contexte.geometrie` à faux : `revolution`, `pas` et `enleve` posent le demi-profil et sautent le maillage. `esquisseDepuis` rejoue ainsi. La vue d’esquisse ne reconstruit pas le solide.
5. **Worker.** Une interface `Moteur` a deux réalisations. `moteurSynchrone` tient la session complète sur le fil appelant : les tests Node et `maillagesRecus` ne changent pas. `moteurWorker` tient une session complète dans un worker et renvoie le maillage en tableaux transférés, avec un numéro de séquence ; une réponse périmée est ignorée. La session du fil d’interface est créée avec `geometrie` à faux (historique, paramètres, esquisses, frontière de carrure). Chaque commande est recopiée vers le moteur. Le store garde le dernier maillage reçu et un drapeau de construction. Le viewport affiche ce maillage et un indicateur « Construction… ».

## Ordre

Fermeture, puis mesure et lot, puis normales, puis fil de fer, puis booléen local, puis replay sans géométrie, puis worker. Chaque palier part d’un test rouge ([developpement.md](../developpement.md)).

## Tests visés

- `pas` seul : aucune arête impaire. Corps uni à la tête : le volume de l’union égale la somme des volumes. La vis a des triangles à l’épaulement, entre le rayon d’âme et le rayon nominal, de normale −Y.
- Cône de tête : chaque sommet est à moins de 3° de la normale analytique du cône. Les normales d’un cube coupé par un cylindre restent unitaires, et celles du cylindre restent radiales. Le test « arrondit la paroi » reste vert.
- Un cylindre tourné donne deux cercles et rien sur le fût ni sur les disques. La vis trace la crête, le cercle de tête, le cercle d’épaulement, et le contour de l’empreinte. Aucun segment ne traverse une facette du cône hors de l’empreinte.
- Deux cubes disjoints : l’union a 24 triangles. Deux cubes en contact par une face : volume exact, plan de contact couvert. Les tests de [csg.test.ts](../../packages/api-parametrique/tests/csg.test.ts) restent verts. Le script vis produit moins de 1,5 fois la somme des triangles du filet et de la tête.
- Protocole du worker : une réponse dont le numéro est dépassé est ignorée.
