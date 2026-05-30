import * as React from "react";
import { DotGridArrow } from "./Icons";
import HeroHeadline from "./HeroHeadline";

export default function Hero() {
  return (
    <section className="hero st-section-glow" id="top" aria-label="Hero">
      <aside className="hero-side" aria-label="Social links">
        <a href="https://instagram.com" target="_blank" rel="noreferrer noopener">
          ig
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener">
          in
        </a>
        <a href="https://behance.net" target="_blank" rel="noreferrer noopener">
          be
        </a>
      </aside>

      <div className="container">
        <span className="hero-eyebrow eyebrow">
          UX/UI · WEB DESIGN · DIGITAL MARKETING
        </span>
        <HeroHeadline />
        <p className="hero-sub">
          We design, develop, and grow digital brands. End-to-end solutions
          built for scale and performance.
        </p>
        <a className="btn btn--primary hero-cta" href="#contact">
          Start a project
          <DotGridArrow />
        </a>
      </div>
    </section>
  );
}
