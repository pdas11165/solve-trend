// Single source of truth for Solve Trend's services.
// Consumed by the homepage Services section, the /services index,
// and the /services/[slug] detail pages.

export type ServiceStep = {
  title: string;
  body: string;
};

export type Service = {
  slug: string;
  number: string;
  /** Short display name used in lists and nav. */
  name: string;
  /** One-line hook shown under the name. */
  tagline: string;
  /** Short description used on the homepage hover list. */
  description: string;
  /** Longer intro paragraph for the detail-page hero. */
  overview: string;
  /** Bullet outcomes — what the client actually walks away with. */
  deliverables: string[];
  /** How an engagement runs, start to finish. */
  process: ServiceStep[];
  /** Chips shown on cards and detail hero. */
  tags: string[];
  accent: string;
  imageUrl: string;
};

export const SERVICES: Service[] = [
  {
    slug: "brand-strategy",
    number: "01",
    name: "Brand Strategy",
    tagline: "Figure out who you are before you tell everyone.",
    description:
      "We figure out who you are, who's listening, and how to make them care.",
    overview:
      "Strategy is the work that makes everything after it cheaper and sharper. We pin down your positioning, your audience, and the story only you can tell — so every design, ad, and automation downstream pulls in the same direction instead of fighting each other.",
    deliverables: [
      "Positioning and messaging framework",
      "Audience and competitor research",
      "Brand voice and tone guidelines",
      "Campaign and go-to-market direction",
    ],
    process: [
      {
        title: "Discover",
        body: "Interviews, market research, and a hard look at your competitors to find the gap only you can own.",
      },
      {
        title: "Define",
        body: "We lock in positioning, audience, and the core message — the north star everything else is measured against.",
      },
      {
        title: "Articulate",
        body: "Voice, tone, and messaging pillars written down so your whole team sounds like one company.",
      },
      {
        title: "Activate",
        body: "A campaign direction you can actually run, with the priorities sequenced for impact.",
      },
    ],
    tags: ["Positioning", "Research", "Messaging", "Campaigns"],
    accent: "#E8341A",
    imageUrl: "/projects/brand-strategy-poster.jpg",
  },
  {
    slug: "brand-identity",
    number: "02",
    name: "Brand Identity & Graphic Design",
    tagline: "A look that's unmistakably yours.",
    description:
      "A look that's unmistakably yours — logo, visual system, and everything it touches.",
    overview:
      "Your identity is the fastest signal of whether you're serious. We build a complete visual system — logo, type, color, and the rules that hold it together — so you show up consistent everywhere, from a pitch deck to a storefront to a social post.",
    deliverables: [
      "Logo suite and wordmark",
      "Color, typography, and visual system",
      "Brand guidelines document",
      "Templates for print and social",
    ],
    process: [
      {
        title: "Explore",
        body: "Mood direction and concept routes grounded in your strategy — not just what looks nice.",
      },
      {
        title: "Design",
        body: "We develop the strongest route into a full identity: logo, type, color, and supporting elements.",
      },
      {
        title: "Systemize",
        body: "Everything gets rules and templates so it holds up when your team uses it without us.",
      },
      {
        title: "Hand off",
        body: "Organized files and a guidelines doc so nothing gets lost or misused later.",
      },
    ],
    tags: ["Logo", "Visual Systems", "Packaging", "Print"],
    accent: "#F2A23B",
    imageUrl: "/projects/brand-identity-hero.jpg",
  },
  {
    slug: "motion-graphics",
    number: "03",
    name: "Motion Graphics & Animation",
    tagline: "Movement that makes people actually finish the video.",
    description:
      "Movement that explains, delights, and makes people actually finish the video.",
    overview:
      "Some ideas only land when they move. We turn static brands and dense concepts into animation that explains fast and holds attention — product explainers, kinetic type, animated logos, and social-first motion built for the feed.",
    deliverables: [
      "Animated explainers and product demos",
      "Logo animation and brand motion kit",
      "Kinetic typography and social cut-downs",
      "Source files and reusable motion presets",
    ],
    process: [
      {
        title: "Script & board",
        body: "We nail the message and storyboard it before a single frame is animated.",
      },
      {
        title: "Style frames",
        body: "Design directions so you know exactly how it'll look before we commit motion.",
      },
      {
        title: "Animate",
        body: "Frame-by-frame craft with pacing tuned for the platform it lives on.",
      },
      {
        title: "Deliver",
        body: "Every format and aspect ratio you need, plus the source files.",
      },
    ],
    tags: ["Motion", "Animation", "Explainers", "Kinetic Type"],
    accent: "#ED649E",
    imageUrl: "/projects/motion-poster.jpg",
  },
  {
    slug: "video-production",
    number: "04",
    name: "Video Editing & Production",
    tagline: "From raw footage to something worth sharing.",
    description:
      "From raw footage to something worth sharing — commercials, reels, and everything between.",
    overview:
      "Whether you shoot it or we do, we turn footage into video that performs — brand films, commercials, and short-form reels edited with the pacing, color, and sound that make people stop scrolling.",
    deliverables: [
      "Commercials and brand films",
      "Short-form reels and social cut-downs",
      "Color grading and sound design",
      "Multi-format exports for every channel",
    ],
    process: [
      {
        title: "Plan",
        body: "Shot list, story, and deliverables agreed up front so the edit has everything it needs.",
      },
      {
        title: "Assemble",
        body: "We build the cut for story and pacing before polishing anything.",
      },
      {
        title: "Finish",
        body: "Color, sound, graphics, and captions — the details that make it feel premium.",
      },
      {
        title: "Package",
        body: "Delivered in every ratio and format your channels need.",
      },
    ],
    tags: ["Commercials", "Reels", "Color Grading", "Sound"],
    accent: "#764BA2",
    imageUrl: "/services/video-production.jpg",
  },
  {
    slug: "ux-design",
    number: "05",
    name: "User Experience Design",
    tagline: "Interfaces people figure out without a manual.",
    description:
      "Interfaces people figure out without a manual — wireframed, prototyped, and built to scale.",
    overview:
      "Good UX is invisible — people just get what they came for. We research, wireframe, and prototype interfaces for web apps, dashboards, and products, then hand engineering a design system that scales instead of a pile of one-off screens.",
    deliverables: [
      "User flows and wireframes",
      "Interactive prototypes",
      "UI design and component library",
      "Design system and handoff specs",
    ],
    process: [
      {
        title: "Research",
        body: "We map who's using it and what actually gets in their way today.",
      },
      {
        title: "Structure",
        body: "Flows and wireframes to get the logic right before any visual polish.",
      },
      {
        title: "Prototype",
        body: "Clickable prototypes you can test with real people before a line of code.",
      },
      {
        title: "Systemize",
        body: "A component library and specs engineering can build from directly.",
      },
    ],
    tags: ["UX/UI", "Wireframes", "Prototyping", "Design Systems"],
    accent: "#5196FD",
    imageUrl: "/services/ux-design.jpg",
  },
  {
    slug: "web-development",
    number: "06",
    name: "Web Development",
    tagline: "Fast, sturdy sites your team can actually update.",
    description:
      "Fast, sturdy sites your team can actually update — built in React or Webflow, your call.",
    overview:
      "We build sites that are fast, accessible, and easy for your team to run — in React/Next.js when you need custom, or Webflow when you want to edit it yourself. Clean code, real performance, and a CMS you won't be afraid to touch.",
    deliverables: [
      "Custom website in React/Next.js or Webflow",
      "CMS setup your team can manage",
      "Performance, SEO, and accessibility pass",
      "Analytics and integrations wired in",
    ],
    process: [
      {
        title: "Scope",
        body: "Pages, features, and the right stack for how your team works.",
      },
      {
        title: "Build",
        body: "Component-based development with performance and accessibility baked in.",
      },
      {
        title: "Connect",
        body: "CMS, forms, analytics, and any tools you already run — wired together.",
      },
      {
        title: "Launch",
        body: "QA, deploy, and a handoff so you can update content without us.",
      },
    ],
    tags: ["React", "Next.js", "Webflow", "CMS"],
    accent: "#1A3DE8",
    imageUrl: "/projects/web-development-hero.jpg",
  },
  {
    slug: "ecommerce",
    number: "07",
    name: "eCommerce Solutions",
    tagline: "Stores built to convert, not just to launch.",
    description: "Stores built to convert, not just to look nice on launch day.",
    overview:
      "A store is only as good as its checkout. We build and optimize Shopify and WooCommerce storefronts around the buying journey — fast, clear, and tuned to turn browsers into orders, with the back-office automations to match.",
    deliverables: [
      "Shopify or WooCommerce storefront",
      "Conversion-focused product and checkout UX",
      "Payments, shipping, and inventory setup",
      "Post-purchase and abandoned-cart automations",
    ],
    process: [
      {
        title: "Plan",
        body: "Catalog, platform, and the buying journey mapped end to end.",
      },
      {
        title: "Build",
        body: "Storefront designed and built around conversion, not just aesthetics.",
      },
      {
        title: "Automate",
        body: "Email flows, inventory syncs, and order ops so the store runs itself.",
      },
      {
        title: "Optimize",
        body: "Launch, measure, and tune the funnel where the drop-off actually is.",
      },
    ],
    tags: ["Shopify", "WooCommerce", "Checkout", "Automations"],
    accent: "#0E9F6E",
    imageUrl: "/projects/ecommerce-hero.jpg",
  },
  {
    slug: "custom-software-ai",
    number: "08",
    name: "Custom Software & AI Automation",
    tagline: "The internal tools, CRMs, and AI that run your business.",
    description:
      "Custom CRMs, internal tools, and AI automations that do the busywork your team shouldn't.",
    overview:
      "This is where strategy turns into systems. We build the custom software that runs your operation — CRMs tailored to your pipeline, internal dashboards and tools, integrations that stitch your stack together, and AI automations that handle the repetitive work so your team spends its time where it counts. Whether you need to replace a tangle of spreadsheets or add an AI layer on top of what you already use, we scope it to your workflow — not a template.",
    deliverables: [
      "Custom CRM built around your pipeline and data",
      "Internal tools, dashboards, and admin portals",
      "Integrations between the tools you already use",
      "AI automations: lead enrichment, scoring, summaries, follow-up drafting",
      "AI assistants and chatbots trained on your business",
      "Ongoing support, hosting, and iteration",
    ],
    process: [
      {
        title: "Discover",
        body: "We map how your business actually works today — the tools, the handoffs, and where time leaks — then decide what to build custom versus configure on a platform.",
      },
      {
        title: "Scope & prototype",
        body: "A phased plan with a clear v1: the core objects, workflows, and the one or two AI automations that pay for themselves first.",
      },
      {
        title: "Build & integrate",
        body: "We build the CRM or tool, wire in your email, calendar, payments, and existing systems, and layer AI where it removes real work.",
      },
      {
        title: "Launch & iterate",
        body: "Data migrated, your team trained, and the system live — then we keep tuning it as you grow.",
      },
    ],
    tags: ["Custom CRM", "Internal Tools", "Integrations", "AI Agents", "Workflows"],
    accent: "#12B5C9",
    imageUrl: "/services/custom-software-ai.jpg",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
