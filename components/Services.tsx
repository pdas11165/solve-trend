"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotGridArrow } from "./Icons";

const HERO_CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";
const WORK_CDN = "https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1";
const PROJECT_CDN = "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799";

type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  imageUrl: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "We figure out who you are, who's listening, and how to make them care.",
    tags: ["Positioning", "Research", "Messaging", "Campaigns"],
    accent: "#E8341A",
    imageUrl: `${WORK_CDN}/69bac6c472b3ddaac9735644_CMS%20Work%2001%20webp.webp`,
  },
  {
    number: "02",
    title: "Brand Identity & Graphic Design",
    description:
      "A look that's unmistakably yours — logo, visual system, and everything it touches.",
    tags: ["Logo", "Visual Systems", "Packaging", "Print"],
    accent: "#F2A23B",
    imageUrl: `${HERO_CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
  },
  {
    number: "03",
    title: "Motion Graphics & Animation",
    description:
      "Movement that explains, delights, and makes people actually finish the video.",
    tags: ["Motion", "Animation", "Explainers", "Kinetic Type"],
    accent: "#ED649E",
    imageUrl: `${WORK_CDN}/69bac6dee6fbe19c625613e7_CMS%20Work%2003%20webp.webp`,
  },
  {
    number: "04",
    title: "Video Editing & Production",
    description:
      "From raw footage to something worth sharing — commercials, reels, and everything between.",
    tags: ["Commercials", "Reels", "Color Grading", "Sound"],
    accent: "#764BA2",
    imageUrl: `${WORK_CDN}/69bac6edbbaa23515e2a5e63_CMS%20Work%2004%20webp.webp`,
  },
  {
    number: "05",
    title: "User Experience Design",
    description:
      "Interfaces people figure out without a manual — wireframed, prototyped, and built to scale.",
    tags: ["UX/UI", "Wireframes", "Prototyping", "Design Systems"],
    accent: "#5196FD",
    imageUrl: `${PROJECT_CDN}/69ce1bd505ea321d262a6ef4_uiux.jpg`,
  },
  {
    number: "06",
    title: "Web Development",
    description:
      "Fast, sturdy sites your team can actually update — built in React or Webflow, your call.",
    tags: ["React", "Webflow", "CMS", "APIs"],
    accent: "#1A3DE8",
    imageUrl: `${HERO_CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
  },
  {
    number: "07",
    title: "eCommerce Solutions",
    description: "Stores built to convert, not just to look nice on launch day.",
    tags: ["Shopify", "WooCommerce", "Checkout", "Marketplaces"],
    accent: "#0E9F6E",
    imageUrl: `${WORK_CDN}/69c6157dc7884d040282487d_Work%207%20WebP.webp`,
  },
  {
    number: "08",
    title: "AI Automation",
    description:
      "The busywork, automated — so your team spends time on what actually needs a human.",
    tags: ["Chatbots", "Workflows", "CRM", "AI Content"],
    accent: "#12B5C9",
    imageUrl: `${HERO_CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
  },
];

function PreviewCard({ service }: { service: Service }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-4"
      style={{
        background: `linear-gradient(140deg, ${service.accent}1f, rgba(255,255,255,0))`,
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/[0.04] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={service.number}
            src={service.imageUrl}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={service.number}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="px-2 pb-1 pt-5"
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: service.accent }}
          >
            № {service.number} — {service.title}
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#555]">
            {service.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888]">
            {service.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 ? (
                  <span aria-hidden="true" className="opacity-40">
                    /
                  </span>
                ) : null}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Mobile: tap a row to expand its preview inline. */
function ServiceAccordion() {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="md:hidden">
      {SERVICES.map((service, i) => {
        const isOpen = open === i;
        return (
          <div key={service.number} className="border-t border-black/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 py-4 text-left"
            >
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: service.accent }}
              >
                {service.number}
              </span>
              <span
                className="flex-1 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight"
                style={{ color: isOpen ? "#1A1A1A" : "#3d3d3d" }}
              >
                {service.title}
              </span>
              <span
                className="text-lg leading-none"
                style={{ color: service.accent }}
                aria-hidden="true"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/[0.04]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#555]">
                      {service.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888]">
                      {service.tags.map((tag, k) => (
                        <React.Fragment key={tag}>
                          {k > 0 ? (
                            <span aria-hidden="true" className="opacity-40">
                              /
                            </span>
                          ) : null}
                          <span>{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
      <div className="border-t border-black/10" />
    </div>
  );
}

export default function Services() {
  const [active, setActive] = React.useState(0);

  return (
    <section
      id="services"
      className="relative w-full bg-[var(--bg-light)] py-20 selection:bg-[var(--red)] selection:text-white md:py-28"
      aria-label="What we're good at"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,82,0,0.09),transparent_60%)] blur-[40px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 max-w-2xl md:mb-16">
          <div className="services-zoom-parallax__eyebrow mb-4">
            <span className="services-brand-dot" aria-hidden="true" />
            <span>What We&rsquo;re Good At</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[#1A1A1A] md:text-5xl">
            Eight disciplines, one team
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#555] md:text-base">
            <span className="hidden md:inline">Hover a discipline</span>
            <span className="md:hidden">Tap a discipline</span> to see what it
            looks like when we run it end to end.
          </p>
        </div>

        {/* Desktop: interactive list + live preview */}
        <div className="hidden items-start gap-12 md:grid md:grid-cols-2 lg:gap-20">
          <ul className="flex flex-col">
            {SERVICES.map((service, i) => {
              const isActive = active === i;
              return (
                <li key={service.number}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group flex w-full items-center gap-4 border-b border-black/10 py-4 text-left transition-colors"
                  >
                    <span
                      className="text-xs font-bold tabular-nums transition-colors"
                      style={{ color: isActive ? service.accent : "#B8B6B0" }}
                    >
                      {service.number}
                    </span>
                    <span
                      className="flex-1 font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight transition-colors lg:text-[1.9rem]"
                      style={{ color: isActive ? "#1A1A1A" : "#B8B6B0" }}
                    >
                      {service.title}
                    </span>
                    <span
                      className="transition-all duration-300"
                      style={{
                        color: service.accent,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(-8px)",
                      }}
                      aria-hidden="true"
                    >
                      <DotGridArrow />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="sticky top-28">
            <PreviewCard service={SERVICES[active]} />
          </div>
        </div>

        {/* Mobile: accordion */}
        <ServiceAccordion />

        <div className="mt-14 flex">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#E8341A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d42f17]"
          >
            Start a project
            <DotGridArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
