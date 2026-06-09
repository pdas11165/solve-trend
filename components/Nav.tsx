"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DotGridArrow, DotGridIcon, Monogram } from "./Icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#latest" },
  { label: "About", href: "#expertise" },
  { label: "Insights", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const lastScrollY = React.useRef(0);

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
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const y = self.scroll();
            const delta = y - lastScrollY.current;

            if (y > 80) {
              header.classList.add("nav-shell--scrolled");
            } else {
              header.classList.remove("nav-shell--scrolled");
            }

            if (y > 120 && delta > 6) {
              header.classList.add("nav-shell--hidden");
            } else if (delta < -4) {
              header.classList.remove("nav-shell--hidden");
            }

            lastScrollY.current = y;
          },
        });

        NAV_LINKS.forEach(({ href }) => {
          const section = document.querySelector(href);
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

        ScrollTrigger.create({
          trigger: ".dark-transition-wrapper",
          start: "center center",
          end: "center center",
          onEnter: () => header.classList.add("nav-shell--chapter-pulse"),
          onLeaveBack: () => header.classList.remove("nav-shell--chapter-pulse"),
        });
      });

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  return (
    <>
      <header ref={headerRef} className="nav-shell" aria-label="Primary">
        <a href="#top" className="nav-logo" aria-label="Solve Trend — home">
          <Monogram />
          <span className="wordmark">solve trend</span>
        </a>

        <nav className="nav-pill" aria-label="Sections">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="pill-cta" href="#contact">
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
          <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>
            <Monogram />
            <span className="wordmark">solve trend</span>
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
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="overlay-socials" aria-label="Social media">
          <a href="https://instagram.com" target="_blank" rel="noreferrer noopener">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer noopener">
            TikTok
          </a>
        </div>
      </div>
    </>
  );
}
