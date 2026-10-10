# Solveur d’esquisse (GCS)

Plan du [sprint 26](../sprints/sprint-26-gcs-esquisse.md). Suit [direction-modeleur.md](direction-modeleur.md) et [pipeline-occt.md](pipeline-occt.md).

## But

Les cotes et relations **résolvent** les sommets 2D avant l’émission des wires vers OCCT. L’évaluation « lire `largeur` / `longueur` » du sprint 25 devient une sortie du solveur.

## Sous-ensemble v1

| Contrainte | Effet |
|------------|--------|
| `distance` | Distance entre deux points |
| `horizontal` / `vertical` | Alignement d’un segment |
| `coincidence` | Deux points confondus |
| `rayon` | Distance centre → point (cercle) |
| `egalite` | Longueurs de deux segments égales |
| `perpendicularite` / `parallelisme` | Orientations (v1 : via H/V sur rectangles) |

Les entités actuelles (`rectangle`, `cercle`, `segment`+rayon/hauteur) **émettent** ces contraintes implicitement ; les verbes dédiés (`horizontal`, …) viennent ensuite.

## Sortie

```ts
{
  points: { id, u, v }[]
  polylines: { points: string[] }[]  // ids, fermées
  degres: number
  ferme: boolean
  statut: 'sous-contraint' | 'contraint' | 'surcontraint'
}
```

## Intégration (branché)

- Solveur : [`solveurGcs.ts`](../../packages/api-parametrique/src/solveurGcs.ts).
- `polylinesDepuisEsquisse` consomme `resoudre`.
- UI : statut dans le panneau Construction (`ArbreConstructionVue`) quand une esquisse est ouverte ou rejouée.
- Test : `packages/shell/tests/gcsPipeline.test.ts` — doubler `L` agrandit l’extrude OCCT.

## Suite

Anneau, `ecart`/`debord`, arcs, symétrie : [gcs-enrichi.md](gcs-enrichi.md) / [sprint 29](../sprints/sprint-29-gcs-enrichi.md).
