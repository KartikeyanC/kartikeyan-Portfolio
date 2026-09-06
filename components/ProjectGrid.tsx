"use client";

import { projects, workIntro } from "@/data/content";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-30">
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-[-0.02em] text-text">
            Proof, not promises.
          </h2>
          <p className="mt-5 text-lg text-text-secondary">{workIntro}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
