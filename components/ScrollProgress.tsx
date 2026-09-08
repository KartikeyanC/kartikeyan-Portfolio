"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fixed top progress bar tracking scroll position across the page.
 * Scroll-linked (not autoplaying), so it stays on even under
 * prefers-reduced-motion — it's a 1:1 reflection of user input.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[125] h-[2px] origin-left bg-gradient-to-r from-orange to-purple"
      style={{ scaleX }}
    />
  );
}
