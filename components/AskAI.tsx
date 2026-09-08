"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

// Chat window code is only fetched when the assistant is first opened.
const AIChatWindow = dynamic(() => import("./AIChatWindow"), { ssr: false });

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <AnimatePresence>{open && <AIChatWindow key="chat" onClose={() => setOpen(false)} />}</AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        aria-label={open ? "Close AI assistant" : "Ask AI about Karthikeyan"}
        aria-expanded={open}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-4 right-4 z-[205] flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white shadow-[0_8px_30px_rgba(251,84,43,0.45)] transition-colors hover:bg-orange-hover sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg key="x" width="22" height="22" viewBox="0 0 22 22" fill="none" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" width="24" height="24" viewBox="0 0 24 24" fill="none" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}>
              <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.4A8 8 0 1 1 20 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <circle cx="9" cy="12" r="1" fill="currentColor" />
              <circle cx="12.5" cy="12" r="1" fill="currentColor" />
              <circle cx="16" cy="12" r="1" fill="currentColor" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip (desktop, when closed) */}
      <AnimatePresence>
        {hovered && !open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed bottom-[2.35rem] right-20 z-[205] hidden rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text sm:block"
          >
            Ask AI about {site.name.split(" ")[0]}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
