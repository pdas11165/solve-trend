"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DotGridArrow, Monogram } from "./Icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SERVICES_LINKS = [
  "Brand Strategy",
  "Brand Identity",
  "Web Design & Dev",
  "Digital Marketing",
  "UI/UX Design",
  "Data & AI",
];
const COMPANY_LINKS = ["About", "Team", "Careers", "Press"];
const RESOURCES_LINKS = ["Insights", "Case Studies", "Newsletter", "Contact"];
const LEGAL_LINKS = ["Privacy", "Terms", "Cookies", "Accessibility"];

function SocialIcon({ label, d }: { label: string; d: string }) {
  return (
    <a href="#" aria-label={label}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={d} />
      </svg>
    </a>
  );
}

export default function Footer() {
  const rootRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".footer-cta h2", ".footer-col", ".footer-top .nav-logo"],
          { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-cta h2", {
          y: 40,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".footer-cta",
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(".footer-cta .btn", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: ".footer-cta",
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(".footer-top .nav-logo", {
          scale: 0.85,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-top",
            start: "top 90%",
            once: true,
          },
        });

        ScrollTrigger.batch(".footer-col", {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.from(batch, {
              y: 32,
              opacity: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} style={{ display: "contents" }}>
      <section
        className="footer-cta st-section-glow st-cta-section"
        id="contact"
        aria-label="Call to action"
      >
        <div className="container footer-cta-inner">
          <h2>Ready to build something great?</h2>
          <a className="btn btn--primary" href="mailto:hello@solvetrend.example.com">
            Get Started
            <DotGridArrow />
          </a>
        </div>
      </section>

      <footer className="footer" aria-label="Site footer">
        <div className="container">
          <div className="footer-top">
            <a href="#top" className="nav-logo" aria-label="Solve Trend — home">
              <Monogram />
              <span className="wordmark">solve trend</span>
            </a>
            <p className="footer-tagline">
              Full-service digital marketing &amp; design studio based in
              Charlottetown, Prince Edward Island.
            </p>
            <a
              className="btn btn--primary footer-cta-btn"
              href="mailto:hello@solvetrend.example.com"
            >
              Start a project
              <DotGridArrow />
            </a>
          </div>

          <div className="footer-mid">
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {SERVICES_LINKS.map((l) => (
                  <li key={l}>
                    <a href="#services">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                {COMPANY_LINKS.map((l) => (
                  <li key={l}>
                    <a href="#expertise">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                {RESOURCES_LINKS.map((l) => (
                  <li key={l}>
                    <a href="#faq">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                {LEGAL_LINKS.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Solve Trend. All rights reserved.</span>
            <div className="footer-socials">
              <SocialIcon
                label="Instagram"
                d="M12 2.2c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.07 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.07-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-1.05.05-1.62.22-2 .37-.5.2-.86.43-1.24.81-.38.38-.61.74-.81 1.24-.15.38-.32.95-.37 2-.07 1.24-.07 1.59-.07 4.74s0 3.5.07 4.74c.05 1.05.22 1.62.37 2 .2.5.43.86.81 1.24.38.38.74.61 1.24.81.38.15.95.32 2 .37 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c1.05-.05 1.62-.22 2-.37.5-.2.86-.43 1.24-.81.38-.38.61-.74.81-1.24.15-.38.32-.95.37-2 .07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.05-1.05-.22-1.62-.37-2a3.3 3.3 0 0 0-.81-1.24 3.3 3.3 0 0 0-1.24-.81c-.38-.15-.95-.32-2-.37C15.5 4 15.15 4 12 4zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3zm5.13-2.07a1.16 1.16 0 1 1 0 2.32 1.16 1.16 0 0 1 0-2.32z"
              />
              <SocialIcon
                label="LinkedIn"
                d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.55v14H.22V8zm7.66 0h4.36v1.92h.06c.6-1.14 2.07-2.34 4.27-2.34 4.57 0 5.42 3 5.42 6.92V22h-4.55v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.44 1.66-2.44 3.36V22H7.88V8z"
              />
              <SocialIcon
                label="TikTok"
                d="M19.6 6.32a5.62 5.62 0 0 1-3.4-1.13 5.6 5.6 0 0 1-2.18-3.94H10.6v13.85a2.86 2.86 0 1 1-2.86-2.86c.3 0 .58.05.85.13V8.86a6.27 6.27 0 1 0 5.43 6.21V9.13a8.9 8.9 0 0 0 5.58 1.94V7.6c-.34 0-.67-.05-1-.13l.01-1.15z"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
