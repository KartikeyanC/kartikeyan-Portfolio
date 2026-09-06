import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/content";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: `Playground — ${site.name}`,
  description:
    "Creative-technology experiments: cursor morphing, liquid SVG, magnetic interaction, and motion studies.",
};

const experiments = [
  "Morphing cursor",
  "Liquid SVG",
  "Logo morph",
  "Image distortion",
  "Magnetic button",
  "Text animation",
  "Scroll experiment",
  "3D card",
  "Particle interaction",
  "WebGL",
];

export default function PlaygroundPage() {
  return (
    <main className="min-h-[100svh]">
      <header className="fixed inset-x-0 top-0 z-[120] border-b border-border bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            Back home
          </Link>
          <MagneticButton
            href={site.bookingLink}
            className="inline-flex items-center rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            Start a project
          </MagneticButton>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-32 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
          Playground
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
          Where I test <span className="text-orange">creative technology</span>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-text-secondary">
          A living lab of interaction and motion experiments. Building these out
          one at a time — check back as they land.
        </p>

        <ul className="mt-14 grid grid-cols-1 gap-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((name) => (
            <li
              key={name}
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-orange/60"
            >
              <span className="font-medium text-text">{name}</span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] uppercase tracking-wider text-text-muted">
                Soon
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
