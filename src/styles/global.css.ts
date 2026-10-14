import { globalStyle } from '@vanilla-extract/css'
import { arrowCursor } from './cursors'
import { vars } from './theme.css'

// Base styles shared by every page.
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

globalStyle('html', {
  // The site's own navy arrow cursor, used everywhere (links too, below).
  cursor: arrowCursor,
  scrollBehavior: 'smooth',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto',
    },
  },
})

globalStyle('body', {
  margin: 0,
  background: vars.color.bg,
  // Faint halftone dots, like a printed zine page.
  backgroundImage: `radial-gradient(color-mix(in srgb, ${vars.color.text} 10%, transparent) 1px, transparent 1.4px)`,
  backgroundSize: '18px 18px',
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: '1.125rem',
  lineHeight: 1.6,
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('h1, h2, h3', {
  margin: 0,
  fontFamily: vars.font.display,
  fontWeight: 800,
  lineHeight: 1.05,
})

globalStyle('p', {
  margin: 0,
})

globalStyle('a', {
  color: 'inherit',
  // Browsers switch links to a hand by default; keep the site's own arrow instead.
  cursor: 'inherit',
})

globalStyle('img', {
  display: 'block',
  maxWidth: '100%',
})
