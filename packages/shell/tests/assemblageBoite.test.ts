import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CadomDocument, decode, encode, lintWriterTruth, planLateLoad } from '@opencad/cadom'
import {
  assemblageBoiteComplete,
  assemblageBoiteMilgauss,
  BOITE_ID,
} from '../src/assemblageBoite.ts'
import { DocumentVue } from '../src/DocumentVue.tsx'
import { storeShell } from '../src/storeShell.ts'

describe('assemblage boîte Milgauss', () => {
  it('encode/decode conserve racines, pièces et assets paramétriques', () => {
    const logical = assemblageBoiteMilgauss()
    const back = decode(encode(logical))
    expect(back.units).toBe('mm')
    expect(back.rootIds).toEqual([BOITE_ID.root])
    expect(back.nodes.map((n) => n.name).sort()).toEqual(
      ['Boîte Milgauss', 'Carrure', 'Couronne', 'Fond', 'Lunette', 'Verre'].sort(),
    )
    expect(back.assets.every((a) => a.kind === 'cadompart')).toBe(true)
    expect(back.assets.map((a) => a.uri).sort()).toEqual(
      [
        './carrure.cadompart',
        './couronne.cadompart',
        './fond.cadompart',
        './lunette.cadompart',
        './verre.cadompart',
      ].sort(),
    )
    const doc = CadomDocument.fromLogical(back)
    expect(doc.getChildren(BOITE_ID.root)).toHaveLength(5)
    const plan = planLateLoad(doc)
    expect(plan.assets).toHaveLength(5)
    expect(plan.assets.every((a) => a.role === 'parametric')).toBe(true)
  })

  it('ouvre le graphe dans Document', () => {
    storeShell.ouvrir(encode(assemblageBoiteMilgauss()))
    expect(storeShell.assemblage()?.nodes.get(BOITE_ID.lunette)?.name).toBe('Lunette')
    const html = renderToStaticMarkup(createElement(DocumentVue))
    expect(html).toContain('Boîte Milgauss')
    expect(html).toContain('Carrure')
    expect(html).toContain('Lunette')
    expect(html).toContain('Verre')
    expect(html).toContain('Fond')
    expect(html).toContain('Couronne')
    expect(html).toContain('./lunette.cadompart')
  })

  it('oriente la couronne : axe local +Y → monde +X (3 h)', () => {
    const doc = CadomDocument.fromLogical(assemblageBoiteMilgauss())
    const w = doc.getWorldMatrix(BOITE_ID.couronne)
    // Origin (stem base) at wall mid-height
    expect(w[12]).toBeCloseTo(18)
    expect(w[13]).toBeCloseTo(4)
    expect(w[14]).toBeCloseTo(0)
    // Local +Y unit → world +X
    const x = w[0]! * 0 + w[4]! * 1 + w[8]! * 0
    const y = w[1]! * 0 + w[5]! * 1 + w[9]! * 0
    const z = w[2]! * 0 + w[6]! * 1 + w[10]! * 0
    expect(x).toBeCloseTo(1)
    expect(y).toBeCloseTo(0)
    expect(z).toBeCloseTo(0)
  })

  it('Complete : mesh + parametric par pièce, lint writer clean', () => {
    const logical = assemblageBoiteComplete()
    expect(logical.assets.filter((a) => a.kind === 'cadomesh')).toHaveLength(5)
    expect(logical.assets.filter((a) => a.kind === 'cadompart')).toHaveLength(5)
    const lunette = logical.nodes.find((n) => n.id === BOITE_ID.lunette)!
    expect(lunette.assetBindings.map((b) => b.role)).toEqual(['mesh', 'parametric'])
    const plan = planLateLoad(CadomDocument.fromLogical(logical))
    expect(plan.assets.filter((a) => a.role === 'mesh')).toHaveLength(5)
    expect(plan.assets.filter((a) => a.role === 'parametric')).toHaveLength(5)
    expect(lintWriterTruth(CadomDocument.fromLogical(logical))).toEqual([])
  })
})

