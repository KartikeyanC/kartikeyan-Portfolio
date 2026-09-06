"use client";

import { tools } from "@/data/content";

/**
 * Seamless infinite marquee of tool names. The track is duplicated and
 * translated -50%, so the loop is continuous. Pauses on hover.
 */
export default function Marquee() {
  const items = [...tools, ...tools];

  return (
    <div
      className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-label="Tools I work with"
    >
      <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]">
        {items.map((tool, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-base-soft px-6 py-3 text-ink-muted"
            aria-hidden={i >= tools.length ? "true" : undefined}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-base font-medium">{tool.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
