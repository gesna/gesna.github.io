import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

// The site's outlined, hard-shadow look, a size down for the scrapbook pieces.
const outline = `2px solid ${vars.color.text}`

// Projects zig-zag down the page: left, right, left...
export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  margin: `${vars.space.lg} 0 0`,
  padding: 0,
  listStyle: 'none',
})

// Each project: a big polaroid, with room around it for doodles and a sticky note.
export const item = style({
  position: 'relative',
  width: 'min(100%, 22rem)',
  padding: vars.space.md,
  selectors: {
    '&:nth-child(even)': {
      alignSelf: 'flex-end',
    },
  },
  '@media': {
    // On wider screens, tuck each polaroid up alongside the bottom of the previous one,
    // and pull both sides in toward the middle so the zig-zag stays close together.
    'screen and (min-width: 900px)': {
      selectors: {
        '& + &': {
          marginTop: '-8rem',
        },
        '&:nth-child(odd)': {
          marginLeft: '14%',
        },
        '&:nth-child(even)': {
          marginRight: '14%',
        },
      },
    },
  },
})

export const polaroid = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  padding: '12px 12px 20px',
  border: outline,
  background: vars.color.surface,
  boxShadow: `4px 4px 0 ${vars.color.text}`,
})

// Where the tape sits: centered across the top edge of the polaroid.
export const tape = style({
  top: '-10px',
  left: '50%',
  transform: 'translateX(-50%) rotate(-3deg)',
})

export const photo = style({
  display: 'block',
  width: '100%',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  border: outline,
})

// Shown inside the polaroid when a project has no image yet.
export const photoPlaceholder = styleVariants({
  pink: [photo, { background: vars.color.pink }],
  blue: [photo, { background: vars.color.blue }],
  mint: [photo, { background: vars.color.mint }],
})

export const title = style({
  fontFamily: vars.font.hand,
  fontSize: '1.9rem',
  fontWeight: 700,
  lineHeight: 1,
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
  // Push links to the bottom so they line up across polaroids of different heights.
  marginTop: 'auto',
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

export const stickyNote = style({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
  width: '9rem',
  padding: '0.6rem 0.75rem',
  border: outline,
  background: vars.color.yellow,
  boxShadow: `3px 3px 0 ${vars.color.text}`,
  fontFamily: vars.font.hand,
  fontSize: '1.3rem',
  lineHeight: 1.05,
})

// A swirly arrow in the open space beside each polaroid, swooping down so its head
// lands just above the next project's polaroid.
const connectorBase = style({
  position: 'absolute',
  top: '54%',
  pointerEvents: 'none',
  '@media': {
    // Projects stack in one column on narrow screens, so there's nothing to point across to.
    'screen and (max-width: 899px)': {
      display: 'none',
    },
  },
})

export const connector = styleVariants({
  toRight: [connectorBase, { left: '100%' }],
  // Mirrored, so it swoops down to the left.
  toLeft: [connectorBase, { right: '100%', transform: 'scaleX(-1)' }],
})

export const doodle = style({
  position: 'absolute',
  pointerEvents: 'none',
})
