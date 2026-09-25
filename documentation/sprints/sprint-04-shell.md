# Sprint 04 — shell terminal et viewport

Produit le socle décrit dans [plan.md](../shell/plan.md). Le paquet est `packages/shell`. Pas de navigateur, pas de WebGPU.

## But

Un hôte testeable envoie les lignes d’un terminal à `Session`, annule par la pile existante, et pousse le maillage de l’anneau vers un viewport de test.

## Périmètre

1. Tests rouges, puis code, dans cet ordre : terminal (ligne, erreur, annulation, registre), `maillage()` de l’anneau dans `packages/api-parametrique`, viewport de test qui reçoit ce maillage après chaque commande.
2. Paquet `packages/shell` à la racine, hors de `vendor/w3dts`. Panneaux enregistrés. Le socle ne cite pas `terminal` ni `viewport` dans un `switch`.
3. `maillage()` retourne un tube après le script de la carrure. `diametre_boite` à 42 mm change le rayon extérieur.

Hors sprint : ruban, arbre, Electron, Dockview, fichiers OpenCAD, solveur réel, noyau B-rep, `EngineMain`, canvas WebGPU.

## Terminé quand

- Une ligne inconnue laisse une erreur dans le journal du terminal et la session accepte la ligne suivante.
- Annuler retire la dernière entrée de ce journal et l’opération dans l’historique.
- Après le script, le viewport de test a reçu un maillage dont le rayon suit `diametre_boite`.
- Un panneau ajouté dans un test s’enregistre sans modifier l’hôte.
- Le journal dit que ce socle précède le canvas WebGPU.
