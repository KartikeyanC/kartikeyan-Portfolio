"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Large typography with animated media playing inside the letters — here a
 * living orange/purple gradient clipped to the text (background-clip: text),
 * with a subtle scroll-driven parallax. Reduced motion keeps a static fill.
 */
export default function TextMask() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-30">
      <div className="container-editorial">
        <p className="eyebrow">Design in motion</p>
      </div>
      <motion.div style={{ x }} className="mt-6 w-full">
        <h2
          aria-label="Design in motion"
          className="select-none whitespace-nowrap px-6 text-center font-display font-bold leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.5rem, 18vw, 16rem)" }}
        >
          <span
            className={`bg-clip-text text-transparent ${reduced ? "" : "animate-[textShift_8s_linear_infinite]"}`}
            style={{
              backgroundImage:
                "linear-gradient(90deg,#FB542B,#FF704D,#A3278F,#4F30AB,#FB542B)",
              backgroundSize: "300% 100%",
            }}
          >
            DESIGN IN MOTION
          </span>
        </h2>
      </motion.div>

      <style>{`@keyframes textShift{0%{background-position:0% 50%}100%{background-position:300% 50%}}`}</style>
    </section>
  );
}
