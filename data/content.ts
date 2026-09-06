/**
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ------------------------------------------------------------------
 * Edit anything here — copy, projects, experience, testimonials,
 * links — and it flows through the whole site. No CMS required.
 */

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  tags: string[];
  year: string;
  thumbnail: string;
  accent: string;
  link: { type: "internal" } | { type: "external"; href: string };
  caseStudy?: {
    role: string;
    timeline: string;
    hero: string;
    context?: string;
    problem: string;
    research?: string[];
    process: string[];
    designSystem?: string;
    solution: string;
    motion?: string;
    outcome: { label: string; value: string }[];
    learning?: string;
    gallery: string[];
  };
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  title: string;
};

export type ValueProp = {
  title: string;
  description: string;
  icon: "compass" | "layers" | "spark";
};

export type FaqItem = { q: string; a: string };
export type Stat = { label: string; value: number; suffix?: string };
export type Tool = { name: string };

// ------------------------------------------------------------------
// SITE-WIDE / IDENTITY
// ------------------------------------------------------------------

export const site = {
  name: "Karthikeyan C",
  initials: "KC",
  role: "Product Designer",
  roles: [
    "Product Designer",
    "UI/UX Designer",
    "Visual Designer",
    "Motion Designer",
  ],
  email: "hello@karthikeyan.design",
  bookingLink: "mailto:hello@karthikeyan.design?subject=Let's start a project",
  resumeUrl: "/resume.pdf",
  location: "Remote · worldwide",
  available: true,
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "X", href: "https://x.com" },
  ],
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "#contact" },
];

// ------------------------------------------------------------------
// HERO
// ------------------------------------------------------------------

export const hero = {
  greeting: "Design in motion",
  headline:
    "I design digital products, interfaces and visual experiences that turn complex ideas into clear experiences.",
  supporting:
    "Product Designer · UI/UX Designer · Visual Designer · Motion Designer",
};

// Six design disciplines shown as floating hero artifacts / world sections.
export type Discipline = { title: string; blurb: string; accent: string };

export const disciplines: Discipline[] = [
  { title: "Thumbnail Design", blurb: "Scroll-stopping frames that earn the click.", accent: "#FB542B" },
  { title: "SaaS Animation", blurb: "Interfaces that explain themselves in motion.", accent: "#A3278F" },
  { title: "Website Design", blurb: "Editorial, fast, and unmistakably yours.", accent: "#4F30AB" },
  { title: "Mobile App Design", blurb: "Thumb-first flows that feel effortless.", accent: "#FF704D" },
  { title: "Dashboard Design", blurb: "Dense data made calm and legible.", accent: "#A3278F" },
  { title: "Logo Design", blurb: "Marks built from a single, sharp idea.", accent: "#FB542B" },
];

// Services list (Services section).
export const services: string[] = [
  "Product Design",
  "UI/UX Design",
  "SaaS Design",
  "Dashboard Design",
  "Mobile App Design",
  "Website Design",
  "Design Systems",
  "Motion Design",
  "Logo Design",
  "UX Audit",
  "Freelance Design",
  "Digital Product Consulting",
];

// AI workflow — AI as an accelerator; human judgment stays central.
export type WorkflowStep = { title: string; note: string; ai?: boolean };

export const aiWorkflow: WorkflowStep[] = [
  { title: "Research", note: "Interviews, data, and the real jobs to be done." },
  { title: "AI-Assisted Synthesis", note: "Cluster and summarize findings fast.", ai: true },
  { title: "Human Insight", note: "The judgment call AI can't make.", },
  { title: "Ideation", note: "Diverge wide before converging." },
  { title: "Wireframe", note: "Structure and flow before pixels." },
  { title: "UI Design", note: "Craft, systems, and state coverage." },
  { title: "Prototype", note: "Make it real enough to test.", ai: true },
  { title: "Testing", note: "Watch people actually use it." },
  { title: "Iteration", note: "Sharpen against what you learned." },
  { title: "Final Product", note: "Shipped, measured, and maintained." },
];

// Sticky storytelling — the arc of a project, pinned while it plays out.
export type StoryStep = { n: string; title: string; blurb: string };

