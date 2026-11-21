# Sprint 01 — maquette du layout

Produit la page statique décrite dans [plan-layout.md](../maquette/v1/plan-layout.md). La maquette s’ouvre dans un navigateur. Elle ne calcule pas de géométrie. Archive : [maquette/v1](../maquette/v1/).

## But

Voir, en plein écran, le ruban, l’historique, les paramètres, le viewport schématique de l’anneau, le panneau d’extrusion et la barre d’état, avec les noms du fil rouge carrure. Les propositions du plan sont visibles et marquées « proposition ».

## Périmètre

Fait dans ce sprint :

1. `documentation/maquette/layout.css` — grille : ruban en haut, historique à gauche, viewport au centre, panneau à droite, barre d’état en bas. Thème sombre.
2. `documentation/maquette/v1/index.html` — les zones et les libellés du plan. Onglet Esquisse visuellement actif. Ligne « Esquisse anneau » sélectionnée. Schéma de deux cercles concentriques dans le viewport. Chaque proposition du plan est dessinée et porte la marque « proposition ».
3. `documentation/maquette/v1/README.md` — une phrase par zone, et la liste de ce que la page ne fait pas.
4. Liens depuis [documentation/README.md](../README.md) vers la maquette.

Hors sprint : solveur, WebGPU, w3dts, Dockview, Electron, fichiers OpenCAD, interaction réelle des boutons au-delà de l’état visuel déjà dessiné.

## Terminé quand

- Ouvrir `documentation/maquette/v1/index.html` affiche les cinq zones sans défilement de page.
- Les libellés `diametre_boite`, `epaisseur_paroi`, `hauteur_carrure`, `entrecorne` et « Carrure » sont lisibles.
- Les propositions (mode esquisse/solide, couleur du profil, cotes dans la vue, barre près de la sélection, recherche, fil d’Ariane, symétrie des cornes, coupe, aperçu fantôme) sont marquées comme telles.
- Le README de la maquette rappelle que ce n’est pas l’éditeur.
