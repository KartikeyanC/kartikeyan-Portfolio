"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Stat } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Count-up number that animates once when scrolled into view. */
export default function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? stat.value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setValue(stat.value);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, stat.value]);

  return (
    <div ref={ref}>
      <div className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-tight text-ink">
        {value}
        {stat.suffix ?? ""}
      </div>
      <div className="mt-3 text-sm text-ink-muted">{stat.label}</div>
    </div>
  );
}
