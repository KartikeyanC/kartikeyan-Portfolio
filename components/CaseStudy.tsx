"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/content";
import { site, projects } from "@/data/content";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { usePrefersReducedMotion } from "@/lib/hooks";

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="grid gap-8 lg:grid-cols-12">
      <p className="eyebrow lg:col-span-3">{label}</p>
      <div className="lg:col-span-9">{children}</div>
    </Reveal>
  );
}

export default function CaseStudy({ project }: { project: Project }) {
  const reduced = usePrefersReducedMotion();
  const cs = project.caseStudy!;

  // Next internal case study (cycles).
  const internal = projects.filter((p) => p.link.type === "internal" && p.caseStudy);
  const idx = internal.findIndex((p) => p.slug === project.slug);
  const next = internal[(idx + 1) % internal.length];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[120] border-b border-border bg-bg/70 backdrop-blur-xl">
        <div className="container-editorial flex h-16 items-center justify-between">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            Back to work
          </Link>
          <MagneticButton
            href={site.bookingLink}
            className="inline-flex items-center rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            Start a project
          </MagneticButton>
        </div>
      </header>

      <main id="main-content" className="pb-24">
        {/* Hero */}
        <section className="container-editorial pt-32">
          <div className="flex flex-wrap items-center gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,7vw,4.75rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-text">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-text-secondary sm:text-xl">{project.oneLiner}</p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 text-sm sm:max-w-lg">
            <div>
              <div className="text-text-muted">Role</div>
              <div className="mt-1 text-text">{cs.role}</div>
            </div>
            <div>
              <div className="text-text-muted">Timeline</div>
              <div className="mt-1 text-text">{cs.timeline}</div>
            </div>
          </div>
        </section>

        {/* Hero image (shared layoutId with the work-grid thumbnail) */}
        <section className="container-editorial mt-12">
          <motion.div
            layoutId={`project-image-${project.slug}`}
            className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border"
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={cs.hero} alt={`${project.name} case study hero`} fill unoptimized priority sizes="100vw" className="object-cover" />
          </motion.div>
        </section>

        {/* Narrative */}
        <div className="container-editorial mt-24 space-y-24">
          {cs.context && (
            <Block label="Context">
              <p className="max-w-3xl font-display text-2xl leading-relaxed text-text sm:text-3xl">{cs.context}</p>
            </Block>
          )}

          <Block label="The problem">
            <p className="max-w-3xl font-display text-2xl leading-relaxed text-text sm:text-3xl">{cs.problem}</p>
          </Block>

          {cs.research && cs.research.length > 0 && (
            <Block label="Research">
              <ul className="space-y-4">
                {cs.research.map((r, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                    <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">{r}</p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block label="Process">
            <ol className="space-y-6">
              {cs.process.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <span className="font-display text-lg text-orange">{String(i + 1).padStart(2, "0")}</span>
                  <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">{step}</p>
                </li>
              ))}
            </ol>
          </Block>

          {/* Gallery */}
          {cs.gallery.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {cs.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.1}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
                    <Image src={src} alt={`${project.name} detail ${i + 1}`} fill unoptimized sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {cs.designSystem && (
            <Block label="Design system">
              <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">{cs.designSystem}</p>
            </Block>
          )}

          <Block label="Solution">
            <p className="max-w-3xl font-display text-2xl leading-relaxed text-text sm:text-3xl">{cs.solution}</p>
          </Block>

          {cs.motion && (
            <Block label="Motion">
              <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">{cs.motion}</p>
            </Block>
          )}

          {/* Outcome */}
          <Reveal>
            <p className="eyebrow">Outcome</p>
            <div className="mt-8 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
              {cs.outcome.map((metric) => (
                <div key={metric.label}>
                  <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tight text-orange">
                    {metric.value}
                  </div>
                  <div className="mt-3 text-text-secondary">{metric.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {cs.learning && (
            <Block label="What I learned">
              <p className="max-w-3xl font-display text-2xl leading-relaxed text-text sm:text-3xl">{cs.learning}</p>
            </Block>
          )}
        </div>

        {/* Next project */}
        {next && (
          <section className="container-editorial mt-28">
            <Link
              href={`/work/${next.slug}`}
              data-cursor="View"
              className="group flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface/40 p-8 transition-colors hover:border-orange/60 sm:flex-row sm:items-center sm:p-10"
            >
              <div>
                <p className="eyebrow">Next project</p>
                <p className="mt-3 font-display text-3xl font-semibold text-text sm:text-4xl">{next.name}</p>
                <p className="mt-2 text-text-secondary">{next.oneLiner}</p>
              </div>
              <span className="text-3xl text-orange transition-transform group-hover:translate-x-2" aria-hidden="true">→</span>
            </Link>
          </section>
        )}
      </main>
    </>
  );
}
