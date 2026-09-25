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

[veille/vues-parametres.md](../veille/vues-parametres.md) fixe la suite. La 3D devient une isométrie, l’esquisse une vue dans son plan, une fois la profondeur orthographique ramenée à WebGPU. `unite` enregistre l’unité après `piece`. Les arguments chiffrés déclarent entier ou flottant. Un panneau de `@naanouff/w3dts-viewer-editor` liste les paramètres. Le fond du viewport est un gris fixe, sans skybox. [sprints/sprint-11-vues-parametres.md](../sprints/sprint-11-vues-parametres.md) le code en TDD.
