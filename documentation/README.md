# Documentation OpenCadEditor

Suivi du projet et notes de travail. Ce dossier n’appartient pas au moteur : la documentation de w3dts reste dans `vendor/w3dts/documentation`.

| Dossier | Rôle |
|---------|------|
| [suivi/feuille-de-route.md](suivi/feuille-de-route.md) | Cap, phases P0–P4 / O1–O4 / W1, garde-fous (2026-10-11) |
| [gitflow.md](gitflow.md) | Branches : feature/fix/chore → develop → main → tag ; suppression auto post-merge |
| [suivi/analyse.md](suivi/analyse.md) | État du dépôt : couches, langage, géométrie, manques |
| [suivi/occt-kernel.md](suivi/occt-kernel.md) | Vérification : occt-wasm v0.2.0 et kernel B-Rep |
| [veille/noyau-occt.md](veille/noyau-occt.md) | occt-kernel bootstrap de l’OpenCAD Kernel (K3) |
| [veille/recalage-cap.md](veille/recalage-cap.md) | Veille P0 : test, CI, doc, hygiène |
| [sprints/sprint-37-recalage.md](sprints/sprint-37-recalage.md) | Sprint P0 : suite verte + CI tests |
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
| [veille/topo-faces.md](veille/topo-faces.md) | Faces de sketch stables après rebuild |
| [sprints/sprint-28-topo-faces.md](sprints/sprint-28-topo-faces.md) | Sprint registre `face.*` + poche OCCT |
| [veille/gcs-enrichi.md](veille/gcs-enrichi.md) | GCS : concentrique, corne, symétrie → wires |
| [sprints/sprint-29-gcs-enrichi.md](sprints/sprint-29-gcs-enrichi.md) | Sprint solveur enrichi |
| [veille/carrure-pipeline.md](veille/carrure-pipeline.md) | Carrure via pipeline OCCT générique |
| [sprints/sprint-30-carrure-pipeline.md](sprints/sprint-30-carrure-pipeline.md) | Sprint anneau + cuts + cornes OCCT |
| [veille/datums-origine.md](veille/datums-origine.md) | Plans d’origine = datums document |
| [sprints/sprint-31-datums-origine.md](sprints/sprint-31-datums-origine.md) | Sprint paliers arbre 3–4 |
| [veille/fichier-cadompart.md](veille/fichier-cadompart.md) | Lecture et écriture `.cadompart` |
| [sprints/sprint-32-fichier-cadompart.md](sprints/sprint-32-fichier-cadompart.md) | Sprint du codec protobuf et du panneau Document |
| [veille/pas-cadompart.md](veille/pas-cadompart.md) | Filet `pas` : marqueur `helix` nommé `pas` |
| [sprints/sprint-33-pas-cadompart.md](sprints/sprint-33-pas-cadompart.md) | Sprint de ce marqueur, vis rouverte |
| [veille/mcp-geometrie.md](veille/mcp-geometrie.md) | MCP : langage de commandes, session et viewport |
| [sprints/sprint-34-mcp-geometrie.md](sprints/sprint-34-mcp-geometrie.md) | Sprint du serveur stdio et du pont local |
| [veille/boulon-hexagonal.md](veille/boulon-hexagonal.md) | Boulon M8 : tête hexagone, fût fileté, bout plat |
| [sprints/sprint-35-boulon-hexagonal.md](sprints/sprint-35-boulon-hexagonal.md) | Sprint du verbe `hexagone` et du script MCP |
| [veille/gitflow-protection.md](veille/gitflow-protection.md) | Gitflow : suppression auto, CI politique, nettoyage |
| [sprints/sprint-36-gitflow.md](sprints/sprint-36-gitflow.md) | Sprint de finalisation des protections GitHub |
| [suivi/feuille-de-route.md](suivi/feuille-de-route.md) | Feuille de route moyen terme éditeur + OpenCAD |
| [veille/recalage-cap.md](veille/recalage-cap.md) | Recalage du cap avant P1 / O1 |
| [sprints/sprint-37-recalage.md](sprints/sprint-37-recalage.md) | Sprint : test tube-bout, CI, doc, workspace |
| [veille/barrette-tube-occt.md](veille/barrette-tube-occt.md) | Tube / barrette sur pipeline OCCT (P1) |
| [sprints/sprint-38-tube-occt.md](sprints/sprint-38-tube-occt.md) | Sprint : tube couronne OCCT |
| [sprints/sprint-39-barrette-occt.md](sprints/sprint-39-barrette-occt.md) | Sprint : trous de barrette OCCT |
| [veille/carrure-occt-affichage.md](veille/carrure-occt-affichage.md) | Affichage carrure via pipeline OCCT |
| [sprints/sprint-40-carrure-occt-affichage.md](sprints/sprint-40-carrure-occt-affichage.md) | Sprint : retire historiqueCornesSession |
| [veille/polygone-n.md](veille/polygone-n.md) | Verbe polygone n |
| [sprints/sprint-41-polygone-n.md](sprints/sprint-41-polygone-n.md) | Sprint : polygone n + alias hex/octo |
| [veille/fillet-aretes.md](veille/fillet-aretes.md) | Fillet OCCT + refs arêtes |
| [sprints/sprint-42-fillet-aretes.md](sprints/sprint-42-fillet-aretes.md) | Sprint : fillet + arete.* |

La veille précède chaque sprint. Le prototype (API, shell, format, MCP) est dans `packages/`. OpenCadEditor est l’éditeur. CADOM (`.cadom`) est le format d’assemblage OpenCAD, pas un logiciel. L’intention est dans `.cadompart`. Cap : [suivi/feuille-de-route.md](suivi/feuille-de-route.md). État consolidé : [suivi/analyse.md](suivi/analyse.md) ; détail daté : journal.
