"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/asset";

// Alture-recipe testimonials (reference-websites/alture-template_webflow_io.html):
// head + client-data bars | featured image-quote cover | two stacked cards,
// then a giant numbers row. Restyled for the dark shell. Quotes come from the
// real client roster (same names as the logo wall); portraits are generic
// stock, not headshots of named individuals.

const DATA_STATS = [
  { value: 92, label: "of our clients return for a second project" },
  { value: 87, label: "report a stronger brand after relaunch" },
  { value: 74, label: "see higher engagement across digital" },
];

const FEATURED = {
  quote:
    "Solve Trend felt like an extension of our founding team. The relaunch tripled our sign-ups overnight.",
  name: "Orko Connect Care",
  role: "Founding team · Digital health",
  image: "/testimonials/featured-portrait.jpg",
  alt: "A smiling professional in a grey blazer beside an office window.",
};

const SIDE_CARDS = [
  {
    quote:
      "They turned our packaging and site into one story. The brand finally tastes as good as it looks online.",
    name: "BigBite",
    role: "Marketing lead · Food & beverage",
    avatar: "/testimonials/avatar-1.jpg",
    alt: "A smiling man in a blue shirt.",
  },
  {
    quote:
      "Solve Trend gave our developments a brand as premium as the address. Enquiries jumped the week we relaunched.",
    name: "Rupayan Sky Villa",
    role: "Sales director · Real estate",
    avatar: "/testimonials/avatar-2.jpg",
    alt: "A smiling woman with dark hair.",
  },
];

// Placeholder scale numbers — swap in real figures when Promit confirms them.
// "50+" intentionally matches the "50+ Happy Clients" claim in CraftingSection.
const NUMBERS = [
  { prefix: "$", end: 2, suffix: "M+", label: "Revenue influenced by our work" },
  { prefix: "", end: 30, suffix: "K+", label: "Leads generated for our clients" },
  { prefix: "", end: 50, suffix: "+", label: "Brands we've partnered with" },
];

function Stars() {
  return (
    <div className="tsm-stars" aria-label="Rated five out of five">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="tsm-star" aria-hidden="true">
          <path d="M10 1.5l2.47 5.34 5.84.63-4.35 3.94 1.19 5.76L10 14.27l-5.15 2.9 1.19-5.76L1.69 7.47l5.84-.63L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function RollingNumber({
  prefix,
  end,
  suffix,
}: {
  prefix: string;
  end: number;
  suffix: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const proxy = { value: 0 };
      const render = () => {
        el.textContent = `${prefix}${Math.round(proxy.value)}${suffix}`;
      };
      render();

      gsap.matchMedia().add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            proxy.value = end;
            render();
            return;
          }
          gsap.to(proxy, {
            value: end,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: render,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [prefix, end, suffix]);

  return (
    <span ref={ref} className="tsm-number__value">
      {prefix}0{suffix}
    </span>
  );
}

export default function TestimonialShowcase() {
  const rootRef = React.useRef<HTMLElement>(null);

  // Data bars grow to their percentage once scrolled into view.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray<HTMLElement>(".tsm-data__bar-fill");

      gsap.matchMedia().add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          bars.forEach((bar) => {
            const target = `${bar.dataset.value ?? 0}%`;
            if (context.conditions?.reduce) {
              gsap.set(bar, { width: target });
              return;
            }
            gsap.fromTo(
              bar,
              { width: "0%" },
              {
                width: target,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: bar,
                  start: "top 90%",
                  once: true,
                },
              }
            );
          });
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="tsm"
      ref={rootRef}
    >
      <div className="container">
        <div className="tsm-layout">
          <div className="tsm-head">
            <div>
              <span className="eyebrow tsm-eyebrow">
                <span className="tsm-eyebrow__dot" aria-hidden="true" />
                Testimonials
              </span>
              <h2 className="tsm-title">What our clients are saying</h2>
            </div>

            <div className="tsm-data">
              <div className="tsm-data__head">Some data about our clients</div>
              <ul className="tsm-data__items">
                {DATA_STATS.map((stat) => (
                  <li key={stat.label} className="tsm-data__item">
                    <div className="tsm-data__number">{stat.value}%</div>
                    <div className="tsm-data__label">{stat.label}</div>
                    <div className="tsm-data__bar">
                      <div
                        className="tsm-data__bar-fill"
                        data-value={stat.value}
                        style={{ width: "0%" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="tsm-cover">
            <img
              src={asset(FEATURED.image)}
              alt={FEATURED.alt}
              className="tsm-cover__img"
              loading="lazy"
            />
            <div className="tsm-cover__scrim" aria-hidden="true" />
            <figcaption className="tsm-cover__body">
              <div>
                <Stars />
                <blockquote className="tsm-cover__quote">
                  “{FEATURED.quote}”
                </blockquote>
              </div>
              <div className="tsm-author">
                <div className="tsm-author__name">{FEATURED.name}</div>
                <div className="tsm-author__role">{FEATURED.role}</div>
              </div>
            </figcaption>
          </figure>

          <div className="tsm-stack">
            {SIDE_CARDS.map((card) => (
              <article key={card.name} className="tsm-card">
                <div>
                  <Stars />
                  <blockquote className="tsm-card__quote">
                    “{card.quote}”
                  </blockquote>
                </div>
                <div className="tsm-card__author">
                  <img
                    src={asset(card.avatar)}
                    alt={card.alt}
                    className="tsm-card__avatar"
                    loading="lazy"
                  />
                  <div className="tsm-author">
                    <div className="tsm-author__name">{card.name}</div>
                    <div className="tsm-author__role">{card.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="tsm-numbers">
          {NUMBERS.map((num) => (
            <div key={num.label} className="tsm-number">
              <RollingNumber
                prefix={num.prefix}
                end={num.end}
                suffix={num.suffix}
              />
              <p className="tsm-number__desc">{num.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
