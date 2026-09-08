"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Liquid / gooey effect via an SVG goo filter (blur + alpha contrast) applied
 * to a group of drifting circles so they merge and separate like liquid.
 */
export default function GooeyBlob() {
  const reduced = usePrefersReducedMotion();

  const blobs = [
    { c: "#FB542B", x: [-30, 40, -30], y: [-20, 20, -20], r: 42, d: 7 },
    { c: "#A3278F", x: [30, -20, 30], y: [25, -25, 25], r: 34, d: 9 },
    { c: "#4F30AB", x: [-10, 10, -10], y: [30, -10, 30], r: 30, d: 6 },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="relative h-40 w-40" style={{ filter: "url(#goo)" }}>
        {blobs.map((b, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ width: b.r * 2, height: b.r * 2, marginLeft: -b.r, marginTop: -b.r, background: b.c }}
            animate={reduced ? {} : { x: b.x, y: b.y }}
            transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
