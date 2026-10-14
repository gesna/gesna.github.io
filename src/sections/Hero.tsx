import Doodle from "../components/Doodle";
import * as scrapbook from "../styles/scrapbook.css";
import { vars } from "../styles/theme.css";
import * as styles from "./Hero.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.greeting}>
        Hi, I'm
        <Doodle
          name="star"
          size={40}
          seed={21}
          className={styles.doodle}
          style={{ top: -20, right: -48, color: vars.color.pink }}
        />
      </p>
      <h1 className={styles.name}>
        Gesna!
        {/* Sized for the name at full width (about 430px); it shrinks with the name below that. */}
        <Doodle name="underline" size={72} seed={26} className={styles.underline} />
        <Doodle
          name="spiral"
          size={60}
          seed={22}
          className={styles.doodle}
          style={{ top: -12, right: -66 }}
        />
      </h1>
      <p className={styles.tagline}>
        I am someone excited and passionate about building products that make a
        difference in people's lives.
        <Doodle
          name="heart"
          size={44}
          seed={23}
          className={styles.inlineDoodle}
          style={{ color: vars.color.pink }}
        />
      </p>
      <div className={styles.actions}>
        <span className={styles.startWrap}>
          <a className={`${styles.button} ${styles.primary}`} href="#projects">
            See my work
          </a>
          <Doodle name="arrowLoop" size={56} seed={7} className={styles.startArrow} />
          <p className={`${scrapbook.pencilNote} ${styles.startNote}`} aria-hidden="true">
            start here!
          </p>
        </span>
        <a className={styles.button} href="#contact">
          Get in touch
        </a>
      </div>
    </section>
  );
}
