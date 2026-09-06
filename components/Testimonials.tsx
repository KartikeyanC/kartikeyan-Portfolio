"use client";

import { testimonials } from "@/data/content";
import Reveal from "./Reveal";

/**
 * Auto-scrolling quote marquee. Duplicated track for a seamless loop,
 * pauses on hover, swipeable on touch.
 */
export default function Testimonials() {
  const items = [...testimonials, ...testimonials];

  return (
    <section className="relative py-24 sm:py-30">
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Kind words</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
            People I&apos;ve built with.
          </h2>
        </Reveal>
      </div>

      <div
        className="group relative mt-14 flex overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] [scrollbar-width:none] sm:overflow-hidden"
        aria-label="Testimonials"
      >
        <div className="flex shrink-0 animate-marquee gap-6 pr-6 [animation-duration:44s] group-hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <figure
              key={i}
              className="flex w-[85vw] max-w-md shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-base-soft p-8 sm:w-[26rem]"
              aria-hidden={i >= testimonials.length ? "true" : undefined}
            >
              <blockquote className="font-display text-xl leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <div className="font-medium text-ink">{t.author}</div>
                <div className="text-sm text-ink-muted">{t.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
