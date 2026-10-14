// The site's mouse cursor, as a tiny SVG image embedded in the CSS.
// Cursor images can't read CSS variables, so the colors are written out here; they match
// the theme: navy = color.text, pink = color.pink, cream = color.bg.
const NAVY = "#1b1135";
const PINK = "#ff3d7f";
const CREAM = "#fff6e5";

// Turns an SVG into a CSS cursor value. `x y` is the hotspot: the exact pixel that clicks.
// Parentheses are encoded too (encodeURIComponent leaves them), since a stray ")" ends url().
const cursor = (svg: string, x: number, y: number, fallback: string) => {
  const encoded = encodeURIComponent(svg).replace(/\(/g, "%28").replace(/\)/g, "%29");
  return `url("data:image/svg+xml,${encoded}") ${x} ${y}, ${fallback}`;
};

// A chunky navy arrow with a pink offset shadow, styled like the name. The thin cream edge
// keeps it visible over dark navy parts of the page.
const arrowShape = "M4 3 L4 23 L9.5 18 L13 26 L17 24.2 L13.6 16.5 L21 16 Z";
export const arrowCursor = cursor(
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path d="${arrowShape}" fill="${PINK}" transform="translate(2 2)"/>
    <path d="${arrowShape}" fill="${NAVY}" stroke="${CREAM}" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,
  4,
  3,
  "auto",
);
