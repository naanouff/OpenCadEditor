import { describe, expect, it } from 'vitest'
import { detacherTampons } from '../src/liberationGpu.ts'

const tampon = (nom: string) => ({ label: nom }) as unknown as GPUBuffer

describe('libération des maillages GPU', () => {
  it('rend tous les tampons du maillage et les détache', () => {
    const maillage = {
      vertexBuffer: tampon('v'),
      indexBuffer: tampon('i'),
      skinVertexBuffer: null,
      morphDeltaGpuBuffer: tampon('m'),
    }
    const rendus = detacherTampons([maillage])
    expect(rendus.map((t) => t.label)).toEqual(['v', 'i', 'm'])
    expect(maillage.vertexBuffer).toBeNull()
    expect(maillage.indexBuffer).toBeNull()
    expect(maillage.morphDeltaGpuBuffer).toBeNull()
  })

  it('ne rend rien deux fois', () => {
    const maillage = { vertexBuffer: tampon('v'), indexBuffer: tampon('i') }
    expect(detacherTampons([maillage, maillage])).toHaveLength(2)
  })
})