export const storySteps: StoryStep[] = [
  { n: "01", title: "Research", blurb: "Interviews, flows, and the questions people actually bring to the product." },
  { n: "02", title: "Define", blurb: "Turning noise into a sharp problem statement and the jobs to be done." },
  { n: "03", title: "Wireframe", blurb: "Low-fidelity structure — deciding what goes where, and why, before pixels." },
  { n: "04", title: "Design System", blurb: "Tokens, components, and rules so the product stays coherent as it scales." },
  { n: "05", title: "Final UI", blurb: "The polished, shipped interface — every state, every edge, resolved." },
];

// Infinite marquee terms.
export const marqueeTerms: string[] = [
  "Product Design",
  "UI/UX",
  "SaaS",
  "Motion",
  "Visual Design",
  "Design Systems",
  "Product Thinking",
];

// ------------------------------------------------------------------
// SELECTED WORK
// ------------------------------------------------------------------

export const workIntro =
  "A few things I've shipped lately — end-to-end product work, from first sketch to the version real people use.";

export const projects: Project[] = [
  {
    slug: "northwind-banking",
    name: "Northwind",
    oneLiner: "Rebuilding a legacy bank's app around what people came to do.",
    tags: ["Product", "Fintech", "Design System"],
    year: "2025",
    thumbnail: "/images/northwind-thumb.svg",
    accent: "#e8563f",
    link: { type: "internal" },
    caseStudy: {
      role: "Lead Product Designer",
      timeline: "6 months · 2025",
      hero: "/images/northwind-hero.svg",
      context:
        "Northwind is a regional bank with 4M mobile users and a decade of feature accretion. The app worked, technically — but every release added another tab, and satisfaction kept sliding.",
      research: [
        "14 unmoderated task tests surfaced where people stalled — five real jobs accounted for most sessions.",
        "Support-ticket mining showed 'where is my transfer' was the single biggest driver of contacts.",
        "Diary studies revealed people opened the app anxious and left unsure the task had worked.",
      ],
      designSystem:
        "A token-based system (color, type, spacing, elevation) feeding shared components across iOS, Android, and web — so the redesign shipped once and stayed consistent as teams built on it.",
      motion:
        "Money-movement got deliberate motion: a confirm state that animates the amount into place and a receipt that settles, so people feel the transfer land.",
      learning:
        "The win wasn't new features — it was subtraction. Cutting the dashboard-of-everything did more for satisfaction than anything we added.",
      problem:
        "Northwind's mobile app was a menu of features nobody asked for. Support tickets were dominated by people who couldn't find the one thing they opened the app to do — move money and check that it landed.",
      process: [
        "Ran 14 unmoderated task-based tests to find where people stalled, then mapped the top five real jobs to be done.",
        "Killed the dashboard-of-everything in favor of a single action-first home that surfaces the next likely task.",
        "Built a token-based design system so the redesign could ship across iOS, Android, and web without drift.",
        "Prototyped the money-movement flow at high fidelity and validated it with 8 return users before a line of production code.",
      ],
      solution:
        "An action-first home, a two-tap transfer flow, and a calm visual language that treats money with the seriousness it deserves. Every screen answers 'what now?' before it decorates.",
      outcome: [
        { label: "Task success", value: "+38%" },
        { label: "Support tickets", value: "-27%" },
        { label: "App Store rating", value: "3.1 → 4.6" },
      ],
      gallery: ["/images/northwind-1.svg", "/images/northwind-2.svg"],
    },
  },
  {
    slug: "atlas-analytics",
    name: "Atlas",
    oneLiner: "Making a dense analytics tool feel like a conversation.",
    tags: ["SaaS", "Data Viz", "0→1"],
    year: "2024",
    thumbnail: "/images/atlas-thumb.svg",
    accent: "#5b8def",
    link: { type: "internal" },
    caseStudy: {
      role: "Founding Designer",
      timeline: "9 months · 2024",
      hero: "/images/atlas-hero.svg",
      context:
        "Atlas was a seed-stage analytics startup with strong data infrastructure and a UI that only its founders could navigate. I was the first designer.",
      research: [
        "Shadowed 12 analysts to learn the questions they bring to their data.",
        "Mapped the six-click path to a first insight — and where new users gave up.",
      ],
      designSystem:
        "A charting library with accessible color, sensible defaults, and progressive disclosure so power stayed available without crowding the first run.",
      motion:
        "Query results animate in as they resolve, so the canvas feels like a conversation rather than a page reload.",
      learning:
        "Framing the product around questions instead of charts was the unlock — the same data, finally legible.",
      problem:
        "Atlas had powerful data under the hood and an interface that hid it behind six clicks and a wall of jargon. New users churned before their first insight.",
      process: [
        "Shadowed 12 analysts to learn the questions they actually ask their data.",
        "Reframed the product around questions, not charts — the query builder speaks plain language.",
        "Designed a progressive-disclosure system so power stays available without crowding the first run.",
        "Established a charting library with accessible color and sensible defaults.",
      ],
      solution:
        "A question-first canvas that turns 'show me revenue by region last quarter' into a chart in one line, then lets you drill without losing your place.",
      outcome: [
        { label: "Time to first insight", value: "11m → 90s" },
        { label: "Activation", value: "+52%" },
        { label: "Weekly active teams", value: "3.4×" },
      ],
      gallery: ["/images/atlas-1.svg", "/images/atlas-2.svg"],
    },
  },
  {
    slug: "verdant-mobile",
    name: "Verdant",
    oneLiner: "A carbon-tracking app people open on purpose, not out of guilt.",
    tags: ["Mobile", "Sustainability", "Brand"],
    year: "2024",
    thumbnail: "/images/verdant-thumb.svg",
    accent: "#3fae7a",
    link: { type: "internal" },
    caseStudy: {
      role: "Product & Brand Designer",
      timeline: "4 months · 2024",
      hero: "/images/verdant-hero.svg",
      context:
        "Verdant is a consumer app for tracking personal carbon impact — a category people download with good intentions and delete out of guilt.",
      research: [
        "Studied habit-forming products outside the category for what actually brings people back.",
        "Tested tone: judgemental framing tanked retention; encouragement kept people returning.",
      ],
      designSystem:
        "A warm, tactile identity — rounded forms, optimistic color, and celebratory micro-states — that reads as encouraging rather than preachy.",
      motion:
        "Small wins get small celebrations: a streak tick, a gentle confetti burst — earned, never nagging.",
      learning:
        "Encouragement out-performed guilt on every retention metric. Tone was the product decision that mattered most.",
      problem:
        "Sustainability apps guilt-trip people into deleting them. Verdant needed to make progress feel earned and habitual, not shameful.",
      process: [
        "Studied habit-forming products outside the category for what actually brings people back.",
        "Designed a streak-and-nudge system tuned to encouragement over judgement.",
        "Built a warm, tactile visual identity that reads as optimistic, not preachy.",
      ],
      solution:
        "A daily one-glance snapshot, gentle nudges, and small celebrations that make lower-carbon choices feel like wins instead of homework.",
      outcome: [
        { label: "Day-30 retention", value: "+44%" },
        { label: "Daily opens", value: "2.1×" },
        { label: "Beta NPS", value: "61" },
      ],
      gallery: ["/images/verdant-1.svg", "/images/verdant-2.svg"],
    },
  },
  {
    slug: "helm-design-system",
    name: "Helm",
    oneLiner: "A design system that shipped consistency across nine teams.",
    tags: ["Design System", "Tokens", "Docs"],
    year: "2023",
    thumbnail: "/images/helm-thumb.svg",
    accent: "#b57edc",
    link: { type: "external", href: "https://medium.com" },
  },
  {
    slug: "cadence-scheduling",
    name: "Cadence",
    oneLiner: "Scheduling for teams that live in three time zones.",
    tags: ["Productivity", "0→1", "Web"],
    year: "2023",
    thumbnail: "/images/cadence-thumb.svg",
    accent: "#e8a13f",
    link: { type: "external", href: "https://dribbble.com" },
  },
];

