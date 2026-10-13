import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

// Small terminal-style readout pinned to the bottom-right corner.
export const readout = style({
  position: 'fixed',
  right: vars.space.sm,
  bottom: vars.space.sm,
  zIndex: 10,
  margin: 0,
  // A small chunky box, matching the site's outlined buttons and cards.
  padding: '0.3rem 0.5rem',
  border: `2px solid ${vars.color.text}`,
  background: vars.color.surface,
  boxShadow: `3px 3px 0 ${vars.color.text}`,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: '0.75rem',
  fontWeight: 700,
  // Keep the padded spaces in "  7%" so the text doesn't shift as it counts up.
  whiteSpace: 'pre',
  pointerEvents: 'none',
})
