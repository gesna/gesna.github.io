import * as styles from "./Hero.css";

type HeroProps = {
  onSeeWork: () => void;
  onGetInTouch: () => void;
};

export default function Hero({ onSeeWork, onGetInTouch }: HeroProps) {
  return (
    <section className={styles.hero}>
      <p className={styles.greeting}>Hi, I'm</p>
      <h1 className={styles.name}>Gesna!</h1>
      <p className={styles.tagline}>
        I am someone excited and passionate about building products that make a
        difference in people's lives.
      </p>
      <div className={styles.actions}>
        <a
          className={`${styles.button} ${styles.primary}`}
          href="#projects"
          onClick={onSeeWork}
        >
          See my work
        </a>
        <a className={styles.button} href="#contact" onClick={onGetInTouch}>
          Get in touch
        </a>
      </div>
    </section>
  );
}
