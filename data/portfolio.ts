/**
 * AI KNOWLEDGE BASE — source of truth for the "Ask AI" assistant.
 * The assistant answers ONLY from this data (no external API). Keep it factual;
 * the answer engine in lib/ai.ts never fabricates beyond what's here.
 */

import { site, services, disciplines, projects } from "./content";

export const knowledge = {
  name: site.name,
  roles: site.roles,
  location: site.location,
  available: site.available,
  email: site.email,
  bookingLink: site.bookingLink,
  resumeUrl: site.resumeUrl,

  philosophy:
    "I like solving complicated problems and turning them into simple experiences. Strategy first, craft always — every interaction should earn its place.",

  specialties: [
    "Product Design",
    "UI/UX Design",
    "SaaS Design",
    "Dashboard Design",
    "Mobile App Design",
    "Website Design",
    "Motion Design",
    "Branding & Logo Design",
  ],

  services,
  disciplines: disciplines.map((d) => d.title),

  tools: [
    "Figma",
    "Framer",
    "After Effects",
    "Rive",
    "Spline",
    "Blender",
    "Principle",
    "Notion",
    "Linear",
  ],

  aiWorkflow: [
    "Research",
    "AI-assisted synthesis",
    "Human insight",
    "Ideation",
    "Wireframe",
    "UI design",
    "Prototype",
    "Testing",
    "Iteration",
    "Final product",
  ],

  // Compact project index for the assistant to reference/link.
  projects: projects.map((p) => ({
    name: p.name,
    slug: p.slug,
    oneLiner: p.oneLiner,
    tags: p.tags,
    year: p.year,
    href: p.link.type === "internal" ? `/work/${p.slug}` : p.link.href,
  })),
};

export type QuickQuestion = { label: string; q: string };

export const quickQuestions: QuickQuestion[] = [
  { label: "Top projects?", q: "What are Karthikeyan's best projects?" },
  { label: "Specialties", q: "What does Karthikeyan specialize in?" },
  { label: "Available for freelance?", q: "Is he available for freelance work?" },
  { label: "Tools", q: "What tools does he use?" },
  { label: "SaaS work", q: "Tell me about his SaaS work" },
  { label: "Dashboards", q: "Show dashboard projects" },
  { label: "How to hire", q: "How can I hire him?" },
  { label: "Resume", q: "Download resume" },
];
