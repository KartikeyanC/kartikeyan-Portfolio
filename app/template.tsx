"use client";

import { motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

/**
 * Route-level entry transition. App Router remounts this template on every
 * navigation, giving a clean full-screen wipe + fade into each page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[150] origin-bottom bg-orange"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: DURATION.medium, ease: EASE.expo }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.medium, delay: 0.15, ease: EASE.editorial }}
      >
        {children}
      </motion.div>
    </>
  );
}
