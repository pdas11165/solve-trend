"use client";

import * as React from "react";
import { AnimatedTestimonialGrid } from "@/components/ui/testimonial-2";
import {
  TestimonialMarquee,
  type TestimonialCardT,
} from "@/components/ui/testimonial-marquee";

const AVATAR_IMAGES = [
  { imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300", alt: "Professional Man" },
  { imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300", alt: "Smiling Man" },
  { imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300", alt: "Professional Woman" },
  { imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300", alt: "Smiling Woman" },
  { imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300", alt: "Man in a suit" },
  { imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300", alt: "Bearded Man" },
  { imgSrc: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=300", alt: "Man in a blue shirt" },
  { imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300", alt: "Older Man" },
  { imgSrc: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=300", alt: "Woman with curly hair" },
  { imgSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300", alt: "Woman in an office" },
  { imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300", alt: "Woman with glasses" },
  { imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300", alt: "Woman with a dog" },
];

const MARQUEE_ROW_1: TestimonialCardT[] = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Duo Nutrition",
    handle: "@duonutrition",
    quote:
      "Solve Trend felt like an extension of our founding team. The relaunch tripled our conversion overnight.",
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Lesse Studio",
    handle: "@lessestudio",
    quote:
      "Every detail landed exactly where it needed to. The team thinks in systems, not in pages.",
  },
  {
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "AERUK Digital",
    handle: "@aerukdigital",
    quote:
      "We finally know what's working. Solve Trend built the whole growth engine in eight weeks.",
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Northwind Labs",
    handle: "@northwindlabs",
    quote:
      "From strategy to launch, they moved with clarity and speed. Our brand finally feels like us.",
  },
];

const MARQUEE_ROW_2: TestimonialCardT[] = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    name: "Harbor & Co.",
    handle: "@harborco",
    quote:
      "The design system they built scaled across every touchpoint. Our team ships faster now.",
  },
  {
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    name: "Vela Health",
    handle: "@velahealth",
    quote:
      "Solve Trend translated complex product value into a story customers actually understand.",
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200",
    name: "Forge Collective",
    handle: "@forgecollective",
    quote:
      "They don't just deliver assets — they deliver momentum. Best agency partnership we've had.",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    name: "Atlas Retail",
    handle: "@atlasretail",
    quote:
      "Our e-commerce relaunch paid for itself in the first month. The numbers speak for themselves.",
  },
];

export default function TestimonialShowcase() {
  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="testimonial-showcase w-full relative"
      style={{
        ["--background" as string]: "var(--bg-dark)",
        ["--foreground" as string]: "var(--text-dark)",
        ["--primary" as string]: "var(--brand-red)",
        ["--primary-foreground" as string]: "#fff",
        ["--secondary" as string]: "rgba(255, 255, 255, 0.08)",
        ["--secondary-foreground" as string]: "var(--text-dark)",
        ["--muted-foreground" as string]: "var(--muted-dark)",
      }}
    >
      <AnimatedTestimonialGrid
        testimonials={AVATAR_IMAGES}
        badgeText="Testimonials"
        title={
          <>
            Trusted by leaders
            <br />
            from various industries
          </>
        }
        description="Learn why professionals trust our solutions to complete their customer journeys."
        ctaText="Read Success Stories"
        ctaHref="#testimonials-marquee"
      />
      <div id="testimonials-marquee">
        <TestimonialMarquee row1={MARQUEE_ROW_1} row2={MARQUEE_ROW_2} />
      </div>
    </section>
  );
}
