"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Inertia-based smooth scrolling via Lenis, lazy-loaded so it never blocks
 * first paint. Disabled entirely under prefers-reduced-motion.
 */
export default function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let lenis: import("lenis").default | null = null;
    let rafId = 0;
    let cancelled = false;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      const onClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest(
          'a[href^="#"]'
        ) as HTMLAnchorElement | null;
        if (!target) return;
        const id = target.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis?.scrollTo(el as HTMLElement, { offset: -80 });
        }
      };
      document.addEventListener("click", onClick);
      (lenis as unknown as { _cleanup?: () => void })._cleanup = () =>
        document.removeEventListener("click", onClick);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      (lenis as unknown as { _cleanup?: () => void })?._cleanup?.();
      lenis?.destroy();
    };
  }, [reduced]);

  return null;
}
