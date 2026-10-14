// The shapes for <Doodle>: what each doodle looks like, as SVG path data.
// To add a doodle, add a path here; <Doodle name="..."> picks it up automatically.

// A long wavy band, like a twisted rope: two parallel waves with slanted hatching between
// them. Drawn on a 240x40 grid, so it's built in code rather than written out by hand.
function ropeUnderline() {
  const start = 4;
  const end = 236;
  const amplitude = 4; // How tall the waves are.
  const halfWave = 14.5; // Distance from a crest to the next trough.
  const gap = 3; // Half the width of the band.
  const hatchSpacing = 4.5;

  const waveY = (x: number) => 20 - amplitude * Math.cos((Math.PI * (x - start)) / halfWave);
  const line = (offset: number) => {
    const points = [];
    for (let x = start; x <= end; x++) points.push(`${x} ${(waveY(x) + offset).toFixed(2)}`);
    return `M${points.join(" L")}`;
  };

  let hatches = "";
  for (let x = start + 2; x < end - 2; x += hatchSpacing) {
    const x2 = x + 1.6;
    hatches += ` M${x.toFixed(1)} ${(waveY(x) - gap).toFixed(2)} L${x2.toFixed(1)} ${(waveY(x2) + gap).toFixed(2)}`;
  }
  return `${line(-gap)} ${line(gap)}${hatches}`;
}

// Hand-drawn doodles, drawn in the current text color. Most are on a 40x40 grid.
// Shapes are deliberately imperfect: overshooting ends, crossed lines, uneven strokes.
export const doodlePaths = {
  underline: ropeUnderline(),
  // One continuous stroke, the way people actually draw stars; the end overshoots the start.
  star: "M9 36 L19.5 4.5 L30 35 L3.5 15.5 L36.5 14.5 L10 34.5",
  spiral:
    "M21 21 c1.5 -1.8 4.2 -0.6 3.6 2.2 c-0.8 3.6 -6.4 3.9 -7.6 0.4 c-1.6 -5.2 4.6 -9.4 9.6 -6.6 c5.8 3.3 3.4 12.6 -3.8 13.6 c-8.8 1.2 -13.4 -8 -9.2 -14.4 c2.6 -4 7.6 -5.2 12.4 -4.4",
  // The tail crosses over where the pen starts and ends.
  heart:
    "M21 35 C 9 26, 3 17, 8 11 C 12 6, 19 8, 20 14 C 21 8, 28 5, 32 9 C 37 14, 33 24, 19 36 L17 37",
  squiggle:
    "M2 23 C 6 13, 10 31, 15 22 C 19 14, 22 15, 25 22 C 28 29, 32 30, 35 21 C 36 18, 38 18, 39 20",
  // Arrows all travel from the top-left down to the bottom-right.
  // A quick curl, then an open V head.
  arrowLoop:
    "M5 10 C 12 8, 18 12, 19 17 C 20 22, 14 24, 13 20 C 12 16, 18 14, 23 18 C 27 21, 29 25, 33 28 " +
    "M27.5 28.8 L33.5 28.5 L32 22.8",
  // Two curls in a row, then an open V head.
  arrowDoubleLoop:
    "M4 9 C 9 7, 12 11, 11 14 C 10 17, 7 15, 9 13 C 12 10, 16 15, 17 19 C 18 23, 14 24, 14 21 " +
    "C 14 17, 20 17, 24 21 C 27 24, 30 26, 34 27.5 " +
    "M28.5 29.5 L34.3 27.7 L31 22.7",
  // Starts from a little spiral, then sweeps out into a chunky hatched head.
  arrowSpiral:
    "M10 11 c1.5 -1.5 4 -0.5 3.5 1.8 c-0.6 2.8 -5 3 -5.8 0.2 c-1 -4 4.5 -6.6 8 -3.6 " +
    "c3.6 3.1 3 9 2 13 C 19 26, 25 28, 30 27.5 " +
    "M30 23 L35.5 27.4 L30.2 31.4 Q 31.8 27.4 30 23 Z M31.4 25 L32 29.4 M33 26.2 L33.3 28.6",
  sparkle:
    "M20 3 V 13 M20.5 27 V 37 M3 20.5 H 13 M27 19.5 H 38 M8 8 L 13.5 13.5 M26 26.5 L 31 31 M32 8.5 L 26.5 13.5 M13.5 26 L 9 30.5",
};

export type DoodleName = keyof typeof doodlePaths;

// Doodles drawn on a wider grid than 40x40 (all doodles are 40 units tall).
export const doodleGridWidths: Partial<Record<DoodleName, number>> = { underline: 240 };
