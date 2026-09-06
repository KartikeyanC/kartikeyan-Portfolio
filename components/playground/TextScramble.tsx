"use client";

import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>";

/**
 * Hover-to-scramble text. Letters resolve from noise to the target word.
 */
export default function TextScramble({ text = "EXPLORE" }: { text?: string }) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(text);
  const raf = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = () => {
    if (reduced) return;
    let frame = 0;
    const total = text.length * 3;
    raf.current && clearInterval(raf.current);
    raf.current = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 3);
      setDisplay(
        text
          .split("")
          .map((ch, i) => (i < revealed || ch === " " ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      if (frame >= total) {
        raf.current && clearInterval(raf.current);
        setDisplay(text);
      }
    }, 40);
  };

  return (
    <button
      type="button"
      onMouseEnter={run}
      onFocus={run}
      className="font-display text-3xl font-bold tracking-tight text-text transition-colors hover:text-orange"
    >
      {display}
    </button>
  );
}
