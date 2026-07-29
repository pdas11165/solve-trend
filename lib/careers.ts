// Single source of truth for Solve Trend's open roles.
// Consumed by /careers, /careers/[slug], the homepage hiring strip, the
// application form's role picker, and the sitemap.
//
// To post a role: add an entry with status "open" and redeploy. To retire one
// without losing the copy: flip its status to "closed" — it disappears from
// every surface but the entry stays around for next time.

export type JobPosting = {
  slug: string;
  title: string;
  department: string;
  /** e.g. "Remote (Canada)" or "Charlottetown, PEI — Hybrid" */
  location: string;
  employmentType: string;
  compensation?: string;
  /** ISO date, e.g. "2026-07-28" */
  postedAt: string;
  status: "open" | "closed";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
};

export const JOB_POSTINGS: JobPosting[] = [
  {
    slug: "full-stack-engineer",
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (Canada)",
    employmentType: "Full-time",
    postedAt: "2026-07-28",
    status: "open",
    summary:
      "Build the custom software we ship for clients — internal tools, CRMs, integrations, and the AI automation layered on top. You'll own features end to end, from the data model to the interface a client actually uses.",
    responsibilities: [
      "Ship client-facing features across the stack — TypeScript, React, Next.js, and Postgres.",
      "Design data models and APIs for internal tools and custom CRMs.",
      "Wire up third-party integrations and AI automation where it earns its keep.",
      "Review your own work like a client will: performance, accessibility, and edge cases included.",
    ],
    requirements: [
      "2+ years building and shipping production web applications.",
      "Strong TypeScript and React; comfortable in a modern framework like Next.js.",
      "Working knowledge of relational databases and API design.",
      "You can scope your own work and communicate trade-offs in plain language.",
    ],
    niceToHave: [
      "Experience with LLM APIs or automation platforms.",
      "Agency or client-services background.",
    ],
  },
  {
    slug: "brand-designer",
    title: "Brand & Digital Designer",
    department: "Design",
    location: "Remote (Canada)",
    employmentType: "Full-time",
    postedAt: "2026-07-28",
    status: "open",
    summary:
      "Own the visual side of client work — identity systems, web design, and the motion that makes them feel alive. You'll be designing for real launches, not moodboards that go nowhere.",
    responsibilities: [
      "Develop brand identities: logo systems, type, colour, and the guidelines that hold them together.",
      "Design responsive web and product interfaces that hand off cleanly to engineering.",
      "Produce motion and social assets that extend the brand past the website.",
      "Present and defend your work directly to clients.",
    ],
    requirements: [
      "A portfolio showing brand identity and web work you took to launch.",
      "Fluency in Figma; strong typography and layout fundamentals.",
      "You design with implementation in mind — real content, real constraints.",
    ],
    niceToHave: [
      "Motion design (After Effects, Rive, or similar).",
      "Some front-end literacy — enough to talk to engineers in their terms.",
    ],
  },
];

export const OPEN_ROLES = JOB_POSTINGS.filter((role) => role.status === "open");

export const IS_HIRING = OPEN_ROLES.length > 0;

export function getJobPosting(slug: string): JobPosting | undefined {
  return JOB_POSTINGS.find((role) => role.slug === slug);
}

export const GENERAL_APPLICATION = "General application";

/** Valid values for the application form's role field — also enforced server-side. */
export const APPLICATION_ROLE_OPTIONS: string[] = [
  ...OPEN_ROLES.map((role) => role.title),
  GENERAL_APPLICATION,
];

export const EXPERIENCE_OPTIONS = [
  "0–1 years",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
] as const;

export type ExperienceOption = (typeof EXPERIENCE_OPTIONS)[number];

/** Resume upload limits — enforced client-side for UX and server-side for real. */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const RESUME_ACCEPT_ATTR = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
