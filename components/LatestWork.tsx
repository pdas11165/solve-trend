"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedUnderline } from "./Reveal";
import { DotGridArrow } from "./Icons";
import { useParallaxLayer } from "@/lib/scroll-parallax";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
}: {
  p: (typeof PROJECTS)[number];
}) {
  const ref = React.useRef<HTMLElement>(null);
  const imgRef = React.useRef<HTMLDivElement>(null);
  const detailRef = React.useRef<HTMLDivElement>(null);
  const chipsRef = React.useRef<HTMLDivElement>(null);

  useParallaxLayer(imgRef, { speed: 0.65, trigger: ref });
  useParallaxLayer(detailRef, { speed: 0.35, trigger: ref });

  useGSAP(
    () => {
      const row = ref.current;
      const imgWrap = imgRef.current;
      const chips = chipsRef.current;
      if (!row) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(row, { opacity: 1, y: 0 });
        if (imgWrap) gsap.set(imgWrap, { clipPath: "inset(0 0 0 0)" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(row, { opacity: 0, y: 24 });
        if (imgWrap) gsap.set(imgWrap, { clipPath: "inset(0 100% 0 0)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            once: true,
          },
        });

        tl.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        }).to(
          imgWrap,
          {
            clipPath: "inset(0 0 0 0)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.4"
        );

        if (chips) {
          tl.from(
            chips.querySelectorAll(".st-tag-glass"),
            {
              opacity: 0,
              y: 12,
              scale: 0.92,
              duration: 0.4,
              stagger: 0.06,
              ease: "back.out(1.4)",
            },
            "-=0.3"
          );
        }
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <article ref={ref} className="work-row st-card">
      <span className="st-card-glow-border" aria-hidden="true" />
      <div className="work-row-inner">
        <div className="work-img-wrap" ref={imgRef}>
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
        <div className="work-detail" ref={detailRef}>
          <div>
            <h3>{p.name}</h3>
            <p className="desc" style={{ marginTop: 14 }}>
              {p.desc}
            </p>
            <div className="chips" style={{ marginTop: 16 }} ref={chipsRef}>
              {p.chips.map((c) => (
                <span key={c} className="st-tag-glass">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <blockquote className="quote">&ldquo;{p.quote}&rdquo;</blockquote>
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
          {PROJECTS.map((p) => (
            <WorkRow key={p.name} p={p} />
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
