# Sprint 65 — espaces de la maquette v2

Code [plan-espaces.md](../maquette/plan-espaces.md). Dessiné le 2026-11-21 sur `feature/carreaux-brep` (maquette seule).

Les sprints 63 et 64 restent ceux de la feuille de route (arêtes, datums). Celui-ci ne touche pas au shell ni au noyau.

## But

La maquette v2 montre quatre espaces : Design (déjà là), CAM, CTRL, Render Studio. On juge le layout avant tout verbe de fabrication, de mesure ou de rendu.

## Périmètre

1. Sélecteur `Design · CAM · CTRL · Render` dans le chrome. A/B esquisse-extrusion seulement dans Design.
2. CAM : gamme carrure (brut, Op10, Op20, Op30), parcours dessiné, Post grisé.
3. CTRL : nominal / mesuré / rattrapage sur `diametre_boite`, `epaisseur_paroi`, `entrecorne`. Appliquer ne fait que changer le libellé.
4. Render Studio : studio sans grille, Générer pose la pastille « Rendu 1 ».
5. Mettre à jour [plan-layout.md](../maquette/v2/plan-layout.md) et [README.md](../maquette/v2/README.md).

Hors sprint : Session, OCCT, WebGPU, toolpath, post-processeur, métrologie, raytracing, `.cadomfab`, `.cadomctrl`.

## Terminé quand

- `pnpm dev` dans `documentation/maquette/v2` ouvre les quatre espaces sans recharger la page.
- Chaque espace a son ruban, son browser, son viewport, son inspector et sa timeline, sur les mêmes panneaux Dockview.
- Aucun appel Session, OCCT ou worker.
- Le README de la maquette dit que CAM, CTRL et Render ne calculent rien.
