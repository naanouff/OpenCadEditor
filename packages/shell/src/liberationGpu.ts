/**
 * w3dts ne libère les tampons d’un maillage qu’au déchargement du projet :
 * le viewport rend lui-même ceux des maillages qu’il retire de la scène.
 */
type MaillageGpu = {
  vertexBuffer: GPUBuffer | null
  indexBuffer: GPUBuffer | null
  skinVertexBuffer?: GPUBuffer | null
  morphDeltaGpuBuffer?: GPUBuffer | null
}

const CHAMPS = ['vertexBuffer', 'indexBuffer', 'skinVertexBuffer', 'morphDeltaGpuBuffer'] as const

/** Retire les tampons des maillages et les rend, pour destruction après la trame. */
export function detacherTampons(maillages: readonly MaillageGpu[]): GPUBuffer[] {
  const rendus: GPUBuffer[] = []
  for (const maillage of maillages) {
    for (const champ of CHAMPS) {
      const tampon = maillage[champ]
      if (!tampon) continue
      rendus.push(tampon)
      maillage[champ] = null
    }
  }
  return rendus
}
