"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

/**
 * Asymmetric bento grid. A couple of cards carry an animated border beam;
 * the rest stay calm so the beams read as emphasis, not noise.
 */

function BeamCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl p-[1.5px] ${className}`}>
      {/* rotating conic beam */}
      <div
        className="absolute inset-[-40%] animate-[spin_6s_linear_infinite] opacity-70 [animation-play-state:paused] group-hover:[animation-play-state:running]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #FB542B 40deg, #A3278F 110deg, transparent 180deg)",
        }}
        aria-hidden="true"
      />
      <div className="relative h-full rounded-[calc(1.5rem-1.5px)] bg-surface">{children}</div>
    </div>
  );
}

function Plain({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-3xl border border-border bg-surface/40 ${className}`}>{children}</div>
  );
}

export default function Bento() {
  return (
    <section className="relative py-24 sm:py-30">
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">A quick look</p>
          <h2 className="mt-4 font-display text-section font-semibold text-text">
            Range, at a glance.
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Featured (beam) */}
          <Reveal className="col-span-2 row-span-2">
            <BeamCard className="h-full">
              <div className="flex h-full flex-col justify-between p-7">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                  Featured
                </span>
                <div>
                  <div className="font-display text-3xl font-semibold text-text">Northwind</div>
                  <p className="mt-2 max-w-sm text-text-secondary">
                    Rebuilding a legacy bank&apos;s app around what people came to do.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Product", "Fintech", "Design System"].map((t) => (
                      <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BeamCard>
          </Reveal>

          {/* Motion experiment */}
          <Reveal className="col-span-1 row-span-1">
            <Plain className="flex h-full items-center justify-center overflow-hidden">
              <motion.div
                className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange to-purple"
                animate={{ rotate: [0, 90, 90, 0], borderRadius: ["30%", "50%", "20%", "30%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </Plain>
          </Reveal>

          {/* Typography */}
          <Reveal className="col-span-1 row-span-1">
            <Plain className="flex h-full items-center justify-center">
              <span className="font-display text-5xl font-bold tracking-tight text-text">Aa</span>
            </Plain>
          </Reveal>

          {/* Dashboard mini */}
          <Reveal className="col-span-2 row-span-1">
            <Plain className="flex h-full items-end gap-2 p-5">
              {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-orange/40 to-orange" style={{ height: `${h}%` }} />
              ))}
            </Plain>
          </Reveal>

          {/* Mobile */}
          <Reveal className="col-span-1 row-span-1">
            <Plain className="flex h-full items-center justify-center">
              <div className="h-24 w-14 rounded-xl border border-border bg-bg p-1.5">
                <div className="h-1.5 w-6 rounded-full bg-text/30" />
                <div className="mt-2 space-y-1.5">
                  <div className="h-2 w-full rounded bg-orange/60" />
                  <div className="h-2 w-3/4 rounded bg-text/15" />
                  <div className="h-2 w-2/3 rounded bg-text/15" />
                </div>
              </div>
            </Plain>
          </Reveal>

          {/* Logo (beam) */}
          <Reveal className="col-span-1 row-span-1">
            <BeamCard className="h-full">
              <div className="flex h-full items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange font-display text-lg font-semibold text-text">
                  KC
                </span>
              </div>
            </BeamCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
