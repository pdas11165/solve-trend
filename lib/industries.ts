// Industries strip (designmonks-style stacked cards). One featured
// engagement per industry. Media are placeholders from public/projects/
// until real per-industry case shots land — swap `media` (and copy) freely.

export type IndustryCase = {
  id: string;
  /** Industry label shown in the card's collapsed header. */
  industry: string;
  title: string;
  description: string;
  scopeLabel: string;
  scope: string;
  durationLabel: string;
  duration: string;
  /** Client chip under the copy. */
  client: { name: string; role: string; initials: string };
  /** Placeholder still. */
  media: string;
  mediaAlt: string;
  /** Pastel surface + saturated media-well tints for this card. */
  tint: { surface: string; well: string; chip: string };
};

export const INDUSTRY_CASES: IndustryCase[] = [
  {
    id: "saas",
    industry: "SaaS",
    title: "A booking platform rebuilt around its users",
    description:
      "Rosemont's scheduling product had the features and lost the flow. We rebuilt the core journeys from support tickets up — onboarding, booking, and billing — so the product finally works the way customers assumed it always did.",
    scopeLabel: "Project scope",
    scope: "Product Design",
    durationLabel: "Project duration",
    duration: "10 Weeks",
    client: { name: "Rosemont", role: "Booking & scheduling SaaS", initials: "RM" },
    media: "/projects/rosemont-app.jpg",
    mediaAlt: "Rosemont booking app screens",
    tint: { surface: "#C6CFFF", well: "#9AABFF", chip: "#9AABFF" },
  },
  {
    id: "ecommerce",
    industry: "eCommerce & Retail",
    title: "A storefront rebuilt around the checkout",
    description:
      "Aeron's audio store looked premium and converted like a brochure. We rebuilt the funnel from product page to payment, cut the steps that were losing carts, and matched the storefront to the hardware it sells.",
    scopeLabel: "Work scope",
    scope: "eCommerce Build",
    durationLabel: "Project duration",
    duration: "8 Weeks",
    client: { name: "Aeron", role: "Consumer audio brand", initials: "AE" },
    media: "/projects/aeron-headphones.jpg",
    mediaAlt: "Aeron headphones product imagery",
    tint: { surface: "#FFB8B0", well: "#FE8F83", chip: "#FE8F83" },
  },
  {
    id: "food-beverage",
    industry: "Food & Beverage",
    title: "Packaging that earns the second look",
    description:
      "Avelune came to us as a recipe and a name. We built the identity and packaging system that got it onto shelves — and made sure the brand survives every SKU, bag, and box that comes next.",
    scopeLabel: "Project scope",
    scope: "Brand & Packaging",
    durationLabel: "Project duration",
    duration: "6 Weeks",
    client: { name: "Avelune", role: "Specialty food brand", initials: "AV" },
    media: "/projects/avelune-packaging.jpg",
    mediaAlt: "Avelune packaging system",
    tint: { surface: "#FBE8A4", well: "#F7BB48", chip: "#F7BB48" },
  },
  {
    id: "security",
    industry: "Security Services",
    title: "A field operation run from one dashboard",
    description:
      "A security firm was coordinating guards, sites, and reports over phone calls and spreadsheets. We shipped a custom CRM that put scheduling, incident reporting, and client billing in one place — built around their pipeline, not a template.",
    scopeLabel: "Work scope",
    scope: "Custom Software & AI",
    durationLabel: "Project duration",
    duration: "12 Weeks",
    client: { name: "BSSI", role: "Security services firm", initials: "BS" },
    media: "/projects/web-development.png",
    mediaAlt: "Operations dashboard interface",
    tint: { surface: "#ABF5FF", well: "#76EBFB", chip: "#76EBFB" },
  },
  {
    id: "media",
    industry: "Media & Entertainment",
    title: "An explainer that got watched to the end",
    description:
      "Ninety seconds of motion that carries a whole pitch. Script, boards, animation, and sound — cut for the feed first, the boardroom second, and re-versioned for every placement that mattered.",
    scopeLabel: "Project scope",
    scope: "Motion & Video",
    durationLabel: "Project duration",
    duration: "4 Weeks",
    client: { name: "Solve Trend Studio", role: "In-house production", initials: "ST" },
    media: "/projects/motion-still.jpg",
    mediaAlt: "Motion graphics still frame",
    tint: { surface: "#C9FFF7", well: "#57E6D8", chip: "#57E6D8" },
  },
];