// ------------------------------------------------------------------
// ABOUT
// ------------------------------------------------------------------

export const about = {
  bio: [
    "I design products end to end — research, interaction, visual, and the systems that keep it all coherent as teams grow. I care most about the boring parts that make software feel effortless: the empty state, the error, the second visit.",
    "Before design I studied cognitive science, which is a long way of saying I'm fascinated by why people do what they do in front of a screen — and how a well-placed decision can make the right thing the easy thing.",
  ],
  stats: [
    { label: "Years designing", value: 10, suffix: "+" },
    { label: "Products shipped", value: 40 },
    { label: "Case studies", value: 12 },
    { label: "Teams partnered", value: 18 },
  ] as Stat[],
};

export const tools: Tool[] = [
  { name: "Figma" },
  { name: "Framer" },
  { name: "Principle" },
  { name: "Rive" },
  { name: "Blender" },
  { name: "Spline" },
  { name: "Notion" },
  { name: "Linear" },
  { name: "After Effects" },
  { name: "ProtoPie" },
];

// ------------------------------------------------------------------
// EXPERIENCE / TIMELINE
// ------------------------------------------------------------------

export const experience: Experience[] = [
  {
    company: "Northwind Bank",
    role: "Lead Product Designer",
    period: "2023 — Present",
    description:
      "Leading the redesign of a 4M-user banking app and building the design system that keeps it consistent across platforms.",
  },
  {
    company: "Atlas",
    role: "Founding Designer",
    period: "2021 — 2023",
    description:
      "First designer at a seed-stage analytics startup. Owned product design from zero to Series A and hired the team that followed.",
  },
  {
    company: "Foundry Studio",
    role: "Senior Product Designer",
    period: "2018 — 2021",
    description:
      "Shipped 0→1 products for clients across fintech, health, and climate. Learned to design fast without designing sloppy.",
  },
  {
    company: "Brightside",
    role: "Product Designer",
    period: "2015 — 2018",
    description:
      "Cut my teeth on a consumer app scaling past its first million users — and everything that breaks along the way.",
  },
];

