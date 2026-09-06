"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/content";
import { site } from "@/data/content";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function CaseStudy({ project }: { project: Project }) {
  const reduced = usePrefersReducedMotion();
  const cs = project.caseStudy!;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[120] border-b border-white/10 bg-base/70 backdrop-blur-xl">
        <div className="container-editorial flex h-16 items-center justify-between">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            Back to work
          </Link>
          <MagneticButton
            href={site.bookingLink}
            external
            className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-base transition-colors hover:bg-accent-soft"
          >
            Book a call
          </MagneticButton>
        </div>
      </header>

      <main className="pb-24">
        <section className="container-editorial pt-32">
          <div className="flex flex-wrap items-center gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-faint">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-muted sm:text-xl">{project.oneLiner}</p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-y border-white/10 py-6 text-sm sm:max-w-lg">
            <div>
              <div className="text-ink-faint">Role</div>
              <div className="mt-1 text-ink">{cs.role}</div>
            </div>
            <div>
              <div className="text-ink-faint">Timeline</div>
              <div className="mt-1 text-ink">{cs.timeline}</div>
            </div>
          </div>
        </section>

        <section className="container-editorial mt-12">
          <motion.div
            className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10"
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={cs.hero}
              alt={`${project.name} case study hero`}
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </section>

        <div className="container-editorial mt-24 space-y-24">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">01 — Problem</p>
            <p className="max-w-3xl font-display text-2xl leading-relaxed text-ink lg:col-span-9 sm:text-3xl">
              {cs.problem}
            </p>
          </Reveal>

          <Reveal className="grid gap-8 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">02 — Process</p>
            <ol className="space-y-6 lg:col-span-9">
              {cs.process.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <span className="font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {cs.gallery.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {cs.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.1}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                    <Image
                      src={src}
                      alt={`${project.name} detail ${i + 1}`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="grid gap-8 lg:grid-cols-12">
            <p className="eyebrow lg:col-span-3">03 — Solution</p>
            <p className="max-w-3xl font-display text-2xl leading-relaxed text-ink lg:col-span-9 sm:text-3xl">
              {cs.solution}
            </p>
          </Reveal>

          <Reveal>
            <p className="eyebrow">04 — Outcome</p>
            <div className="mt-8 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
              {cs.outcome.map((metric) => (
                <div key={metric.label}>
                  <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tight text-accent">
                    {metric.value}
                  </div>
                  <div className="mt-3 text-ink-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <section className="container-editorial mt-28 text-center">
          <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">Have a project like this?</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${site.email}`}
              className="inline-flex items-center rounded-full bg-accent px-7 py-4 text-sm font-medium text-base transition-colors hover:bg-accent-soft"
            >
              Email me
            </MagneticButton>
            <Link href="/#work" className="link-underline inline-flex items-center px-1 text-sm font-medium text-ink">
              See more work
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
