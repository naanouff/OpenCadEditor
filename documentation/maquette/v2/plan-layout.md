# Plan layout — maquette v2 (inspiration Whittle)

Maquette interactive. Cadre : [../plan-v2.md](../plan-v2.md). Capture de référence : UI Whittle (Browser / ruban / Next steps / timeline).

## Chrome (hors Dockview)

1. Barre fichier : logo, nouveau / ouvrir / sauver, undo, nom **Carrure**, recherche `Ctrl+K`, thème
2. Sélecteur **Design · CAM · CTRL · Render**. États A/B seulement dans Design
3. Ruban : Design = onglets **SOLIDE · ESQUISSE · OUTILS** (ou Sketch) ; les autres espaces ont leur propre ruban

## Panneaux Dockview (défaut)

| Id | Titre | Position | Rôle Whittle |
|----|-------|----------|--------------|
| `browser` | Browser | gauche | Paramètres, Origine, Vues, Corps, Esquisses + œil |
| `viewport` | Viewport | centre | Schéma + cube de vues + barre flottante Tout/Corps/Face/Arête |
| `inspector` | Inspector | droite | Modèle + expression + **Prochaines étapes** |
| `timeline` | Timeline | bas | Historique horizontal + reprise |

## États

- **A · Esquisse** (défaut, calqué Whittle Sketch) — ruban Select/Create/Modify/Constrain + Finish sketch ; Browser Bodies vide + Sketch 1 crayon ; inspector offset / tips / Cancel·Finish ; viewport rectangle W×H + toggles Look at/Grid/Snap/… ; timeline crayon
- **B · Extrusion** — ruban Solide, aperçu bleu hors journal, valider (Finish sketch → B)
- **CAM** — une entrée par pièce du `.cadom` ; un setup par machine et posage ; Simuler montre l’enlèvement (`applyUntil`) sans le moteur du prototype
- **CTRL** — relevé jugé sur le tolérancement MBD de la part. Rattrapage seulement hors bande. Appliquer change le libellé, n’écrit rien
- **Render** — studio sans grille. Générer pose « Rendu 1 · 2 s »

## Thèmes

`dark` (défaut, charte navy/cyan/orange) et `light`. Tokens `--oc-*` · [charte](../../graphique/charte.md) · clé `opencad.maquette.v2.theme`.

## Hors scope

Session, OCCT, WebGPU, MCP, assemblage, toolpath, post-processeur, métrologie, raytracing.
