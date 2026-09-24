# OpenCadEditor

Éditeur CAO web qui exploite les formats [OpenCAD](https://github.com/naanouff/OpenCAD/tree/develop). Le rendu et l’interface viendront de [w3dts](https://github.com/naanouff/w3dts), présent ici en sous-module (`vendor/w3dts`).

OpenCadEditor est le logiciel. Les fichiers OpenCAD ne le sont pas.

| Rôle | Fichier ou composant |
|------|----------------------|
| Assemblage | `.cadom` |
| Intention paramétrique | `.cadompart` |
| Solide exact au recalcul | noyau OpenCAD |
| Solide exact figé | `.cadombrep` |
| Affichage sans noyau | `.cadomesh` |
| STEP / AP242 | import seulement, hors du modèle de vérité |

La doctrine de référence est `documentation/opencad-doctrine.md` sur la branche `develop` d’OpenCAD (2026-09-16).

## État

La veille fonctionnelle est écrite. Le modeleur n’est pas encore développé. Le suivi des décisions est dans [documentation/suivi/journal.md](documentation/suivi/journal.md).

| Note | Sujet |
|------|--------|
| [modelisation-parametrique.md](documentation/veille/modelisation-parametrique.md) | Vocabulaire et place des formats |
| [existant.md](documentation/veille/existant.md) | Outils de CAO existants |
| [fonctionnalites.md](documentation/veille/fonctionnalites.md) | Fonctions par logiciel |
| [matrice-swot.md](documentation/veille/matrice-swot.md) | Comparaison |
| [modeleur-ideal.md](documentation/veille/modeleur-ideal.md) | Fonctions réunies du modeleur idéal |
| [swot.md](documentation/veille/swot.md) | SWOT d’OpenCadEditor |

## Dépôt

```text
documentation/     suivi et veille de ce projet
vendor/w3dts/      moteur WebGPU (sous-module)
```

Le client bureau (Electron) et le shell d’édition ne sont pas encore dans ce dépôt.
