# Late-load assets `.cadom`

Suite de [fichier-cadom.md](fichier-cadom.md). Sprint : [sprint-45-cadom-late-load.md](../sprints/sprint-45-cadom-late-load.md). SDK : `planLateLoad` / `resolveForAdapter` (`@opencad/cadom` O4-3).

## But

Après ouverture du graphe, l’éditeur calcule le plan de chargement des assets (mesh d’abord) et l’affiche dans Document. Aucun fetch réseau ni rendu mesh dans ce palier — uniquement la liste ordonnée des URI à charger.

```mermaid
flowchart LR
  doc[CadomDocument]
  plan[planLateLoad]
  ui[Document assets]
  doc --> plan --> ui
```

## Hors périmètre

Fetch URI, decode `.cadomesh` / glb, adapter w3dts, écriture `.cadom`.
