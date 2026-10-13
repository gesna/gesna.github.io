import { createGlobalTheme } from '@vanilla-extract/css'

// Design tokens: change these to re-theme the whole site.
export const vars = createGlobalTheme(':root', {
  color: {
    bg: '#fff6e5',
    text: '#1b1135',
    surface: '#ffffff',
    pink: '#ff3d7f',
    blue: '#3a86ff',
    yellow: '#ffd23f',
    mint: '#2ec4b6',
  },
  font: {
    display: "'Bricolage Grotesque', system-ui, sans-serif",
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  },
  space: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '6rem',
  },
  border: '3px solid #1b1135',
  shadow: '6px 6px 0 #1b1135',
  radius: '16px',
  maxWidth: '1100px',
})
