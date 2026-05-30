import * as React from "react";
import Image from "next/image";
import { AnimatedUnderline } from "./Reveal";
import { DotGridIcon } from "./Icons";

const CARDS = [
  {
    num: "01",
    title: "Web Design & Dev",
    count: "6 services",
    img: "https://picsum.photos/seed/webdev/800/1000",
    chips: ["Next.js", "Headless CMS", "Webflow", "Shopify", "Animation"],
  },
  {
    num: "02",
    title: "Brand Identity",
    count: "5 services",
    img: "https://picsum.photos/seed/brand/800/1000",
    chips: ["Logo systems", "Type", "Naming", "Guidelines"],
  },
  {
    num: "03",
    title: "Digital Marketing",
    count: "7 services",
    img: "https://picsum.photos/seed/marketing/800/1000",
    chips: ["SEO", "Performance Ads", "Email", "Content", "Analytics"],
  },
  {
    num: "04",
    title: "Data & AI",
    count: "4 services",
    img: "https://picsum.photos/seed/dataai/800/1000",
    chips: ["Dashboards", "ML pipelines", "Agents", "Personalisation"],
  },
];

export default function WhatWeDo() {
  return (
    <section className="what-we-do" id="services" aria-label="What we do">
      <div className="container">
        <div className="wwd-grid">
          <div className="wwd-left">
            <span className="wwd-eyebrow eyebrow">Company Overview</span>
            <h2>
              What we do —
              <AnimatedUnderline />
            </h2>
            <p
              style={{
                marginTop: 20,
                color: "var(--muted-light)",
                maxWidth: 360,
              }}
            >
              A small, senior team handling everything from first idea to live
              brand — and the growth that follows.
            </p>
          </div>

          <div className="wwd-cards">
            {CARDS.map((c) => (
              <article key={c.num} className="wwd-card st-card">
                <span className="st-card-glow-border" aria-hidden="true" />
                <Image
                  src={c.img}
                  alt={c.title}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="bg-img"
                  unoptimized
                />
                <span className="frosted" aria-hidden="true" />
                <div className="card-inner">
                  <span className="num">{c.num}</span>
                  <div className="title-row">
                    <h3>{c.title}</h3>
                    <span className="sub">{c.count}</span>
                  </div>
                </div>
                <div className="chips" aria-hidden="true">
                  {c.chips.map((chip, i) => (
                    <span
                      key={chip}
                      className="st-tag-glass"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <span className="dot-icon" aria-hidden="true">
                  <DotGridIcon size={18} color="rgba(255,255,255,0.85)" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
