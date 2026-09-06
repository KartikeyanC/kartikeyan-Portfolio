"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/data/content";
import MagneticButton from "./MagneticButton";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "border-b border-border bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-editorial flex h-16 items-center justify-between sm:h-18"
          aria-label="Primary"
        >
          <Link href="/#top" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 font-display text-sm font-semibold text-text transition-colors group-hover:border-orange group-hover:text-orange">
              {site.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-text sm:block">
              {site.name}
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-sm text-text-secondary transition-colors hover:text-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex items-center gap-5">
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Download"
                className="link-underline text-sm text-text-secondary transition-colors hover:text-text"
              >
                Resume
              </a>
              <MagneticButton
                href={site.bookingLink}
                className="inline-flex items-center rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
              >
                Start a project
              </MagneticButton>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-text md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-1.5">
              <span className="block h-px w-5 bg-text" />
              <span className="block h-px w-5 bg-text" />
            </div>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[140] flex w-[82%] max-w-sm flex-col bg-surface p-6 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">{site.name}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-text"
                  aria-label="Close menu"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <ul className="mt-12 flex flex-col gap-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-display text-3xl text-text"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 py-3 text-center text-sm font-medium text-text"
                >
                  Resume
                </a>
                <a
                  href={site.bookingLink}
                  className="rounded-full bg-orange py-3 text-center text-sm font-semibold text-white"
                >
                  Start a project
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
