import { afterEach, describe, expect, it, vi } from 'vitest'
import { chargeurNavigateur } from '../src/chargeurAsset.ts'

afterEach(() => {
  vi.unstubAllGlobals()
})

const repondre = (corps: string, type: string, status = 200) =>
  vi.stubGlobal('fetch', async () => new Response(corps, { status, headers: { 'content-type': type } }))

describe('chargeurNavigateur', () => {
  it('rend les octets d’un asset servi', async () => {
    repondre('CADM', 'application/octet-stream')
    const octets = await chargeurNavigateur().charger('./plateau.cadompart')
    expect([...octets]).toEqual([0x43, 0x41, 0x44, 0x4d])
  })

  it('refuse la page HTML de repli du serveur', async () => {
    repondre('<!doctype html><html></html>', 'text/html; charset=utf-8')
    await expect(chargeurNavigateur().charger('./laiton.cadomat')).rejects.toThrow(/introuvable/)
  })

  it('refuse un statut HTTP en erreur', async () => {
    repondre('', 'text/plain', 404)
    await expect(chargeurNavigateur().charger('./acier.cadomat')).rejects.toThrow(/HTTP 404/)
  })
})
