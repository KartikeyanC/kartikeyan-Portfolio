import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/content";
import MagneticButton from "@/components/MagneticButton";
import GooeyBlob from "@/components/playground/GooeyBlob";
import LogoMorph from "@/components/playground/LogoMorph";
import TiltCard from "@/components/playground/TiltCard";
import TextScramble from "@/components/playground/TextScramble";

export const metadata: Metadata = {
  title: `Playground — ${site.name}`,
  description:
    "Creative-technology experiments: liquid SVG, logo construction, 3D tilt, magnetic interaction, and text animation.",
};

function Cell({
  title,
  hint,
  children,
  className = "",
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative flex min-h-[240px] flex-col overflow-hidden rounded-3xl border border-border bg-surface/40 ${className}`}>
      <div className="flex-1">{children}</div>
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-sm font-medium text-text">{title}</span>
        {hint && <span className="text-xs text-text-muted">{hint}</span>}
      </div>
    </div>
  );
}

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
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-text-muted">Playground</p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
          Where I test <span className="text-orange">creative technology</span>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-text-secondary">
          A living lab of interaction and motion experiments. Hover, tilt, and
          move your cursor — everything here is built from scratch.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          <Cell title="Liquid SVG" hint="gooey filter"><GooeyBlob /></Cell>
          <Cell title="Logo construction" hint="path draw"><LogoMorph /></Cell>
          <Cell title="3D tilt card" hint="hover"><TiltCard /></Cell>

          <Cell title="Text scramble" hint="hover">
            <div className="flex h-full items-center justify-center">
              <TextScramble text="EXPLORE" />
            </div>
          </Cell>

          <Cell title="Magnetic button" hint="hover">
            <div className="flex h-full items-center justify-center">
              <MagneticButton
                strength={0.5}
                className="inline-flex items-center rounded-full bg-orange px-7 py-4 text-sm font-semibold text-white"
              >
                Pull me
              </MagneticButton>
            </div>
          </Cell>

          <Cell title="Morphing cursor" hint="desktop">
            <div className="flex h-full items-center justify-center" data-cursor="Playground">
              <span className="max-w-[12rem] text-center text-sm text-text-secondary">
                Move your cursor across this card — it morphs to a label.
              </span>
            </div>
          </Cell>
        </div>
      </section>
    </main>
  );
}
