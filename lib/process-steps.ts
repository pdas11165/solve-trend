export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discovery & Strategy",
    word: "discover.",
    body: "Stakeholder interviews, audits, and competitive mapping. We finish with a written brief everyone can point at.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "Design & Prototyping",
    word: "design.",
    body: "Concepts in days, prototypes in weeks. We test interaction in the browser, not in slide decks.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "Build & Develop",
    word: "build.",
    body: "Production code from senior engineers — typed, observable, deployed on Vercel by default.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "Launch & Optimize",
    word: "launch.",
    body: "We don't disappear at launch. Experimentation, content and analytics keep compounding the wins.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop",
  },
] as const;

export const PROCESS_IMAGES = PROCESS_STEPS.map((s) => s.image);
export const PROCESS_WORDS = PROCESS_STEPS.map((s) => s.word);
export const PROCESS_DESCRIPTIONS = PROCESS_STEPS.map((s) => s.body);
