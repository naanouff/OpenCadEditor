# Documentation OpenCadEditor

Suivi du projet et notes de travail. Ce dossier n’appartient pas au moteur : la documentation de w3dts reste dans `vendor/w3dts/documentation`.

| Dossier | Rôle |
|---------|------|
| [gitflow.md](gitflow.md) | Branches : feature/fix → develop → main → tag |
| [suivi/analyse.md](suivi/analyse.md) | État du dépôt : couches, langage, géométrie, manques |
| [suivi/occt-kernel.md](suivi/occt-kernel.md) | Vérification : occt-wasm v0.2.0 et kernel B-Rep |
| [veille/noyau-occt.md](veille/noyau-occt.md) | Décision : occt-kernel remplace le noyau OpenCAD |
| [sprints/sprint-24-noyau-occt.md](sprints/sprint-24-noyau-occt.md) | Sprint : sous-module, worker, vis + carrure |
| [suivi/journal.md](suivi/journal.md) | Décisions datées et état des choix encore ouverts |
| [developpement.md](developpement.md) | Règle de base : TDD |
| [veille/](veille/) | Veille fonctionnelle avant développement du modeleur |
| [maquette/plan-layout.md](maquette/plan-layout.md) | Layout visé de l’éditeur |
| [maquette/index.html](maquette/index.html) | Maquette statique à ouvrir dans un navigateur |
| [sprints/sprint-01-maquette-layout.md](sprints/sprint-01-maquette-layout.md) | Sprint de la maquette de layout, déjà dessinée |
| [veille/plan-interfaces.md](veille/plan-interfaces.md) | Veille des interfaces du benchmark, avant de reprendre le layout |
| [veille/interfaces.md](veille/interfaces.md) | Repérage des interfaces du benchmark, captures créditées |
| [sprints/sprint-02-veille-interfaces.md](sprints/sprint-02-veille-interfaces.md) | Sprint de cette veille, captures enregistrées ou absence expliquée |
| [veille/commandes-milgauss.md](veille/commandes-milgauss.md) | Commandes et fonctions pour reconstruire la carrure |
| [veille/api-architecture.md](veille/api-architecture.md) | Socle modulaire de l’API, pile d’actions, domaines |
| [sprints/sprint-03-api-carrure.md](sprints/sprint-03-api-carrure.md) | Socle de l’API carrure, tests du script et de la pile |
| [shell/plan.md](shell/plan.md) | Shell : terminal, viewport, maillage, registres |
| [shell/genericite.md](shell/genericite.md) | Critique : l’hôte est générique, la génération est un compilateur de carrure |
| [shell/editor-ui.md](shell/editor-ui.md) | Chrome Dockview via `@naanouff/w3dts-editor-ui`, sync `develop` |
| [sprints/sprint-04-shell.md](sprints/sprint-04-shell.md) | Shell testable : terminal, maillage de l’anneau, viewport |
| [veille/portee-lunette.md](veille/portee-lunette.md) | Épaulement du dessus, après l’anneau |
| [sprints/sprint-05-portee-lunette.md](sprints/sprint-05-portee-lunette.md) | Sprint de cette portée, test rouge puis `decrire` |
| [veille/orientation-faces.md](veille/orientation-faces.md) | Côté matière porté par la frontière, au lieu d’être deviné |
| [sprints/sprint-06-orientation-faces.md](sprints/sprint-06-orientation-faces.md) | Sprint de ce champ, tests des cas que les règles actuelles ratent |
| [veille/modes-vue.md](veille/modes-vue.md) | Vue perspective, ou orthographique face au plan de l’esquisse |
| [sprints/sprint-07-modes-vue.md](sprints/sprint-07-modes-vue.md) | Sprint des deux modes, grille en millimètres |
| [veille/cotes-esquisse.md](veille/cotes-esquisse.md) | Diamètre affiché dans le plan, la valeur suit l’expression |
| [sprints/sprint-08-cotes-esquisse.md](sprints/sprint-08-cotes-esquisse.md) | Sprint de ces cotes, trait dans le plan et étiquette HTML |
| [veille/cotes-texte.md](veille/cotes-texte.md) | Nombre de diamètre posé dans le plan, glyphe qui suit la vue |
| [sprints/sprint-09-cotes-texte.md](sprints/sprint-09-cotes-texte.md) | Sprint de ces glyphes, maillage Open Sans à la place du HTML |
| [veille/camera-esquisse.md](veille/camera-esquisse.md) | Esquisse en panoramique et zoom, rotation au retour du solide |
| [sprints/sprint-10-camera-esquisse.md](sprints/sprint-10-camera-esquisse.md) | Sprint de ce verrou, liaisons sans rotation |
| [veille/vues-parametres.md](veille/vues-parametres.md) | Isométrie, plan d’esquisse, unité, types, panneau |
| [sprints/sprint-11-vues-parametres.md](sprints/sprint-11-vues-parametres.md) | Sprint de cette suite, fond fixe compris |
| [veille/cornes-barrette-tube.md](veille/cornes-barrette-tube.md) | Quatre cornes, trou de barrette, tube de couronne |
| [sprints/sprint-12-cornes-barrette-tube.md](sprints/sprint-12-cornes-barrette-tube.md) | Sprint de ces trois figures, test rouge puis `decrire` |
| [veille/booleen-carrure.md](veille/booleen-carrure.md) | Union et différence calculées, arbre BSP sans dépendance |
| [sprints/sprint-13-booleen-carrure.md](sprints/sprint-13-booleen-carrure.md) | Sprint de ce booléen, maillage fermé et arêtes vives |
| [veille/faces-rognees.md](veille/faces-rognees.md) | Booléen sur les faces exactes, tessellation à flèche |
| [sprints/sprint-14-faces-rognees.md](sprints/sprint-14-faces-rognees.md) | Sprint de ces contours, paroi ronde et cercles nets |
| [sprints/sprint-15-editor-ui.md](sprints/sprint-15-editor-ui.md) | Sprint chrome `editor-ui`, sync `develop`, surcharges caméra |
| [veille/profil-cornes.md](veille/profil-cornes.md) | Cornes en profil fermé : segments, arcs, joue courbe |
| [sprints/sprint-16-profil-cornes.md](sprints/sprint-16-profil-cornes.md) | Sprint de ce profil, test rouge puis `decrire` |
| [veille/profil-elevation-cornes.md](veille/profil-elevation-cornes.md) | Congés de bout en élévation : haut large, bas petit |
| [sprints/sprint-17-profil-elevation-cornes.md](sprints/sprint-17-profil-elevation-cornes.md) | Sprint de ces congés, test rouge puis `ombrer` |
| [veille/geometrie-cornes-references.md](veille/geometrie-cornes-references.md) | Forme des cornes Oyster estimée sur les photos de `references/` |
| [sprints/sprint-18-contour-cornes-oyster.md](sprints/sprint-18-contour-cornes-oyster.md) | Sprint du contour en plan : coin effilé, flanc droit, racine creuse |
| [sprints/sprint-19-elevation-cornes-oyster.md](sprints/sprint-19-elevation-cornes-oyster.md) | Sprint du profil d’élévation : dessus en pente, dessous creusé |
| [sprints/sprint-20-elevation-elliptique-cornes.md](sprints/sprint-20-elevation-elliptique-cornes.md) | Sprint des quarts d’ellipse : le bout plonge au ras du fond |
| [veille/modele-document.md](veille/modele-document.md) | Premier palier du modèle : document, unité, repère de référence |
| [sprints/sprint-21-document-repere.md](sprints/sprint-21-document-repere.md) | Sprint de ce palier : la session tient le document |
| [veille/arbre-fonctions.md](veille/arbre-fonctions.md) | Arbre de fonctions : origine, esquisse sous la fonction, pointe |
| [sprints/sprint-22-arbre-fonctions.md](sprints/sprint-22-arbre-fonctions.md) | Sprint du palier 1 : l’arbre affiche les fonctions, sans changer la frontière |
| [veille/vis-maillage.md](veille/vis-maillage.md) | Vis : fermeture sous la tête, normales portées par le booléen, fil de fer de faces, vitesse |
| [sprints/sprint-23-vis-maillage.md](sprints/sprint-23-vis-maillage.md) | Sprint de ces quatre corrections, sans changer la frontière de la carrure |
| [veille/noyau-occt.md](veille/noyau-occt.md) | occt-kernel : dépréciation du noyau OpenCAD, preuve vis |
| [sprints/sprint-24-noyau-occt.md](sprints/sprint-24-noyau-occt.md) | Sprint infra kernel + vis hybride (carrure motif annulée) |
| [veille/direction-modeleur.md](veille/direction-modeleur.md) | Verdict FreeCAD / Creo : bons piliers, mauvais chemin pièce |
| [veille/pipeline-occt.md](veille/pipeline-occt.md) | Chaîne générique historique → wires → OCCT |
| [sprints/sprint-25-pipeline-occt.md](sprints/sprint-25-pipeline-occt.md) | Sprint features génériques + vis sur le pipeline |
| [veille/gcs-esquisse.md](veille/gcs-esquisse.md) | GCS v1 : contraintes, résolution, statut |
| [sprints/sprint-26-gcs-esquisse.md](sprints/sprint-26-gcs-esquisse.md) | Sprint solveur d’esquisse (GCS) |
| [veille/pointe-arbre.md](veille/pointe-arbre.md) | Pointe de reconstruction : préfixe d’historique |
| [sprints/sprint-27-pointe-arbre.md](sprints/sprint-27-pointe-arbre.md) | Sprint arbre palier 2 : pointe annulable + UI |

La veille précède chaque sprint. Le prototype (API, shell, carrure, vis) est dans `packages/`. OpenCadEditor est l’éditeur. CADOM (`.cadom`) est le format d’assemblage OpenCAD, pas un logiciel. L’intention est dans `.cadompart`. L’état consolidé est dans [suivi/analyse.md](suivi/analyse.md) ; le détail daté reste dans le journal.
