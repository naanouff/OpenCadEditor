import { afterEach, describe, expect, it, vi } from 'vitest'
import { preferences, poserPreferences, souscrirePreferences } from '../src/preferences.ts'

describe('preferences shell', () => {
  afterEach(() => {
    poserPreferences({ mcpSockets: true })
  })

  it('pose et lit mcpSockets', () => {
    poserPreferences({ mcpSockets: false })
    expect(preferences().mcpSockets).toBe(false)
    poserPreferences({ mcpSockets: true })
    expect(preferences().mcpSockets).toBe(true)
  })

  it('notifie les abonnés', () => {
    const vu = vi.fn()
    const arret = souscrirePreferences(vu)
    poserPreferences({ mcpSockets: false })
    expect(vu).toHaveBeenCalledWith({ mcpSockets: false })
    arret()
  })
})
