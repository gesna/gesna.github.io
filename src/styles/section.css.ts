import { style } from '@vanilla-extract/css'
import { vars } from './theme.css'

// Shared layout for the page sections below the Hero.
export const section = style({
  maxWidth: vars.maxWidth,
  margin: '0 auto',
  padding: `${vars.space.lg} ${vars.space.md} ${vars.space.xl}`,
  // Revealed sections receive focus; they aren't controls, so no outline.
  outline: 'none',
})

export const heading = style({
  fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
})

export const intro = style({
  maxWidth: '40ch',
  marginTop: vars.space.sm,
  fontSize: '1.25rem',
})
