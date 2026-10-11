import * as styles from './Hero.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.greeting}>Hi, I'm</p>
      <h1 className={styles.name}>Your Name</h1>
      <p className={styles.tagline}>
        A one-line intro about what you do and what you care about.
      </p>
      <div className={styles.actions}>
        <a className={`${styles.button} ${styles.primary}`} href="#projects">
          See my work
        </a>
        <a className={styles.button} href="#contact">
          Get in touch
        </a>
      </div>
    </section>
  )
}
