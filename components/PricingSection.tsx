"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { DotGridArrow } from "./Icons";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type Tier = {
  name: string;
  tagline: string;
  level: string;
  levelIcon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  price: number | null;
  priceLabel?: string;
  billing: string;
  description: string;
  features: string[];
  cta: string;
  shape: "cube" | "torus" | "capsule";
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Launch",
    tagline: "Everything to go from zero to live",
    level: "Starter",
    levelIcon: Zap,
    price: 3000,
    billing: "Monthly · CAD",
    description: "Brand, website, and your first push into the world — all in one package.",
    features: [
      "Brand identity & logo design",
      "Brand guidelines document",
      "Custom website — design & development",
      "Social media marketing (3 months)",
    ],
    cta: "Start your launch",
    shape: "cube",
  },
  {
    name: "Growth",
    tagline: "For teams ready to keep the momentum",
    level: "Most popular",
    levelIcon: Sparkles,
    price: 5000,
    billing: "Monthly · CAD",
    description: "You've launched. Now let's keep the wins coming.",
    features: [
      "Everything in Launch",
      "Ongoing social media support",
      "Continuous marketing & campaign optimization",
      "Monthly performance reporting",
    ],
    cta: "Keep growing",
    shape: "torus",
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "When your ambitions outgrow a template",
    level: "Custom",
    levelIcon: Crown,
    price: null,
    priceLabel: "Custom",
    billing: "Custom · CAD",
    description: "Bigger scope, bigger stakes — a plan built around exactly what you need.",
    features: [
      "Custom scope & deliverables",
      "Multi-brand and multi-market support",
      "Dedicated account lead",
      "Data & AI integrations",
    ],
    cta: "Book a call",
    shape: "capsule",
  },
];

const WARM_TEXT_GRADIENT =
  "linear-gradient(92deg, #FF4D2E 0%, #F7A23B 55%, #FFD44D 100%)";
const COOL_TEXT_GRADIENT =
  "linear-gradient(92deg, #AFCBFF 0%, #E8F1FF 60%, #FFFFFF 100%)";

const WARM_CARD_WASH = [
  "radial-gradient(120% 80% at 82% 108%, rgba(232, 52, 26, 0.30) 0%, transparent 62%)",
  "radial-gradient(90% 55% at 12% -8%, rgba(247, 162, 59, 0.14) 0%, transparent 60%)",
  "linear-gradient(180deg, #141010 0%, #0C0A0A 100%)",
].join(", ");
const COOL_CARD_WASH = [
  "radial-gradient(120% 75% at 85% -8%, rgba(111, 165, 255, 0.12) 0%, transparent 60%)",
  "linear-gradient(180deg, #101114 0%, #0A0B0D 100%)",
].join(", ");

function GlossyCube() {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="pcube-top" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#EAF4FF" />
          <stop offset="100%" stopColor="#93BEFF" />
        </linearGradient>
        <linearGradient id="pcube-left" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#6FA5FF" />
          <stop offset="100%" stopColor="#3560D8" />
        </linearGradient>
        <linearGradient id="pcube-right" x1="0.2" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4E82F0" />
          <stop offset="100%" stopColor="#1F3D96" />
        </linearGradient>
        <filter id="pcube-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <g strokeWidth="16" strokeLinejoin="round">
        <polygon points="80,32 126,55 80,78 34,55" fill="url(#pcube-top)" stroke="url(#pcube-top)" />
        <polygon points="34,55 80,78 80,126 34,103" fill="url(#pcube-left)" stroke="url(#pcube-left)" />
        <polygon points="80,78 126,55 126,103 80,126" fill="url(#pcube-right)" stroke="url(#pcube-right)" />
      </g>
      <ellipse cx="72" cy="50" rx="24" ry="9" fill="#FFFFFF" opacity="0.55" filter="url(#pcube-soft)" />
    </svg>
  );
}

function GlossyTorus() {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <radialGradient id="ptorus-body" cx="0.32" cy="0.24" r="0.95">
          <stop offset="0%" stopColor="#FFD9C4" />
          <stop offset="30%" stopColor="#FF8A5C" />
          <stop offset="65%" stopColor="#F04A24" />
          <stop offset="100%" stopColor="#8E1B08" />
        </radialGradient>
        <radialGradient id="ptorus-hole" cx="0.42" cy="0.32" r="0.9">
          <stop offset="0%" stopColor="#631305" />
          <stop offset="100%" stopColor="#2B0701" />
        </radialGradient>
        <filter id="ptorus-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <ellipse cx="100" cy="102" rx="80" ry="56" fill="url(#ptorus-body)" transform="rotate(-18 100 102)" />
      <ellipse cx="94" cy="92" rx="33" ry="21" fill="url(#ptorus-hole)" transform="rotate(-18 94 92)" />
      <ellipse cx="62" cy="60" rx="26" ry="11" fill="#FFFFFF" opacity="0.6" filter="url(#ptorus-soft)" transform="rotate(-24 62 60)" />
      <ellipse cx="138" cy="146" rx="22" ry="8" fill="#FFB59E" opacity="0.45" filter="url(#ptorus-soft)" transform="rotate(-16 138 146)" />
    </svg>
  );
}

