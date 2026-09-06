"use client";

import { valueProps } from "@/data/content";
import Reveal from "./Reveal";
import { ValuePropIcon } from "./icons";

export default function WhyMe() {
  return (
    <section className="relative py-24 sm:py-30">
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Why work with me</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
            The same care, from strategy to the last pixel.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {valueProps.map((prop, i) => (
            <Reveal key={prop.title} delay={i * 0.12}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-base-soft p-8 transition-colors hover:border-white/20">
                <ValuePropIcon icon={prop.icon} className="h-12 w-12 text-accent" />
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{prop.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{prop.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
