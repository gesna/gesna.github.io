import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const grid = style({
  display: 'grid',
  // As many columns as fit at 300px+ each.
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: vars.space.md,
  margin: `${vars.space.lg} 0 0`,
  padding: 0,
  listStyle: 'none',
})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  border: vars.border,
  borderRadius: vars.radius,
  background: vars.color.surface,
  boxShadow: vars.shadow,
})

export const image = style({
  display: 'block',
  width: '100%',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  borderBottom: vars.border,
})

// Shown when a project has no image: a colored block with the project's initial.
const placeholderBase = style([
  image,
  {
    display: 'grid',
    placeItems: 'center',
    fontFamily: vars.font.display,
    fontSize: '4rem',
    fontWeight: 800,
  },
])

export const placeholder = styleVariants({
  pink: [placeholderBase, { background: vars.color.pink }],
  blue: [placeholderBase, { background: vars.color.blue }],
  yellow: [placeholderBase, { background: vars.color.yellow }],
  mint: [placeholderBase, { background: vars.color.mint }],
})

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: vars.space.sm,
  padding: vars.space.md,
})

export const title = style({
  fontSize: '1.75rem',
})

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.xs,
  margin: 0,
  padding: 0,
  listStyle: 'none',
})

export const tag = style({
  padding: '0.1rem 0.75rem',
  border: `2px solid ${vars.color.text}`,
  borderRadius: '999px',
  background: vars.color.bg,
  fontSize: '0.875rem',
  fontWeight: 700,
})

export const links = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.md,
  // Push links to the bottom so they line up across cards of different heights.
  marginTop: 'auto',
  paddingTop: vars.space.xs,
})

export const link = style({
  fontWeight: 700,
  textDecorationThickness: '3px',
  textUnderlineOffset: '4px',
  selectors: {
    '&:hover': {
      textDecorationColor: vars.color.pink,
    },
  },
})
