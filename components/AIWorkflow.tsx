"use client";

import { motion } from "framer-motion";
import { aiWorkflow } from "@/data/content";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * AI workflow — the process as a connected flow, with AI-accelerated steps
 * marked. AI speeds the work; human judgment stays the spine.
 */
export default function AIWorkflow() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative py-24 sm:py-30">
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How I work with AI</p>
          <h2 className="mt-4 font-display text-section font-semibold text-text">
            AI as an accelerator — not the designer.
          </h2>
          <p className="mt-5 text-lg text-text-secondary">
            I use AI to move faster through research and iteration. The judgment
            calls — what matters, what ships — stay human.
          </p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {aiWorkflow.map((step, i) => (
            <motion.li
              key={step.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl border p-5 ${
                step.ai ? "border-orange/50 bg-orange/5" : "border-border bg-surface/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.ai && (
                  <span className="rounded-full bg-orange px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    AI
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-display text-base font-semibold leading-tight text-text">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-text-secondary">{step.note}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