function GlossyCapsule() {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="pcap-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D9E9FF" />
          <stop offset="45%" stopColor="#6FA5FF" />
          <stop offset="100%" stopColor="#2C51BE" />
        </linearGradient>
        <filter id="pcap-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <g transform="rotate(28 80 80)">
        <rect x="52" y="26" width="56" height="108" rx="28" fill="url(#pcap-body)" />
        <rect x="61" y="36" width="11" height="52" rx="5.5" fill="#FFFFFF" opacity="0.6" filter="url(#pcap-soft)" />
      </g>
    </svg>
  );
}

const SHAPES: Record<Tier["shape"], React.ComponentType> = {
  cube: GlossyCube,
  torus: GlossyTorus,
  capsule: GlossyCapsule,
};

function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0c.8 6.8 5.2 11.2 12 12-6.8.8-11.2 5.2-12 12-.8-6.8-5.2-11.2-12-12C6.8 11.2 11.2 6.8 12 0Z" />
    </svg>
  );
}

export default function PricingSection() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {});

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(".pricing-hero-title", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.12,
              ease: "power4.out",
              scrollTrigger: {
                trigger: root.current,
                start: "top 75%",
                once: true,
              },
            });
          },
        });

        gsap.from(".pricing-hero-eyebrow, .pricing-hero-sub", {
          opacity: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            once: true,
          },
        });

        gsap.from(".pricing-card", {
          opacity: 0,
          y: 48,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".pricing-shape", {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 82%",
            once: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".pricing-shape-float").forEach((el, i) => {
          gsap.to(el, {
            y: -10,
            rotation: i % 2 === 0 ? 6 : -6,
            duration: 3 + i * 0.7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        gsap.utils.toArray<HTMLElement>(".pricing-spark").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0.2, scale: 0.7, rotation: -12 },
            {
              opacity: 1,
              scale: 1.1,
              rotation: 12,
              duration: 1.5 + i * 0.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: i * 0.45,
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".pricing-price-value").forEach((el) => {
          const target = Number(el.dataset.price ?? 0);
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(counter.val).toLocaleString("en-CA");
            },
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });
      });

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
        () => {
          const cleanups: Array<() => void> = [];

          gsap.utils.toArray<HTMLElement>(".pricing-card").forEach((card) => {
            const inner = card.querySelector<HTMLElement>(".pricing-card-inner");
            const shape = card.querySelector<HTMLElement>(".pricing-shape-parallax");
            if (!inner) return;

            gsap.set(inner, { transformPerspective: 900 });

            const rotX = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });
            const rotY = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });
            const shapeX = shape ? gsap.quickTo(shape, "x", { duration: 0.6, ease: "power3.out" }) : null;
            const shapeY = shape ? gsap.quickTo(shape, "y", { duration: 0.6, ease: "power3.out" }) : null;

            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width;
              const py = (e.clientY - rect.top) / rect.height;
              rotY((px - 0.5) * 9);
              rotX((0.5 - py) * 7);
              shapeX?.((px - 0.5) * 16);
              shapeY?.((py - 0.5) * 16);
              inner.style.setProperty("--px", `${px * 100}%`);
              inner.style.setProperty("--py", `${py * 100}%`);
            };

            const onLeave = () => {
              rotX(0);
              rotY(0);
              shapeX?.(0);
              shapeY?.(0);
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            cleanups.push(() => {
              card.removeEventListener("mousemove", onMove);
              card.removeEventListener("mouseleave", onLeave);
              gsap.set(inner, { rotationX: 0, rotationY: 0 });
              if (shape) gsap.set(shape, { x: 0, y: 0 });
            });
          });

          return () => cleanups.forEach((fn) => fn());
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="pricing"
      aria-label="Pricing"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--bg-dark)] px-6 py-[var(--section-pad)] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[90vw] -translate-x-1/2 rounded-[50%] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(240, 50, 35, 0.16) 0%, rgba(247, 162, 59, 0.08) 45%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="relative mx-auto max-w-3xl text-center">
          <Spark className="pricing-spark absolute -top-8 left-[8%] h-5 w-5 text-[var(--red-light)]" />
          <Spark className="pricing-spark absolute -top-2 right-[6%] h-3.5 w-3.5 text-[#9CC4FF]" />
          <Spark className="pricing-spark absolute bottom-0 left-[2%] hidden h-3 w-3 text-[#F7A23B] md:block" />
          <span className="pricing-hero-eyebrow inline-block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--red-light)]">
            Pricing
          </span>
          <h2 className="pricing-hero-title mt-4 font-[family-name:var(--font-display)] text-[length:var(--fs-section-title)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            One package. Everything you need to launch.
          </h2>
          <p className="pricing-hero-sub mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted-dark)] md:text-lg">
            Branding, website, and marketing bundled into a single monthly
            engagement — launch your business digitally without juggling five
            vendors.
          </p>
        </div>

        <div className="pricing-grid mt-16 grid gap-6 md:mt-20 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const Shape = SHAPES[tier.shape];
            const LevelIcon = tier.levelIcon;
            return (
              <article
                key={tier.name}
                className={`pricing-card group relative min-w-0 ${tier.featured ? "lg:-mt-4 lg:mb-[-1rem]" : ""}`}
              >
                <div className="pricing-card-lift h-full transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-2">
                  <div
                    className={`pricing-card-inner relative flex h-full flex-col overflow-hidden rounded-[28px] border p-5 transition-[box-shadow,border-color] duration-500 sm:p-7 md:p-8 ${
                      tier.featured
                        ? "border-[rgba(240,50,35,0.45)] shadow-[0_24px_80px_-24px_rgba(240,50,35,0.35)] group-hover:border-[rgba(255,120,90,0.6)] group-hover:shadow-[0_36px_96px_-24px_rgba(240,50,35,0.5)]"
                        : "border-[var(--divider-dark)] group-hover:border-[rgba(146,180,255,0.35)] group-hover:shadow-[0_24px_64px_-32px_rgba(60,100,200,0.45)]"
                    }`}
                    style={{ background: tier.featured ? WARM_CARD_WASH : COOL_CARD_WASH }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(320px circle at var(--px, 50%) var(--py, 50%), rgba(255,255,255,0.07), transparent 65%)",
                      }}
                    />

                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-dark)]">
                          {tier.tagline}
                        </span>
                        <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight">
                          {tier.name}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ${
                          tier.featured
                            ? "border-[rgba(240,50,35,0.5)] bg-[rgba(240,50,35,0.16)] text-[#FFB59E]"
                            : "border-white/12 bg-white/[0.06] text-white/70"
                        }`}
                      >
                        <LevelIcon className="h-3.5 w-3.5" aria-hidden />
                        {tier.level}
                      </span>
                    </div>

                    <div className="relative mt-6 flex items-end justify-between gap-3 sm:gap-4">
                      <div className="flex flex-wrap items-baseline gap-1">
                        {tier.price !== null ? (
                          <>
                            <span className="text-xl font-bold text-[var(--muted-dark)]">$</span>
                            <span
                              className="pricing-price-value bg-clip-text font-[family-name:var(--font-display)] text-4xl font-extrabold tabular-nums tracking-tight text-transparent sm:text-5xl md:text-[3.4rem]"
                              style={{ backgroundImage: tier.featured ? WARM_TEXT_GRADIENT : COOL_TEXT_GRADIENT }}
                              data-price={tier.price}
                            >
                              {tier.price.toLocaleString("en-CA")}
                            </span>
                            <span className="ml-1 text-sm font-medium text-[var(--muted-dark)]">
                              /month
                            </span>
                          </>
                        ) : (
                          <span
                            className="bg-clip-text font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-[3.4rem]"
                            style={{ backgroundImage: COOL_TEXT_GRADIENT }}
                          >
                            {tier.priceLabel}
                          </span>
                        )}
                      </div>

                      <div className="pricing-shape pointer-events-none relative -mb-1 -mt-3 h-14 w-14 sm:-mb-3 sm:-mt-8 sm:h-24 sm:w-24 md:h-28 md:w-28">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 scale-125 rounded-full blur-2xl"
                          style={{
                            background: tier.featured
                              ? "radial-gradient(circle, rgba(240,74,36,0.4) 0%, transparent 70%)"
                              : "radial-gradient(circle, rgba(111,165,255,0.28) 0%, transparent 70%)",
                          }}
                        />
                        <div className="pricing-shape-float relative h-full w-full">
                          <div className="pricing-shape-parallax h-full w-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.5)]">
                            <Shape />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="relative mt-3 text-sm leading-relaxed text-[var(--muted-dark)]">
                      {tier.description}
                    </p>

                    <ul className="relative mb-8 mt-7 flex flex-col gap-3.5">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm leading-snug">
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${tier.featured ? "text-[var(--red-light)]" : "text-[#9CC4FF]"}`}
                            aria-hidden="true"
                          />
                          <span className="text-white/85">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-dark)]">
                          Billed
                        </span>
                        <span className="text-sm font-semibold text-white/90">{tier.billing}</span>
                      </div>
                      <a
                        href="/#contact"
                        className={`magnetic-cta inline-flex items-center justify-center gap-2 rounded-[14px] px-6 py-3.5 text-sm font-bold transition-colors duration-300 ${
                          tier.featured
                            ? "bg-[var(--red)] text-white hover:bg-[#d42f17]"
                            : "border border-[rgba(255,255,255,0.18)] text-white hover:border-white/40 hover:bg-white/5"
                        }`}
                      >
                        {tier.cta}
                        <DotGridArrow />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* The featured Growth card hangs 1rem below the grid (lg:mb-[-1rem])
            plus its hover lift — clear both so this note never overlaps it. */}
        <p className="relative mt-20 text-center text-xs uppercase tracking-[0.18em] text-[var(--muted-dark)] lg:mt-32">
          Prices in CAD · Scope confirmed after a discovery call
        </p>
      </div>
    </section>
  );
}
