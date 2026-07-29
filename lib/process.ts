// The 4-stage engagement flow shown in the homepage "How We Work" section.
// Deliberately service-agnostic — it summarizes the shape every SERVICES
// entry in lib/services.ts already follows (discover -> plan -> build -> ship).

export type ProcessStep = {
  title: string;
  body: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Discovery",
    body: "We start by understanding your goals, your audience, and what's holding things up.",
  },
  {
    title: "Strategy",
    body: "A clear roadmap for what happens first and why — before anything gets built.",
  },
  {
    title: "Production",
    body: "The work takes shape in the open, with regular check-ins instead of surprises.",
  },
  {
    title: "Delivery",
    body: "Shipped, handed off, and tuned — with a clear line to what happens next.",
  },
];
