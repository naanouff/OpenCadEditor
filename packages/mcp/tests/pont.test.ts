import { afterEach, describe, expect, it, vi } from 'vitest'
import WebSocket from 'ws'
import { creerPont } from '../src/pont.ts'
import { Controle } from '../src/outils.ts'

async function ouvert(port: number) {
  if (!port) throw new Error(`port invalide: ${port}`)
  const ws = new WebSocket(`ws://127.0.0.1:${port}`)
  await new Promise<void>((resolve, reject) => {
    ws.once('open', () => resolve())
    ws.once('error', reject)
  })
  return ws
}

describe('pont', () => {
  const fermetures: Array<() => Promise<void>> = []

  afterEach(async () => {
    while (fermetures.length > 0) await fermetures.pop()!()
  })

  async function service(delaiMs = 60_000) {
    const pont = creerPont(new Controle(), { port: 0, delaiMs })
    await pont.pret()
    fermetures.push(() => pont.fermer())
    return pont
  }

  it('adopte le script de l’éditeur quand la session est vide', async () => {
    const pont = await service()
    const ws = await ouvert(pont.port())
    ws.send(JSON.stringify({ type: 'bonjour', script: 'piece editeur\nparam a 1' }))
    await vi.waitFor(() => expect(pont.etat().piece).toBe('editeur'))
    expect(pont.etat().parametres).toEqual([{ nom: 'a', expression: '1' }])
    expect(pont.etat().conflit).toBe(false)
    ws.close()
  })

  it('demande à l’éditeur vide de prendre le script MCP', async () => {
    const pont = await service()
    await pont.commande('piece mcp')
    const ws = await ouvert(pont.port())
    const recus: Array<Record<string, unknown>> = []
    ws.on('message', (data) => {
      const message = JSON.parse(String(data)) as Record<string, unknown>
      recus.push(message)
      if (typeof message.id === 'string') {
        ws.send(JSON.stringify({ type: 'accuse', id: message.id, triangles: 4, erreur: null }))
      }
    })
    ws.send(JSON.stringify({ type: 'bonjour', script: '' }))
    await vi.waitFor(() => expect(recus.some((message) => message.type === 'remplacer')).toBe(true))
    const remplacer = recus.find((message) => message.type === 'remplacer')
    expect(remplacer?.script).toBe('piece mcp')
    await vi.waitFor(() => expect(pont.etat().viewport?.triangles).toBe(4))
    expect(pont.etat().conflit).toBe(false)
    ws.close()
  })

  it('deux scripts différents posent un conflit sans écraser', async () => {
    const pont = await service()
    await pont.commande('piece mcp')
    const ws = await ouvert(pont.port())
    const recus: Array<Record<string, unknown>> = []
    ws.on('message', (data) => recus.push(JSON.parse(String(data)) as Record<string, unknown>))
    ws.send(JSON.stringify({ type: 'bonjour', script: 'piece editeur' }))
    await vi.waitFor(() => expect(pont.etat().conflit).toBe(true))
    expect(pont.etat().piece).toBe('mcp')
    expect(recus.some((message) => message.type === 'remplacer')).toBe(false)
    await expect(pont.commande('param a 1')).rejects.toThrow(/conflit/)
    expect(pont.etat().piece).toBe('mcp')
    ws.close()
  })

  it('aligner choisit un des deux scripts', async () => {
    const pont = await service()
    await pont.commande('piece mcp')
    const ws = await ouvert(pont.port())
    const recus: Array<Record<string, unknown>> = []
    ws.on('message', (data) => {
      const message = JSON.parse(String(data)) as Record<string, unknown>
      recus.push(message)
      if (typeof message.id === 'string') {
        ws.send(JSON.stringify({ type: 'accuse', id: message.id, triangles: 0, erreur: null }))
      }
    })
    ws.send(JSON.stringify({ type: 'bonjour', script: 'piece editeur\nparam a 2' }))
    await vi.waitFor(() => expect(pont.etat().conflit).toBe(true))
    await pont.aligner('editeur')
    expect(pont.etat().conflit).toBe(false)
    expect(pont.etat().piece).toBe('editeur')
    expect(pont.etat().parametres).toEqual([{ nom: 'a', expression: '2' }])
    ws.close()
  })

  it('aligner mcp envoie le script de la session', async () => {
    const pont = await service()
    await pont.commande('piece mcp')
    const ws = await ouvert(pont.port())
    const recus: Array<Record<string, unknown>> = []
    ws.on('message', (data) => {
      const message = JSON.parse(String(data)) as Record<string, unknown>
      recus.push(message)
      if (typeof message.id === 'string') {
        ws.send(JSON.stringify({ type: 'accuse', id: message.id, triangles: 0, erreur: null }))
      }
    })
    ws.send(JSON.stringify({ type: 'bonjour', script: 'piece editeur' }))
    await vi.waitFor(() => expect(pont.etat().conflit).toBe(true))
    await pont.aligner('mcp')
    expect(recus.some((message) => message.type === 'remplacer' && message.script === 'piece mcp')).toBe(true)
    expect(pont.etat().piece).toBe('mcp')
    expect(pont.etat().conflit).toBe(false)
    ws.close()
  })

  it('sans accusé, la commande reste appliquée et le viewport le dit', async () => {
    const pont = await service(30)
    const ws = await ouvert(pont.port())
    await pont.commande('piece delai')
    expect(pont.etat().piece).toBe('delai')
    expect(pont.etat().viewport?.erreur).toBe('délai dépassé')
    ws.close()
  })

  it('une ligne de l’éditeur est appliquée une fois', async () => {
    const pont = await service()
    const ws = await ouvert(pont.port())
    ws.send(JSON.stringify({ type: 'ligne', texte: 'piece shell', origine: 'shell' }))
    await vi.waitFor(() => expect(pont.etat().piece).toBe('shell'))
    expect(pont.etat().script).toBe('piece shell')
    ws.close()
  })
})
