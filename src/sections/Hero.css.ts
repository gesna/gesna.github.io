import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const hero = style({
  display: 'grid',
  // Fill the whole screen so the next section starts below the fold,
  // with the Hero's content vertically centered.
  minHeight: '100svh',
  alignContent: 'center',
  gap: vars.space.md,
  maxWidth: vars.maxWidth,
  margin: '0 auto',
  padding: `${vars.space.xl} ${vars.space.md}`,
})

export const greeting = style({
  justifySelf: 'start',
  padding: '0.25rem 1rem',
  border: vars.border,
  borderRadius: '999px',
  background: vars.color.yellow,
  fontWeight: 700,
  transform: 'rotate(-2deg)',
})

export const name = style({
  // Scales with the screen: 3rem on phones, up to 8rem on wide screens.
  fontSize: 'clamp(3rem, 12vw, 8rem)',
  textShadow: `5px 5px 0 ${vars.color.pink}`,
})

export const tagline = style({
  maxWidth: '36ch',
  fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
})

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
})

export const button = style({
  padding: '0.85rem 1.5rem',
  border: vars.border,
  borderRadius: vars.radius,
  background: vars.color.surface,
  boxShadow: vars.shadow,
  fontWeight: 700,
  textDecoration: 'none',
  transition: 'transform 0.15s, box-shadow 0.15s',
  selectors: {
    // Lift on hover, press down on click.
    '&:hover': {
      transform: 'translate(-2px, -2px)',
      boxShadow: `8px 8px 0 ${vars.color.text}`,
    },
    '&:active': {
      transform: 'translate(4px, 4px)',
      boxShadow: `2px 2px 0 ${vars.color.text}`,
    },
    '&:focus-visible': {
      outline: `3px solid ${vars.color.blue}`,
      outlineOffset: '3px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
})

export const primary = style({
  background: vars.color.pink,
})
