import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { Session } from '@opencad/api-parametrique'
import { decode, ID } from '@opencad/cadom'
import { ecrire, ouvrirSession } from '@opencad/format-opencad'
import { definirSelecteur, selecteurNavigateur } from '../src/fichierShell.ts'
import { storeShell } from '../src/storeShell.ts'

const fixtureA = readFileSync(
  join(
    dirname(fileURLToPath(import.meta.url)),
    '../../../vendor/opencad/fixtures/cadom/example-a-three-level-assembly.cadom',
  ),
)

afterEach(() => definirSelecteur(selecteurNavigateur))

describe('enregistrer cadom', () => {
  it('réécrit l’assemblage ouvert (round-trip encode)', async () => {
    let sauve: Uint8Array | null = null
    let nom = ''
    definirSelecteur({
      async ouvrir() {
        return new Uint8Array(fixtureA)
      },
      async enregistrer(octets, nomPropose) {
        sauve = octets
        nom = nomPropose
      },
    })
    await storeShell.demanderOuverture()
    await storeShell.demanderEnregistrement()
    expect(nom).toMatch(/\.cadom$/)
    const back = decode(sauve!)
    expect(back.rootIds).toEqual([ID.root])
    expect(back.nodes.find((n) => n.id === ID.partA)?.name).toBe('Part A')
    expect(back.assets.map((a) => a.uri).sort()).toEqual(['./part-a.glb', './part-b.glb'])
    expect(Array.from(storeShell.enregistrer())).toEqual(Array.from(sauve!))
  })

  it('enregistre encore un .cadompart sans assemblage', async () => {
    const source = new Session({ geometrie: false })
    source.executer('piece plaque\nparam diametre 40\nesquisse plan.dessus\ncercle\ncote diametre diametre\nextrude 10')
    let sauve: Uint8Array | null = null
    let nom = ''
    definirSelecteur({
      async ouvrir() {
        return ecrire(source)
      },
      async enregistrer(octets, nomPropose) {
        sauve = octets
        nom = nomPropose
      },
    })
    await storeShell.demanderOuverture()
    expect(storeShell.assemblage()).toBeNull()
    await storeShell.demanderEnregistrement()
    expect(nom).toMatch(/\.cadompart$/)
    expect(ouvrirSession(sauve!).expression('diametre')).toBe('40')
  })
})
