import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CadomDocument, decode, encode, planLateLoad } from '@opencad/cadom'
import { assemblageBoiteMilgauss, BOITE_ID } from '../src/assemblageBoite.ts'
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
})
