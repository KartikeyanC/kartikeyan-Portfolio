import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[clamp(4rem,18vw,11rem)] font-semibold leading-none tracking-tight text-ink">
        404
      </p>
      <p className="mt-4 max-w-md text-lg text-ink-muted">
        That page wandered off. The work, thankfully, is still where you left it.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-base transition-colors hover:bg-accent-soft"
      >
        ← Back home
      </Link>
    </main>
  );
}
