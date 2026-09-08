"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { disciplines } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import Reveal from "./Reveal";

/**
 * Horizontal gallery. Desktop: vertical scroll is translated into horizontal
 * movement of a pinned track. Mobile / reduced motion: a native swipeable row.
 */

function Card({ index }: { index: number }) {
  const d = disciplines[index];
  return (
    <div
      data-cursor="Explore"
      className="group relative flex aspect-[4/5] w-[78vw] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-border bg-surface/40 p-7 sm:w-[46vw] lg:w-[30vw]"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: d.accent }}
        aria-hidden="true"
      />
      <span className="relative font-display text-6xl font-bold text-text/10">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="relative mt-2 font-display text-2xl font-semibold text-text">{d.title}</h3>
      <p className="relative mt-2 text-text-secondary">{d.blurb}</p>
    </div>
  );
}

export default function HorizontalGallery() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setMaxShift(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const Header = (
    <Reveal className="container-editorial">
      <p className="eyebrow">Explore the range</p>
      <h2 className="mt-4 max-w-2xl font-display text-section font-semibold text-text">
        Six worlds, one throughline.
      </h2>
    </Reveal>
  );

  // Mobile / reduced-motion: native swipe row.
  const SwipeRow = (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-8">
      {disciplines.map((_, i) => (
        <div key={i} className="snap-start">
          <Card index={i} />
        </div>
      ))}
    </div>
  );

  if (reduced) {
    return (
      <section className="relative py-24 sm:py-30">
        {Header}
        <div className="mt-12">{SwipeRow}</div>
      </section>
    );
  }

  return (
    <>
      {/* Desktop: scroll-pinned horizontal track */}
      <section ref={sectionRef} className="relative hidden lg:block" style={{ height: "300vh" }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="pb-10">{Header}</div>
          <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pl-6 sm:pl-8">
            {disciplines.map((_, i) => (
              <Card key={i} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile: swipe row */}
      <section className="relative py-24 lg:hidden">
        {Header}
        <div className="mt-12">{SwipeRow}</div>
      </section>
    </>
  );
}
