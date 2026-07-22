export type ProjectStat = {
  label: string;
  value: string;
};

export type ShowcaseProject = {
  id: string;
  category: string;
  title: string;
  description: string;
  stats: [ProjectStat, ProjectStat];
  /** Path under /public. Rendered as a video when it ends in .mp4. */
  media: string;
  /** Accent used for the category tag, stat numbers and media-panel wash. */
  accent: string;
  accentSoft: string;
};

/**
 * Six capability showcases powered by the real slide-animation assets in
 * public/projects. Stats are framed as scope/timeline facts (not invented
 * client metrics) so every card stays honest for a showcase.
 */
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "brand-strategy",
    category: "Brand Strategy",
    title: "Positioning that actually sticks",
    description:
      "We dig into the market, the audience, and the ambition — then shape a story and a strategy the whole business can rally behind.",
    stats: [
      { label: "Engagement", value: "Brand sprint" },
      { label: "Turnaround", value: "2–3 wks" },
    ],
    media: "/projects/brand-strategy.mp4",
    accent: "#E8341A",
    accentSoft: "rgba(232, 52, 26, 0.12)",
  },
  {
    id: "brand-identity",
    category: "Brand Identity",
    title: "Identities with real range",
    description:
      "Logos, type, colour, and a system that flexes everywhere — from a favicon to a billboard — without ever losing the plot.",
    stats: [
      { label: "Deliverable", value: "Full system" },
      { label: "Formats", value: "Print + digital" },
    ],
    media: "/projects/brand-identity.jpg",
    accent: "#F2A23B",
    accentSoft: "rgba(242, 162, 59, 0.14)",
  },
  {
    id: "web-development",
    category: "Web Development",
    title: "Sites built to convert",
    description:
      "Fast, responsive, pixel-tight builds — designed to look sharp and engineered to load quick and turn visitors into customers.",
    stats: [
      { label: "Stack", value: "Modern web" },
      { label: "Performance", value: "Speed-first" },
    ],
    media: "/projects/web-development.png",
    accent: "#5196FD",
    accentSoft: "rgba(81, 150, 253, 0.14)",
  },
  {
    id: "ecommerce",
    category: "E-Commerce",
    title: "Storefronts that sell",
    description:
      "Product pages, carts, and checkouts tuned for the one thing that matters — a buying experience that feels effortless.",
    stats: [
      { label: "Focus", value: "Conversion" },
      { label: "Scope", value: "Storefront" },
    ],
    media: "/projects/ecommerce.png",
    accent: "#764BA2",
    accentSoft: "rgba(118, 75, 162, 0.14)",
  },
  {
    id: "motion",
    category: "Motion",
    title: "Motion that moves people",
    description:
      "Micro-interactions, product reels, and brand animation that give the work a pulse and make people stop scrolling.",
    stats: [
      { label: "Output", value: "Reels + UI" },
      { label: "Delivery", value: "Launch-ready" },
    ],
    media: "/projects/motion.mp4",
    accent: "#ED649E",
    accentSoft: "rgba(237, 100, 158, 0.14)",
  },
  {
    id: "ai-automation",
    category: "AI Automation",
    title: "Workflows on autopilot",
    description:
      "We wire AI and automation into the day-to-day — so the busywork runs itself and your team spends its time where it counts.",
    stats: [
      { label: "Built with", value: "AI + automation" },
      { label: "Result", value: "Hours saved" },
    ],
    media: "/projects/ai-automation.mp4",
    accent: "#22D3EE",
    accentSoft: "rgba(34, 211, 238, 0.14)",
  },
];
