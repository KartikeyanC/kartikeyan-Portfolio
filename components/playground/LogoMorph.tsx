"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * SVG logo construction — the ring draws on, the monogram fades in, on a loop.
 * Demonstrates path drawing and wordmark reveal.
 */
export default function LogoMorph() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 120 120" className="text-orange">
        <motion.circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
          transition={reduced ? { duration: 0 } : { duration: 5, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        />
        <motion.text
          x="60"
          y="62"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-text font-display"
          style={{ fontSize: 34, fontWeight: 700 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
          transition={reduced ? { duration: 0 } : { duration: 5, times: [0, 0.45, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
        >
          KC
        </motion.text>
      </svg>
    </div>
  );
}
