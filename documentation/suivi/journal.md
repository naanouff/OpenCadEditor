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

Le script porte largeur_bout 2,2, largeur_racine 6, ayon_racine 3, longueur_corne 4,2, ayon_bout_haut 1, diametre_barrette 1,1 et ecul_barrette 1,2. Le plan de flanc remplace la joue ; le congé creux à la racine est un cylindre d'axe Y hors de la peau. pansDeCorne, ombrer et ilDeFer suivent ce profil. Les quatre barrettes restent ouvertes près du bout. [sprints/sprint-18-contour-cornes-oyster.md](../sprints/sprint-18-contour-cornes-oyster.md) est codé. Le dessous creusé et la chute du dessus restent au sprint 19.
