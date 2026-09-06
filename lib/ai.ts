/**
 * Local answer engine for the "Ask AI" assistant. Maps a question to an
 * answer built strictly from data/portfolio.ts. No external API; if nothing
 * matches, it says so rather than inventing an answer.
 */
import { knowledge } from "@/data/portfolio";

export type AILink = { label: string; href: string; external?: boolean };
export type AIAnswer = { text: string; links?: AILink[] };

const projectLink = (name: string): AILink | null => {
  const p = knowledge.projects.find((x) => x.name === name);
  if (!p) return null;
  return { label: `${p.name} →`, href: p.href, external: p.href.startsWith("http") };
};

function byTag(...needles: string[]): typeof knowledge.projects {
  return knowledge.projects.filter((p) =>
    p.tags.some((t) => needles.some((n) => t.toLowerCase().includes(n))) ||
    needles.some((n) => p.oneLiner.toLowerCase().includes(n))
  );
}

export function answer(question: string): AIAnswer {
  const q = question.toLowerCase().trim();
  const has = (...ws: string[]) => ws.some((w) => q.includes(w));

  // Resume / download
  if (has("resume", "cv", "download")) {
    return {
      text: `You can download ${knowledge.name}'s resume here.`,
      links: [{ label: "Download resume ↓", href: knowledge.resumeUrl, external: true }],
    };
  }

  // Hiring / contact
  if (has("hire", "contact", "reach", "email", "get in touch", "work together", "start a project")) {
    return {
      text: `The fastest way to work with ${knowledge.name} is to start a project or email directly — ${knowledge.email}.`,
      links: [
        { label: "Start a project →", href: knowledge.bookingLink },
        { label: "Email", href: `mailto:${knowledge.email}`, external: true },
      ],
    };
  }

  // Availability
  if (has("available", "availability", "freelance", "hiring", "open to")) {
    return {
      text: knowledge.available
        ? `Yes — ${knowledge.name} is currently available for freelance work (${knowledge.location}). He takes on one focused engagement at a time.`
        : `${knowledge.name} isn't taking new work right now, but reach out and he'll tell you when he could start.`,
      links: [{ label: "Start a project →", href: knowledge.bookingLink }],
    };
  }

  // Specialties / what he does
  if (has("specialize", "specialty", "specialities", "what does he do", "what do you do", "skills", "expertise")) {
    return {
      text: `${knowledge.name} specializes in: ${knowledge.specialties.join(", ")}.`,
      links: [{ label: "See services", href: "/#services" }],
    };
  }

  // Tools
  if (has("tool", "software", "stack", "figma")) {
    return { text: `Tools of the trade: ${knowledge.tools.join(", ")}.` };
  }

  // Process / AI workflow
  if (has("process", "workflow", "how do you work", "how does he work", "ai ")) {
    return {
      text: `The design process, with AI as an accelerator (human judgment stays central): ${knowledge.aiWorkflow.join(" → ")}.`,
    };
  }

  // Philosophy / about
  if (has("philosophy", "about", "who is", "tell me about karthikeyan", "believe", "approach")) {
    return {
      text: knowledge.philosophy,
      links: [{ label: "Read about", href: "/#about" }],
    };
  }

  // Category-specific project queries
  const categories: { keys: string[]; needles: string[]; label: string }[] = [
    { keys: ["saas"], needles: ["saas"], label: "SaaS" },
    { keys: ["dashboard", "data", "analytics"], needles: ["dashboard", "data", "analytics"], label: "dashboard" },
    { keys: ["mobile", "app"], needles: ["mobile", "app"], label: "mobile" },
    { keys: ["website", "web", "landing"], needles: ["web"], label: "website" },
    { keys: ["logo", "brand", "identity"], needles: ["brand", "logo"], label: "branding" },
    { keys: ["design system", "tokens"], needles: ["design system", "tokens", "system"], label: "design-system" },
  ];
  for (const c of categories) {
    if (has(...c.keys)) {
      const matches = byTag(...c.needles);
      if (matches.length) {
        return {
          text: `Here's ${knowledge.name}'s ${c.label} work:`,
          links: matches.map((p) => ({ label: `${p.name} — ${p.oneLiner}`, href: p.href, external: p.href.startsWith("http") })),
        };
      }
      return {
        text: `I don't have a dedicated ${c.label} case study to show yet — but it's part of what he offers. Want to see all the work?`,
        links: [{ label: "See all work", href: "/#work" }],
      };
    }
  }

  // Best / top projects, or generic "projects/work"
  if (has("best project", "top project", "projects", "work", "portfolio", "case stud")) {
    return {
      text: `A few highlights from ${knowledge.name}'s work:`,
      links: knowledge.projects.slice(0, 4).map((p) => ({
        label: `${p.name} — ${p.oneLiner}`,
        href: p.href,
        external: p.href.startsWith("http"),
      })),
    };
  }

  // Services
  if (has("service", "offer", "help with")) {
    return {
      text: `Services on offer: ${knowledge.services.join(", ")}.`,
      links: [{ label: "See services", href: "/#services" }],
    };
  }

  // Greetings
  if (has("hi", "hello", "hey", "help", "what can you")) {
    return {
      text: `Hi! I can tell you about ${knowledge.name}'s work, skills, design process, services, and availability. What would you like to know?`,
    };
  }

  // No verified info
  return {
    text: "I don't have verified information about that yet. Try asking about Karthikeyan's projects, specialties, tools, process, or availability.",
    links: [
      { label: "See work", href: "/#work" },
      { label: "Start a project", href: knowledge.bookingLink },
    ],
  };
}

void projectLink; // reserved for future targeted links
