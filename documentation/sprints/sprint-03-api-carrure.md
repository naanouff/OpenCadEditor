# Sprint 03 — socle de l’API carrure

Code le socle décrit dans [api-architecture.md](../veille/api-architecture.md), assez pour rejouer le script de [commandes-milgauss.md](../veille/commandes-milgauss.md). Le paquet est `packages/api-parametrique`. Pas de viewport, pas de fenêtre.

## But

Une session TypeScript exécute le script de la carrure, reconstruit après un changement de cote, et annule ou refait chaque commande depuis la pile d’actions.

## Périmètre

1. Paquet `packages/api-parametrique` à la racine d’OpenCadEditor, hors de `vendor/w3dts`.
2. Session : document, pièce, historique, noms, registre, pile (`faire`, `defaire`, annuler, refaire).
3. Domaines `parametres`, `esquisse`, `solide`, enregistrés. Aucun `switch` de types dans la session.
4. Trois ports, avec une implémentation provisoire suffisante pour le script : évaluateur d’expressions, solveur qui sait dire « profil fermé » et « plus aucun degré de liberté », noyau qui pose des faces `face.dessus` et `face.dessous` sans solide exact.
5. Lecture du script de la carrure, ligne par ligne, vers ces opérations.
6. Tests : le script va au bout ; `face.dessus` échoue avant la première extrusion ; la collerette nulle ou négative arrête la reconstruction ; annuler retire la dernière opération ; annuler un `param` déjà nommé restaure l’expression précédente ; une commande nouvelle vide la branche « à refaire ».

Hors sprint : viewport, Electron, ruban, fichiers OpenCAD, solveur géométrique réel, noyau B-rep, `arc`, `revolution`, `repete`, assemblage, GPROC.

## Terminé quand

- Le script de la carrure s’exécute dans les tests.
- Annuler puis refaire la dernière commande retrouve le même historique.
- Un domaine ajouté dans le test s’enregistre sans modifier la session.
- Le journal dit que ce socle précède le viewport.
