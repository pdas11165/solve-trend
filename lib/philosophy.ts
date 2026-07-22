export type PhilosophyBlock = {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  color: string;
  image: string;
  imageAlt: string;
};

const HERO_CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";
const WORK_CDN = "https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1";
const PROJECT_CDN = "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799";

export const PHILOSOPHY_BLOCKS: PhilosophyBlock[] = [
  {
    id: "think",
    eyebrow: "How We Think",
    headline: "Solve Problems, Not Just Projects.",
    body: "We believe great work starts with understanding. Every brand, experience and system we create is built with purpose and long-term impact in mind.",
    color: "rgba(81, 150, 253, 0.8)",
    image: `${WORK_CDN}/69bac6c472b3ddaac9735644_CMS%20Work%2001%20webp.webp`,
    imageAlt: "Brand strategy work",
  },
  {
    id: "dna",
    eyebrow: "Our DNA",
    headline: "Strategy × Creativity × Technology",
    body: "Human insight. Creative thinking. Intelligent systems. Three things, one job: helping businesses adapt faster than the market does.",
    color: "rgba(143, 137, 255, 0.8)",
    image: `${HERO_CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
    imageAlt: "Brand identity design",
  },
  {
    id: "inside",
    eyebrow: "Inside Solve Trend",
    headline: "More Than An Agency.",
    body: "A creative, digital and AI innovation studio. Branding, Experiences, Commerce, Automation, Intelligence.",
    color: "rgba(118, 75, 162, 0.8)",
    image: `${PROJECT_CDN}/69ce1dd984e68ff75cfcfcf3_prd.jpg`,
    imageAlt: "Product design",
  },
  {
    id: "believe",
    eyebrow: "What We Believe",
    headline: "Creativity Should Create Value.",
    body: "Beautiful work means nothing without impact. Strategy, Experiences, Systems, Growth, Innovation.",
    color: "rgba(237, 100, 158, 0.8)",
    image: `${WORK_CDN}/69bac6dee6fbe19c625613e7_CMS%20Work%2003%20webp.webp`,
    imageAlt: "Motion graphics project",
  },
  {
    id: "drives",
    eyebrow: "What Drives Us",
    headline: "Building What's Next.",
    body: "From brand identities to AI-powered systems — we build the stuff ambitious businesses need next, before they know they need it.",
    color: "rgba(253, 82, 26, 0.8)",
    image: `${WORK_CDN}/69c6157dc7884d040282487d_Work%207%20WebP.webp`,
    imageAlt: "Digital experience design",
  },
];
