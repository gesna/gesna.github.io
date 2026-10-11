import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

// Base styles shared by every page.
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  margin: 0,
  background: vars.color.bg,
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
})

globalStyle('img', {
  display: 'block',
  maxWidth: '100%',
})
