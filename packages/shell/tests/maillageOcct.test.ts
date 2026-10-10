import { describe, expect, it } from 'vitest'
import { maillageDepuisTessellate } from '../src/occt/maillageDepuisTessellate.ts'

describe('maillageDepuisTessellate', () => {
  it('fusionne deux faces et décale les indices', () => {
    const maille = maillageDepuisTessellate({
      ok: true,
      meshes: [
        {
          positions: [0, 0, 0, 1, 0, 0, 0, 1, 0],
          normals: [0, 0, 1, 0, 0, 1, 0, 0, 1],
          indices: [0, 1, 2],
        },
        {
          positions: [0, 0, 0, 1, 0, 0, 0, 0, 1],
          normals: [0, -1, 0, 0, -1, 0, 0, -1, 0],
          indices: [0, 1, 2],
        },
      ],
    })
    expect(maille.positions).toHaveLength(18)
    expect(maille.indices).toEqual([0, 1, 2, 3, 4, 5])
    expect(maille.faces).toEqual([0, 1])
    expect(maille.normales).toHaveLength(18)
  })
})
