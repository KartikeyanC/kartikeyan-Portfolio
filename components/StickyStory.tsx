"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { storySteps } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import Reveal from "./Reveal";

/**
 * Sticky storytelling: the visual stays pinned while the step list, progress
 * line, and the mock visual advance with scroll. Under reduced motion it
 * collapses to a simple stacked list.
 */

function StageVisual({ index }: { index: number }) {
  // A distinct mock for each stage of the process.
  const stages = [
    // 01 Research — sticky-note wall
    <div key="0" className="grid h-full grid-cols-3 gap-3 p-8">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-orange/20" style={{ transform: `rotate(${(i % 3) - 1}deg)` }} />
      ))}
    </div>,
    // 02 Define — priorities list
    <div key="1" className="flex h-full flex-col justify-center gap-3 p-10">
      {[90, 70, 80, 55].map((w, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-orange" />
          <div className="h-3 rounded-full bg-text/15" style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>,
    // 03 Wireframe — gray blocks
    <div key="2" className="grid h-full grid-cols-4 grid-rows-4 gap-3 p-8">
      <div className="col-span-4 rounded-lg border border-dashed border-text/25" />
      <div className="row-span-3 rounded-lg border border-dashed border-text/25" />
      <div className="col-span-3 row-span-3 grid grid-cols-2 grid-rows-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-dashed border-text/25" />
        ))}
      </div>
    </div>,
    // 04 Design system — tokens + components
    <div key="3" className="flex h-full flex-col gap-4 p-8">
      <div className="flex gap-2">
        {["#FB542B", "#A3278F", "#4F30AB", "#F5F5F7", "#30313D"].map((c) => (
          <div key={c} className="h-10 w-10 rounded-lg" style={{ background: c }} />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="rounded-full bg-orange px-4 py-2 text-xs font-semibold text-white">Button</div>
        <div className="rounded-full border border-border px-4 py-2 text-xs text-text">Ghost</div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface" />
        <div className="rounded-xl bg-surface" />
      </div>
    </div>,
    // 05 Final UI — polished dashboard card
    <div key="4" className="flex h-full flex-col gap-3 p-8">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded-full bg-text/60" />
        <div className="h-6 w-16 rounded-full bg-orange" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["#FB542B", "#A3278F", "#4F30AB"].map((c) => (
          <div key={c} className="rounded-xl bg-surface p-3">
            <div className="h-2 w-8 rounded-full" style={{ background: c }} />
            <div className="mt-2 h-4 w-12 rounded bg-text/40" />
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-2 rounded-xl bg-surface p-4">
        {[40, 70, 45, 85, 60, 90].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-orange/40 to-orange" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>,
  ];
  return <>{stages[index] ?? stages[0]}</>;
}

export default function StickyStory() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(storySteps.length - 1, Math.floor(v * storySteps.length));
    setActive(i < 0 ? 0 : i);
  });

  if (reduced) {
    return (
      <section className="relative py-24 sm:py-30">
        <div className="container-editorial">
          <p className="eyebrow">How a project comes together</p>
          <h2 className="mt-4 font-display text-section font-semibold text-text">Research to shipped.</h2>
          <ol className="mt-10 space-y-6">
            {storySteps.map((s) => (
              <li key={s.n} className="flex gap-5 border-t border-border pt-6">
                <span className="font-display text-lg text-orange">{s.n}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text">{s.title}</h3>
                  <p className="mt-1 max-w-xl text-text-secondary">{s.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `${storySteps.length * 90}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-editorial grid w-full gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: steps + progress */}
          <div>
            <Reveal>
              <p className="eyebrow">How a project comes together</p>
              <h2 className="mt-4 font-display text-section font-semibold text-text">
                Research to shipped.
              </h2>
            </Reveal>
            <div className="mt-10 flex gap-6">
              <div className="relative w-px shrink-0 bg-border">
                <motion.div className="absolute left-0 top-0 w-px bg-orange" style={{ height: progressHeight }} />
              </div>
              <ol className="space-y-6">
                {storySteps.map((s, i) => (
                  <li key={s.n}>
                    <motion.div
                      animate={{ opacity: active === i ? 1 : 0.35 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4"
                    >
                      <span className="font-display text-sm text-orange">{s.n}</span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-text">{s.title}</h3>
                        <AnimatePresence>
                          {active === i && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="max-w-md overflow-hidden text-text-secondary"
                            >
                              <span className="mt-1 block">{s.blurb}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: pinned visual */}
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-bg-secondary lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <StageVisual index={active} />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-4 right-5 font-display text-6xl font-bold text-text/5">
              {storySteps[active].n}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
