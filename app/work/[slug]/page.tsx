import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, site } from "@/data/content";
import CaseStudy from "@/components/CaseStudy";

export function generateStaticParams() {
  return projects
    .filter((p) => p.link.type === "internal" && p.caseStudy)
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — ${site.name}`,
    description: project.oneLiner,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project || project.link.type !== "internal" || !project.caseStudy) {
    notFound();
  }

  return <CaseStudy project={project} />;
}
