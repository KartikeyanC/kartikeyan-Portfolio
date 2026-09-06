"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Project } from "@/data/content";
import { usePrefersReducedMotion, useIsDesktop } from "@/lib/hooks";

/**
 * Tilt-card: image scales and the card tilts in 3D tracking the cursor.
 * Internal projects use a layoutId on the thumbnail; external projects open
 * in a new tab.
 */
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const tiltEnabled = isDesktop && !reduced;

  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotY, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!tiltEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 10);
    rotX.set(-py * 10);
  };

  const onLeave = () => {
    setHovered(false);
    rotX.set(0);
    rotY.set(0);
  };

  const isExternal = project.link.type === "external";
  const href = isExternal
    ? (project.link as { type: "external"; href: string }).href
    : `/work/${project.slug}`;

  const CardInner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={
        tiltEnabled
          ? { rotateX: springX, rotateY: springY, transformPerspective: 1000 }
          : undefined
      }
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface"
      data-cursor={isExternal ? "Go ↗" : "View"}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          layoutId={isExternal ? undefined : `project-image-${project.slug}`}
          className="absolute inset-0"
        >
          <Image
            src={project.thumbnail}
            alt={`${project.name} — ${project.oneLiner}`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
        <div
          className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: `linear-gradient(135deg, ${project.accent}, transparent 70%)` }}
        />
        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-text backdrop-blur-md">
          {project.year}
        </span>
        {isExternal && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs text-text backdrop-blur-md">
            External ↗
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold text-text">{project.name}</h3>
          <motion.span
            className="text-orange"
            animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-hidden="true"
          >
            ↗
          </motion.span>
        </div>
        <p className="mt-2 text-text-secondary">{project.oneLiner}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  const wrapperClass = "block h-full [transform-style:preserve-3d]";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={wrapperClass}
          aria-label={`${project.name} (opens in new tab)`}
        >
          {CardInner}
        </a>
      ) : (
        <Link href={href} className={wrapperClass} aria-label={project.name}>
          {CardInner}
        </Link>
      )}
    </motion.div>
  );
}
