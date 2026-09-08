"use client";

import { marqueeTerms } from "@/data/content";

/**
 * Seamless infinite marquee of discipline terms. Track duplicated and
 * translated -50% for a continuous loop; pauses on hover.
 */
export default function Marquee() {
  const items = [...marqueeTerms, ...marqueeTerms];

  return (
    <div
      className="group relative flex overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      aria-label="Disciplines"
    >
      <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
        {items.map((term, i) => (
          <span key={i} className="flex items-center gap-8" aria-hidden={i >= marqueeTerms.length ? "true" : undefined}>
            <span className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              {term}
            </span>
            <span className="text-orange" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