// ------------------------------------------------------------------
// TESTIMONIALS
// ------------------------------------------------------------------

export const testimonials: Testimonial[] = [
  {
    quote:
      "Karthikeyan has the rare gift of making the hard decision look obvious in hindsight. Our activation numbers still haven't come back down.",
    author: "Priya Nair",
    title: "VP Product, Atlas",
  },
  {
    quote:
      "The most senior design thinking I've worked with, wrapped in someone who actually ships. Reset the bar for our whole team.",
    author: "Marcus Bell",
    title: "CEO, Verdant",
  },
  {
    quote:
      "Gave us a design system we could actually build on. Six months later three teams are shipping from it without asking a single question.",
    author: "Lena Vogt",
    title: "Eng Lead, Northwind",
  },
  {
    quote:
      "Sat with our users, came back with the thing we'd been arguing about for a year already solved. Just quietly right.",
    author: "Tobias Frank",
    title: "Head of Product, Cadence",
  },
];

// ------------------------------------------------------------------
// WHY ME / VALUE PROPS
// ------------------------------------------------------------------

export const valueProps: ValueProp[] = [
  {
    title: "Strategy, not decoration",
    description:
      "I start with the business problem and the user's job, then design backwards. Pretty is the byproduct of clear thinking.",
    icon: "compass",
  },
  {
    title: "Systems that scale",
    description:
      "Tokens, components, and docs that let engineers move fast and keep the product coherent as the team grows.",
    icon: "layers",
  },
  {
    title: "Craft in the details",
    description:
      "The empty states, the micro-interactions, the loading moment — the small things that separate 'fine' from 'this feels good'.",
    icon: "spark",
  },
];

// ------------------------------------------------------------------
// FAQ
// ------------------------------------------------------------------

export const faq: FaqItem[] = [
  {
    q: "What kind of work are you looking for?",
    a: "Senior/lead product design roles and focused consulting engagements — ideally 0→1 products or the redesign of something that's outgrown its first version.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Often. I like the ambiguity. If you're pre-product-market-fit and need someone who can research, design, and ship without a big team, that's my favorite spot.",
  },
  {
    q: "Can you work with our engineers?",
    a: "Yes — closely. I design in the browser's grain, hand off clean specs and tokens, and stay in the loop through build. Half my job is making the last mile smooth.",
  },
  {
    q: "What's your availability?",
    a: "I take on one focused engagement at a time. Reach out and I'll tell you honestly when I could start.",
  },
];

// ------------------------------------------------------------------
// CONTACT
// ------------------------------------------------------------------

export const contact = {
  headline: "Let's make something worth shipping.",
  supporting:
    "Have a problem that's been sitting in the too-hard pile? That's usually where the good work is. Tell me about it.",
};
