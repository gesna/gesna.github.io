import { useEffect, useState } from "react";
import * as styles from "./ScrollProgress.css";

const BAR_LENGTH = 10;

// A tiny terminal-style progress readout, e.g. "[####------]  42%".
export default function ScrollProgress() {
  // 0 at the top of the page, 1 at the bottom.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Cleanup: stop listening if this component is ever removed.
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const filled = Math.round(progress * BAR_LENGTH);
  const bar = "#".repeat(filled) + "-".repeat(BAR_LENGTH - filled);
  const percent = String(Math.round(progress * 100)).padStart(3, " ");

  return (
    <p className={styles.readout} aria-hidden="true">
      [{bar}] {percent}%
    </p>
  );
}
