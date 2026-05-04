export const colors = {
  gold: '#C9A84C',
  goldLight: '#D4B96B',
  goldDark: '#A07832',
  goldSubtle: 'rgba(201, 168, 76, 0.12)',
  goldBorder: 'rgba(201, 168, 76, 0.25)',

  background: '#111108',
  backgroundElevated: '#1A1A14',
  backgroundGlass: 'rgba(17, 17, 8, 0.75)',

  silver: '#A49F8F',
  silverMuted: '#6B6658',
  silverBorder: 'rgba(164, 159, 143, 0.15)',

  textPrimary: '#F5F3EE',
  textSecondary: '#A49F8F',
  textMuted: '#6B6658',
} as const

export const fonts = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
} as const

export const typescale = {
  hero: 'clamp(3.5rem, 8vw, 7rem)',
  h1: 'clamp(2.5rem, 5vw, 4.5rem)',
  h2: 'clamp(2rem, 4vw, 3rem)',
  h3: 'clamp(1.5rem, 2.5vw, 2rem)',
  h4: 'clamp(1.25rem, 2vw, 1.5rem)',
  body: '1rem',
  small: '0.875rem',
} as const

export const letterSpacing = {
  tight: '-0.04em',
  display: '-0.03em',
  normal: '0',
  wide: '0.05em',
} as const

export const spacing = {
  section: 'clamp(4rem, 8vw, 8rem)',
  container: '1280px',
} as const

export const animation = {
  fast: '150ms',
  base: '300ms',
  slow: '600ms',
  verySlow: '1200ms',
  easeSmooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
} as const

export const blur = {
  nav: '20px',
  glass: '24px',
} as const
