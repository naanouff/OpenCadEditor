/** Rectangle coté + extrude — cas GCS / pipeline (sprint 26). */
export const SCRIPT_BOITE = `
piece boite
param L 20
param l 10
esquisse plan.dessus
rectangle
cote largeur l
cote longueur L
extrude 8
`.trim()
