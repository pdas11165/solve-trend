export const CONTACT_EMAIL = "hello@solvetrend.example.com";

export const CONTACT_SERVICE_OPTIONS = [
  "Brand Strategy",
  "Brand Identity & Graphic Design",
  "Motion Graphics & Animation",
  "Video Editing & Production",
  "User Experience Design",
  "Web Development",
  "eCommerce Solutions",
  "AI Automation",
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
