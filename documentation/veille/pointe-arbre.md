# Pointe de reconstruction

Plan d’exécution du palier 2 de [arbre-fonctions.md](arbre-fonctions.md). Sprint : [sprint-27-pointe-arbre.md](../sprints/sprint-27-pointe-arbre.md). Suit [direction-modeleur.md](direction-modeleur.md).

## But

La pièce porte une **pointe** : dernière fonction rejouée. `reconstruire` (Session et pipeline OCCT) s’arrête là. Les fonctions suivantes restent dans l’historique et sont grisées dans l’arbre. Ce n’est pas le suppress `actif === false` (case à cocher).

```mermaid
flowchart LR
  hist[Historique complet]
  tip[Piece.pointe]
  prefix[rejouables prefix]
  mesh[Maillage Session ou OCCT]
  hist --> tip --> prefix --> mesh
```

## Modèle

| Élément | Décision |
|---------|----------|
| Stockage | `Piece.pointe: number \| null` — index historique de la dernière fonction incluse ; `null` = fin |
| Fonctions | `extrude`, `enlever`, `revolution`, `pas` |
| Commande | `pointe <rang>` (1-based parmi les fonctions) ou `pointe fin` |
| Undo | Déplacer la pointe est annulable (restaure la pointe précédente) ; distinct d’annuler une ligne |
| `actif` | Continue d’agir **dans** le préfixe ; la pointe ne se simule pas en mass-`actif=false` |

## UI

- Fonctions après la pointe : grisées (`apresPointe`), cases `actif` inchangées.
- Clic sur une fonction (hors case) ou commande terminal → pose la pointe.
- Marqueur discret sur la fonction courante (`estPointe`).

## Critères

1. Carrure : pointe sur la première extrusion → pas de cornes ni tube.
2. Vis : pointe avant `pas` → pas de filet.
3. `pointe fin` + annuler restaure la pointe précédente.
4. Viewport suit le préfixe (Session / worker / OCCT).

## État

Branché et validé à l’écran sur `feature/pointe-arbre` (sprint 27) : modèle Session, `rejouables` partagé, pipeline OCCT, worker, UI arbre.

## Hors périmètre

Paliers 3–4, réordonnancement, suppression, naming topologique, carrure→OCCT, GCS enrichi.
