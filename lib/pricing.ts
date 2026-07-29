// Single source of truth for the standalone /pricing page. Kept separate
// from the homepage PricingSection's inline TIERS so this page can't be
// destabilized by changes to that section's GSAP/animation wiring.

export type PricingTier = {
  slug: string;
  name: string;
  tagline: string;
  level: string;
  price: number | null;
  priceLabel?: string;
  billing: string;
  description: string;
  features: string[];
  cta: string;
  accent: string;
  featured?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    slug: "launch",
    name: "Launch",
    tagline: "Everything to go from zero to live",
    level: "Starter",
    price: 3000,
    billing: "Monthly · CAD",
    description:
      "Brand, website, and your first push into the world — all in one package.",
    features: [
      "Brand identity & logo design",
      "Brand guidelines document",
      "Custom website — design & development",
      "Social media marketing (3 months)",
    ],
    cta: "Start your launch",
    accent: "#E8341A",
  },
  {
    slug: "growth",
    name: "Growth",
    tagline: "For teams ready to keep the momentum",
    level: "Most popular",
    price: 5000,
    billing: "Monthly · CAD",
    description: "You've launched. Now let's keep the wins coming.",
    features: [
      "Everything in Launch",
      "Ongoing social media support",
      "Continuous marketing & campaign optimization",
      "Monthly performance reporting",
    ],
    cta: "Keep growing",
    accent: "#F2A23B",
    featured: true,
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    tagline: "When your ambitions outgrow a template",
    level: "Custom",
    price: null,
    priceLabel: "Custom",
    billing: "Custom · CAD",
    description:
      "Bigger scope, bigger stakes — a plan built around exactly what you need.",
    features: [
      "Custom scope & deliverables",
      "Multi-brand and multi-market support",
      "Dedicated account lead",
      "Data & AI integrations",
    ],
    cta: "Book a call",
    accent: "#12B5C9",
  },
];

export type PricingFaqItem = {
  question: string;
  answer: string;
};

export const PRICING_FAQ: PricingFaqItem[] = [
  {
    question: "Do you offer project-based pricing instead of monthly?",
    answer:
      "Yes. The tiers above are monthly engagements, but a lot of work — a brand identity, a single website build, a motion piece — is scoped and billed as a fixed-price project instead. Tell us what you need and we'll quote it the way that makes sense.",
  },
  {
    question: "What determines the final price?",
    answer:
      "Scope, timeline, and how many disciplines are involved. A landing page and a full eCommerce rebuild aren't the same job, so every quote follows a short discovery call — no fixed-price guesswork on our end or yours.",
  },
  {
    question: "Can I start with one service and add more later?",
    answer:
      "Most clients do. It's common to start with Brand Strategy or Web Development, then layer in Custom Software & AI Automation once the foundation is live. Packages are a starting point, not a ceiling.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "Launch and Growth are month-to-month — no lock-in contract. Enterprise engagements are scoped with the timeline that fits the work, agreed upfront.",
  },
];
