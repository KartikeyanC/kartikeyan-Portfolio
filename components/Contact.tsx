"use client";

import { motion } from "framer-motion";
import { contact, site } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

function AnimatedHeadline({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");
  if (reduced) return <span>{text}</span>;

  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: i < words.length - 1 ? "0.25em" : undefined }}
        >
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-30">
      <div className="container-editorial">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-20 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange/20 blur-[120px]"
          />
          <div className="relative">
            <p className="eyebrow">Contact</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-text">
              <AnimatedHeadline text={contact.headline} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">{contact.supporting}</p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-orange-hover"
                >
                  Email me
                </MagneticButton>
                <MagneticButton
                  href={site.bookingLink}
                  external
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-medium text-text transition-colors hover:border-white/30"
                >
                  Book a call
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <a href={`mailto:${site.email}`} data-cursor="Let's talk" className="link-underline mt-8 inline-block text-text-secondary">
                {site.email}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
