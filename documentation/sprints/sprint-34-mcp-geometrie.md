# Sprint 34 — MCP de géométrie procédurale

Code [mcp-geometrie.md](../veille/mcp-geometrie.md). Indépendant du codec `.cadompart`. Branche prévue : `feature/mcp-geometrie` depuis `develop`.

## But

Un agent envoie le langage de commandes existant. La session headless répond tout de suite. L’éditeur ouvert montre le même solide.

## Périmètre

Chaque numéro part d’un test rouge.

1. **Session.** `reinitialiser()` vide les pièces et les deux piles. Après un script, plus de pièce active ; `annuler` n’a plus rien à restaurer.
2. **Outils.** Paquet `packages/mcp`. `commande`, `executer`, `etat`, `annuler`, `refaire`, `pointe`, `activer` sur une `Session`, sans stdio. `executer` tient dans un `lot`. Une commande inconnue, ou une esquisse non contrainte, laisse l’historique intact et n’émet rien vers le pont.
3. **Pont.** WebSocket `127.0.0.1:47321` (`OPENCAD_MCP_PORT`). Au `bonjour`, adoption selon la veille : deux scripts différents posent `conflit` sans écraser ; `aligner` choisit `mcp` ou `editeur`. Le client `pontMcp.ts` (dev) applique `executer`, `ligne`, `annuler`, `refaire`, `pointe`, `activer`, `remplacer` une seule fois. `refaire` rend la ligne au journal. Le worker reçoit `refaire` et `remplacer` sur la même `Session`. L’accusé est le nombre de triangles, délai 60 s.
4. **Lancement.** `.cursor/mcp.json` démarre `pnpm --dir packages/mcp exec tsx src/index.ts`.

Hors sprint : occt-wasm dans le processus MCP, un outil par verbe, authentification au-delà de l’écoute locale.

## Terminé quand

- [mcp-geometrie.md](../veille/mcp-geometrie.md) dit le serveur branché.
- Un script `piece` / esquisse / `extrude` passé par `commande` figure dans `etat`. Une erreur d’esquisse laisse l’historique intact.
- Shell ouvert : `etat.viewport` porte un nombre de triangles après l’extrude d’une boîte.
- Deux scripts différents au `bonjour` laissent `conflit` sans écraser l’un ou l’autre.

## État

Codé sur `feature/mcp-geometrie`. Tests des outils, du pont et du shell verts. Le viewport vivant (triangles après une boîte) reste à confirmer avec l’éditeur ouvert.
