"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import Reveal from "./Reveal";

/**
 * Scroll-driven product assembly: a pinned app frame that builds itself —
 * empty canvas → nav → sidebar → cards → chart → components → colored final UI
 * — as the section scrolls. Reduced motion shows the finished screen, static.
 */

function useStage(p: MotionValue<number>, start: number, end: number) {
  const opacity = useTransform(p, [start, end], [0, 1]);
  const y = useTransform(p, [start, end], [24, 0]);
  return { opacity, y };
}

export default function ProductAssembly() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const nav = useStage(scrollYProgress, 0.05, 0.18);
  const side = useStage(scrollYProgress, 0.18, 0.32);
  const cards = useStage(scrollYProgress, 0.32, 0.5);
  const chart = useStage(scrollYProgress, 0.5, 0.68);
  const chips = useStage(scrollYProgress, 0.68, 0.82);
  // Wireframe → colored polish at the end.
  const saturate = useTransform(scrollYProgress, [0.82, 1], [0, 1]);
  const grayscale = useTransform(scrollYProgress, [0.82, 1], [1, 0]);
  const filter = useTransform([grayscale, saturate], ([g, s]) => `grayscale(${g}) saturate(${0.6 + (s as number) * 0.4})`);

  const full = reduced; // render finished state under reduced motion

  const Frame = (
    <motion.div
      style={reduced ? undefined : { filter }}
      className="mx-auto flex aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-2xl"
    >
      {/* Sidebar */}
      <motion.aside
        style={full ? undefined : side}
        className="hidden w-1/5 flex-col gap-2 border-r border-border bg-surface/50 p-4 sm:flex"
      >
        <div className="mb-2 h-6 w-6 rounded-md bg-orange" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-3 rounded-full ${i === 0 ? "bg-orange/70" : "bg-text/15"}`} style={{ width: `${80 - i * 8}%` }} />
        ))}
      </motion.aside>

      <div className="flex flex-1 flex-col">
        {/* Top nav */}
        <motion.div style={full ? undefined : nav} className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="h-3 w-28 rounded-full bg-text/40" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-16 rounded-full bg-surface" />
            <div className="h-7 w-7 rounded-full bg-purple" />
          </div>
        </motion.div>

        <div className="flex-1 space-y-4 p-5">
          {/* Stat cards */}
          <motion.div style={full ? undefined : cards} className="grid grid-cols-3 gap-3">
            {["#FB542B", "#A3278F", "#4F30AB"].map((c) => (
              <div key={c} className="rounded-xl bg-surface p-3">
                <div className="h-2 w-8 rounded-full" style={{ background: c }} />
                <div className="mt-2 h-5 w-14 rounded bg-text/40" />
                <div className="mt-1 h-2 w-10 rounded-full bg-text/15" />
              </div>
            ))}
          </motion.div>

          {/* Chart */}
          <motion.div style={full ? undefined : chart} className="flex h-32 items-end gap-2 rounded-xl bg-surface p-4">
            {[45, 65, 40, 80, 55, 92, 70, 60].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-orange/30 to-orange" style={{ height: `${h}%` }} />
            ))}
          </motion.div>

          {/* Component chips */}
          <motion.div style={full ? undefined : chips} className="flex flex-wrap gap-2">
            {["Button", "Input", "Toggle", "Badge", "Avatar", "Tabs"].map((c) => (
              <div key={c} className="rounded-full border border-border bg-bg px-3 py-1.5 text-[11px] text-text-secondary">
                {c}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  if (reduced) {
    return (
      <section className="relative py-24 sm:py-30">
        <div className="container-editorial">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Product assembly</p>
            <h2 className="mt-4 font-display text-section font-semibold text-text">From canvas to shipped UI.</h2>
          </Reveal>
          {Frame}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden py-16">
        <div className="container-editorial mb-8 text-center">
          <p className="eyebrow">Product assembly</p>
          <h2 className="mt-3 font-display text-section font-semibold text-text">
            Scroll to build the product.
          </h2>
        </div>
        <div className="container-editorial">{Frame}</div>
      </div>
    </section>
  );
}
