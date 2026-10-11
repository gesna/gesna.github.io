import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const list = style({
  display: 'grid',
  // As many columns as fit at 240px+ each: 3 on desktop, 1 on phones.
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: vars.space.md,
  margin: `${vars.space.lg} 0 0`,
  padding: 0,
  listStyle: 'none',
})

const cardBase = style({
  display: 'block',
  height: '100%',
  padding: vars.space.md,
  border: vars.border,
  borderRadius: vars.radius,
  boxShadow: vars.shadow,
  textDecoration: 'none',
  transition: 'transform 0.15s, box-shadow 0.15s',
  selectors: {
    '&:hover': {
      transform: 'translate(-2px, -2px)',
      boxShadow: `8px 8px 0 ${vars.color.text}`,
    },
    '&:focus-visible': {
      outline: `3px solid ${vars.color.text}`,
      outlineOffset: '4px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
})

// One card style in three colors: card.yellow, card.blue, card.mint.
export const card = styleVariants({
  yellow: [cardBase, { background: vars.color.yellow }],
  blue: [cardBase, { background: vars.color.blue }],
  mint: [cardBase, { background: vars.color.mint }],
})

export const label = style({
  display: 'block',
  fontFamily: vars.font.display,
  fontSize: '1.5rem',
  fontWeight: 800,
})
