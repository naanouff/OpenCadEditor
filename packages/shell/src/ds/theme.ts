export type OcTheme = 'light' | 'dark'

export const OC_THEME_KEY = 'opencad.shell.theme'

export function loadOcTheme(): OcTheme {
  if (typeof window === 'undefined') return 'dark'
  const raw = localStorage.getItem(OC_THEME_KEY)
  if (raw === 'light' || raw === 'dark') return raw
  return 'dark'
}

export function applyOcTheme(theme: OcTheme): void {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(OC_THEME_KEY, theme)
}
