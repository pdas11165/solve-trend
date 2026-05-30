"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatedUnderline } from "./Reveal";
import { DotGridArrow } from "./Icons";

const PROJECTS = [
  {
    name: "Duo Nutrition",
    desc: "Brand identity, ecommerce build and growth marketing for a high-protein DTC brand launched coast-to-coast.",
    chips: ["Brand", "Shopify", "Performance Ads"],
    quote: "Solve Trend felt like an extension of our founding team. The relaunch tripled our conversion overnight.",
    seed: "duo",
  },
  {
    name: "Lesse Studio Rebrand",
    desc: "A full editorial-grade refresh of the Lesse Studio site and design system, with bespoke scroll choreography.",
    chips: ["Identity", "Web", "Motion"],
    quote: "Every detail landed exactly where it needed to. The team thinks in systems, not in pages.",
    seed: "lesse",
  },
  {
    name: "AERUK Digital",
    desc: "3D glass hero, headless CMS, and a measurement stack tying every campaign to revenue impact.",
    chips: ["3D", "Headless", "Analytics"],
    quote: "We finally know what's working. Solve Trend built the whole growth engine in eight weeks.",
    seed: "aeruk",
  },
];

function WorkRow({
  p,
  delay,
}: {
  p: (typeof PROJECTS)[number];
  delay: number;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`work-row st-card ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      <span className="st-card-glow-border" aria-hidden="true" />
      <div className="work-row-inner">
        <div className="work-img-wrap">
          <Image
            src={`https://picsum.photos/seed/${p.seed}/1200/900`}
            alt={`${p.name} project preview`}
            width={1200}
            height={900}
            loading="lazy"
            className="work-img"
            unoptimized
          />
        </div>
        <div className="work-detail">
          <div>
            <h3>{p.name}</h3>
            <p className="desc" style={{ marginTop: 14 }}>
              {p.desc}
            </p>
            <div className="chips" style={{ marginTop: 16 }}>
              {p.chips.map((c) => (
                <span key={c} className="st-tag-glass">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <blockquote className="quote">“{p.quote}”</blockquote>
          <div className="cta-row">
            <a className="btn btn--white" href="#contact">
              Let&apos;s work together
              <DotGridArrow />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function LatestWork() {
  return (
    <section className="latest" id="latest" aria-label="Latest work">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Latest Work</span>
          <AnimatedUnderline />
          <h2>Selected projects.</h2>
        </div>

        <div className="latest-rows">
          {PROJECTS.map((p, i) => (
            <WorkRow key={p.name} p={p} delay={i * 120} />
          ))}
        </div>

        <div className="view-all">
          <a className="btn btn--white" href="#contact">
            View full portfolio
            <DotGridArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
