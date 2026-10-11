# Sprint 45 — plan late-load `.cadom`

Code [cadom-late-load.md](../veille/cadom-late-load.md). Suite sprint 44. Branche : `feature/cadom-late-load`.

## But

Exposer `planLateLoad` depuis le store et lister les assets (rôle + URI) sous l’arbre Document.

## Périmètre

1. **Store.** `planChargement()` → `LateLoadPlan | null` (null si pas d’assemblage).
2. **UI.** Après les nœuds, section « Assets » (rôle, URI, nœuds liés).
3. **Tests.** Fixture A → deux assets mesh `./part-a.glb` / `./part-b.glb` dans le plan et le HTML Document.
4. **Vendor.** `vendor/opencad` @ merge tip (codec browser #95).

Hors sprint : fetch, tessellation, save `.cadom`, pièces Milgauss.

## Terminé quand

- Veille à jour ; tests shell late-load verts ; feuille P3 marque 44–45.
