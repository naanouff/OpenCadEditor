# Maquette v2 — layout guidé (inspiration Whittle)

App React (Vite) : Dockview, Tailwind, Lucide, design system **charte openCAD** (navy / cyan / orange Editor — [graphique/charte.md](../../graphique/charte.md)). Layout calqué sur Whittle. Aucune ligne `Session`, pas d’OCCT.

## Lancer

```bash
cd documentation/maquette/v2
pnpm install
pnpm dev
```

→ http://localhost:5174 — thèmes (lune/soleil). Espaces **Design · CAM · CTRL · Render** dans le chrome. En Design seulement : **A** esquisse Whittle, **B** extrusion.

CAM, CTRL et Render ne calculent rien : pas de toolpath, pas de métrologie, pas de raytracing. Aucune ligne `Session`, pas d’OCCT.

## Zones

| Zone | Design | CAM | CTRL | Render |
|------|--------|-----|------|--------|
| Ruban | Sketch ou SOLIDE | Setup…Simuler, Post grisé | Mesurer, Écart, Appliquer, Verrouiller | Caméra…Générer |
| Browser | Paramètres, corps, esquisses | Pièce → setups (machine, posage) → parcours et tool | Cotes MBD de la part : bande, relevé, dans ou hors | Caméra 3/4, lumières, acier brossé |
| Viewport | Rectangle ou anneau | Anneau + trait cyan pointillé | Deux cotes | Studio sans grille, pastille après Générer |
| Inspector | Sketch ou extrusion | Outil, avance, passe | Nominal / Mesuré / Rattrapage | Matière, rugosité, HDRI, 1920×1080 |
| Timeline | Sketch 1 | Brut…Op30, reprise après Op20 | Relevé 1, Rattrapage | Rendu 1 au clic |

Plan : [plan-layout.md](plan-layout.md) · [../plan-espaces.md](../plan-espaces.md).
