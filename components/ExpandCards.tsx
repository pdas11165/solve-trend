"use client";

import * as React from "react";
import { DotGridArrow } from "./Icons";

type Card = {
  id: string;
  title: string;
  desc: string;
  color: string;
  tag: string;
  bullets: string[];
};

const CARDS: Card[] = [
  {
    id: "web",
    title: "Web Design",
    desc: "Sites that feel inevitable, ship fast, and rank.",
    color: "#FF4500",
    tag: "Design",
    bullets: [
      "Marketing sites and product surfaces",
      "Headless CMS + JAMstack architecture",
      "Performance budgets baked into the brief",
      "Animation systems that respect reduced-motion",
    ],
  },
  {
    id: "brand",
    title: "Brand Identity",
    desc: "Distinct visual systems built to scale.",
    color: "#1A1AFF",
    tag: "Identity",
    bullets: [
      "Logo systems, type pairings, colour governance",
      "Voice, naming and verbal identity",
      "Brand guidelines that engineers will actually read",
      "Rollout playbooks across web, print and product",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    desc: "Compounding growth across every channel.",
    color: "#00C896",
    tag: "Growth",
    bullets: [
      "Paid acquisition with creative testing",
      "Lifecycle, email and CRM automation",
      "SEO, content and editorial calendars",
      "Attribution and channel-mix modelling",
    ],
  },
  {
    id: "data",
    title: "Data & AI",
    desc: "Dashboards, agents and shipped intelligence.",
    color: "#FFD700",
    tag: "Intelligence",
    bullets: [
      "Data warehouse and analytics pipelines",
      "LLM-powered agents and copilots",
      "Personalisation and recommendations",
      "Internal ops automations",
    ],
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    desc: "Interfaces that make complex products feel obvious.",
    color: "#9B59B6",
    tag: "Product",
    bullets: [
      "Research, mapping and information architecture",
      "Interactive prototypes and usability testing",
      "Design systems and Figma libraries",
      "Hand-off and engineering partnership",
    ],
  },
];

export default function ExpandCards() {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const refs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const originRects = React.useRef<Record<string, DOMRect>>({});

  React.useEffect(() => {
    if (openId) {
      document.body.classList.add("expand-open");
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.classList.remove("expand-open");
        window.removeEventListener("keydown", onKey);
      };
    }
    document.body.classList.remove("expand-open");
  }, [openId]);

  const open = (id: string) => {
    const el = refs.current[id];
    if (!el) return;
    originRects.current[id] = el.getBoundingClientRect();
    setOpenId(id);
  };

  const close = () => setOpenId(null);

  return (
    <div className="expand-row" role="list">
      {CARDS.map((c) => {
        const isOpen = openId === c.id;
        return (
          <div
            key={c.id}
            role="listitem"
            ref={(el) => {
              refs.current[c.id] = el;
            }}
            className={`expand-card ${isOpen ? "is-expanded" : ""}`}
            style={{ backgroundColor: c.color }}
            onClick={() => !isOpen && open(c.id)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !isOpen) {
                e.preventDefault();
                open(c.id);
              }
            }}
            tabIndex={isOpen ? -1 : 0}
            aria-expanded={isOpen}
          >
            <div className="expand-collapsed">
              <div className="top-row">
                <h3>{c.title}</h3>
                <span className="st-tag-glass">{c.tag}</span>
              </div>
              <p style={{ marginTop: 16 }}>{c.desc}</p>
            </div>

            <div className="expand-detail" aria-hidden={!isOpen}>
              <span className="st-tag-glass" style={{ alignSelf: "flex-start" }}>
                {c.tag}
              </span>
              <h3>{c.title}</h3>
              <p style={{ fontSize: "1.125rem", maxWidth: "60ch" }}>{c.desc}</p>
              <ul>
                {c.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a className="btn btn--primary" href="#contact">
                Start a Project
                <DotGridArrow />
              </a>
            </div>

            <button
              type="button"
              className="expand-close"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
