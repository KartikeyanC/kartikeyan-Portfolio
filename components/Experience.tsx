"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "@/data/content";
import Reveal from "./Reveal";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-24 sm:py-30">
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Experience</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
            A decade of shipping.
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-16 pl-8 sm:pl-0">
          <div className="absolute left-2 top-2 h-full w-px bg-white/10 sm:left-[7.5rem]" />
          <motion.div
            className="absolute left-2 top-2 w-px origin-top bg-accent sm:left-[7.5rem]"
            style={{ scaleY: lineScale, height: "100%" }}
          />

          <ul className="space-y-12">
            {experience.map((item) => (
              <motion.li
                key={item.company}
                className="relative sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="absolute -left-[1.55rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-base sm:left-[6.95rem]" />

                <div className="text-sm font-medium text-ink-faint sm:text-right">{item.period}</div>
                <div className="mt-1 sm:mt-0">
                  <h3 className="font-display text-xl font-semibold text-ink">{item.role}</h3>
                  <div className="mt-0.5 text-accent">{item.company}</div>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
