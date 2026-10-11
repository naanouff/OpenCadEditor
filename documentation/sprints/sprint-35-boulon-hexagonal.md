# Sprint 35 — boulon hexagonal fileté

Code [boulon-hexagonal.md](../veille/boulon-hexagonal.md). Suit le MCP ([sprint 34](sprint-34-mcp-geometrie.md)) et le filet hôte ([vis-maillage.md](../veille/vis-maillage.md)). Branche prévue : `feature/boulon-hexagonal` depuis `feature/mcp-geometrie`.

## But

Un script MCP produit un boulon M8 : tête hexagonale, fût fileté, bout plat. L’éditeur ouvert affiche le même solide sans pointe de vis à bois.

## Périmètre

Chaque numéro part d’un test rouge.

1. **API.** Verbe `hexagone`, cote `entreplat`, solveur à six sommets (`R = entreplat / (2 · cos(π/6))`). Test miroir de l’octogone : esquisse contrainte, puis tête extrudée + tige.
2. **Pipeline.** [`pipelineOcct.ts`](../../packages/shell/src/occt/pipelineOcct.ts) rejoue `hexagone` / `octogone` et `entreplat`. Après la première `revolution`, les faces `face.dessus` / `face.dessous` existent. Un `extrude` sur `face.dessus` part de `yMax`. Test : hex + extrude → maillage non vide.
3. **Script MCP.** `revolution` + `pas` (âme dès `h = 0`, `angle_pointe 175`, `angle_filet 60`, `pas 1.25`) puis tête `hexagone` sur `face.dessus`. `etat.viewport` porte des triangles sans erreur.

Hors sprint : filet ISO cosmétique, hélice kernel, couronne plane en bout, octogone dans ce script (déjà dans l’API).

## Terminé quand

- [boulon-hexagonal.md](../veille/boulon-hexagonal.md) dit le palier codé.
- Les tests `hexagone` et pipeline sont verts.
- Un `executer` MCP montre une tête à six pans et un fût fileté sans longue pointe.

## État

Branche `feature/boulon-hexagonal` depuis `feature/mcp-geometrie`. Préparé : `octogone` + tests ; tests rouges `hexagone` / pipeline boulon ; script MCP `packages/mcp/scripts/boulon.opencad` (M8, `angle_pointe 175`). Implémentation : verbe + solveur + rejeu OCCT.
