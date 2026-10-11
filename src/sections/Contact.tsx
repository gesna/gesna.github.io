import { useRevealOnMount } from "../hooks/useRevealOnMount";
import * as section from "../styles/section.css";
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
  const sectionRef = useRevealOnMount<HTMLElement>();

  return (
    <section
      id="contact"
      ref={sectionRef}
      tabIndex={-1}
      className={section.section}
    >
      <h2 className={section.heading}>Let's talk</h2>
      <p className={section.intro}>
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
