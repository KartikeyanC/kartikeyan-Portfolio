/**
 * ANIMATION INVENTORY & MOTION SYSTEM
 * ------------------------------------------------------------------
 * Single source of truth for every easing curve, duration, and reusable
 * Framer Motion variant used across the site. Components should pull from
 * here instead of hand-rolling cubic-beziers so the whole product moves
 * with one consistent signature.
 *
 * Inventory:
 *  - EASE.editorial / EASE.expo   → curves (mirrors tailwind.config.ts)
 *  - DURATION.fast..cinematic     → seconds (mirrors tailwind.config.ts)
 *  - SPRING.snappy / gentle / soft → physics presets for cursor-driven motion
 *  - fadeUp / fadeIn / scaleIn    → entrance variants for Reveal & cards
 *  - staggerContainer / staggerItem → coordinated group reveals (grids, lists)
 *  - textWord                    → per-word headline reveal (Hero)
 */

import type { SpringOptions, Transition, Variants } from "framer-motion";

// Curves — keep in sync with tailwind.config.ts `transitionTimingFunction`.
export const EASE = {
  editorial: [0.22, 1, 0.36, 1] as const,
  expo: [0.76, 0, 0.24, 1] as const,
} as const;

// Seconds — keep in sync with tailwind.config.ts `transitionDuration`.
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  medium: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const;

// Spring presets for useSpring/useMotionValue (cursor, magnetic buttons,
// tilt cards). Bare SpringOptions — no `type` field, since useSpring infers
// that itself. For a `whileHover`/`animate` transition prop, spread as
// `{ type: "spring", ...SPRING.snappy }`.
export const SPRING: Record<"snappy" | "gentle" | "soft", SpringOptions> = {
  snappy: { stiffness: 300, damping: 20 },
  gentle: { stiffness: 260, damping: 24, mass: 0.6 },
  soft: { stiffness: 200, damping: 20 },
};

export const springTransition = (preset: keyof typeof SPRING): Transition => ({
  type: "spring",
  ...SPRING[preset],
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE.editorial },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.normal, ease: EASE.editorial } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.medium, ease: EASE.editorial },
  },
};

/** Wrap a grid/list with this, then give each child `staggerItem`. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE.editorial },
  },
};

/** Per-word headline reveal, matching Hero's AnimatedHeadline timing. */
export const textWord = (index: number, baseDelay = 0.35, stagger = 0.08): Transition => ({
  duration: DURATION.slow - 0.1,
  delay: baseDelay + index * stagger,
  ease: EASE.editorial,
});
