# OpenCadEditor

Éditeur CAO web qui exploite les formats [OpenCAD](https://github.com/naanouff/OpenCAD/tree/develop). Le rendu et l’interface viennent de [w3dts](https://github.com/naanouff/w3dts), présent ici en sous-module (`vendor/w3dts`). Le solide exact au recalcul passe par [occt-wasm](https://github.com/naanouff/occt-wasm) / `occt-kernel` (`vendor/occt-wasm` @ v0.2.0) : bootstrap du futur **OpenCAD Kernel** (K3).

OpenCadEditor est le logiciel. Les fichiers OpenCAD ne le sont pas.

| Rôle | Fichier ou composant |
|------|----------------------|
| Assemblage | `.cadom` |
| Intention paramétrique | `.cadompart` |
| Solide exact au recalcul | **occt-kernel** (bootstrap OpenCAD Kernel) |
| Solide exact figé | `.cadombrep` (cache / archive ; BREP via OCCT) |
| Affichage sans noyau | `.cadomesh` |
| STEP / AP242 | import / échange seulement, hors du modèle de vérité |

Doctrine formats : OpenCAD (`documentation/opencad-doctrine.md` sur `develop`). Moteur : [documentation/veille/noyau-occt.md](documentation/veille/noyau-occt.md). Cap et phases : [documentation/suivi/feuille-de-route.md](documentation/suivi/feuille-de-route.md).

## État

Prototype modeleur contraint (sprints 03–36) : langage texte, pipeline historique → GCS → wires → OCCT, shell React/WebGPU, `.cadompart`, MCP, pièces pilotes (carrure, vis, boulon M8). `noyauProvisoire` encore en secours (barrette / tube hors pipeline). Prochain : [sprint 37 — recalage](documentation/sprints/sprint-37-recalage.md) (P0). Analyse : [documentation/suivi/analyse.md](documentation/suivi/analyse.md). Journal : [documentation/suivi/journal.md](documentation/suivi/journal.md).

| Note | Sujet |
|------|--------|
| [feuille-de-route.md](documentation/suivi/feuille-de-route.md) | Cap, phases P0–P4 / O1–O4, garde-fous |
| [analyse.md](documentation/suivi/analyse.md) | État du dépôt, couches, limites |
| [direction-modeleur.md](documentation/veille/direction-modeleur.md) | Pivot FreeCAD / Creo web |
| [noyau-occt.md](documentation/veille/noyau-occt.md) | occt-kernel bootstrap du kernel OpenCAD |
| [occt-kernel.md](documentation/suivi/occt-kernel.md) | Vérification v0.2.0 |
| [swot.md](documentation/veille/swot.md) | SWOT d’OpenCadEditor |

## Dépôt

```text
documentation/              suivi, veille et sprints
packages/api-parametrique/  session, domaines, GCS, noyau provisoire (secours)
packages/format-opencad/   lecture et écriture `.cadompart`
packages/mcp/               serveur MCP (langage de commandes + pont viewport)
packages/shell/             hôte React, Dockview, viewport, pipeline OCCT (`pnpm dev`)
vendor/w3dts/               moteur WebGPU (sous-module)
vendor/occt-wasm/           sources occt-wasm @ v0.2.0 (sous-module)
packages/shell/occt/        artefacts occt-kernel.wasm (release)
```

Gitflow : `feature/*` | `fix/*` | `chore/*` → `develop` → `main` → tag — [documentation/gitflow.md](documentation/gitflow.md).

Le client bureau (Electron) n’est pas encore dans ce dépôt.
