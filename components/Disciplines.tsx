"use client";

import { motion } from "framer-motion";
import { disciplines } from "@/data/content";
import Reveal from "./Reveal";
import { springTransition } from "@/lib/motion";

/**
 * Six Design Disciplines — the worlds Karthikeyan designs across. Each card
 * carries its own accent wash and lifts on hover.
 */
export default function Disciplines() {
  return (
    <section className="relative py-24 sm:py-30">
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Six design disciplines</p>
          <h2 className="mt-4 font-display text-section font-semibold text-text">
            One designer, six worlds.
          </h2>
          <p className="mt-5 text-lg text-text-secondary">
            From the first thumbnail to the shipped product — a full range that
            keeps the work coherent end to end.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={springTransition("gentle")}
                data-cursor="Explore"
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface/40 p-8"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: d.accent }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: d.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-text">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-text-secondary">{d.blurb}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
