# Esquisse — point d’existant vs Whittle

Référence visuelle : mode Sketch Whittle (ruban Create/Modify/Constrain, Browser, panneau esquisse, viewport coté, toggles flottants, Finish sketch).

Contrat OpenCad : [pilotage-lignes.md](../../veille/pilotage-lignes.md) — l’UI émet des lignes `Session`, elle n’est pas un second modèle.

## 1. Ce qui existe déjà (produit)

### Cœur (réel)

| Couche | Contenu |
|--------|---------|
| Verbes | `esquisse`, `cercle`, `rectangle`, `segment`, `arc`, `polygone` / hex / octo, `cote …`, `concentrique`, `symetrie` |
| GCS | Solveur maison + pont kernel ; statut sous / contraint / sur ; extrusion refusée si illégal |
| Viewport | Vue ortho plan, grille mm, traits, cotes Ø / largeur×longueur (glyphes), pas de rotation en esquisse |
| Souris P4 | Clic plan/face → ouvre esquisse ; clic → pose/ajuste cercle ou rectangle (centre origine UV, snap 1 mm) |
| Ruban shell | Plan dessus, Rectangle, Cercle, Extruder, Enlever, Congé — lignes Session |
| Arbre | Construction : voir esquisse, quitter, libellé GCS |

### Maquette v2 (mock uniquement)

Chrome + ruban allégé, Browser, inspector « Prochaines étapes », timeline, toggles flottants génériques. **Pas** encore le ruban Sketch Whittle complet ni le panneau « Sketch 1 · Finish ».

### API sans UI

`segment`, `arc`, `polygone`, `concentrique`, profils carrure — terminal / scripts / tests, pas d’outil souris ni ruban générique.

## 2. Limites actuelles

- Ruban esquisse = 2 formes (rectangle, cercle) à cotes fixes, pas d’outil actif.
- Souris = dimensionnement, pas de dessin multi-clics (ligne, arc), pas de drag libre.
- Contraintes géométriques résolues en coulisse ; **pas** de placement ni d’icônes à l’écran.
- Pas de mode Construction, Trim / Offset / Mirror / Fillet 2D, Ellipse / Slot / Spline.
- Pas de « Finish sketch » ; quitter la vue ou consommer par `extrude` / `enleve`.
- Pas de toggles Look at / Snap / Dimensions / Constraints dans le shell.
- Pas de browser « Esquisses » dédié (seulement l’arbre Construction).

## 3. Whittle Sketch — checklist

| Zone Whittle | OpenCad aujourd’hui | Pour un outil exploitable |
|--------------|---------------------|---------------------------|
| Ruban Select / Construction | — | Mode sélection + trait de construction |
| Create : Line, Rect, Circle, Arc, Polygon, Ellipse, Slot, Spline | Rect + Circle (UI) ; segment/arc/polygone (API) | **MVP** : Ligne, Rect, Circle, Arc + outil actif |
| Modify : Fillet, Trim, Offset, Mirror, Move | Congé 3D seulement | **Plus tard** : Trim + Mirror d’abord |
| Constrain : Dimension + H/V/coïncidence/… | Cotes `cote` + GCS implicite | **MVP** : cote cliquable + 3–4 contraintes exposées en verbes |
| Finish sketch | Quitter / extrude | Bouton qui ferme l’esquisse (ligne ou retour vue 3D) |
| Browser · Sketches | Arbre Construction | Nœud Esquisses + crayon actif |
| Panneau droit esquisse | Paramètres + GCS | Plan, offset, compteurs formes, Cancel / Finish, tips |
| Viewport W/H, axes X/Y | Cotes partielles, grille | Cotes éditables sur la vue ; axes plan |
| Toggles flottants | Maquette partielle | Look at, Grid, Snap, Dimensions, Constraints |
| Timeline crayon | — | Étape esquisse marquée (maquette déjà) |

## 4. Améliorations nécessaires (ordre proposé)

### A — Exploitable (MVP esquisse)

1. **Mode esquisse explicite** : ruban contextuel Sketch (pas seulement 2 boutons) + « Finish sketch » / Annuler.
2. **Outil actif** : Select, Ligne, Rectangle, Cercle, Cote — chacun émet/réécrit des lignes.
3. **Dessin multi-étapes** : ligne 2 clics ; cercle centre+rayon ou diamètre ; rectangle 2 coins (pas seulement origine).
4. **Cotes sur la vue** : afficher et éditer (→ `regle` / `cote`) W/H ou Ø comme Whittle.
5. **Statut GCS visible** : sous-contraint / contraint / sur + message Session.
6. **Browser** : Esquisses avec esquisse active (crayon) ; Corps vide tant qu’il n’y a pas d’extrusion.
7. **Inspector esquisse** : plan, offset (même 0 mm), tips, Cancel / Finish.
8. **Toggles viewport** : Grid, Snap, Dimensions (Constraints en lecture seule au début).

### B — Parité utile (après MVP)

9. Arc, Polygon ; Construction geometry.
10. Contraintes UI : horizontal, vertical, coincident, equal (verbes Session nouveaux ou dérivés).
11. Modify : Trim, Mirror, Fillet coin d’esquisse.
12. Look at (cadrer le plan), Points, Profile highlighting.
13. Ellipse, Slot, Spline, Offset, Insert SVG — hors court terme.

### C — Maquette v2

**Fait** (état A · Esquisse) : ruban Sketch Select/Create/Modify/Constrain + Finish ; Browser Bodies vide + Sketch 1 crayon ; inspector offset / tips / Cancel·Finish ; viewport rectangle W×H + toggles ; timeline crayon. Sans Session.

## 5. Hors scope (inchangé)

Emprunt de pile Whittle (React Three / replicad / `.whittle`). PlaneGCS. Assemblage.