import { useEffect, useId, useRef, type CSSProperties } from "react";
import { vars } from "../styles/theme.css";

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
const paths = {
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

export type DoodleName = keyof typeof paths;

// Doodles drawn on a wider grid than 40x40 (all doodles are 40 units tall).
const gridWidths: Partial<Record<DoodleName, number>> = { underline: 240 };

// How the pencil looks on screen, in pixels, whatever size the doodle is drawn at.
const LINE_PX = 2.6;
const WOBBLE_PX = 5;

// How fast scroll-drawn doodles are sketched, in whole doodles per second.
const DRAW_SPEED = 1;

type DoodleProps = {
  name: DoodleName;
  // Height in pixels (and width, for square doodles). Line weight, wobble, and grain stay
  // the same at any size, so big and small doodles look drawn with the same pencil.
  size: number;
  className?: string;
  style?: CSSProperties;
  // Changes the wobble pattern, so repeated doodles don't look identical.
  seed?: number;
  // Draw the line in as the doodle scrolls up the screen, like it's being sketched live.
  drawOnScroll?: boolean;
};

export default function Doodle({
  name,
  size,
  className,
  style,
  seed = 1,
  drawOnScroll = false,
}: DoodleProps) {
  // Pixels per unit of the drawing grid, to convert on-screen sizes into grid units.
  const unit = size / 40;
  const gridWidth = gridWidths[name] ?? 40;
  // Each doodle needs its own filter id; strip characters that aren't safe in url(#...).
  const filterId = `wobble-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!drawOnScroll || !svg) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Each pen pass is a group of separate strokes (e.g. an arrow's line, then its head).
    // Give each stroke its own slice of the drawing, in order and in proportion to its real
    // length, so they're drawn one after another like a hand would.
    const strokes = [...svg.querySelectorAll("[data-pass]")].flatMap((pass) => {
      const paths = [...pass.querySelectorAll("path")];
      const lengths = paths.map((p) => p.getTotalLength());
      const total = lengths.reduce((a, b) => a + b, 0);
      let before = 0;
      return paths.map((path, i) => {
        const from = before / total;
        before += lengths[i];
        return { path, from, to: before / total };
      });
    });

    // `target` is how far scrolling says the line should be drawn; `drawn` is what's on
    // screen, which glides toward the target like a pencil moving at its own pace.
    // Both only ever grow: scrolling back up leaves the line as it is, like pencil on paper.
    let target = 0;
    let drawn = 0;
    let frame = 0;
    let lastTime = 0;

    const tick = (now: number) => {
      frame = 0;
      // Seconds since the last frame (capped, so a long pause doesn't skip the drawing).
      const elapsed = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0.016;
      lastTime = now;
      const rect = svg.getBoundingClientRect();
      // Hidden (e.g. display: none on narrow screens): wait until it's actually on the page.
      if (rect.height === 0) return;

      // Start once the doodle is fully on screen; finish when it's about a third of the way down.
      const start = window.innerHeight * 0.85 - rect.height;
      const end = window.innerHeight * 0.3;
      const scrolled = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      target = reduceMotion ? 1 : Math.max(target, scrolled);

      // Move toward the target at a steady pencil speed: a whole doodle takes about a second.
      // With reduced motion, skip the animation and show it complete.
      drawn = reduceMotion ? target : Math.min(target, drawn + elapsed * DRAW_SPEED);
      // Each stroke is one dash as long as itself (pathLength=1): offset 1 hides it, 0 shows it all.
      strokes.forEach(({ path, from, to }) => {
        const own = Math.min(Math.max((drawn - from) / (to - from), 0), 1);
        path.style.strokeDashoffset = String(1 - own);
      });

      if (drawn >= 1) stop(); // Fully drawn lines never change again.
      else if (drawn < target) frame = requestAnimationFrame(tick); // Keep drawing.
      else lastTime = 0; // Caught up; the next scroll starts timing afresh.
    };

    // Do the work at most once per screen refresh, however many scroll events fire.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return stop;
  }, [drawOnScroll]);

  // When drawing on scroll, split the doodle into its separate strokes (each starts with "M")
  // and set each up as a hidden dash, ready to be drawn in. Other doodles draw as one path.
  const d = paths[name];
  const strokes = drawOnScroll
    ? (d.match(/M[^M]*/g) ?? [d]).map((stroke, i) => (
        <path key={i} d={stroke} pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
      ))
    : <path d={d} />;

  return (
    <svg
      ref={svgRef}
      className={className}
      // Graphite pencil by default; pass a color in `style` for a colored pencil.
      // Animated doodles get their own layer, so redrawing them doesn't repaint the page.
      style={{
        color: vars.graphite,
        ...(drawOnScroll && { willChange: "transform" }),
        ...style,
      }}
      width={(size * gridWidth) / 40}
      height={size}
      viewBox={`0 0 ${gridWidth} 40`}
      overflow="visible"
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          {/* Jiggles every line slightly with random noise, like an unsteady hand. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.0125 * unit}
            numOctaves="2"
            seed={seed}
            result="wobble"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="wobble"
            scale={WOBBLE_PX / unit}
            result="wobbled"
          />
          {/* Fine speckle that breaks up the line, like graphite catching paper grain. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.55 * unit}
            numOctaves="1"
            seed={seed}
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.6 0 0 0 1.6"
            result="grainMask"
          />
          <feComposite in="wobbled" in2="grainMask" operator="in" />
        </filter>
      </defs>
      <g
        filter={`url(#${filterId})`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g data-pass strokeWidth={LINE_PX / unit}>
          {strokes}
        </g>
        {/* A second, lighter pass slightly offset, like going over the doodle twice. */}
        <g
          data-pass
          strokeWidth={LINE_PX / 2 / unit}
          opacity="0.6"
          transform={`translate(${2 / unit} ${1.5 / unit})`}
        >
          {strokes}
        </g>
      </g>
    </svg>
  );
}
