import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from './theme.css'

// A strip of translucent masking tape. Combine with a color below, and position it
// where it's used (each spot tapes things down at its own angle).
export const tape = style({
  position: 'absolute',
  width: '72px',
  height: '20px',
  pointerEvents: 'none',
})

export const tapeColor = styleVariants({
  yellow: { background: vars.color.tape },
  pink: { background: `color-mix(in srgb, ${vars.color.pink} 60%, transparent)` },
  mint: { background: `color-mix(in srgb, ${vars.color.mint} 65%, transparent)` },
})

// A handwritten pencil note, like something scribbled in the margin.
export const pencilNote = style({
  fontFamily: vars.font.hand,
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: 1,
  color: vars.graphite,
  whiteSpace: 'nowrap',
})
