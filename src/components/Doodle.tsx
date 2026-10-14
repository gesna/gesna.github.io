import { useEffect, useId, useRef, type CSSProperties } from "react";
import { vars } from "../styles/theme.css";
import { doodleGridWidths, doodlePaths, type DoodleName } from "./doodleShapes";

export type { DoodleName };

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
  const gridWidth = doodleGridWidths[name] ?? 40;
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
  const d = doodlePaths[name];
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
