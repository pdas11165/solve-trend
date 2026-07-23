"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";
import { DotGridArrow } from "./Icons";
import { SERVICES, type Service } from "@/lib/services";
import { asset } from "@/lib/asset";

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
            src={asset(service.imageUrl)}
            alt={service.name}
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
            № {service.number} — {service.name}
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
          <Link
            href={`/services/${service.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: service.accent }}
          >
            Explore {service.name}
            <DotGridArrow />
          </Link>
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
                {service.name}
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
                    <div className="hover-zoom relative aspect-[4/3] w-full rounded-xl bg-black/[0.04]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(service.imageUrl)}
                        alt={service.name}
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
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: service.accent }}
                    >
                      Explore {service.name}
                      <DotGridArrow />
                    </Link>
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
          <RevealText
            as="h2"
            text="Eight disciplines, one team"
            className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[#1A1A1A] md:text-5xl"
          />
          <p className="mt-4 text-[15px] leading-relaxed text-[#555] md:text-base">
            <span className="hidden md:inline">Hover a discipline to preview it, then click to</span>
            <span className="md:hidden">Tap a discipline to preview it, then</span> go deeper.
          </p>
        </div>

        {/* Desktop: interactive list + live preview */}
        <div className="hidden items-start gap-12 md:grid md:grid-cols-2 lg:gap-20">
          <ul className="flex flex-col">
            {SERVICES.map((service, i) => {
              const isActive = active === i;
              return (
                <li key={service.number}>
                  <Link
                    href={`/services/${service.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
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
                      {service.name}
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
                  </Link>
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

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/services"
            className="magnetic-cta group inline-flex items-center gap-2 rounded-full bg-[#E8341A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d42f17]"
          >
            View all services
            <DotGridArrow />
          </Link>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-black/40"
          >
            Start a project
            <DotGridArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
