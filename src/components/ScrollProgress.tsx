import { useEffect, useState } from "react";
import * as styles from "./ScrollProgress.css";

// A bar across the top of the page that fills as you scroll down.
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

  return (
    <div
      className={styles.bar}
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
