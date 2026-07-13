"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DotGridArrow, DotGridIcon, Monogram } from "./Icons";
import { FlipLink } from "@/components/ui/flip-links";
import { useNavSurfaceTone } from "./useNavSurfaceTone";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Insights", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const NAV_LOGO_SIZE = Math.round(28 * 1.3);
const NAV_WORDMARK_SIZE = `${18 * 1.3}px`;
const NAV_PILL_GLASS_STYLE: React.CSSProperties = {
  backgroundColor: "var(--nav-pill-fill, rgba(22, 22, 24, 0.14))",
  backdropFilter: "blur(50px) saturate(150%)",
  WebkitBackdropFilter: "blur(50px) saturate(150%)",
};

export default function Nav() {
  const [open, setOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useNavSurfaceTone(headerRef);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open || !overlayRef.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const links = overlayRef.current.querySelectorAll<HTMLElement>(
      ".overlay-links a"
    );
    gsap.fromTo(
      links,
      { x: -24, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power4.out",
        overwrite: true,
      }
    );
  }, [open]);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        header.classList.add("nav-shell--scrolled");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The nav stays visible at all times (bug #1) — only its surface
        // treatment changes once the page is scrolled.
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const y = self.scroll();

            if (y > 80) {
              header.classList.add("nav-shell--scrolled");
            } else {
              header.classList.remove("nav-shell--scrolled");
            }
          },
        });

        NAV_LINKS.forEach(({ href }) => {
          const hashIndex = href.indexOf("#");
          if (hashIndex === -1) return;
          const section = document.querySelector(href.slice(hashIndex));
          if (!section) return;

          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 45%",
            onToggle: (self) => {
              const link = header.querySelector<HTMLAnchorElement>(
                `.nav-pill a[href="${href}"]`
              );
              if (!link) return;
              if (self.isActive) {
                header
                  .querySelectorAll(".nav-pill a.is-active")
                  .forEach((a) => a.classList.remove("is-active"));
                link.classList.add("is-active");
              }
            },
          });
        });

        let darkChapterSt: ScrollTrigger | undefined;
        const bindDarkChapter = () => {
          if (darkChapterSt) return true;
          const darkTransition = document.querySelector(
            ".dark-transition-wrapper"
          );
          if (!darkTransition) return false;
          darkChapterSt = ScrollTrigger.create({
            trigger: darkTransition,
            start: "center center",
            end: "center center",
            onEnter: () => header.classList.add("nav-shell--chapter-pulse"),
            onLeaveBack: () =>
              header.classList.remove("nav-shell--chapter-pulse"),
          });
          return true;
        };
        if (!bindDarkChapter()) {
          const retryId = window.setInterval(() => {
            if (bindDarkChapter()) window.clearInterval(retryId);
          }, 50);
          window.setTimeout(() => window.clearInterval(retryId), 5000);
        }
      });

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  return (
    <>
      <header ref={headerRef} className="nav-shell" aria-label="Primary">
        <a href="/#top" className="nav-logo" aria-label="Solve Trend — home">
          <Monogram size={NAV_LOGO_SIZE} />
          <span className="wordmark" style={{ fontSize: NAV_WORDMARK_SIZE }}>
            solve trend
          </span>
        </a>

        <nav
          className="nav-pill"
          style={NAV_PILL_GLASS_STYLE}
          aria-label="Sections"
        >
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="pill-cta" href="/#contact">
            Start a project
            <DotGridArrow />
          </a>
        </nav>

        <button
          type="button"
          className="nav-dotgrid"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="nav-overlay"
          onClick={() => setOpen(true)}
        >
          <DotGridIcon size={22} />
        </button>
      </header>

      <div
        id="nav-overlay"
        ref={overlayRef}
        className={`nav-overlay ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="overlay-top">
          <a href="/#top" className="nav-logo" onClick={() => setOpen(false)}>
            <Monogram size={NAV_LOGO_SIZE} />
            <span className="wordmark" style={{ fontSize: NAV_WORDMARK_SIZE }}>
              solve trend
            </span>
          </a>
          <button
            type="button"
            className="overlay-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="overlay-links" aria-label="Full menu">
          {NAV_LINKS.map((l) => (
            <FlipLink
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-display)] font-extrabold uppercase tracking-tight text-white [font-size:clamp(2.5rem,8vw,5.5rem)] hover:text-[var(--red)]"
            >
              {l.label}
            </FlipLink>
          ))}
        </nav>

        <div className="overlay-socials" aria-label="Social media">
          <FlipLink
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm uppercase tracking-[0.1em] text-white/60 hover:text-white"
          >
            Instagram
          </FlipLink>
          <FlipLink
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm uppercase tracking-[0.1em] text-white/60 hover:text-white"
          >
            LinkedIn
          </FlipLink>
          <FlipLink
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm uppercase tracking-[0.1em] text-white/60 hover:text-white"
          >
            TikTok
          </FlipLink>
        </div>
      </div>
    </>
  );
}
