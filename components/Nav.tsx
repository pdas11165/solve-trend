"use client";

import * as React from "react";
import { DotGridArrow, DotGridIcon, Monogram } from "./Icons";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#latest" },
  { label: "About", href: "#expertise" },
  { label: "Insights", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <header className="nav-shell" aria-label="Primary">
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
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 80}ms` : "0ms" }}
            >
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
