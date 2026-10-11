import { useEffect, useRef } from "react";
import * as styles from "./Contact.css";

type ContactLink = {
  label: string;
  href: string;
  color: keyof typeof styles.card;
};

const links: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:gesna@live.com",
    color: "yellow",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gesna-aggarwal",
    color: "blue",
  },
  {
    label: "GitHub",
    href: "https://github.com/gesna",
    color: "mint",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  // Contact only appears once revealed, so bring it into view right away
  // and move keyboard focus to it for screen reader and keyboard users.
  useEffect(() => {
    sectionRef.current?.focus({ preventScroll: true });
    sectionRef.current?.scrollIntoView();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      tabIndex={-1}
      className={styles.contact}
    >
      <h2 className={styles.heading}>Let's talk</h2>
      <p className={styles.intro}>
        Have an idea, a question, or just want to say hi? Reach out on any of
        these.
      </p>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.label}>
            <a
              className={styles.card[link.color]}
              href={link.href}
              // Open external sites in a new tab; mailto: links stay put.
              {...(link.href.startsWith("http") && {
                target: "_blank",
                rel: "noreferrer",
              })}
            >
              <span className={styles.label}>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
