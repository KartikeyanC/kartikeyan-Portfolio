"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

const SESSION_KEY = "preloader-seen";

/**
 * Brief logo draw-on intro on first load only. Skipped on subsequent
 * navigations within the session and under reduced motion.
 */
export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Reduced motion: never show the intro, and make sure it isn't left
    // on-screen if this runs after an initial (pre-hydration) render.
    if (reduced) {
      setShow(false);
      document.body.style.overflow = "";
      return;
    }
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShow(false);
      document.body.style.overflow = "";
    }, 1700);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.svg width="120" height="120" viewBox="0 0 120 120" className="text-orange">
            <motion.circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.text
              x="60"
              y="60"
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-ink font-display"
              style={{ fontSize: 30, fontWeight: 600 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {site.initials}
            </motion.text>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
