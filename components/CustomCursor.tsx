"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion, useIsDesktop } from "@/lib/hooks";

/**
 * A small dot that trails the pointer, scales up and switches to
 * mix-blend-mode: difference over interactive elements. Desktop + motion-ok only.
 */
export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const active = isDesktop && !reduced;

  const [hovering, setHovering] = useState(false);
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
      setHovering(
        Boolean(el.closest("a, button, [data-cursor='hover'], input, textarea"))
      );
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

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full bg-ink mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovering ? 48 : 12,
        height: hovering ? 48 : 12,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    />
  );
}
