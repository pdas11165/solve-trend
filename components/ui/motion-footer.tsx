"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { DotGridArrow } from "@/components/Icons";
import { FlipLink } from "@/components/ui/flip-links";
import { CONTACT_EMAIL } from "@/lib/contact";
import { route } from "@/lib/asset";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;

  --background: var(--bg-dark);
  --foreground: var(--text-dark);
  --primary: var(--brand-red);
  --secondary: var(--brand-amber);
  --destructive: var(--brand-red);
  --muted-foreground: var(--muted-dark);
  --border: var(--divider-dark);

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 18%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 12%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-family: var(--font-display);
  font-size: 13vw;
  line-height: 0.75;
  bottom: 1rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

@media (max-width: 767px) {
  .footer-giant-bg-text {
    font-size: 16vw;
    bottom: 13rem;
  }
}

.footer-text-glow {
  font-family: var(--font-display);
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--primary) 20%, transparent));
}

.cinematic-footer-surface {
  background-color: var(--background);
  color: var(--foreground);
}

.cinematic-footer-muted {
  color: var(--muted-foreground);
}

.cinematic-footer-primary-muted {
  color: color-mix(in oklch, var(--primary) 60%, transparent);
}

.cinematic-footer-secondary-muted {
  color: color-mix(in oklch, var(--secondary) 60%, transparent);
}

.cinematic-footer-destructive {
  color: var(--destructive);
}

.cinematic-footer-marquee-band {
  border-top: 1px solid color-mix(in oklch, var(--border) 50%, transparent);
  border-bottom: 1px solid color-mix(in oklch, var(--border) 50%, transparent);
  background: color-mix(in oklch, var(--background) 60%, transparent);
}

.cinematic-footer-badge-border {
  border-color: color-mix(in oklch, var(--border) 50%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe,
  .animate-footer-scroll-marquee,
  .animate-footer-heartbeat {
    animation: none;
  }
}
`;

type MagneticElementProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

function MagneticAnchor({ className, children, href, "aria-label": ariaLabel }: MagneticElementProps) {
  const localRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = localRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const h = rect.width / 2;
        const w = rect.height / 2;
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - w;

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          rotationX: -y * 0.15,
          rotationY: x * 0.15,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <a ref={localRef} href={href} aria-label={ariaLabel} className={cn("cursor-pointer", className)}>
      {children}
    </a>
  );
}

function MagneticBtn({ className, children, onClick, "aria-label": ariaLabel }: MagneticElementProps) {
  const localRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = localRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const h = rect.width / 2;
        const w = rect.height / 2;
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - w;

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          rotationX: -y * 0.15,
          rotationY: x * 0.15,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <button
      type="button"
      ref={localRef}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </button>
  );
}

const MARQUEE_ITEMS = [
  "Brand Strategy",
  "Web Design & Dev",
  "Digital Marketing",
  "UI/UX Design",
  "Data & AI",
  "Charlottetown PEI",
];

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    {MARQUEE_ITEMS.map((item, index) => (
      <React.Fragment key={item}>
        <span>{item}</span>
        <span className={index % 2 === 0 ? "cinematic-footer-primary-muted" : "cinematic-footer-secondary-muted"}>✦</span>
      </React.Fragment>
    ))}
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set([giantTextRef.current, headingRef.current, linksRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        aria-label="Site footer"
      >
        <footer className="cinematic-footer-wrapper cinematic-footer-surface fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden">
          <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text pointer-events-none absolute inset-x-0 z-0 select-none whitespace-nowrap text-center"
          >
            SOLVE TREND
          </div>

          <div className="cinematic-footer-marquee-band absolute left-0 top-12 z-10 w-full -rotate-2 scale-110 overflow-hidden py-4 shadow-2xl backdrop-blur-md">
            <div className="cinematic-footer-muted flex w-max animate-footer-scroll-marquee text-xs font-bold uppercase tracking-[0.3em] md:text-sm">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
            <h2
              ref={headingRef}
              className="footer-text-glow mb-12 text-center text-4xl font-black tracking-tighter sm:text-5xl md:text-8xl"
            >
              Ready to build something great?
            </h2>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-wrap justify-center gap-4">
                <MagneticAnchor
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold md:text-base"
                >
                  Say hello
                  <DotGridArrow className="cinematic-footer-muted transition-colors group-hover:text-[var(--foreground)]" />
                </MagneticAnchor>

                <MagneticAnchor
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold md:text-base"
                >
                  Start a project
                  <DotGridArrow className="cinematic-footer-muted transition-colors group-hover:text-[var(--foreground)]" />
                </MagneticAnchor>
              </div>

              <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
                <FlipLink
                  href={route("/services")}
                  className="cinematic-footer-muted text-sm font-bold uppercase tracking-widest hover:text-[var(--foreground)] md:text-base"
                >
                  Services
                </FlipLink>
                <FlipLink
                  href={route("/blog")}
                  className="cinematic-footer-muted text-sm font-bold uppercase tracking-widest hover:text-[var(--foreground)] md:text-base"
                >
                  Insights
                </FlipLink>
                <FlipLink
                  href={route("/privacy")}
                  className="cinematic-footer-muted text-sm font-bold uppercase tracking-widest hover:text-[var(--foreground)] md:text-base"
                >
                  Privacy
                </FlipLink>
                <FlipLink
                  href={route("/terms")}
                  className="cinematic-footer-muted text-sm font-bold uppercase tracking-widest hover:text-[var(--foreground)] md:text-base"
                >
                  Terms
                </FlipLink>
              </div>
            </div>
          </div>

          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
            <div className="order-2 text-[10px] font-semibold uppercase tracking-widest cinematic-footer-muted md:order-1 md:text-xs">
              © 2026 Solve Trend. All rights reserved.
            </div>

            <div className="footer-glass-pill cinematic-footer-badge-border order-1 flex cursor-default items-center gap-2 rounded-full border px-6 py-3 md:order-2">
              <span className="cinematic-footer-muted text-[10px] font-bold uppercase tracking-widest md:text-xs">
                Crafted with
              </span>
              <span className="animate-footer-heartbeat cinematic-footer-destructive text-sm md:text-base">❤</span>
              <span className="cinematic-footer-muted text-[10px] font-bold uppercase tracking-widest md:text-xs">
                in Charlottetown, PEI
              </span>
              <span className="ml-1 text-xs font-black tracking-normal md:text-sm">
                solve trend
              </span>
            </div>

            <MagneticBtn
              onClick={scrollToTop}
              aria-label="Back to top"
              className="footer-glass-pill cinematic-footer-muted group order-3 flex h-12 w-12 items-center justify-center rounded-full hover:text-[var(--foreground)]"
            >
              <svg
                className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </MagneticBtn>
          </div>
        </footer>
      </div>
    </>
  );
}
