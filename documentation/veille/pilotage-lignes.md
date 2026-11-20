# Pilotage par les lignes

Décision du 2026-11-20. Fait suite à [direction-modeleur.md](direction-modeleur.md), [mcp-geometrie.md](mcp-geometrie.md) et [ruban.md](ruban.md).

## Verdict

OpenCadEditor se pilote par les lignes de `Session`. Le terminal et le MCP suffisent : l’outil est complet sans fenêtre. L’interface graphique viendra ensuite. Elle émet ou réécrit ces lignes, comme Blender montre dans l’éditeur Info l’opérateur qu’un bouton vient de lancer. Elle ne parle pas au noyau.

[Whittle](https://github.com/anand34577/whittle) (v0.19.0, novembre 2026) est la référence des comportements d’un modeleur contraint. La couche technique reste celle d’OpenCadEditor : historique, GCS, occt-kernel, formats OpenCAD, w3dts, MCP.

## Ce qui est déjà vrai

| Client | Mutation |
|--------|----------|
| Terminal | une ligne lue par `Session.lire` |
| MCP `commande` / `executer` | les mêmes lignes ; le journal est le script synchronisé |
| Ruban (sprint 60) | un bouton émet `extrude 8`, `enleve 2`, `fillet 1` et le nom d’arête |
| Champ d’expression (sprint 61) | émet `regle <rang> <expression>` ; l’expression change, sans ajouter une fonction |

`Session.lire` reste l’unique parseur. Un verbe nouveau est une ligne de plus, pas un outil de plus.

## Contrat

1. **Sans fenêtre, l’outil est complet.** Un script reconstruit la pièce. Le `.cadompart` porte cette intention. L’écran n’est pas le document.
2. **Chaque geste réécrit une ligne.** `extrude 8` devient `extrude 12`. Annuler rend la ligne d’avant.
3. **L’aperçu est la même ligne, non écrite.** On l’évalue, on la montre, on ne l’ajoute qu’à la validation. Un échec ne l’écrit pas.
4. **Le journal est le transcript commun.** L’agent et l’humain relisent les lignes acceptées. On ne réimprime pas les `Operation`.
5. **Un seul registre.** Ruban, souris, terminal et MCP appellent les verbes de la session. Pas de modèle de fonction réservé à React.

## Emprunt à Whittle

Comportements seulement. Whittle tourne sur React, Three.js, replicad / opencascade.js, PlaneGCS, un fichier `.whittle`, Tauri et un serveur Rust. Rien de cette pile n’entre dans le dépôt.

| Comportement | Ici |
|--------------|-----|
| Le prochain geste légal est dit ; l’illégal est refusé avec la raison | la ligne refusée laisse l’historique intact ; le message est celui de `Session` |
| Une édition se prévisualise et ne s’écrit que si le solide se construit | la ligne candidate reste hors du journal jusqu’à l’acceptation |
| Chaque cote est une expression ; la pièce suit | le dialecte `.cadompart` ; un champ ne fait que remplacer l’expression |
| Une référence ambiguë après recalcul est signalée | les noms `face.*` et `arete.*` restent ; l’avertissement s’ajoute au journal |
| Un seul registre de commandes | les verbes de `Session` |

Le diagnostic d’esquisse (degrés de liberté, contrainte en conflit, message lisible) est un contrat de sortie du GCS maison. PlaneGCS n’est pas le solveur du dépôt. Le filetage reste derrière l’hélice d’occt-kernel : on ne le simule pas avec replicad.

## Hors de cette décision

Loft, coque, réseaux, mise en plan, Electron, serveur de comptes. Le jour où l’un d’eux arrive, c’est un verbe ou un client des lignes. La Milgauss juge : la carrure se construit sans ligne spéciale, et une cote ou un congé qui ne passe pas le dit.

## Ordre

Rester sur les verbes déjà dans le pipeline — esquisse, extrusion, enlèvement, congé, pas — et leur donner ce contrat. L’esquisse à la souris continue d’émettre des lignes (P4). Pas de phase nouvelle.
