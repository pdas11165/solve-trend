// The hero marquee's own strip. Deliberately NOT derived from lib/services.ts.
//
// It used to map over SERVICES, which gave five tiles for a track that needs
// enough width to fill a loop — so the strip visibly repeated itself twice per
// pass. More importantly, five *offers* is the wrong vocabulary for a hero: the
// tiles here are named for **disciplines**, which are narrower than what a
// client buys. "App Development" and "UI / UX Design" both roll up to the one
// Web Design & Development offer; naming them separately lets the strip say
// fourteen specific things without implying a sixth service exists.
//
// `parent` is the offer each discipline belongs to. It isn't rendered today —
// it's here so the mapping stays explicit and reviewable when someone
// inevitably asks why the hero lists more things than /services does.

export type HeroTile = {
  num: string;
  /** Discipline shown on the tile. Narrower than an offer — see note above. */
  name: string;
  /** The offer in lib/services.ts this discipline rolls up to. */
  parent: string;
  /** Path under /public. Poster frame when `video` is set. */
  img: string;
  accent: string;
  /**
   * `object-position` for sources wider than the 9:16 tile, where a centre
   * crop would land on the wrong part of the frame. Omit to centre.
   */
  position?: string;
  /** Looping clip. Only Brand Strategy carries one — see HeroMarquee. */
  video?: string;
};

export const HERO_TILES: HeroTile[] = [
  {
    num: "01",
    name: "App Development",
    parent: "web-design-development",
    img: "/projects/rosemont-app.jpg",
    accent: "#E8341A",
  },
  {
    num: "02",
    name: "UI / UX Design",
    parent: "web-design-development",
    img: "/blog/where-ai-automation-actually-pays-off.jpg",
    accent: "#12B5C9",
    // 1.75:1 source in a 0.5625 tile shows ~32% of the width. Centred, that
    // slices a callout label in half; 82% frames the torus, node, one whole
    // callout and the capsule with no cut text.
    position: "82% center",
  },
  {
    num: "03",
    name: "Packaging Design",
    parent: "brand-strategy-identity",
    img: "/projects/avelune-packaging.jpg",
    accent: "#F2A23B",
  },
  {
    num: "04",
    name: "Web Development",
    parent: "web-design-development",
    img: "/projects/web-development-hero.jpg",
    accent: "#1A3DE8",
  },
  {
    num: "05",
    name: "Brand Strategy",
    parent: "brand-strategy-identity",
    // The loop's own first frame, not the service card's image — see
    // HeroMarquee for why the poster is decoupled from lib/services.ts.
    img: "/projects/brand-strategy-poster.jpg",
    accent: "#E8341A",
    video: "/projects/brand-strategy-loop.mp4",
  },
  {
    num: "06",
    name: "Motion Graphics",
    parent: "motion-video",
    img: "/hero/10-motion-figure.jpg",
    accent: "#12B5C9",
  },
  {
    num: "07",
    name: "Product Branding",
    parent: "brand-strategy-identity",
    img: "/projects/aeron-headphones.jpg",
    accent: "#5196FD",
  },
  {
    num: "08",
    name: "eCommerce",
    parent: "ecommerce",
    img: "/projects/ecommerce-hero.jpg",
    accent: "#0E9F6E",
  },
  {
    num: "09",
    name: "Video Production",
    parent: "motion-video",
    img: "/hero/11-liquid-drop.jpg",
    accent: "#F2A23B",
  },
  {
    num: "10",
    name: "Creative Direction",
    parent: "brand-strategy-identity",
    img: "/hero/12-portrait-red-wash.jpg",
    accent: "#E8341A",
  },
  {
    num: "11",
    name: "AI Automation",
    parent: "custom-software-ai",
    img: "/services/web-design-development.jpg",
    accent: "#12B5C9",
  },
  {
    num: "12",
    name: "3D & Visualisation",
    parent: "motion-video",
    img: "/hero/07-glass-torus.jpg",
    accent: "#0E9F6E",
  },
  {
    num: "13",
    name: "Art Direction",
    parent: "brand-strategy-identity",
    img: "/hero/06-portrait-prism.jpg",
    accent: "#1A3DE8",
  },
  {
    num: "14",
    name: "Content Production",
    parent: "motion-video",
    img: "/hero/02-portrait-slats.jpg",
    accent: "#F2A23B",
  },
];
