"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * "Unmatched benefits" bento (designmonks pattern, our palette): five cards —
 * flexible payment, unlimited revisions (chat mockup), lifetime support
 * (brand-red card), diverse skill set, hand-picked network. The floating
 * visuals get a light scrubbed parallax; copy stays static.
 */

const PAYMENT_CHIPS = ["Monthly", "Quarterly", "Annually"];

const VISA_CARDS = [{ name: "Jamie Liu" }, { name: "Edward Hunt" }, { name: "Avery Cole" }];

const SUPPORT_ITEMS = [
  "Ongoing updates",
  "Priority response handling",
  "Direct line to the team",
];

const SKILL_ROWS = [
  { name: "Brand & Strategy", role: "Positioning, identity", tags: ["Strategy", "Identity"] },
  { name: "Design & Web", role: "Sites that ship fast", tags: ["UX", "Development"] },
  { name: "Motion & Video", role: "Made for the feed", tags: ["Motion", "Edit"] },
  { name: "Software & AI", role: "Custom tools, agents", tags: ["AI", "Automation"] },
];

const NETWORK_DOTS = [
  { x: 18, y: 26, label: "Brand" },
  { x: 58, y: 12, label: "Web" },
  { x: 86, y: 30, label: "Motion" },
  { x: 34, y: 58, label: "AI" },
  { x: 70, y: 66, label: "eCom" },
  { x: 48, y: 88, label: "Design" },
  { x: 12, y: 82, label: "Video" },
];

export default function BenefitsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Light parallax on the floating visuals only — each drifts at its
        // own rate while the section scrolls through the viewport.
        gsap.utils.toArray<HTMLElement>("[data-parallax]", section).forEach((el) => {
          const depth = Number(el.dataset.parallax || 12);
          gsap.fromTo(
            el,
            { yPercent: depth },
            {
              yPercent: -depth,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="benefits-section"
      id="benefits"
      aria-label="Why choose us"
    >
      <div className="container">
        <div className="benefits-head">
          <span className="benefits-chip">Why Choose Us</span>
          <RevealText
            as="h2"
            text="Unmatched benefits for your success"
            className="section-title benefits-title"
          />
        </div>

        <div className="benefits-grid">
          <div className="benefits-row benefits-row--top">
          {/* 1 — Flexible payment */}
          <article className="benefit-card benefit-card--payment">
            <div className="benefit-card__copy">
              <h3>Flexible payment plans</h3>
              <p>Pay your way</p>
              <div className="benefit-chips">
                {PAYMENT_CHIPS.map((c) => (
                  <span key={c} className="benefit-chip">{c}</span>
                ))}
              </div>
              <ul className="benefit-bullets">
                <li>No commitment</li>
                <li>Cancel anytime</li>
              </ul>
            </div>
            <div className="benefit-payment-art" aria-hidden="true">
              {/* Colour blobs sit behind the frosted cards — the glass picks
                  them up as the soft rainbow wash (designmonks recipe). */}
              <span className="benefit-visa-blobs" />
              {VISA_CARDS.map((card, i) => (
                <span
                  key={card.name}
                  className={`benefit-visa benefit-visa--${i + 1}`}
                  data-parallax={6 + i * 5}
                >
                  <span className="benefit-visa__brand">VISA</span>
                  <span className="benefit-visa__num">4455 5491 6118 6164</span>
                  <span className="benefit-visa__name">{card.name}</span>
                </span>
              ))}
            </div>
          </article>

          {/* 2 — Unlimited revisions + chat mockup */}
          <article className="benefit-card benefit-card--revisions">
            <div className="benefit-card__copy">
              <h3>Unlimited revisions</h3>
              <p>
                We iterate until it&rsquo;s right — with lifetime support, so
                your satisfaction holds at every stage.
              </p>
            </div>
            <div className="benefit-chat" aria-hidden="true" data-parallax="6">
              <div className="benefit-chat__bar">
                <span className="benefit-chat__title">Landing animation feedback</span>
                <span className="benefit-chat__count">3+</span>
              </div>
              <div className="benefit-chat__msg">
                <span className="benefit-chat__avatar">PD</span>
                <div>
                  <span className="benefit-chat__name">Promit <em>Today at 2:47 PM</em></span>
                  <p>Hey team, is the landing feedback finalized?</p>
                </div>
              </div>
              <div className="benefit-chat__msg">
                <span className="benefit-chat__avatar benefit-chat__avatar--alt">ST</span>
                <div>
                  <span className="benefit-chat__name">Studio <em>Today at 2:55 PM</em></span>
                  <p>Yep — revision three is live on staging. 👍</p>
                </div>
              </div>
              <div className="benefit-chat__msg">
                <span className="benefit-chat__avatar">PD</span>
                <div>
                  <span className="benefit-chat__name">Promit <em>Today at 3:03 PM</em></span>
                  <p>Excited to see this rolled out 🙌</p>
                </div>
              </div>
            </div>
          </article>
          </div>

          <div className="benefits-row benefits-row--bottom">
          {/* 3 — Lifetime support (brand card) */}
          <article className="benefit-card benefit-card--support">
            <div className="benefit-card__copy">
              <h3>Lifetime support</h3>
              <p>
                Launch is the start, not the handoff. We stay on for what
                breaks, what changes, and what&rsquo;s next.
              </p>
            </div>
            <ul className="benefit-support-list">
              {SUPPORT_ITEMS.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* 4 — Diverse skill set */}
          <article className="benefit-card benefit-card--skills">
            <div className="benefit-skills-card">
              <h4>Diverse skill set</h4>
              <ul>
                {SKILL_ROWS.map((row) => (
                  <li key={row.name}>
                    <span className="benefit-skill__avatar" aria-hidden="true">
                      {row.name.slice(0, 1)}
                    </span>
                    <span className="benefit-skill__who">
                      <strong>{row.name}</strong>
                      <span>{row.role}</span>
                    </span>
                    <span className="benefit-skill__tags">
                      {row.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="benefit-card__copy benefit-card__copy--network">
              <h3>Every discipline in-house</h3>
              <p>
                Strategy, design, engineering, motion, and AI under one roof —
                no handoffs between vendors, no lost context.
              </p>
              <div className="benefit-network" aria-hidden="true" data-parallax="10">
                <span className="benefit-network__rings" />
                {NETWORK_DOTS.map((d) => (
                  <span
                    key={d.label}
                    className="benefit-network__dot"
                    style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  >
                    {d.label}
                  </span>
                ))}
              </div>
            </div>
          </article>
          </div>
        </div>
      </div>
    </section>
  );
}
