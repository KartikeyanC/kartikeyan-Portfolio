"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero, site } from "@/data/content";
import { usePrefersReducedMotion, useIsDesktop } from "@/lib/hooks";
import MagneticButton from "./MagneticButton";
import ErrorBoundary from "./ErrorBoundary";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <HeroGradientFallback />,
});

function HeroGradientFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
      <div className="h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#FF704D,transparent_60%),radial-gradient(circle_at_70%_70%,#A3278F,transparent_55%)] opacity-70 blur-2xl" />
    </div>
  );
}

function AnimatedHeadline({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span>{text}</span>;

  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: i < words.length - 1 ? "0.25em" : undefined }}
        >
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ y: "110%", filter: "blur(8px)", opacity: 0 }}
            animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const show3D = isDesktop && !reduced;

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 sm:left-1/3">
        {show3D ? (
          <ErrorBoundary fallback={<HeroGradientFallback />}>
            <Hero3D />
          </ErrorBoundary>
        ) : (
          <HeroGradientFallback />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/70 to-transparent sm:via-base/40" />
      </div>

      <div className="container-editorial relative z-10">
        <div className="max-w-2xl">
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              {hero.greeting}
            </span>
            {site.available && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs font-medium text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
                </span>
                Available for freelance
              </span>
            )}
          </motion.div>

          <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,5.2vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-text">
            <AnimatedHeadline text={hero.headline} />
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-base font-medium tracking-tight text-text-secondary sm:text-lg"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            {hero.supporting}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
          >
            <MagneticButton
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
            >
              Explore work
              <span aria-hidden="true">↓</span>
            </MagneticButton>
            <MagneticButton
              href={site.bookingLink}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-text transition-colors hover:border-text-muted"
            >
              Start a project
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M4 11L11 4M11 4H5M11 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-ink-muted"
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
