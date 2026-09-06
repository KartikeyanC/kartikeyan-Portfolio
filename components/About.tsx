"use client";

import { about } from "@/data/content";
import Reveal from "./Reveal";
import StatCounter from "./StatCounter";
import Marquee from "./Marquee";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-30">
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">About</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
              I make the right thing the easy thing.
            </h2>
          </Reveal>

          <div className="space-y-6 lg:col-span-7">
            {about.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-lg leading-relaxed text-ink-muted">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-y border-white/10 py-12 sm:grid-cols-4">
          {about.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <StatCounter stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>

      <div id="skills" className="mt-20 scroll-mt-24">
        <Reveal className="container-editorial">
          <p className="eyebrow">Tools of the trade</p>
        </Reveal>
        <div className="mt-8">
          <Marquee />
        </div>
      </div>
    </section>
  );
}
