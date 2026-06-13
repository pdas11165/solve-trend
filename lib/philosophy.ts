export type PhilosophyBlock = {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  color: string;
};

export const PHILOSOPHY_BLOCKS: PhilosophyBlock[] = [
  {
    id: "think",
    eyebrow: "How We Think",
    headline: "Solve Problems, Not Just Projects.",
    body: "We believe great work starts with understanding. Every brand, experience and system we create is built with purpose and long-term impact in mind.",
    color: "rgba(81, 150, 253, 0.8)",
  },
  {
    id: "dna",
    eyebrow: "Our DNA",
    headline: "Strategy × Creativity × Technology",
    body: "At Solve Trend, we combine human insight, creative thinking and intelligent systems to help businesses adapt and grow.",
    color: "rgba(143, 137, 255, 0.8)",
  },
  {
    id: "inside",
    eyebrow: "Inside Solve Trend",
    headline: "More Than An Agency.",
    body: "A creative, digital and AI innovation studio. Branding, Experiences, Commerce, Automation, Intelligence.",
    color: "rgba(118, 75, 162, 0.8)",
  },
  {
    id: "believe",
    eyebrow: "What We Believe",
    headline: "Creativity Should Create Value.",
    body: "Beautiful work means nothing without impact. Strategy, Experiences, Systems, Growth, Innovation.",
    color: "rgba(237, 100, 158, 0.8)",
  },
  {
    id: "drives",
    eyebrow: "What Drives Us",
    headline: "Building What's Next.",
    body: "From brand identities to AI-powered systems, we help ambitious businesses create meaningful impact and sustainable growth.",
    color: "rgba(253, 82, 26, 0.8)",
  },
];
