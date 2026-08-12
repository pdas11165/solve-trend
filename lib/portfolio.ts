// Case-study content. Powers both the standalone /projects page and the
// homepage's Selected Work rows (ProjectsSection renders the first four).

export type PortfolioCaseStudy = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  outcome: string;
  image: string;
  imageAlt: string;
  accent: string;
  relatedService: string;
};

export const PORTFOLIO_CASE_STUDIES: PortfolioCaseStudy[] = [
  {
    slug: "brand-strategy",
    category: "Brand Strategy",
    title: "Positioning that gives every later decision a shortcut",
    summary:
      "A research-driven positioning sprint — competitor audit, audience interviews, and a messaging framework — for a founder who needed to explain the business in one sentence before raising a seed round.",
    outcome: "Result: a pitch, a website, and a sales deck that finally agreed with each other.",
    image: "/projects/brand-strategy-poster.jpg",
    imageAlt: "Brand strategy workshop moodboard and positioning framework",
    accent: "#E8341A",
    relatedService: "brand-strategy",
  },
  {
    slug: "brand-identity",
    category: "Brand Identity & Graphic Design",
    title: "A visual system built to survive a rebrand's first year",
    summary:
      "Full identity system — wordmark, color, type, and usage guidelines — designed to hold up across a pitch deck, a storefront, and a Series A landing page without a redesign every quarter.",
    outcome: "Result: one guidelines doc the whole team could apply without us in the room.",
    image: "/projects/brand-identity-hero.jpg",
    imageAlt: "Brand identity system showing logo, color palette and type specimens",
    accent: "#F2A23B",
    relatedService: "brand-identity",
  },
  {
    slug: "web-development",
    category: "Web Development",
    title: "A marketing site that outran the old CMS on every metric",
    summary:
      "Migrated a slow WordPress marketing site to a component-based React/Next.js build, with the CMS handoff and analytics wired in so the client's team could publish without a dev ticket.",
    outcome: "Result: faster load times, a real design system, and zero dev-team bottleneck on content.",
    image: "/projects/web-development-hero.jpg",
    imageAlt: "Responsive website mockups across desktop and mobile",
    accent: "#1A3DE8",
    relatedService: "web-development",
  },
  {
    slug: "ecommerce",
    category: "eCommerce Solutions",
    title: "A storefront rebuilt around the checkout, not the homepage",
    summary:
      "Shopify storefront rebuild focused on product-page clarity and a shorter checkout path, plus abandoned-cart and post-purchase automations to recover revenue the old store was leaving on the table.",
    outcome: "Result: a measurably shorter path from product page to completed order.",
    image: "/projects/ecommerce-hero.jpg",
    imageAlt: "eCommerce storefront product and checkout screens",
    accent: "#0E9F6E",
    relatedService: "ecommerce",
  },
  {
    slug: "motion-graphics",
    category: "Motion Graphics & Animation",
    title: "An explainer that got watched to the end",
    summary:
      "Script, storyboard, and animate — a 60-second product explainer plus a kit of social cut-downs, built so the same core animation could be resized for every platform without a re-shoot.",
    outcome: "Result: one animated core asset repurposed across five formats.",
    image: "/projects/motion-poster.jpg",
    imageAlt: "Motion graphics storyboard and animated kinetic type frames",
    accent: "#ED649E",
    relatedService: "motion-graphics",
  },
  {
    slug: "video-production",
    category: "Video Editing & Production",
    title: "Raw footage turned into a brand film that didn't feel like an ad",
    summary:
      "Edited and color-graded a founder-shot brand film — pacing, sound design, and captions — into something that held attention on social instead of getting scrolled past.",
    outcome: "Result: one long-form film cut into six platform-native edits.",
    image: "/services/video-production.jpg",
    imageAlt: "Video editing timeline with color grading in progress",
    accent: "#764BA2",
    relatedService: "video-production",
  },
  {
    slug: "ux-design",
    category: "User Experience Design",
    title: "A dashboard rebuilt from the support tickets, not a wireframe kit",
    summary:
      "Research, wireframes, and a clickable prototype for an internal dashboard — designed around where users actually got stuck, then handed to engineering as a component library, not a pile of screenshots.",
    outcome: "Result: fewer support tickets about \"where do I find X\" within the first month.",
    image: "/services/ux-design.jpg",
    imageAlt: "UX wireframes and prototype screens for a dashboard interface",
    accent: "#5196FD",
    relatedService: "ux-design",
  },
  {
    slug: "custom-software-ai",
    category: "Custom Software & AI Automation",
    title: "A CRM shaped around the pipeline, not a template",
    summary:
      "Replaced a spreadsheet-and-sticky-notes sales process with a custom CRM built around the client's actual pipeline stages, plus an AI layer that drafts follow-up emails and scores incoming leads.",
    outcome: "Result: hours of manual data entry and follow-up drafting removed every week.",
    image: "/projects/ai-automation-poster.jpg",
    imageAlt: "Custom CRM dashboard with AI-assisted lead scoring",
    accent: "#12B5C9",
    relatedService: "custom-software-ai",
  },
];
