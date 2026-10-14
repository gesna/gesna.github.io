import { style } from '@vanilla-extract/css'
import { vars } from './theme.css'

// A handwritten pencil note, like something scribbled in the margin.
export const pencilNote = style({
  fontFamily: vars.font.hand,
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: 1,
  color: vars.graphite,
  whiteSpace: 'nowrap',
})
