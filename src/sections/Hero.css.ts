import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const hero = style({
  position: 'relative',
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
  position: 'relative',
  justifySelf: 'start',
  padding: '0.25rem 1rem',
  border: vars.border,
  borderRadius: '999px',
  background: vars.color.yellow,
  fontWeight: 700,
  transform: 'rotate(-2deg)',
})

export const name = style({
  position: 'relative',
  // Hug the text, so doodles can sit just off its edge.
  justifySelf: 'start',
  // Scales with the screen: 3.6rem on phones, up to 8rem on wide screens.
  fontSize: 'clamp(3.6rem, 12vw, 8rem)',
  // Offset in em, so the pink layer stays proportional to the name at every screen size.
  textShadow: `0.04em 0.04em 0 ${vars.color.pink}`,
})

export const tagline = style({
  maxWidth: '36ch',
  fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
})

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
  '@media': {
    // On phones, always stack the buttons, with room between them for "start here!".
    'screen and (max-width: 480px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      rowGap: '3.5rem',
    },
  },
})

// Wraps "See my work" so the note and arrow below stay attached to it, wherever it sits.
export const startWrap = style({
  position: 'relative',
  display: 'flex',
})

// A handwritten "start here!" scribbled below "See my work"...
export const startNote = style({
  position: 'absolute',
  top: 'calc(100% + 1.2rem)',
  left: '7.5rem',
  rotate: '-4deg',
})

// ...with a pencil arrow curling up onto "See my work". Turned around so it travels up-left.
export const startArrow = style({
  position: 'absolute',
  top: 'calc(100% - 0.4rem)',
  left: '3.5rem',
  transform: 'rotate(180deg)',
  pointerEvents: 'none',
})

// Pencil doodles scattered around the Hero.
export const doodle = style({
  position: 'absolute',
  pointerEvents: 'none',
})

// A wavy rope underline beneath the name. It stretches to the name's width, so it scales
// along with the name on smaller screens.
export const underline = style({
  position: 'absolute',
  left: 0,
  bottom: '-0.35em',
  width: '100%',
  height: 'auto',
  pointerEvents: 'none',
})

// A doodle that sits in a line of text, right after the last word.
export const inlineDoodle = style({
  display: 'inline-block',
  marginLeft: '0.3em',
  verticalAlign: 'middle',
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
    // A smaller version on phones, in proportion with the rest of the page.
    'screen and (max-width: 480px)': {
      padding: '0.6rem 1.1rem',
      fontSize: '1rem',
      borderWidth: '2px',
      borderRadius: '12px',
      boxShadow: `4px 4px 0 ${vars.color.text}`,
    },
  },
})

export const primary = style({
  background: vars.color.pink,
})
