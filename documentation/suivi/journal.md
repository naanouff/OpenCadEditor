# Journal de suivi

## 2026-09-24 — Cadrage avant développement

- Le document d’assemblage visé est CADOM (dépôt [OpenCAD](https://github.com/naanouff/OpenCAD)) : graphe d’assemblage, transforms, références vers des géométries STEP ou glTF externes. Le fichier `.cadom` ne porte pas la géométrie.
- Le rendu et l’interface viennent de w3dts : shell `@naanouff/w3dts-viewer-editor`, extensions dynamiques EDEX (`@naanouff/w3dts-viewer-extensions`). Le dépôt est présent en sous-module dans `vendor/w3dts`.
- La veille fonctionnelle précède le développement du modeleur. Aucun outil de modélisation n’est engagé tant que cette veille n’a pas été lue.

## 2026-09-24 — Veille rédigée, décision ouverte

Les trois notes sont dans [documentation/veille/](../veille/) :

- [modelisation-parametrique.md](../veille/modelisation-parametrique.md)
- [existant.md](../veille/existant.md)
- [swot.md](../veille/swot.md)

Le SWOT laisse le choix ouvert entre un éditeur d’assemblage CADOM et un modeleur paramétrique. Aucune des deux voies n’est engagée.

## 2026-09-24 — Éditeurs historiques ajoutés à la veille

[existant.md](../veille/existant.md) couvre aussi PTC (Creo, Onshape, Windchill), Dassault Systèmes (CATIA, SOLIDWORKS, 3DEXPERIENCE), Autodesk (Inventor, AutoCAD, Fusion 360) et Siemens (NX, Solid Edge, Teamcenter). Le choix d’MVP reste ouvert.

## 2026-09-24 — Fonctions et matrice comparée

- [fonctionnalites.md](../veille/fonctionnalites.md) liste les capacités de chaque logiciel de la veille.
- [matrice-swot.md](../veille/matrice-swot.md) aligne ces capacités, puis lit le champ en forces, faiblesses, opportunités et risques.

Le choix entre éditeur d’assemblage CADOM et modeleur paramétrique reste ouvert.

## 2026-09-24 — Correction : CADOM est un format

Relecture de la branche [develop](https://github.com/naanouff/OpenCAD/tree/develop), doctrine `documentation/opencad-doctrine.md` (2026-09-16).

- CADOM n’est pas un éditeur. OpenCadEditor exploite les formats.
- `.cadom` : graphe d’assemblage. `.cadompart` : intention paramétrique. Noyau OpenCAD : solide exact au recalcul. `.cadombrep` : solide exact figé. `.cadomesh` : affichage sans noyau.
- Le STEP / AP242 est hors du modèle de vérité OpenCAD.

Les notes de veille ont été alignées sur cette doctrine. L’ordre dans lequel l’éditeur exploite le graphe puis l’intention n’est pas décidé.

## 2026-09-24 — Catalogue du modeleur idéal

[modeleur-ideal.md](../veille/modeleur-ideal.md) reprend les fonctions que les utilisateurs gardent dans chaque logiciel de la veille, puis les réunit. La correction ci-dessus prime sur les formulations plus haut qui présentaient CADOM comme un éditeur ou comme un document sans intention paramétrique.

## 2026-09-24 — Flux de construction, sans décision

[flux-construction-parametrique.md](../veille/flux-construction-parametrique.md) décrit le geste à partir de l’esquisse. Le grand projet est la boîte et le bracelet d’une Milgauss : carrure, lunette, verre, fond, couronne, maillons. Les cotes sont des ordres de grandeur. Le cadran et les marquages restent hors du modèle. Aucun outil ni format n’est choisi.

## 2026-09-24 — Layout consigné, sprint 01 prêt

[maquette/plan-layout.md](../maquette/plan-layout.md) fixe les zones de l’éditeur : ruban, historique, paramètres, viewport, fonction en cours, barre d’état. Neuf propositions y sont ajoutées, à marquer dans la maquette pour pouvoir les retirer : mode esquisse ou solide, couleur du profil, cotes dans la vue, barre près de la sélection, recherche de commande, fil d’Ariane, symétrie des cornes, coupe d’affichage, aperçu fantôme de l’extrusion. [sprints/sprint-01-maquette-layout.md](../sprints/sprint-01-maquette-layout.md) décrit la page statique. Elle est dessinée : [maquette/index.html](../maquette/index.html).

## 2026-09-24 — Veille d’interfaces consignée, sprint 02 prêt

Le layout est trop tôt. [veille/plan-interfaces.md](../veille/plan-interfaces.md) décrit l’observation des interfaces du benchmark. [sprints/sprint-02-veille-interfaces.md](../sprints/sprint-02-veille-interfaces.md) collecte les captures et rédige la note. Cette veille précède toute reprise de la maquette. Les images ne sont pas encore enregistrées.

## 2026-09-24 — Veille d’interfaces écrite

[veille/interfaces.md](../veille/interfaces.md) et les fichiers de [veille/interfaces/](../veille/interfaces/). Creo, Onshape, Fusion 360, FreeCAD et AutoCAD ont une capture de page officielle. Inventor, CATIA, SOLIDWORKS, NX et Solid Edge n’ont pas de figure exploitable : la note garde l’URL et n’invente pas d’écran. SolveSpace est retiré de cette lecture d’écrans. Cette veille précède toute reprise de la maquette.

## 2026-09-25 — API de la carrure consignée, sprint 03 prêt

Le layout reste en attente. [veille/commandes-milgauss.md](../veille/commandes-milgauss.md) fixe les commandes du script de carrure et les fonctions qu’elles appellent. [veille/api-architecture.md](../veille/api-architecture.md) pose le socle : document, historique, registre de domaines, pile d’actions réversible, trois ports. [sprints/sprint-03-api-carrure.md](../sprints/sprint-03-api-carrure.md) code ce socle. Le paquet `packages/api-parametrique` exécute le script de la carrure, annule et refait les commandes, et enregistre un domaine sans modifier la session. Ce socle précède le viewport.

## 2026-09-25 — TDD

La règle de base du développement est le TDD, consignée dans [developpement.md](../developpement.md). Un comportement nouveau commence par un test qui échoue. Les tests du sprint 03 ont été écrits avec le code ; la suite de `packages/api-parametrique` part d’un test rouge.

## 2026-09-25 — Shell consigné, sprint 04 prêt

[shell/plan.md](../shell/plan.md) fixe le premier shell : hôte, registre de panneaux, terminal sur `Session`, port viewport, `maillage()` de l’anneau. [sprints/sprint-04-shell.md](../sprints/sprint-04-shell.md) le code en TDD. `packages/shell` envoie les lignes à la session, annule par la pile, et pousse le maillage de l’anneau vers un viewport de test. `maillage()` suit `diametre_boite`. Ce socle précède le canvas WebGPU. Une page Vite dans `packages/shell` affiche l’anneau par ses faces exactes. Les arêtes cachées sont retirées dans la même passe. `filDeFer` produit le tableau `brepWireframe.position`. La page démarre le moteur w3dts : solide ombré et fil de fer via `VectorLineOverlayComponent`.

## 2026-09-25 — Portée de lunette consignée, sprint 05 prêt

[veille/portee-lunette.md](../veille/portee-lunette.md) fixe l’épaulement du dessus : trois cylindres et trois couronnes dès le premier enlèvement borgne, pilotés par `diametre_lunette` et `profondeur_lunette`. [sprints/sprint-05-portee-lunette.md](../sprints/sprint-05-portee-lunette.md) le code en TDD. `enleve` creuse le cercle coté sur sa face d’appui : le rayon et la profondeur viennent de l’esquisse, pas des noms de paramètres. `decrire` en tire l’épaulement et arrête la paroi du passage au fond de la poche. `esquisseCourante()` pose les cercles cotés sur leur plan : le viewport les trace avant la fonction, et la fonction les consomme. Le noyau ne calcule pas encore de soustraction : les faces de la portée sont une figure prévue d’avance.

## 2026-09-25 — Orientation des faces consignée, sprint 06 prêt

[veille/orientation-faces.md](../veille/orientation-faces.md) sort du shell les deux règles qui devinent le côté matière, le plus grand rayon et le signe de l’altitude. La frontière portera un champ `dehors` sur chaque face. [sprints/sprint-06-orientation-faces.md](../sprints/sprint-06-orientation-faces.md) le code en TDD, avec les cas que ces règles ratent : un bossage et une couronne à l’altitude zéro. `decrire` pose `dehors` sur chaque face, `maillage()` le lit pour la normale et l’enroulement. La page Vite lit l’API par sa source : la copie de `node_modules` servait un module figé. La soustraction booléenne reste après. Cette portée précède celle du fond. Les cornes, la barrette et le tube restent après.

## 2026-09-25 — Modes de vue consignés, sprint 07 prêt

[veille/modes-vue.md](../veille/modes-vue.md) fixe les deux vues. Sans esquisse, la caméra reste en perspective. Une esquisse ouverte la pose face à son plan, en orthographique, avec une grille dont le pas est 1, 5 ou 10 mm selon l’étendue. [sprints/sprint-07-modes-vue.md](../sprints/sprint-07-modes-vue.md) le code en TDD. Le solide reste dessiné. [sprints/sprint-07-modes-vue.md](../sprints/sprint-07-modes-vue.md) est codé. Le mode suit l’esquisse : orthographique face au plan, grille de 1, 5 ou 10 mm, puis la perspective au retour du solide. [sprints/sprint-07-modes-vue.md](../sprints/sprint-07-modes-vue.md) est codé. Le mode suit l’esquisse : la caméra se place face au plan, la grille est en millimètres, et `extrude` rend la perspective du solide. La projection orthographique du graphe vide l’image, donc cette vue de plan reste une perspective raide. Les cotes à l’écran et la saisie à la souris restent après.

## 2026-09-25 — Cotes d’esquisse consignées, sprint 08 prêt

[veille/cotes-esquisse.md](../veille/cotes-esquisse.md) fixe l’affichage des diamètres dans le plan. Chaque cercle coté porte sa valeur en millimètres, réévaluée avec l’expression. Le trait est un segment du fil, le nombre une étiquette HTML. [sprints/sprint-08-cotes-esquisse.md](../sprints/sprint-08-cotes-esquisse.md) est codé. Chaque cercle coté porte son diamètre en millimètres, réévalué avec l’expression : `param diametre_boite 42` passe la cote de 40 à 42. Le trait est un segment dans le plan, le nombre une étiquette HTML. Les cotes de rectangle et celles du solide en 3D restent après.

## 2026-09-25 — Cotes en texte consignées, sprint 09 prêt

[veille/cotes-texte.md](../veille/cotes-texte.md) pose le nombre du diamètre dans le plan de l’esquisse. Le trait y est déjà. L’étiquette HTML, recalculée seulement à la commande, s’en sépare dès que la caméra tourne. [sprints/sprint-09-cotes-texte.md](../sprints/sprint-09-cotes-texte.md) est codé. Le nombre est un glyphe Open Sans dans le plan, via `@naanouff/w3dts-text-mesh`. L’étiquette HTML sort de la page. Les flèches, les cotes de rectangle et la vue isométrique restent après. Chaque diamètre a ensuite sa ligne, arrêtée sur son cercle, flèches aux bouts, décalée de 30° quand les cercles sont concentriques.

## 2026-09-25 — Caméra d’esquisse consignée, sprint 10 prêt

[veille/camera-esquisse.md](../veille/camera-esquisse.md) fige la vue face au plan tant qu’une esquisse est ouverte. Le glisser déplace, la molette zoome, la rotation n’a plus de bouton. [sprints/sprint-10-camera-esquisse.md](../sprints/sprint-10-camera-esquisse.md) est codé. En esquisse, le glisser déplace et la molette zoome. La rotation revient avec le solide. La projection orthographique et la vue isométrique restent après.

## 2026-09-25 — Vues et paramètres consignés, sprint 11 prêt

[veille/vues-parametres.md](../veille/vues-parametres.md) fixe la suite. La 3D devient une isométrie, l’esquisse une vue dans son plan, une fois la profondeur orthographique ramenée à WebGPU. `unite` enregistre l’unité après `piece`. Les arguments chiffrés déclarent entier ou flottant. Un panneau de `@naanouff/w3dts-viewer-editor` liste les paramètres. Le fond du viewport est un gris fixe, sans skybox. [sprints/sprint-11-vues-parametres.md](../sprints/sprint-11-vues-parametres.md) est codé. L’unité et le panneau suivent le document. La 3D est une isométrie, l’esquisse une vue dans son plan, le fond un gris fixe.

## 2026-09-25 — Cornes, barrette et tube consignés, sprint 12 prêt

La portée du fond est déjà une lèvre : sur le premier millimètre l’ouverture fait 34 mm, puis le passage reprend 35 mm. [veille/cornes-barrette-tube.md](../veille/cornes-barrette-tube.md) fixe la suite. Quatre boîtes pour les cornes, quatre cylindres horizontaux pour la barrette, un tube et son trou de tige. Les cotes du rectangle sont retenues, l’extrusion copie le profil évalué. [sprints/sprint-12-cornes-barrette-tube.md](../sprints/sprint-12-cornes-barrette-tube.md) est codé. Quatre boîtes, quatre barrettes et le tube sont dans la frontière et dans le maillage. La face proche d’une corne est sur le cercle extérieur, à son coin le plus écarté, pour entrer dans la paroi. La soustraction booléenne reste après.

## 2026-09-25 — Soustraction booléenne consignée, sprint 13 prêt

Les trois figures sont posées côte à côte : la boîte d’une corne traverse l’anneau, le cylindre de barrette flotte, le trou de tige s’arrête dans le tube. [veille/booleen-carrure.md](../veille/booleen-carrure.md) fixe l’union et la différence. Un arbre BSP en TypeScript, sans dépendance nouvelle. `decrire` garde ses faces analytiques pour les cotes ; `mailler` rend un seul volume. Le trou de tige traverse la paroi jusqu’au passage. Le fil de fer tire ses arêtes vives du maillage. [sprints/sprint-13-booleen-carrure.md](../sprints/sprint-13-booleen-carrure.md) est codé. `csg.ts` porte l’arbre BSP, `volumes.ts` les primitives fermées. `mailler` rend un seul volume : les cornes se fondent dans l’anneau, les quatre trous de barrette sont ouverts, et le trou de tige perce la paroi jusqu’au passage. Le viewport lit ce maillage et en tire ses arêtes vives. Deux sens de rotation ont été corrigés : quatre faces de la boîte, et la paroi du cylindre d’axe Y. C’est le début du noyau géométrique. Les congés, la lunette et le fond restent après.

## 2026-09-25 — Faces rognées consignées, sprint 14 prêt

Le booléen de maillage rend le bon volume et une image grossière : la paroi se lit à facettes, et les cercles sont des polygones. La cause est mesurable : les normales sont posées par facette, la coque descend à 24 segments, et le fil de fer vient des arêtes du maillage. [veille/faces-rognees.md](../veille/faces-rognees.md) prend le chemin de Fusion 360, FreeCAD et Creo : le booléen porte sur les faces exactes, qui gardent leur surface et reçoivent des contours ; le maillage vient après, face par face, jusqu’à une flèche en millimètres ; la normale est celle de la surface ; les arêtes sont les courbes de la topologie. Les trois intersections de la carrure ont une forme fermée, le trou de tige compris. L’union des contours coplanaires, le dessus de l’anneau avec le dessus des cornes, est la pièce centrale. [sprints/sprint-14-faces-rognees.md](../sprints/sprint-14-faces-rognees.md) est commencé. `tesseler.ts` porte la flèche : le pas d’un cercle vaut `ceil(pi / acos(1 − f / r))`, donc un rayon de 20 mm prend une centaine de pans et un trou de 0,75 mm une vingtaine. `ombre.ts` tessellise chaque face sur sa surface, puis la rogne par les volumes voisins, et repose la normale de la surface sur chaque sommet : la paroi est ronde, les arêtes restent vives sans seuil d’angle. Le classement passe par un arbre bâti une fois par volume, d’où `classifieur` : le maillage complet est tombé de 1 s à 60 ms. Le fil de fer vient encore des arêtes du maillage ; les contours de faces restent à faire.

Les cornes et le tube s’appuient maintenant sur l’enveloppe extérieure : le cylindre plein sous la peau borne la matière ajoutée, donc le passage et les portées gardent leurs faces entières. Les figures s’enfoncent jusqu’au passage, la face de départ d’une corne et le disque de départ du tube tombent sous l’enveloppe et disparaissent. Le jeu de classement de 0,05 mm dépasse le creux d’une corde, ce qui fait se recouper franchement les polygones de même pas.

`documentCad` tire le fil de fer de `filDeFer(frontiere)`, donc des faces exactes. Les arêtes ouvertes laissées par la découpe BSP au milieu d’une face plane ne sont plus tracées. `aretesVives` reste disponible pour les tests de volume ; il sort du chemin d’affichage. Les contours de faces, et avec eux les arêtes d’intersection rognées, restent à faire.

`filDeFer` coupe maintenant les arêtes des cornes à la peau extérieure : la part enterrée dans le passage disparaît. Les cercles d’une traverse dont le centre est sous la peau (trou de tige à l’axe, départ du tube) ne sont plus tracés. La paroi d’un perçage a le winding aligné sur la normale vers l’axe : le trou s’éclaire comme une cavité.

Le tube ne perce plus la peau sur son rayon extérieur : seule la tige l’ouvre. L’anneau entre tige et tube reste sur la paroi — c’est la fermeture à la racine.

`tesseler` porte aussi les traverses : la paroi du tube est une face, le bout est un anneau (disque percé par la tige). Le fil de fer trace le cercle extérieur du tube et le cercle du perçage au bout. Le winding de la paroi du tube suit la normale sortante.

## 2026-09-25 — Chrome editor-ui consigné, sprint 15 prêt

Le sous-module `vendor/w3dts` est encore sur `main`. La branche `develop` porte `@naanouff/w3dts-editor-ui` (`packages/editor-ui`) : thème, Dockview, `EditorDock`, sans store métier. [shell/editor-ui.md](../shell/editor-ui.md) fixe la suite : sync sur `develop`, chrome React via ce paquet, panneaux OpenCad (viewport, terminal, paramètres). Les patches caméra (`orthoZO`, `setViewUp`) restent une surcharge dans `packages/shell`, hors de `vendor/`. [sprints/sprint-15-editor-ui.md](../sprints/sprint-15-editor-ui.md) le code. `@naanouff/w3dts-viewer-editor`, le ruban et l’historique Dockview restent après.

## 2026-09-25 — Sprint 15 codé : editor-ui base du shell

`vendor/w3dts` est sur `develop` (`7a0651a9`). `@naanouff/w3dts-editor-ui` porte le chrome : styles, thème, `EditorDock`. Les panneaux viewport, terminal et paramètres sont dans `packages/shell`. La caméra OpenCad (`orthoZO`, `setViewUp`) est dans `packages/shell/src/surcharges/`, branchée par Vite, sans patch dans le sous-module. Les tests Vitest du shell passent. Le ruban et `@naanouff/w3dts-viewer-editor` restent après.

## 2026-09-25 — Design system editor-ui branché dans le shell

Tailwind scanne `packages/shell/src` et `vendor/w3dts/packages/editor-ui/src`. Les tokens viennent de `@naanouff/w3dts-editor-ui/styles.css`. Le panneau paramètres utilise la primitive `Panel`. Le polyfill `shell-layout.css` est retiré.

## 2026-09-25 — Terminal Monaco

Le panneau terminal reprend le geste du Script panel w3dts : journal + Monaco (`Entrée` exécute, `Maj+Entrée` ligne, ↑ historique), langue `opencad-commande` avec complétion des mots-clés.

## 2026-09-25 — Panneau arbre de construction

`Session.historique()` et `pieceCourante()` exposent l’historique paramétrique. Le shell ouvre un panneau Dockview **Construction** (à gauche, au-dessus des paramètres) : pièce → paramètres / esquisses / extrudes. Layout `opencad.shell.dockview.layout.v2`.

## 2026-09-25 — Panneau Debug

Panneau Dockview **Debug** (à droite) : bouton **Build carrure** qui joue `scriptCarrure.ts` via `storeShell.executer`. Layout `v3`.

## 2026-09-26 — Profil des cornes consigné, sprint 16 prêt

Les cornes restent des boîtes à angles droits. Les croquis demandent une joue courbe. [veille/profil-cornes.md](../veille/profil-cornes.md) fixe un contour fermé : segment intérieur, segment de bout, arc de joue (`rayon_joue`), arc d’appui sur la peau. Le geste reste esquisse → cotes → extrude. [sprints/sprint-16-profil-cornes.md](../sprints/sprint-16-profil-cornes.md) le code en TDD. Les entités `segment` et `arc`, l’ajout `profil`, le cylindre tronçonné et le fil de fer en arcs restent à écrire. Les congés et les cotes du profil à l’écran restent après.

## 2026-09-26 — Sprint 16 : profil d’esquisse des cornes

Le script de carrure extrude un profil `segment` / `arc` coté (`rayon_joue` 28). L’ajout `{ sorte: 'profil' }` produit quatre boîtes bornées par le cylindre de joue tronçonné (`angleDeb` / `angleFin`). `ombrer` et `filDeFer` tracent la cambrure ; le coin extérieur de l’ancien rectangle disparaît. Les barrettes, le tube et le perçage de tige restent. [sprints/sprint-16-profil-cornes.md](../sprints/sprint-16-profil-cornes.md) est codé. Les congés 3D et les cotes du profil à l’écran restent après.

## 2026-09-26 — Profil d’élévation consigné, sprint 17 prêt

La joue en plan à `rayon_joue` 27,5 mm est validée à l’œil. Vue de côté, les bouts restent à angles droits. [veille/profil-elevation-cornes.md](../veille/profil-elevation-cornes.md) fixe les congés de bout : `rayon_bout_haut` 2,5 mm, `rayon_bout_bas` 0,8 mm. [sprints/sprint-17-profil-elevation-cornes.md](../sprints/sprint-17-profil-elevation-cornes.md) le code en TDD. Les congés à la racine et l’esquisse d’élévation cotée restent après.

## 2026-09-26 — Sprint 17 : congés de bout en élévation

Le script porte `rayon_joue 27.5`, `rayon_bout_haut 2.5` et `rayon_bout_bas 0.8`. Huit faces `conge` (cylindre d’axe X) coupent les coins de bout ; `ombrer` et `filDeFer` les tracent. La joue en plan reste. Les barrettes restent ouvertes. [sprints/sprint-17-profil-elevation-cornes.md](../sprints/sprint-17-profil-elevation-cornes.md) est codé. Les congés à la racine restent après.

## 2026-09-26 — Fil de fer des cornes profilées

La forme ombrée des congés et de la joue est correcte ; le fil traçait encore les arêtes de la boîte entière. `filDeFer` coupe maintenant ces arêtes aux congés et à la joue : plus de coin de bout fantôme dans le dessin.

## 2026-09-26 — Surface des cornes rétabli

Le filtre de congé supprimait des quads entiers dès qu’un coin touchait la morsure, d’où des cornes trouées. Les plans de boîte sont subdivisés ; seuls les petits triangles dans le coin disparaissent, remplacés par la face `conge`.

## 2026-09-26 - Faces exactes des cornes

Chaque corne se construit en pans exacts, issus du profil en plan (joue à `rayon_joue`) et du profil en élévation (congés de bout). `pansDeCorne` (`corne.ts`) livre huit pans : dessus, dessous, deux côtés, bout plan, joue, congé haut, congé bas. Deux pans voisins partagent les mêmes sommets sur leur courbe commune : la surface est fermée, sans escalier ni fente. `ombrer` maille ces pans ; `filDeFer` trace leurs contours et le raccord sur la peau. Le filtre de triangles par morsure et la subdivision des plans de boîte sont retirés.

## 2026-09-26 - Rendu ombré réparé

Le maillage ombré comptait 151 809 sommets et le viewport les indexait en `Uint16Array` : les index débordaient, d'où des triangles errants dans l'anneau et deux cornes sans surface. Le viewport passe en `Uint32Array` au-delà de 65 535 sommets. Les pans de corne partent maintenant de la peau (`rayonPeau`) et chaque outil de rognage porte son encombrement : un outil loin d'une face la laisse entière. Le maillage tombe à 18 876 sommets.

## 2026-09-26 - Géométrie des cornes estimée sur photos

[veille/geometrie-cornes-references.md](../veille/geometrie-cornes-references.md) relève la forme des cornes Oyster des références : bout de 2,2 mm, flanc droit à 22°, racine de 6 mm raccordée par un congé creux, dessous creusé, chanfrein poli sur le flanc.

## 2026-09-26 — Repère de surface du rendu ombré

Le viewer construit pour chaque sommet une tangente et une bitangente orthonormées avec la normale (`repereSurface` dans `packages/shell/src/dessin.ts`). Le repère reste défini sur les faces horizontales, le haut des congés et la paroi du trou de barrette, où le repère fixe précédent dégénérait et produisait des sauts d'ombrage. Test : `packages/shell/tests/repere.test.ts`.

## 2026-09-26 — Sprint 18 préparé : contour en plan Oyster

[sprints/sprint-18-contour-cornes-oyster.md](../sprints/sprint-18-contour-cornes-oyster.md) reprend les cotes de [veille/geometrie-cornes-references.md](../veille/geometrie-cornes-references.md) : bout 2,2 mm, racine 6 mm, congé creux R3, débord noyau 4,2 mm, congé haut 1 mm, barrette Ø1,1 à 1,2 mm du bout. Le plan de flanc remplace la joue ; son angle découle des deux largeurs (17°). Le dessous creusé et la chute du dessus vont au sprint 19, le chanfrein poli au sprint 20.

## 2026-09-26 — Sprint 18 codé : contour en plan Oyster

Le script porte largeur_bout 2,2, largeur_racine 6, 
ayon_racine 3, longueur_corne 4,2, 
ayon_bout_haut 1, diametre_barrette 1,1 et 
ecul_barrette 1,2. Le plan de flanc remplace la joue ; le congé creux à la racine est un cylindre d'axe Y hors de la peau. pansDeCorne, ombrer et ilDeFer suivent ce profil. Les quatre barrettes restent ouvertes près du bout. [sprints/sprint-18-contour-cornes-oyster.md](../sprints/sprint-18-contour-cornes-oyster.md) est codé. Le dessous creusé et la chute du dessus restent au sprint 19.

## 2026-09-26 — Jointures des cornes Oyster

Le dessus et le dessous ferment sur le flanc au pied des congés de bout et vont jusqu'au bout du congé de racine. Le flanc reprend les sommets des congés de bout ; les bords communs coïncident et le fil de fer suit les mêmes points. Le trou de barrette traverse toute la corne, flanc compris. Tests : `packages/api-parametrique/tests/corne.test.ts`, `carrure.test.ts`.

## 2026-09-26 — Sortie du perçage de barrette sur le flanc

`filDeFer` trace la sortie du trou de barrette sur le flanc incliné : chaque point du cercle prend la position du flanc à son débord, le contour devient l'ellipse d'intersection. Test : `packages/shell/tests/figures.test.ts`.

## 2026-09-26 — Arêtes lisses du congé de racine

Le congé de racine raccorde le flanc et la peau en tangence : ses deux bords verticaux sont des arêtes lisses. Un `Pan` marque ses colonnes `lisses`, et `contourPan` les omet du fil de fer. Test : `packages/shell/tests/figures.test.ts`.

## 2026-09-26 — Sprint 19 préparé : profil d’élévation Oyster

[sprints/sprint-19-elevation-cornes-oyster.md](../sprints/sprint-19-elevation-cornes-oyster.md) reprend les cotes de [veille/geometrie-cornes-references.md](../veille/geometrie-cornes-references.md) d’après ref10–ref12 : croissant, chute du dessus 1,5 mm, épaisseur au bout 3,2 mm. Le dessus et le dessous sont des arcs tangents à la peau. Le chanfrein poli reste au sprint 20.

## 2026-09-26 — Sprint 19 codé : croissant d’élévation

Le script porte `chute_dessus` 1,5 et `epaisseur_bout` 3,2. `geometrieElevation` calcule les deux arcs ; `pansDeCorne` maille le dessus et le dessous le long du débord ; `ombrer` rogne le volume par demi-cylindres limités au débord. La barrette est à mi-épaisseur du bout. [sprints/sprint-19-elevation-cornes-oyster.md](../sprints/sprint-19-elevation-cornes-oyster.md) est codé. Le chanfrein poli reste au sprint 20.

## 2026-09-26 — Cotes du plan Oyster et plongée du bout

[references/plan01.jpg](../references/plan01.jpg) donne des cotes directes, relevées dans [veille/geometrie-cornes-references.md](../veille/geometrie-cornes-references.md). Le script de carrure les porte : `diametre_boite` 36, `longueur_corne` 4,5 pour un corne à corne de 45 mm, `diametre_barrette` 0,9, `diametre_tige` 3 pour l’alésage du tube de couronne, `epaisseur_bout` 2. `diametre_lunette` et `diametre_fond` suivent à 32 et 30 pour rester dans la carrure.

`chute_dessus` devient `plongee_bout`, la hauteur du bas du bout au-dessus du fond : le bout plonge vers le bracelet, comme sur ref12 et sur la vue de côté du plan. `geometrieElevation` en déduit la chute du dessus. Un arc tangent au dessus descend au plus de son propre débord, la chute est donc bornée à 80 % du débord utile et la plongée remonte d’autant : avec `hauteur_carrure` 8, la plongée s’arrête à 3,2 mm. La plongée franche des références demande l’épaisseur de racine de la coupe A-A (4,00 mm), qui ouvre le sprint suivant. Tests : `packages/api-parametrique/tests/carrure.test.ts`, `packages/shell/tests/scriptCarrure.test.ts`.

## 2026-09-26 — Sprint 20 codé : élévation elliptique

La comparaison du rendu et de la vue de côté du plan tranche la question laissée ouverte : l’arête haute de la corne quitte le flanc en haut de la carrure, la corne occupe donc toute la hauteur à la racine, et le dessus descend de 5,5 mm sur 4,5 mm de débord. L’épaisseur de racine de 4,00 mm lue sur la coupe A-A était une largeur, pas une épaisseur.

Le dessus et le dessous deviennent des quarts d’ellipse de demi-axes le débord utile et la chute : ils descendent autant que voulu, restent tangents à l’horizontale à la peau et arrivent verticaux au bout. Le cercle du sprint 19 en est le cas particulier chute = débord, et la borne `MARGE_ARC` disparaît. `geometrieElevation` rend aussi les pentes, que les normales des pans emploient, et les pans échantillonnent par angle pour que le bout presque vertical reste lisse.

`volumes.ts` gagne `prisme`, un prisme fermé le long de x décrit colonne par colonne : il rogne un profil quelconque, là où un cylindre ne rendait qu’un arc de cercle. `rayonsDeBout` sort de `pansDeCorne` pour que les pans et les volumes de rognage partagent exactement la même ellipse. Le script porte `plongee_bout` 0,5 et `epaisseur_bout` 2. [sprints/sprint-20-elevation-elliptique-cornes.md](../sprints/sprint-20-elevation-elliptique-cornes.md) est codé. Restent le chanfrein poli du flanc et les gradins de lunette et de fond visibles de profil.

## 2026-09-26 — Le trait descend sur la boîte

De profil, le contour est le cylindre. Il restait plat jusqu’à la peau, et la corne tombait ensuite. Le trait relevé descend déjà sur la boîte. `amorce_dessus` 3,5 mm fait partir la courbe avant la peau, et deux prismes descendent le haut du cylindre le long de 12 h et de 6 h. `plongee_bout` passe à 1,2 mm : le dessous de la corne rejoint cette hauteur en 1,6 mm, puis reste plat. Le plat central de la boîte reste à `hauteur_carrure`.

## 2026-09-26 — Arche du dessus, bout en lame

Le quart d’ellipse arrivait vertical au bout : le dessus restait haut sur presque tout le débord, puis tombait d’un coup, et les congés de bout (1 mm et 0,8 mm) fermaient cette chute en une boule autour du trou de barrette. Le trait relevé sur la vue trois-quarts est une arche, haute à la peau et plate au bout. `geometrieElevation` suit `(1 + cos πt) / 2` : tangente horizontale aux deux extrémités, à mi-chute à mi-débord. Le script porte `rayon_bout_haut` 0,4 et `rayon_bout_bas` 0,2, ce qui laisse le trou dans la lame de 2 mm. Tests : `packages/api-parametrique/tests/carrure.test.ts`, `packages/shell/tests/scriptCarrure.test.ts`.

## 2026-09-26 — Biseau de l’arête haute

La vue de côté du plan montre un profil étagé en haut de la carrure : un plat, un biseau, puis le flanc vertical. Le script porte `chanfrein_dessus` 0,5. La peau extérieure s’arrête à `hauteur_carrure - chanfrein_dessus`, et une couronne conique (`pente` sur la face `couronne`) relie ce palier au plat du dessus, qui s’arrête donc à `rayonExt - chanfrein_dessus`. Le tesseler monte le bord extérieur de la couronne de `pente` et incline sa normale. Tests : `packages/api-parametrique/tests/carrure.test.ts`. Reste le creux à la base des cornes.

## 2026-09-26 — Le dessus de la boîte suit la corne

Le mur, le biseau et la jupe de lunette prennent la hauteur de l’arche, y compris sur les 3,5 mm d’amorce. Le plat central reste à `hauteur_carrure`. Le trou de lunette reste dégagé. La courbe du dessus de la corne est celle déjà retenue. Test : `packages/shell/tests/scriptCarrure.test.ts`.

## 2026-09-26 — Arête haute vive

`chanfrein_dessus` sort du script. Le flanc extérieur monte jusqu’à `hauteur_carrure` et le plat du dessus part du rayon extérieur. Tests : `packages/api-parametrique/tests/carrure.test.ts`, `packages/shell/tests/scriptCarrure.test.ts`.

## 2026-09-26 — Entrecorne droite

L’arche n’abaisse que la zone des cornes, là où la largeur dépasse l’entrecorne. Entre les cornes, le mur et le plat restent à `hauteur_carrure`. La courbe du dessus de la corne est inchangée. Test : `packages/shell/tests/scriptCarrure.test.ts`.

## 2026-09-26 — Flanc cousu au dessus

Le dessus et le dessous de la corne reprennent les sommets du flanc et du congé de racine. Le bord commun est une seule ligne. Test : `packages/api-parametrique/tests/corne.test.ts`.

## 2026-09-26 — Sprint 21 préparé : document et repère

[veille/modele-document.md](../veille/modele-document.md) pose le premier palier du modèle. La session tiendra un document : unité en millimètres, repère identité, Y vertical, X vers 3 h, Z vers 12 h. `unite` écrira cette unité. Les pièces, l’historique et l’esquisse restent sur la session. [sprints/sprint-21-document-repere.md](../sprints/sprint-21-document-repere.md) le code. Les plans d’esquisse, le format `.cadompart` et le déplacement du repère restent après.

## 2026-09-26 — Sprint 21 codé : document et repère

La session tient un document. `document()` en rend une copie : unité `mm`, origine au centre, X vers 3 h, Y vertical, Z vers 12 h, trièdre direct. `unite` écrit cette unité sur le document ; `Piece.unite` sort. Les pièces, l’historique et l’esquisse restent sur la session. [sprints/sprint-21-document-repere.md](../sprints/sprint-21-document-repere.md) est codé. Test : `packages/api-parametrique/tests/document.test.ts`.

## 2026-09-26 — Joint du dessus fermé

Le dessus de la corne passe par le sommet de la face intérieure au coin de l’entrecorne, et l’habillage de la boîte reprend ces sommets sur le cylindre. Le triangle ouvert au départ de la chute se referme. La courbe du dessus reste celle déjà retenue. Test : `packages/api-parametrique/tests/corne.test.ts`.

## 2026-09-26 — Panneau Document

Panneau Dockview **Document**, sous les paramètres : unité et repère de référence, lus sur `session.document()`. Il suit la commande `unite`. Layout `v4`.

## 2026-09-26 — Auteur du document

Le document porte un auteur, vide au départ. `auteur` écrit le reste de la ligne, espaces compris. Annuler restaure le nom précédent. Le panneau Document l’affiche. Test : `packages/api-parametrique/tests/document.test.ts`.

## 2026-09-26 — Version semantique du document

Le document porte une version semver 2.0.0, `0.0.0` au départ. `version` n’accepte que `MAJEUR.MINEUR.CORRECTIF`, préversion comprise. Un texte hors format est refusé. Annuler restaure la version précédente. Le panneau Document l’affiche. Test : `packages/api-parametrique/tests/document.test.ts`.

## 2026-09-26 — Généricité de la génération consignée

[shell/genericite.md](../shell/genericite.md) critique l’état du shell de génération. L’hôte, les panneaux et le registre de domaines restent génériques. Le solide, l’esquisse et `noyau.decrire` reconnaissent la carrure Oyster, puis émettent des faces spécialisées. Le filaire du shell retesselle cette frontière à part du maillage de `ombrer`. Aucun correctif n’est engagé.

## 2026-09-26 — Sprint 22 préparé : arbre de fonctions

[veille/arbre-fonctions.md](../veille/arbre-fonctions.md) fixe l’arbre cible : origine, fonctions dans l’ordre, esquisse sous la fonction qui la consomme, pointe de reconstruction plus tard. [sprints/sprint-22-arbre-fonctions.md](../sprints/sprint-22-arbre-fonctions.md) code le premier palier. L’arbre affiche ces fonctions. La frontière de la carrure ne change pas. La pointe, le profil porté par la fonction et les plans d’origine restent après.

## 2026-09-26 — Sprint 22 codé : arbre de fonctions

L’arbre montre l’origine, puis une fonction par extrusion ou enlèvement. L’esquisse est l’enfant de la fonction. Les paramètres restent dans leur panneau. `frontiere()` après le script de carrure est inchangée. La pointe de reconstruction reste après. Test : `packages/shell/tests/arbre.test.ts`.

## 2026-09-26 — Vue d’esquisse depuis l’arbre

Un clic sur une esquisse de l’arbre ouvre sa vue, même si une fonction l’a déjà consommée. La vue montre la grille, les traits et les cotes ; le solide et son fil de fer restent cachés. **Quitter l'esquisse**, un second clic sur la même ligne, ou un clic sur la pièce rend la vue 3D. Le solide n’est pas reconstruit. Test : `packages/shell/tests/vueEsquisse.test.ts`.

## 2026-09-26 — Macro vis tête fraisée Pozi

Le panneau Debug a un bouton **Build vis**. Il n’y a pas de commande `vis`. Le corps est le profil sans filet : cône de pointe à 30° depuis l’axe jusqu’à l’âme Ø 3,5, puis l’âme, fermé à l’épaulement. Sur la pointe, la crête suit ce cône : le filet s’amincit et s’éteint où le cône rejoint l’âme. Le bout reste un cône nu, sans filet ni dard. `revolution` le tourne, puis `pas` ajoute l’hélice sur ce corps seul : triangle vif à 40°, sommets espacés de 2,60, crête au Ø 6, fond sur l’âme. Le filet est balayé le long de l’hélice, comme en CAO : à chaque angle, le profil d’un pas (mi-fond, fond, crête, fond, mi-fond) est posé sur la matière, et les coudes du profil sont des colonnes de la bande. Crête et fonds sont des arêtes du maillage ; il n’y a plus de grille d’anneaux ni de dents d’échantillonnage. La naissance est un éventail depuis la pointe ; l’arrêt sous la tête remplit le dernier tour jusqu’au cercle de l’épaulement, puis se referme à plat au Ø 6, pour que le dessous de la tête reste un cône. La tête 90°, de Ø 6 à Ø 12, est une seconde révolution, ajoutée au volume. `enleve` creuse l’empreinte. Le solide est ombré, sans fil de fer : les normales se moyennent, un pli au-delà de 50° reste vif. L’éventail de la pointe suit le même sens que le fût, vers l’extérieur. Cotes nominales : tête à 90° de Ø 12, pointe à 30°, filet inclus 40°, pas 2,6, âme Ø 3,5, longueur 30 tête comprise, empreinte Ø 6,6 profonde de 2,39. La largeur de la croix n’est pas cotée : un quart du Ø de l’empreinte. Chaque opérateur de l’arbre a une case : éteint, la fonction et l’esquisse qu’elle consomme ne sont plus rejouées. Tests : `packages/api-parametrique/tests/revolution.test.ts`, `packages/shell/tests/scriptVis.test.ts`.

## 2026-09-27 — Sprint 23 préparé : maillage de la vis

Quatre défauts restent sur la vis. La tête n’est pas fermée : le corps se referme au Ø nominal, coplanaire au fond de la tête, et l’union retire les deux. Les normales sont recalculées après le booléen, donc les sommets en T du BSP laissent le cône facetté. Le fil de fer ne lit que la frontière analytique, et la vis n’en a pas. La construction est lente parce que chaque ligne reconstruit tout le solide, et parce que le booléen redécoupe des triangles qui ne se touchent pas. Le rendu est déjà sur le GPU ; un booléen BSP ne s’y porte pas. [veille/vis-maillage.md](../veille/vis-maillage.md) fixe les corrections. [sprints/sprint-23-vis-maillage.md](../sprints/sprint-23-vis-maillage.md) les code, dans l’ordre : fermeture, mesure et un seul recalcul par script, normales portées par le booléen, fil de fer des faces, booléen limité à la zone de contact, replay sans géométrie, puis worker. La frontière de la carrure ne change pas. Les paliers 2 à 4 de l’arbre et un filet cosmétique restent après.

## 2026-09-27 — Sprint 23 en cours : fermeture, un seul recalcul, normales

`pas` referme le corps au rayon de l’âme. L’union du corps et de la tête garde la somme des volumes. Sous la tête, la couronne entre l’âme et le Ø 6 a une normale géométrique −Y. `Session.lot` et `Hote.executer` reconstruisent le solide une fois par script : le viewport de test ne reçoit que le maillage final. Mesures du script vis : avant, pas 41 ms (3 501 triangles), tête 1,2 s (85 432), vis complète 12,3 s (97 089) ; après le lot, la vis complète passe à 4,3 s. Le reste est l’union, environ 1,1 s, et la différence Pozi, environ 3 s. Le booléen porte désormais la normale de chaque sommet et l’interpole à la découpe. `tourner` donne une face par segment du profil, et le lissage ne mélange pas deux faces : le cône de tête reste à moins de 3° de sa normale analytique après l’union et l’empreinte. Le fil de fer des faces, le booléen limité à la zone de contact et le worker restent à faire. Tests : `packages/api-parametrique/tests/revolution.test.ts`, `packages/api-parametrique/tests/csg.test.ts`, `packages/shell/tests/scriptVis.test.ts`, `packages/shell/tests/viewport.test.ts`.

## 2026-09-27 — Sprint 23 terminé : fil de fer, booléen local, worker

Le fil de fer d’un solide maillé trace les frontières de faces : un cylindre tourné donne deux cercles, la vis trace la crête, le cercle de tête, le cercle d’épaulement et le contour de l’empreinte. Aucun segment ne traverse le cône hors de l’empreinte. La frontière analytique de la carrure reste `filDeFer`.

`union` et `difference` laissent entiers les triangles hors de la boîte de l’autre solide, et un triangle que le volume adverse ne rogne pas n’est pas redécoupé. Le plan d’un nœud est pris au milieu de la liste. Deux cubes disjoints restent à 24 triangles. Deux cubes en contact par une face gardent le volume et un maillage fermé. Le script vis produit 4 466 triangles, en 1,7 s. Avant le lot, la même vis prenait 12,3 s pour 97 089 triangles ; après le lot seul, 4,3 s. Le rendu était déjà sur le GPU : le gain est le booléen, puis le worker qui sort la construction du fil d’interface.

`Contexte.geometrie` à faux saute le maillage de `revolution`, `pas` et `enleve`. `esquisseDepuis` rejoue ainsi : ouvrir une esquisse déjà consommée ne refait pas le booléen. Le fil d’interface tient une session dans ce mode. `moteurSynchrone` garde la session complète pour les tests Node. `moteurWorker` calcule dans un worker, transfère les tableaux et ignore une réponse dont le numéro est dépassé. Le viewport montre le maillage reçu et « Construction… » tant que le calcul n’est pas revenu. Tests : `packages/api-parametrique/tests/csg.test.ts`, `packages/api-parametrique/tests/revolution.test.ts`, `packages/shell/tests/filBrep.test.ts`, `packages/shell/tests/scriptVis.test.ts`, `packages/shell/tests/vueEsquisse.test.ts`, `packages/shell/tests/protocole.test.ts`.

## 2026-10-09 — Analyse du dépôt

[analyse.md](analyse.md) consolide l’état après les sprints 03–23 : trois couches (`api-parametrique`, `shell`, `w3dts`), deux chemins géométriques (carrure à faces exactes, vis à maillage BSP), limites de généricité, manques pour le produit OpenCAD. Le README et [documentation/README.md](../README.md) pointent vers cette note et cessent de dire que le modeleur et le shell sont absents.

## 2026-10-10 — occt-wasm livre occt-kernel

Vérification de [@naanouff/occt-wasm](https://github.com/naanouff/occt-wasm) : la **v0.1.0** n’exposait que le lecteur STEPCAF (`occt-step`). La **v0.2.0** (release du jour) ajoute l’artefact **`occt-kernel`** (~15,6 Mo wasm) : arena, primitives, wire / extrude / revolve, booléens, fillet / chamfer, tessellation, STEP/BREP échange. Preuves, surface API et doctrine : [occt-kernel.md](occt-kernel.md). [analyse.md](analyse.md) est alignée. Aucun branchement dans `packages/` : candidat pour `NoyauGeometrique`, historique toujours hors bande.

## 2026-10-10 — Décision : occt-kernel remplace le noyau OpenCAD

Le moteur B-Rep d’OpenCadEditor est **occt-kernel**. Le noyau OpenCAD est **déprécié** comme cible (il n’était pas branché). Formats `.cadom` / `.cadompart` inchangés ; STEP/BREP = échange ou cache. Plan : [noyau-occt.md](../veille/noyau-occt.md). Sprint prêt : [sprint-24-noyau-occt.md](../sprints/sprint-24-noyau-occt.md) — sous-module `vendor/occt-wasm` @ v0.2.0, adaptateur worker, validation des deux pièces pilotes (vis puis carrure ; `pas` hybride faute d’hélice dans le kernel v1). README, analyse et SWOT alignés. Pas encore de code.

## 2026-10-10 — Gitflow

Flux aligné sur occt-wasm : `feature/*` | `fix/*` → `develop` → `main` → tag `v*`. Doc : [gitflow.md](../gitflow.md). Rulesets versionnés dans `.github/rulesets/` (`gitflow-protect-main`, `gitflow-protect-develop`) : PR obligatoire, pas de suppression ni de force-push ; bypass admin. Branche par défaut GitHub : `main`. La branche historique `feature/initial` ne fait plus partie du flux courant.

## 2026-10-10 — Sprint 24 commencé : feature/noyau-occt

Branche `feature/noyau-occt` depuis `develop`. Sous-module `vendor/occt-wasm` @ tag `v0.2.0`. Artefacts `occt-kernel.js` / `.wasm` dans `packages/shell/occt/` (script `scripts/fetch-occt-kernel.mjs`). Alias Vite `@naanouff/occt-wasm/kernel` et `kernel/batch`. Smoke Vitest : box → tessellate et extrude → cut (`packages/shell/tests/occtKernel.test.ts`). Le worker précharge le kernel ; le maillage affiché vient encore de `Session` / `noyauProvisoire` jusqu’à la validation vis et carrure.

## 2026-10-10 — Vis hybride OCCT

`packages/shell/src/occt/construireVis.ts` : corps et tête en `revolve`, fuse, empreinte Pozi en extrude + `boolean_cut`. Le filet `pas` reste le maillage hôte : on retire le fût lisse OCCT du solide, puis `union` avec le corps fileté Session. Le worker, pour la pièce `vis`, sert ce maillage hybride. Tests : `construireVisOcct.test.ts`. Carrure encore sur `noyauProvisoire`.

## 2026-10-10 — Direction modeleur contraint : pivot

Verdict : [direction-modeleur.md](../veille/direction-modeleur.md). L’architecture (historique + occt-kernel + arbre + formats) est la bonne pour un FreeCAD / Creo web. Le chemin tactique (compilateur de pièce + motifs + `construireVis` / `decrire`) ne mène pas à un modeleur contraint s’il continue.

**Arrêt** : porter la carrure motif par motif vers OCCT (item 6 du sprint 24 annulé). **Suite** : [pipeline-occt.md](../veille/pipeline-occt.md) — [sprint 25](../sprints/sprint-25-pipeline-occt.md) (esquisse résolue + features génériques → `runBatch`, vis réécrite dessus) puis [sprint 26](../sprints/sprint-26-gcs-esquisse.md) (GCS). Carrure seulement quand le pipeline générique le permet. Sprint 24 recentré sur infra + preuve vis.

## 2026-10-10 — Sprint 25 commencé : feature/pipeline-occt

Branche `feature/pipeline-occt` depuis `develop`. Pipeline générique : `esquissePolylines` → `opsDepuisFonction` → `pipelineOcct` (historique → `runBatch` → tessellate). Worker unique : plus de branche `piece === 'vis'` ; si l’historique se compile, maillage OCCT, sinon Session / `noyauProvisoire` (carrure). Vis : révolutions + Pozi via le pipeline ; `pas` hybride (filet hôte + tête/Pozi OCCT). `construireVis.ts` réduit à une façade de tests. Tests : `esquissePolylines`, `pipelineOcct`, `construireVisOcct`.

## 2026-10-10 — Sprint 25 : vis conforme à l’écran

Debug **Build vis** sur le shell : pointe, filet, tête fraisée, empreinte Pozi — conforme. Critère visuel du sprint 25 validé. Extrusion rectangle générique couverte par les tests ; carrure hors périmètre (toujours `noyauProvisoire`).

## 2026-10-10 — Sprint 26 commencé : feature/gcs-esquisse

Branche depuis `develop`. GCS v1 dans `api-parametrique` ([solveurGcs.ts](../../packages/api-parametrique/src/solveurGcs.ts), veille [gcs-esquisse.md](../veille/gcs-esquisse.md)) : rectangle (H/V + distances), cercle (rayon), profil révolution. `polylinesDepuisEsquisse` consomme `resoudre`. `Session.etatEsquisse` / `etatEsquisseDepuis` ; statut sous/sur/contraint dans le panneau Construction. Critère : changer `L` double la largeur OCCT (`gcsPipeline.test.ts`). Carrure motif (ecart/debord) hors GCS géométrique.

## 2026-10-10 — Sprint 26 : boîte GCS à l’écran

Debug **Build boite** (rectangle coté → extrude OCCT) : solide affiché. Ouverture de l’esquisse : statut **Esquisse contrainte**. `noyau.mailler` ne exige plus `diametre_boite` hors carrure (sinon le host plantait avant le worker). Tests solveur / vue / pipeline / carrure verts.

## 2026-10-10 — Sprint 26 validé visuellement

Résultat attendu confirmé : boîte L=20 × l=10 × hauteur 8 via GCS + pipeline OCCT. Critères du sprint 26 atteints.

## 2026-10-10 — Sprint 27 préparé : pointe d’arbre

Plan consignés : [pointe-arbre.md](../veille/pointe-arbre.md) et [sprint-27-pointe-arbre.md](../sprints/sprint-27-pointe-arbre.md) (palier 2 de [arbre-fonctions.md](../veille/arbre-fonctions.md)). `Piece.pointe`, `rejouables` tronqué, verbe `pointe` annulable, sync pipeline OCCT + worker, UI grisée + clic. Hors sprint : paliers 3–4, naming topo, carrure OCCT. Pas encore de code ; branche prévue `feature/pointe-arbre`.

## 2026-10-10 — Sprint 27 commencé : feature/pointe-arbre

Branche `feature/pointe-arbre` depuis `develop`. `Piece.pointe` + `rejouables(historique, pointe)` partagé (`historique.ts`) ; verbe `pointe <rang>|fin` annulable. Pipeline OCCT et worker lisent `pointeCourante()`. Protocole `pointe` parallèle à `activer` ; arbre `estPointe` / `apresPointe` ; clic sur une fonction pose la pointe. Preuves : carrure tronquée, vis avant `pas` sans filet.

## 2026-10-10 — Sprint 27 : pointe conforme à l’écran

Debug **Build carrure** / **Build vis** : déplacer la pointe change le viewport ; fonctions après la pointe grisées. Critère visuel du sprint 27 validé.

## 2026-10-10 — Suite consignés : sprints 28–31

Feuille de route post-pointe : [topo-faces.md](../veille/topo-faces.md) → [gcs-enrichi.md](../veille/gcs-enrichi.md) → [carrure-pipeline.md](../veille/carrure-pipeline.md) → [datums-origine.md](../veille/datums-origine.md). Sprints [28](../sprints/sprint-28-topo-faces.md)–[31](../sprints/sprint-31-datums-origine.md). Paliers arbre 3–4 réécrits dans [arbre-fonctions.md](../veille/arbre-fonctions.md) (wires OCCT, pas `profil()` / `decrire`). Prochain code : sprint 28, branche `feature/topo-faces`.

## 2026-10-10 — Sprint 28 commencé : feature/topo-faces

Branche depuis `develop`. Registre `face.dessus` / `face.dessous` (bornes Y après extrude) ; `esquissePolylines` accepte `face.*` ; `enlever` coupe depuis le fond vers l’extérieur. Preuves : poche Ø8 profondeur 2 sur boîte hauteur 8 ; rebuild hauteur 12.

## 2026-10-10 — Vigilance : cercles en polyline OCCT

Build boite : poche conforme ; le fil de fer du cylindre montre les facettes de la densification (~48 segments). Pas un défaut de `face.dessus`. Noté dans [topo-faces.md](../veille/topo-faces.md) : arcs / cercles natifs kernel pour plus tard.

## 2026-10-10 — Sprint 28 : faces conformes à l’écran

Debug **Build boite** : extrude + poche sur `face.dessus` conforme. Critère visuel du sprint 28 validé (vigilance polylines notée).

## 2026-10-10 — Sprint 29 commencé : feature/gcs-enrichi

Branche depuis `feature/topo-faces`. GCS : deux cercles concentriques ; contour corne (`ecart`/`debord`/`largeur`/`rayon` + `geometriePlan`) avec symétries → 4 polylines ; `exigerEsquisse` refuse sans wire. Pipeline OCCT consomme `symetries` / `concentrique`. Preuve : extrude corne via OCCT.

## 2026-10-10 — Sprint 30 commencé : feature/carrure-pipeline

Branche depuis `feature/gcs-enrichi`. Anneau OCCT = extrude Øext + cut Øint ; lunette/fond sur faces ; cornes fusées ; `rouvrir` sur dernier support. Barrette et tube encore ignorés (évite de dégrader le corps). `SCRIPT_CARRURE` compile et maille via OCCT. Validation visuelle : Debug **Build carrure**.

