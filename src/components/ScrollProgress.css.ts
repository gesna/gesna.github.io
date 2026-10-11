import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const bar = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 10,
  width: '100%',
  height: '6px',
  background: `linear-gradient(90deg, ${vars.color.pink}, ${vars.color.yellow}, ${vars.color.mint}, ${vars.color.blue})`,
  // The component sets scaleX(0..1); grow from the left edge.
  transformOrigin: 'left',
  pointerEvents: 'none',
})
