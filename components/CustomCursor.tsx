"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion, useIsDesktop } from "@/lib/hooks";

/**
 * Context-aware morphing cursor.
 * - Default: small orange dot.
 * - Over an element carrying data-cursor="Label", it morphs into a pill
 *   showing that label (VIEW / EXPLORE / PLAY / LET'S TALK / DOWNLOAD / GO ↗ …).
 * - Over a plain link/button, it grows into a soft ring.
 * Desktop + motion-ok only; never rendered on touch or reduced-motion.
 */
export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const active = isDesktop && !reduced;

  const [label, setLabel] = useState<string | null>(null);
  const [mode, setMode] = useState<"dot" | "ring" | "pill">("dot");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!active) {
      document.body.removeAttribute("data-custom-cursor");
      return;
    }
    document.body.setAttribute("data-custom-cursor", "true");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement;
      const labelled = el.closest<HTMLElement>("[data-cursor]");
      const cursorLabel = labelled?.dataset.cursor;

      if (cursorLabel && cursorLabel !== "hover") {
        setLabel(cursorLabel);
        setMode("pill");
      } else if (el.closest("a, button, input, textarea, [data-cursor='hover']")) {
        setLabel(null);
        setMode("ring");
      } else {
        setLabel(null);
        setMode("dot");
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.body.removeAttribute("data-custom-cursor");
    };
  }, [active, x, y]);

  if (!active) return null;

  const isPill = mode === "pill";
  const isRing = mode === "ring";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex items-center justify-center overflow-hidden"
        animate={{
          width: isPill ? "auto" : isRing ? 44 : 10,
          height: isPill ? 40 : isRing ? 44 : 10,
          borderRadius: 999,
          paddingLeft: isPill ? 20 : 0,
          paddingRight: isPill ? 20 : 0,
          backgroundColor: isPill
            ? "#FB542B"
            : isRing
              ? "rgba(251,84,43,0.12)"
              : "#FB542B",
          border: isRing ? "1px solid #FB542B" : "1px solid transparent",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      >
        <AnimatePresence mode="wait">
          {isPill && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
