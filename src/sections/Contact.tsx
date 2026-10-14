import Doodle from "../components/Doodle";
import * as scrapbook from "../styles/scrapbook.css";
import * as section from "../styles/section.css";
import { vars } from "../styles/theme.css";
import * as styles from "./Contact.css";

type ContactLink = {
  label: string;
  href: string;
  color: keyof typeof styles.card;
  // Picked to stand out against the card color.
  tape: keyof typeof scrapbook.tapeColor;
};

const links: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:gesna@live.com",
    color: "yellow",
    tape: "pink",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gesna-aggarwal",
    color: "blue",
    tape: "yellow",
  },
  {
    label: "GitHub",
    href: "https://github.com/gesna",
    color: "mint",
    tape: "pink",
  },
];

// Slightly different tape angles (in degrees) so each card looks taped by hand.
const tapeTilts = [-6, 4, -3];

export default function Contact() {
  return (
    <section id="contact" className={section.section}>
      <h2 className={section.heading}>
        Let's talk
        <Doodle
          name="star"
          size={44}
          className={styles.star}
          style={{ color: vars.color.pink }}
        />
      </h2>
      <p className={section.intro}>
        Have an idea, a question, or just want to say hi? Reach out on any of
        these.
      </p>
      <ul className={styles.list}>
        {links.map((link, index) => (
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
              <span
                className={`${scrapbook.tape} ${scrapbook.tapeColor[link.tape]} ${styles.tape}`}
                style={{ rotate: `${tapeTilts[index % tapeTilts.length]}deg` }}
              />
              <span className={styles.label}>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
