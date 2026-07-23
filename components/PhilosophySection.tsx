"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { ScrollCharacterText } from "@/components/ui/text-scroll-animation";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { DotGridArrow } from "./Icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PhilosophySection() {
  const root = React.useRef<HTMLElement>(null);
  const introRef = React.useRef<HTMLDivElement>(null);
  const eyebrowRef = React.useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const intro = introRef.current;
      const eyebrow = eyebrowRef.current;
      if (!intro || !eyebrow) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(eyebrow, { opacity: 1, y: 0 });
        gsap.set(".philosophy-post__text > *", { opacity: 1, y: 0 });
        gsap.set(".philosophy-post__media", { clipPath: "none" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(eyebrow, { opacity: 0, y: 16 });

        gsap.to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 80%",
            once: true,
          },
        });

        // The grid texture drifts against the scroll direction; the pattern
        // repeats every 54px so no edges are ever exposed.
        gsap.fromTo(
          ".philosophy-section__intro-grid",
          { backgroundPosition: "0px 0px, 0px 0px" },
          {
            backgroundPosition: "0px -108px, 0px -108px",
            ease: "none",
            scrollTrigger: {
              trigger: intro,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // Editorial rows: text lines rise in sequence while the image
        // wipes open from the left edge and settles out of its drift.
        gsap.utils.toArray<HTMLElement>(".philosophy-post").forEach((row) => {
          const textEls = row.querySelectorAll(".philosophy-post__text > *");
          const media = row.querySelector(".philosophy-post__media");
          const img = row.querySelector(".philosophy-post__media img");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              once: true,
            },
          });

          tl.from(textEls, {
            opacity: 0,
            y: 32,
            duration: 0.7,
            stagger: 0.09,
            ease: "power3.out",
          });
          if (media) {
            tl.fromTo(
              media,
              { clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" },
              0.15
            );
          }
          if (img) {
            tl.from(
              img,
              { scale: 1.18, xPercent: 6, duration: 1.4, ease: "power2.out" },
              0.15
            );
          }
        });
      });

      ScrollTrigger.refresh();

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="philosophy-section philosophy-section--dark"
      id="philosophy"
      aria-label="Latest blog posts"
    >
      <div ref={introRef} className="philosophy-section__intro">
        <div className="philosophy-section__intro-grid" aria-hidden="true" />
        <div className="philosophy-section__intro-content">
          <span ref={eyebrowRef} className="eyebrow">
            Insights
          </span>
          <h2 style={{ perspective: "500px" }}>
            <ScrollCharacterText
              text="Read our latest blog posts."
              scrollTargetRef={introRef}
              scrollOffset={["start 0.9", "start 0.5"]}
            />
          </h2>
        </div>
      </div>

      <div className="philosophy-posts">
        {BLOG_POSTS.map((post, i) => (
          <article key={post.slug} className="philosophy-post">
            <div className="philosophy-post__text">
              <p className="philosophy-post__meta">
                <span
                  className="philosophy-post__dot"
                  style={{ backgroundColor: post.color }}
                  aria-hidden="true"
                />
                <span>{post.category}</span>
                <span aria-hidden="true" className="philosophy-post__meta-sep">
                  —
                </span>
                <span>№ {String(i + 1).padStart(2, "0")}</span>
              </p>
              <h3 className="philosophy-post__headline">{post.title}</h3>
              <p className="philosophy-post__body">{post.excerpt}</p>
              <Link className="philosophy-post__link" href={`/blog/${post.slug}`}>
                Read the post
                <DotGridArrow />
              </Link>
            </div>
            <div className="philosophy-post__media">
              <ParallaxMedia>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt={post.coverAlt} loading="lazy" />
              </ParallaxMedia>
            </div>
          </article>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem 1.5rem 1rem",
        }}
      >
        <Link className="philosophy-post__link" href="/blog">
          View all insights
          <DotGridArrow />
        </Link>
      </div>
    </section>
  );
}
