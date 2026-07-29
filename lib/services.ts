// Single source of truth for Solve Trend's services.
// Consumed by the homepage Services section, the /services index,
// the /services/[slug] detail pages, the hero marquee and the contact form.
//
// Consolidated 2026-07-28 from eight disciplines to five offers. The old list
// named *disciplines* ("Brand Strategy", "Brand Identity & Graphic Design",
// "User Experience Design", "Web Development"…), which read as a capability
// dump rather than something a client buys. Every reference agency that isn't
// running SEO landing pages sells 4–6 bundled offers instead:
//
//   Vertora    — "Brand identity design strategy" / "Visual branding and
//                communication" / "Website design and development" /
//                "Motion graphics and animation"                        (4)
//   Vetora     — Web development / 3D design / 3D visualisation /
//                UI/UX design                                           (4)
//   Awake      — brand / web dev / digital marketing / UI-UX / analytics (5)
//   Lesse      — 8 slugs, but motion + video + photography collapse into
//                a single "visual-content" offer
//   Arounda    — 20+ slugs, but those are per-keyword SEO landing pages,
//                not a menu (their nav shows far fewer)
//
// Two patterns hold across all of them: strategy and identity are always one
// offer, and UX design is always sold with the build rather than beside it.
// The eight disciplines all survive as deliverables and tags below — nothing
// was dropped, it was regrouped.

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
  /**
   * Slugs this offer absorbed in the 8→5 consolidation. Kept so previously
   * shared /services/<slug> links keep resolving instead of 404ing — the
   * detail route still builds a page at each one.
   */
  legacySlugs?: string[];
  /** Single word used by the dark-section marquee, in this offer's accent. */
  marqueeWord: string;
};

export const SERVICES: Service[] = [
  {
    slug: "brand-strategy-identity",
    number: "01",
    name: "Brand Strategy & Identity",
    tagline: "Work out who you are, then look like it.",
    description:
      "Positioning, messaging, and the whole visual system that carries it — strategy and identity as one job.",
    overview:
      "Strategy without identity is a document nobody opens; identity without strategy is decoration. We do both as one engagement — pin down your positioning, your audience, and the story only you can tell, then build the logo, type, colour, and rules that make that story recognisable everywhere it shows up.",
    deliverables: [
      "Positioning and messaging framework",
      "Audience and competitor research",
      "Brand voice and tone guidelines",
      "Logo suite, type, colour, and visual system",
      "Brand guidelines document",
      "Templates for print, social, and pitch decks",
    ],
    process: [
      {
        title: "Discover",
        body: "Interviews, market research, and a hard look at your competitors to find the gap only you can own.",
      },
      {
        title: "Define",
        body: "Positioning, audience, and the core message locked in — the north star everything else is measured against.",
      },
      {
        title: "Design",
        body: "Concept routes grounded in that strategy, developed into a full identity: logo, type, colour, and supporting elements.",
      },
      {
        title: "Systemize",
        body: "Rules, templates, and organised files so it holds up when your team uses it without us.",
      },
    ],
    tags: ["Positioning", "Messaging", "Logo", "Visual Systems", "Print"],
    accent: "#E8341A",
    imageUrl: "/services/brand-strategy-identity.jpg",
    legacySlugs: ["brand-strategy", "brand-identity"],
    marqueeWord: "Brand",
  },
  {
    slug: "web-design-development",
    number: "02",
    name: "Web Design & Development",
    tagline: "Sites people figure out, on a build your team can run.",
    description:
      "Research, UX, and the build itself — fast, accessible sites in React or Webflow that your team can actually update.",
    overview:
      "Design and build belong in the same room. We research who's using it, wireframe and prototype the flows, then build the thing — in React/Next.js when you need custom, or Webflow when you want to edit it yourself. You get an interface people understand and a codebase that stays fast, accessible, and easy to change.",
    deliverables: [
      "User flows, wireframes, and clickable prototypes",
      "UI design and a component library",
      "Custom build in React/Next.js or Webflow",
      "CMS setup your team can manage",
      "Performance, SEO, and accessibility pass",
      "Analytics and integrations wired in",
    ],
    process: [
      {
        title: "Research",
        body: "We map who's using it, what they came for, and what gets in their way today.",
      },
      {
        title: "Structure",
        body: "Flows, wireframes, and prototypes you can test with real people before a line of code.",
      },
      {
        title: "Build",
        body: "Component-based development off a design system, with performance and accessibility baked in.",
      },
      {
        title: "Launch",
        body: "QA, deploy, and a handoff so you can update content without us.",
      },
    ],
    tags: ["UX/UI", "Prototyping", "React", "Next.js", "Webflow", "CMS"],
    accent: "#1A3DE8",
    imageUrl: "/projects/web-development-hero.jpg",
    legacySlugs: ["ux-design", "web-development"],
    marqueeWord: "Web",
  },
  {
    slug: "motion-video",
    number: "03",
    name: "Motion & Video",
    tagline: "Everything that moves, from a logo sting to a brand film.",
    description:
      "Animation, explainers, commercials, and social cut-downs — one team for everything that isn't a still image.",
    overview:
      "Some ideas only land when they move. We cover the whole moving-image side: animated explainers and kinetic type, logo and brand motion kits, plus full video production and edit — brand films, commercials, and short-form reels cut with the pacing, colour, and sound that make people stop scrolling.",
    deliverables: [
      "Animated explainers and product demos",
      "Logo animation and brand motion kit",
      "Kinetic typography and social cut-downs",
      "Commercials and brand films",
      "Colour grading and sound design",
      "Every aspect ratio your channels need, plus source files",
    ],
    process: [
      {
        title: "Script & board",
        body: "We nail the message and storyboard it before a single frame is animated or shot.",
      },
      {
        title: "Style frames",
        body: "Design directions so you know exactly how it'll look before we commit motion.",
      },
      {
        title: "Produce",
        body: "Animation and edit built for story and pacing first, tuned to the platform it lives on.",
      },
      {
        title: "Finish",
        body: "Colour, sound, graphics, and captions — then delivered in every format you need.",
      },
    ],
    tags: ["Animation", "Explainers", "Kinetic Type", "Commercials", "Reels", "Colour"],
    accent: "#ED649E",
    imageUrl: "/services/motion-video.jpg",
    legacySlugs: ["motion-graphics", "video-production"],
    marqueeWord: "Motion",
  },
  {
    slug: "ecommerce",
    number: "04",
    name: "eCommerce",
    tagline: "Stores built to convert, not just to launch.",
    description: "Shopify and WooCommerce storefronts built around the buying journey, not launch day.",
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
    marqueeWord: "eCommerce",
  },
  {
    slug: "custom-software-ai",
    number: "05",
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
    marqueeWord: "AI",
  },
];

/** Every slug the detail route should build a page for, legacy ones included. */
export const ALL_SERVICE_SLUGS: string[] = SERVICES.flatMap((s) => [
  s.slug,
  ...(s.legacySlugs ?? []),
]);

export function getService(slug: string): Service | undefined {
  return SERVICES.find(
    (s) => s.slug === slug || (s.legacySlugs ?? []).includes(slug)
  );
}
