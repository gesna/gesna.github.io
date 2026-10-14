import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

// A strip of translucent masking tape. Where it sits (and its angle) is up to each use.
const tapeBase = style({
  position: 'absolute',
  width: '72px',
  height: '20px',
  pointerEvents: 'none',
})

export const tape = styleVariants({
  yellow: [tapeBase, { background: vars.color.tape }],
  pink: [tapeBase, { background: `color-mix(in srgb, ${vars.color.pink} 60%, transparent)` }],
  mint: [tapeBase, { background: `color-mix(in srgb, ${vars.color.mint} 65%, transparent)` }],
})
