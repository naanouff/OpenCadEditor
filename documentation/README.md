# Documentation OpenCadEditor

Suivi du projet et notes de travail. Ce dossier n’appartient pas au moteur : la documentation de w3dts reste dans `vendor/w3dts/documentation`.

| Dossier | Rôle |
|---------|------|
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

Le modeleur ne démarre pas tant que la veille n’est pas écrite. OpenCadEditor est l’éditeur. CADOM (`.cadom`) est le format d’assemblage OpenCAD, pas un logiciel. L’intention est dans `.cadompart`. Ce découpage est consigné dans le journal.
