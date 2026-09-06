"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion, useIsDesktop } from "@/lib/hooks";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  strength?: number;
};

/**
 * Button/link that subtly follows the cursor within its bounds and scales
 * down on click. Magnetism is disabled on touch and reduced-motion.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  external = false,
  ariaLabel,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const magnetic = isDesktop && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ref: ref as never,
    className,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x: springX, y: springY },
    whileTap: { scale: 0.94 },
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        {...commonProps}
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...commonProps} type="button" onClick={onClick}>
      {children}
    </motion.button>
  );
}
