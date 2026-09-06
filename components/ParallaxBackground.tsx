"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Faint blurred blobs that drift at a different scroll speed than the
 * foreground for depth. Purely decorative; frozen under reduced motion.
 */
export default function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{ y: reduced ? 0 : y1 }}
        className="absolute -right-40 top-[10%] h-[420px] w-[420px] rounded-full bg-accent/[0.07] blur-[130px]"
      />
      <motion.div
        style={{ y: reduced ? 0 : y2 }}
        className="absolute -left-40 top-[55%] h-[480px] w-[480px] rounded-full bg-[#5b8def]/[0.06] blur-[140px]"
      />
    </div>
  );
}
