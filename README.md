# OpenCadEditor

Éditeur CAO web qui exploite les formats [OpenCAD](https://github.com/naanouff/OpenCAD/tree/develop). Le rendu et l’interface viennent de [w3dts](https://github.com/naanouff/w3dts), présent ici en sous-module (`vendor/w3dts`). Le solide exact au recalcul passe par [occt-wasm](https://github.com/naanouff/occt-wasm) / `occt-kernel` (sous-module prévu `vendor/occt-wasm`, sprint 24).

OpenCadEditor est le logiciel. Les fichiers OpenCAD ne le sont pas.

| Rôle | Fichier ou composant |
|------|----------------------|
| Assemblage | `.cadom` |
| Intention paramétrique | `.cadompart` |
| Solide exact au recalcul | **occt-kernel** (noyau OpenCAD déprécié) |
| Solide exact figé | `.cadombrep` (cache / archive ; BREP via OCCT) |
| Affichage sans noyau | `.cadomesh` |
| STEP / AP242 | import / échange seulement, hors du modèle de vérité |

La doctrine formats reste celle d’OpenCAD (`documentation/opencad-doctrine.md` sur `develop`, 2026-09-16). Le choix de moteur B-Rep pour cet éditeur est consigné dans [documentation/veille/noyau-occt.md](documentation/veille/noyau-occt.md).

## État

Prototype paramétrique (sprints 03–23) : langage texte, `noyauProvisoire` TypeScript encore en chemin, shell React/WebGPU. Deux pièces de référence — carrure Milgauss / Oyster et vis tête fraisée Pozi. Sprint 24 : rapatrier occt-kernel et valider les deux pièces. Analyse : [documentation/suivi/analyse.md](documentation/suivi/analyse.md). Suivi : [documentation/suivi/journal.md](documentation/suivi/journal.md).

| Note | Sujet |
|------|--------|
| [analyse.md](documentation/suivi/analyse.md) | État du dépôt, couches, limites |
| [noyau-occt.md](documentation/veille/noyau-occt.md) | Décision : occt-kernel remplace le noyau OpenCAD |
| [occt-kernel.md](documentation/suivi/occt-kernel.md) | Vérification v0.2.0 |
| [modelisation-parametrique.md](documentation/veille/modelisation-parametrique.md) | Vocabulaire et place des formats |
| [existant.md](documentation/veille/existant.md) | Outils de CAO existants |
| [fonctionnalites.md](documentation/veille/fonctionnalites.md) | Fonctions par logiciel |
| [matrice-swot.md](documentation/veille/matrice-swot.md) | Comparaison |
| [modeleur-ideal.md](documentation/veille/modeleur-ideal.md) | Fonctions réunies du modeleur idéal |
| [swot.md](documentation/veille/swot.md) | SWOT d’OpenCadEditor |

## Dépôt

```text
documentation/              suivi, veille et sprints
packages/api-parametrique/  session, domaines, CSG provisoire
packages/shell/             hôte React, Dockview, viewport (`pnpm dev`)
vendor/w3dts/               moteur WebGPU (sous-module)
vendor/occt-wasm/           occt-kernel + occt-step (sprint 24)
```

Gitflow : `feature/*` → `develop` → `main` → tag — [documentation/gitflow.md](documentation/gitflow.md).

Le client bureau (Electron) n’est pas encore dans ce dépôt.
