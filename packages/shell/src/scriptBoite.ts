/** Rectangle coté + extrude + poche sur face.dessus (GCS / pipeline / topo faces). */
export const SCRIPT_BOITE = `
piece boite
param L 20
param l 20
esquisse plan.dessus
rectangle
cote largeur l
cote longueur L
extrude 8
esquisse face.dessus
cercle
cote diametre 8
enleve 2
`.trim()
