import type { Maillage } from '@opencad/api-parametrique'

type MeshFace = {
  positions?: number[]
  normals?: number[]
  indices?: number[]
}

type TessellateJson = {
  ok?: boolean
  error?: string
  meshes?: MeshFace[]
  triangleCount?: number
}

/** Fusionne les maillages face par face renvoyés par `_occt_tessellate`. */
export function maillageDepuisTessellate(json: TessellateJson): Maillage {
  if (!json.ok) throw new Error(json.error ?? 'tessellate failed')
  const positions: number[] = []
  const normales: number[] = []
  const indices: number[] = []
  const faces: number[] = []
  let decalage = 0
  let faceId = 0
  for (const mesh of json.meshes ?? []) {
    const pos = mesh.positions ?? []
    const nor = mesh.normals ?? []
    const idx = mesh.indices ?? []
    positions.push(...pos)
    if (nor.length === pos.length) normales.push(...nor)
    else {
      for (let i = 0; i < pos.length; i += 3) normales.push(0, 1, 0)
    }
    const sommets = Math.floor(pos.length / 3)
    for (let i = 0; i < idx.length; i++) {
      indices.push(idx[i]! + decalage)
      if (i % 3 === 0) faces.push(faceId)
    }
    decalage += sommets
    faceId += 1
  }
  return { positions, normales, indices, faces }
}
