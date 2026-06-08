"use client";

import * as React from "react";
import { DotGridArrow, DotGridIcon, Monogram } from "./Icons";
import { useNavSurfaceTone } from "./useNavSurfaceTone";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#latest" },
  { label: "About", href: "#expertise" },
  { label: "Insights", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const NAV_LOGO_SIZE = Math.round(28 * 1.3);
const NAV_WORDMARK_SIZE = `${18 * 1.3}px`;
const NAV_PILL_GLASS_STYLE: React.CSSProperties = {
  backgroundColor: "var(--nav-pill-fill, rgba(22, 22, 24, 0.14))",
  backdropFilter: "blur(50px) saturate(150%)",
  WebkitBackdropFilter: "blur(50px) saturate(150%)",
};

export default function Nav() {
  const shellRef = React.useRef<HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  useNavSurfaceTone(shellRef);

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
      <header ref={shellRef} className="nav-shell" aria-label="Primary">
        <a href="#top" className="nav-logo" aria-label="Solve Trend — home">
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
