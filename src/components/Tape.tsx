import type { CSSProperties } from "react";
import * as styles from "./Tape.css";

export type TapeColor = keyof typeof styles.tape;

type TapeProps = {
  color?: TapeColor;
  // Position and angle the tape where it's used; the parent needs `position: relative`.
  className?: string;
  style?: CSSProperties;
};

// A strip of translucent masking tape, for taping scrapbook pieces to the page.
export default function Tape({ color = "yellow", className, style }: TapeProps) {
  return (
    <span
      className={className ? `${styles.tape[color]} ${className}` : styles.tape[color]}
      style={style}
      aria-hidden="true"
    />
  );
}
