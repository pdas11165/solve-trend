export const CONTACT_EMAIL = "hello@solvetrend.com";

/**
 * Where job applications are delivered. Same inbox as general inquiries for
 * now; override with the CAREERS_EMAIL env var to split it out later without
 * touching the route.
 */
export const CAREERS_EMAIL = CONTACT_EMAIL;

// Mirrors the five offers in lib/services.ts (consolidated 2026-07-28).
export const CONTACT_SERVICE_OPTIONS = [
  "Brand Strategy & Identity",
  "Web Design & Development",
  "Motion & Video",
  "eCommerce",
  "Custom Software & AI Automation",
  "Multiple services",
  "Not sure yet",
] as const;

export type ContactServiceOption = (typeof CONTACT_SERVICE_OPTIONS)[number];

export type ContactFormPayload = {
  name: string;
  phone: string;
  email: string;
  service: ContactServiceOption | string;
};
