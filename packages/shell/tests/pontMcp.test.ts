import { describe, expect, it } from 'vitest'
import { recevoirMessage } from '../src/pontMcp.ts'
import { storeShell } from '../src/storeShell.ts'

const BOITE = `
piece boite-pont
esquisse plan.dessus
rectangle
cote largeur 10
cote longueur 20
extrude 8
`

describe('pont MCP', () => {
  it('une ligne reçue ne repart pas vers le serveur', async () => {
    const recus: string[] = []
    storeShell.brancherPont((mutation) => {
      if (mutation.type === 'ligne') recus.push(mutation.texte)
    })
    const accuses: number[] = []
    await recevoirMessage({ type: 'ligne', texte: 'piece silence-pont', id: '1', origine: 'mcp' }, (accuse) => {
      accuses.push(accuse.triangles)
    })
    expect(storeShell.hote().session.pieceCourante()).toBe('silence-pont')
    expect(recus).toEqual([])
    expect(accuses).toEqual([0])
    storeShell.brancherPont(null)
  })

  it('remplacer vide le journal puis rejoue le script', async () => {
    storeShell.recevoir(() => storeShell.executer('piece avant-pont\nparam garde 1'))
    await recevoirMessage({ type: 'remplacer', script: BOITE, id: '2', origine: 'mcp' }, () => {})
    expect(storeShell.hote().session.pieceCourante()).toBe('boite-pont')
    expect(storeShell.hote().session.expression('garde')).toBeUndefined()
    expect(storeShell.hote().journal.some((entree) => entree.ligne.includes('extrude'))).toBe(true)
  })

  it('la frappe du terminal est publiée', () => {
    const recus: string[] = []
    storeShell.brancherPont((mutation) => {
      if (mutation.type === 'ligne') recus.push(mutation.texte)
    })
    storeShell.ligne('piece frappe-pont')
    expect(recus).toEqual(['piece frappe-pont'])
    storeShell.brancherPont(null)
  })
})
