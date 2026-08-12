"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Pricing — alture-style: a black rounded panel with a giant "Pricing" word
 * whose lower half is swallowed by glassy backdrop-blur cards pulled up over
 * it. Card edges are inset shadows (no borders); price digits fade via a
 * gradient clipped to the text; CTAs are the gradient-ball buttons.
 */

type Feature = { lead: string; rest: string };

type Tier = {
  name: string;
  cornerLabel: string;
  price: string | null;
  priceNote: string;
  features: Feature[];
  dividerLabel: string;
  cta: string;
  guarantee: string;
  /** The light (featured) button treatment. */
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Launch",
    cornerLabel: "Starter",
    price: "3000",
    priceNote: "/monthly",
    features: [
      { lead: "Brand identity", rest: " & logo design" },
      { lead: "Brand guidelines", rest: " document" },
      { lead: "Custom website", rest: " — design & dev" },
      { lead: "Social marketing", rest: " for 3 months" },
    ],
    dividerLabel: "Open-ended retainer",
    cta: "Start your launch",
    guarantee: "Cancel anytime — no lock-in",
  },
  {
    name: "Growth",
    cornerLabel: "Popular",
    price: "5000",
    priceNote: "/monthly",
    features: [
      { lead: "Everything", rest: " in Launch" },
      { lead: "Ongoing social", rest: " media support" },
      { lead: "Campaigns", rest: " tuned continuously" },
      { lead: "Reporting", rest: " every month" },
    ],
    dividerLabel: "Monthly retainer",
    cta: "Keep growing",
    guarantee: "Cancel anytime — no lock-in",
    featured: true,
  },
  {
    name: "Enterprise",
    cornerLabel: "Custom",
    price: null,
    priceNote: "scoped to you",
    features: [
      { lead: "Custom scope", rest: " & deliverables" },
      { lead: "Multi-brand", rest: ", multi-market" },
      { lead: "Dedicated lead", rest: " on your account" },
      { lead: "Data & AI", rest: " integrations" },
    ],
    dividerLabel: "Scoped per engagement",
    cta: "Book a call",
    guarantee: "Proposal within a week",
  },
];

function GradientButton({
  href,
  children,
  light,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={`pr-button magnetic-cta${light ? " pr-button--light" : ""}`}
    >
      <span className="pr-button__inner">
        <span className="pr-button__gradient" aria-hidden="true">
          <span className="pr-button__ball pr-button__ball--1" />
          <span className="pr-button__ball pr-button__ball--2" />
        </span>
        <span className="pr-button__text">{children}</span>
      </span>
      <span className="pr-button__glow" aria-hidden="true">
        <span className="pr-button__ball pr-button__ball--1" />
        <span className="pr-button__ball pr-button__ball--2" />
      </span>
    </a>
  );
}

function CheckIcon() {
  return (
    <svg className="pr-feature__check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.2 10.2l2.4 2.4 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function PricingSection() {
  const reduce = useReducedMotion();
  const anim = (delay: number) => (reduce ? {} : fadeIn(delay));

  return (
    <section className="pricing-section" id="pricing" aria-label="Pricing">
      <div className="pricing-panel">
        <motion.div className="pricing-badge" {...anim(0)}>
          <span className="pricing-badge__dot" aria-hidden="true" />
          <span className="pricing-badge__label">2 slots available</span>
        </motion.div>

        <motion.h2 className="pricing-giant" {...anim(0.1)}>
          Pricing
        </motion.h2>

        <div className="pricing-blocks">
          {TIERS.map((tier, i) => (
            <motion.article
              key={tier.name}
              className="pricing-block"
              {...anim(0.3 + i * 0.12)}
            >
              <span className="pricing-block__corner">{tier.cornerLabel}</span>

              <div className="pricing-block__head">
                <h3 className="pricing-block__name">{tier.name}</h3>
                <div className="pricing-block__value">
                  {tier.price ? (
                    <span className="pricing-block__money">
                      <sup>$</sup>
                      {tier.price}
                    </span>
                  ) : (
                    <span className="pricing-block__money">Custom</span>
                  )}
                  <span className="pricing-block__period">{tier.priceNote}</span>
                </div>
              </div>

              <ul className="pricing-block__features">
                {tier.features.map((f) => (
                  <li key={f.lead} className="pr-feature">
                    <CheckIcon />
                    <p>
                      <span className="pr-feature__lead">{f.lead}</span>
                      {f.rest}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="pricing-block__foot">
                <div className="pricing-divider" aria-hidden="true">
                  <span className="pricing-divider__line" />
                  <span className="pricing-divider__label">{tier.dividerLabel}</span>
                  <span className="pricing-divider__line" />
                </div>
                <GradientButton href="/#contact" light={tier.featured}>
                  {tier.cta}
                </GradientButton>
                <p className="pricing-block__guarantee">{tier.guarantee}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p className="pricing-info" {...anim(0.7)}>
          All prices in CAD. Every plan starts with a free strategy call — if
          we&rsquo;re not the right fit, we&rsquo;ll tell you.
        </motion.p>
      </div>
    </section>
  );
}
