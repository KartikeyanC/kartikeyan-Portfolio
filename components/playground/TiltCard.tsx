"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion, useIsDesktop } from "@/lib/hooks";

/**
 * 3D tilt card that tracks the cursor with a moving glare highlight.
 */
export default function TiltCard() {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const on = isDesktop && !reduced;
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 200, damping: 18 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent) => {
    if (!on || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="flex h-full w-full items-center justify-center [perspective:900px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={on ? { rotateX: rotX, rotateY: rotY } : undefined}
        className="relative h-36 w-56 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-bg-secondary p-5 [transform-style:preserve-3d]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: useTransform(glareX, (gx) => `radial-gradient(circle at ${gx} 0%, rgba(251,84,43,0.35), transparent 60%)`) }}
        />
        <div className="relative">
          <div className="h-6 w-6 rounded-lg bg-orange" />
          <div className="mt-6 h-2 w-24 rounded-full bg-text/40" />
          <div className="mt-2 h-2 w-16 rounded-full bg-text/20" />
        </div>
        <span className="absolute bottom-4 right-4 font-display text-xs text-text-muted">tilt me</span>
      </motion.div>
    </div>
  );
}
