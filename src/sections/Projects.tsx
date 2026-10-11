import { projects } from "../data/projects";
import { useRevealOnMount } from "../hooks/useRevealOnMount";
import * as section from "../styles/section.css";
import * as styles from "./Projects.css";

// Placeholder colors cycle through these for projects without an image.
const placeholderColors: (keyof typeof styles.placeholder)[] = [
  "pink",
  "blue",
  "yellow",
  "mint",
];

export default function Projects() {
  const sectionRef = useRevealOnMount<HTMLElement>();

  return (
    <section
      id="projects"
      ref={sectionRef}
      tabIndex={-1}
      className={section.section}
    >
      <h2 className={section.heading}>Things I've built</h2>
      <p className={section.intro}>
        A few projects I'm proud of, and what I learned along the way.
      </p>
      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <li key={project.title}>
            <article className={styles.card}>
              {project.image ? (
                <img
                  className={styles.image}
                  src={project.image.src}
                  alt={project.image.alt}
                />
              ) : (
                <div
                  className={
                    styles.placeholder[
                      placeholderColors[index % placeholderColors.length]
                    ]
                  }
                  aria-hidden="true"
                >
                  {project.title[0]}
                </div>
              )}
              <div className={styles.body}>
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
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
