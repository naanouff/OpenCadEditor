# Plateau de service — cas démo OpenCAD

Veille P6. Suit [assemblage-boite-cadom.md](assemblage-boite-cadom.md) et [affichage-topologique.md](affichage-topologique.md). Sprints prévus : 65 (pièces), 66 (assemblage + matériaux). Cap : [feuille-de-route.md](../suivi/feuille-de-route.md).

## Axe

Formats OpenCAD — illustrer parts, instances partagées, assemblage et matériaux d’affichage sur un cas plus simple que la Milgauss.

## But

Un plateau de service en aluminium, deux poignées en laiton vissées chacune par deux vis.

| Définition (asset) | Matériau | Instances |
|--------------------|----------|-----------|
| `plateau.cadompart` | aluminium | 1 × Plateau |
| `poignee.cadompart` | laiton | 2 × Poignée G / D |
| `vis.cadompart` | acier (neutre) | 4 × Vis (2 par poignée) |

```mermaid
flowchart TB
  root[PlateauService.cadom]
  root --> plateau[Plateau]
  root --> pG[Poignee G]
  root --> pD[Poignee D]
  root --> v1[Vis 1]
  root --> v2[Vis 2]
  root --> v3[Vis 3]
  root --> v4[Vis 4]
  pG -. same asset .-> poignee[poignee.cadompart]
  pD -. same asset .-> poignee
  v1 -. same asset .-> vis[vis.cadompart]
  v2 -. same asset .-> vis
  v3 -. same asset .-> vis
  v4 -. same asset .-> vis
```

## Géométrie (à figer au démarrage du sprint 65)

- **Plateau** : plaque rectangulaire ; 4 perçages (2 par extrémité) pour les vis.
- **Poignée** : barre / arc laiton ; 2 trous alignés sur les perçages.
- **Vis** : réutiliser / simplifier la vis Pozi du pipeline (pas de nouveau noyau).

Poses = transforms locaux fixes (pattern [`assemblageBoite.ts`](../../packages/shell/src/assemblageBoite.ts)). Pas de mates.

## Formats illustrés

| Format | Rôle |
|--------|------|
| `.cadompart` | Intention de chaque part |
| `.cadom` | Graphe 1+2+4 nœuds ; **même asset** pour les instances |
| `.cadomesh` | Badge Complete sans rebuild |
| `.cadomat` / `MATERIAL` | Alu / laiton — couleurs viewport |

## Écarts vs plumbing actuel

| Besoin | État |
|--------|------|
| Graphe multi-nœuds + transforms | OK (boîte) |
| Plusieurs nœuds → un asset | Format OK ; **jamais exercé** (boîte = 1↔1) |
| `.cadomat` | Spec + proto ; fixture `example-red-metal` |
| Teinte viewport | Gris PBR unique dans `viewportW3dts` — à brancher en 66 |

## Hors périmètre

Mates ; Exact `.cadombrep` ; zip / fetch HTTP ; physique matériaux ; éditeur `.cadomat`.

## Prérequis

P5 sprint 62 au minimum (solides lisibles). 63–64 peuvent avancer en parallèle des scripts de pièces.
