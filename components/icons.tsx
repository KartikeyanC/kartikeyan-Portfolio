"use client";

import { motion } from "framer-motion";
import type { ValueProp } from "@/data/content";

const drawTransition = { duration: 1, ease: "easeInOut" as const };

const drawProps = {
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "-60px" },
};

export function ValuePropIcon({
  icon,
  className = "",
}: {
  icon: ValueProp["icon"];
  className?: string;
}) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-hidden="true">
      {icon === "compass" && (
        <>
          <motion.circle cx="24" cy="24" r="18" {...stroke} {...drawProps} transition={drawTransition} />
          <motion.path
            d="M31 17 L26 26 L17 31 L22 22 Z"
            {...stroke}
            {...drawProps}
            transition={{ ...drawTransition, delay: 0.3 }}
          />
        </>
      )}
      {icon === "layers" && (
        <>
          <motion.path d="M24 8 L42 18 L24 28 L6 18 Z" {...stroke} {...drawProps} transition={drawTransition} />
          <motion.path
            d="M6 26 L24 36 L42 26"
            {...stroke}
            {...drawProps}
            transition={{ ...drawTransition, delay: 0.25 }}
          />
        </>
      )}
      {icon === "spark" && (
        <motion.path
          d="M24 6 C26 18 30 22 42 24 C30 26 26 30 24 42 C22 30 18 26 6 24 C18 22 22 18 24 6 Z"
          {...stroke}
          {...drawProps}
          transition={drawTransition}
        />
      )}
    </svg>
  );
}
