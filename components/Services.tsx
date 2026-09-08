"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services, site } from "@/data/content";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

/**
 * Services — an editorial hover list. Each row slides its accent and arrow in
 * on hover, keeping the list dense but alive.
 */
export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-30">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Services</p>
            <h2 className="mt-4 font-display text-section font-semibold text-text">
              How I can help.
            </h2>
            <p className="mt-5 text-lg text-text-secondary">
              Full-stack product design — from strategy and systems to the last
              interaction.
            </p>
            <MagneticButton
              href={site.bookingLink}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </Reveal>

          <ul className="lg:col-span-8">
            {services.map((service, i) => (
              <li key={service} className="border-b border-border first:border-t">
                <motion.div
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  className="flex items-center justify-between gap-6 py-5"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="w-8 text-sm text-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      animate={{ x: hovered === i ? 12 : 0, color: hovered === i ? "#FB542B" : "#F5F5F7" }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      className="font-display text-xl font-medium sm:text-2xl"
                    >
                      {service}
                    </motion.span>
                  </div>
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-orange"
                  >
                    →
                  </motion.span>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
