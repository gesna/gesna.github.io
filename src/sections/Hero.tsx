import * as styles from "./Hero.css";

type HeroProps = {
  onGetInTouch: () => void;
};

export default function Hero({ onGetInTouch }: HeroProps) {
  return (
    <section className={styles.hero}>
      <p className={styles.greeting}>Hi, I'm</p>
      <h1 className={styles.name}>Gesna!</h1>
      <p className={styles.tagline}>
        I am someone excited and passionate about building products that make a
        difference in people's lives.
      </p>
      <div className={styles.actions}>
        <a className={`${styles.button} ${styles.primary}`} href="#projects">
          See my work
        </a>
        <a className={styles.button} href="#contact" onClick={onGetInTouch}>
          Get in touch
        </a>
      </div>
    </section>
  );
}
