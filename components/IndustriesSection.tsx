"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { INDUSTRY_CASES } from "@/lib/industries";
import { asset } from "@/lib/asset";
import { RevealText } from "@/components/ui/reveal-text";

/**
 * designmonks-style industry stack: pastel case cards that pin under the nav
 * and shingle — each card sticks with a growing top offset so the collapsed
 * headers of the cards above stay readable as the next card slides over.
 *
 * Pure CSS sticky (no ScrollTrigger pin) so it composes with Lenis for free.
 */
export default function IndustriesSection() {
  return (
    <section className="industries-section" id="industries" aria-label="Industries we work in">
      <div className="container">
        <div className="industries-head">
          <span className="eyebrow">Industries</span>
          <RevealText
            as="h2"
            text="Wherever your customers are"
            className="section-title industries-title"
          />
          <p className="industries-sub">
            Different industries, same job: find what&rsquo;s stalling growth
            and ship the thing that fixes it.
          </p>
        </div>
      </div>

      <div className="industries-stack">
        {INDUSTRY_CASES.map((item, i) => (
          <article
            key={item.id}
            className="industry-card"
            style={
              {
                "--i": i,
                "--surface": item.tint.surface,
                "--well": item.tint.well,
                "--chip": item.tint.chip,
              } as React.CSSProperties
            }
          >
            <header className="industry-card__header">
              <span className="industry-card__label">{item.industry}</span>
            </header>

            <div className="industry-card__body">
              <div className="industry-card__copy">
                <h3 className="industry-card__title">{item.title}</h3>
                <p className="industry-card__desc">{item.description}</p>

                <dl className="industry-card__meta">
                  <div>
                    <dt>{item.scopeLabel}</dt>
                    <dd>{item.scope}</dd>
                  </div>
                  <div>
                    <dt>{item.durationLabel}</dt>
                    <dd>{item.duration}</dd>
                  </div>
                </dl>

                <a className="industry-card__client" href="/#contact">
                  <span className="industry-card__avatar" aria-hidden="true">
                    {item.client.initials}
                  </span>
                  <span className="industry-card__client-copy">
                    <strong>{item.client.name}</strong>
                    <span>{item.client.role}</span>
                  </span>
                  <ArrowRight className="industry-card__arrow" aria-hidden="true" />
                </a>
              </div>

              <div className="industry-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(item.media)} alt={item.mediaAlt} loading="lazy" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
