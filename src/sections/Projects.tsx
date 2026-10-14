import type { CSSProperties } from "react";
import Doodle, { type DoodleName } from "../components/Doodle";
import Tape, { type TapeColor } from "../components/Tape";
import { projects } from "../data/projects";
import * as section from "../styles/section.css";
import { vars } from "../styles/theme.css";
import * as styles from "./Projects.css";

// Tape colors cycle across the polaroids.
const tapeColors: TapeColor[] = ["yellow", "pink", "mint"];

// Placeholder photo colors cycle through these for projects without an image.
const placeholderColors: (keyof typeof styles.photoPlaceholder)[] = [
  "pink",
  "blue",
  "mint",
];

// Small tilts (in degrees) so each polaroid and note looks hand-placed.
const polaroidTilts = [-2, 1.5, -1, 2];
const noteTilts = [6, -5, 4, -6];

// Swirly arrows leading from each project to the next; they cycle so each one is different.
const connectorArrows: DoodleName[] = ["arrowLoop", "arrowDoubleLoop", "arrowSpiral"];
const CONNECTOR_SIZE = 144;

// Notebook-margin doodles around each polaroid; the layouts cycle across projects.
// Kept clear of the top-right corner, where the sticky note goes.
type DoodleSpot = { name: DoodleName; size: number; style: CSSProperties };
const doodleLayouts: DoodleSpot[][] = [
  [
    { name: "star", size: 60, style: { top: -18, left: -26, rotate: "-12deg" } },
    { name: "squiggle", size: 72, style: { bottom: -26, left: "28%", color: vars.color.pink } },
    { name: "spiral", size: 56, style: { bottom: -16, right: -22 } },
  ],
  [
    { name: "heart", size: 56, style: { top: -16, left: -22, color: vars.color.pink } },
    { name: "sparkle", size: 52, style: { top: "38%", left: -34 } },
    { name: "spiral", size: 56, style: { bottom: -16, right: -22 } },
  ],
  [
    { name: "sparkle", size: 56, style: { top: -18, left: -24 } },
    { name: "squiggle", size: 60, style: { bottom: "28%", left: -38, rotate: "90deg" } },
    { name: "star", size: 56, style: { bottom: -48, right: -10, rotate: "14deg", color: vars.color.pink } },
  ],
];

export default function Projects() {
  return (
    <section id="projects" className={section.section}>
      <h2 className={section.heading}>Things I've built</h2>
      <p className={section.intro}>
        A few projects I'm proud of, and what I learned along the way.
      </p>
      <ul className={styles.list}>
        {projects.map((project, index) => (
          <li key={project.title} className={styles.item}>
            {doodleLayouts[index % doodleLayouts.length].map((spot, i) => (
              <Doodle
                key={spot.name}
                name={spot.name}
                size={spot.size}
                className={styles.doodle}
                style={spot.style}
                seed={index * 10 + i}
              />
            ))}

            {/* Point to the next project, which sits on the opposite side. */}
            {index < projects.length - 1 && (
              <Doodle
                name={connectorArrows[index % connectorArrows.length]}
                size={CONNECTOR_SIZE}
                seed={index + 50}
                drawOnScroll
                className={
                  index % 2 === 0 ? styles.connector.toRight : styles.connector.toLeft
                }
              />
            )}

            <article
              className={styles.polaroid}
              style={{ rotate: `${polaroidTilts[index % polaroidTilts.length]}deg` }}
            >
              <Tape
                color={tapeColors[index % tapeColors.length]}
                className={styles.tape}
              />
              {project.image ? (
                <img
                  className={styles.photo}
                  src={project.image.src}
                  alt={project.image.alt}
                />
              ) : (
                <div
                  className={
                    styles.photoPlaceholder[
                      placeholderColors[index % placeholderColors.length]
                    ]
                  }
                />
              )}
              <h3 className={styles.title}>{project.title}</h3>
              <p>{project.description}</p>
              <ul className={styles.tags} aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
              {project.links && (
                <div className={styles.links}>
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      className={styles.link}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </article>

            {project.note && (
              <p
                className={styles.stickyNote}
                style={{ rotate: `${noteTilts[index % noteTilts.length]}deg` }}
              >
                {project.note}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
