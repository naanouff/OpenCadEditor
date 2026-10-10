# Sprint 27 — pointe de reconstruction

Code le palier 2 de [arbre-fonctions.md](../veille/arbre-fonctions.md) selon [pointe-arbre.md](../veille/pointe-arbre.md). Suite des sprints 25–26 (pipeline + GCS). Branche prévue : `feature/pointe-arbre` depuis `develop`.

## But

L’arbre a une pointe de reconstruction : le solide affiché est le préfixe jusqu’à une fonction choisie ; le reste de l’historique reste visible mais grisé.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Modèle.** Sur `Piece` : `pointe: number | null` (`null` = fin). `Session.pointeCourante()` / `poserPointe(index | 'fin')` avec undo. Verbe `pointe <rang>|fin` (`rang` = 1-based parmi les fonctions).
2. **Replay.** `rejouables` s’arrête après la fonction dont l’index historique égale `pointe`. Même règle pour le filtre du pipeline OCCT (filtre partagé depuis api-parametrique de préférence).
3. **Worker.** Protocole / `storeShell` / `geometrieWorker` : message `pointe` parallèle à `activer`.
4. **Arbre.** `arbreConstruction` marque `apresPointe` / `estPointe`. UI : griser, clic pose la pointe. Checkboxes `actif` inchangées.
5. **Preuves.** Carrure : pointe sur 1ʳᵉ extrusion → sans cornes/tube. Vis : pointe avant `pas` → sans filet. Undo de `pointe` restaure.

Hors sprint : paliers 3–4, réordonnancement, suppression, naming topo, carrure OCCT, GCS enrichi.

## Terminé quand

- Les tests API et shell des critères ci-dessus sont verts.
- Debug **Build carrure** / **Build vis** : déplacer la pointe change le viewport.
- [pointe-arbre.md](../veille/pointe-arbre.md) et le journal disent « branché ».
- [direction-modeleur.md](../veille/direction-modeleur.md) marque le palier 2 comme fait ou en cours selon l’état.
