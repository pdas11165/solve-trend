import Link from "next/link";
import { PORTFOLIO_CASE_STUDIES } from "@/lib/portfolio";
import { asset } from "@/lib/asset";
import { DotGridArrow } from "./Icons";

/** Four on the homepage; /projects carries all nine. */
const FEATURED_COUNT = 4;

/**
 * Selected work — numbered rows, Vertora's `.rt-vision-card` pattern.
 *
 * Replaces the old showcase: six full-width alternating cards, each with a 4:3
 * parallax video panel and a blurred accent glow behind it — 3.7 screens and
 * its own visual language. These rows belong to the card system: a rule, a
 * number, a title, one line, and an image that fades in beside the row on
 * hover.
 *
 * Server component — the hover reveal is pure CSS, so this ships no JS.
 */
export default function ProjectsSection() {
  const studies = PORTFOLIO_CASE_STUDIES.slice(0, FEATURED_COUNT);

  return (
    <section id="projects" className="work-section" aria-label="Selected work">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <div className="work-head">
          <div>
            <div className="services-zoom-parallax__eyebrow mb-4">
              <span className="services-brand-dot" aria-hidden="true" />
              <span>Selected work</span>
            </div>
            <h2 className="section-title max-w-2xl">
              Projects we&rsquo;d show you first.
            </h2>
          </div>
          <Link className="work-all" href="/projects">
            View all work
            <DotGridArrow />
          </Link>
        </div>

        <ol className="work-list">
          {studies.map((study, i) => (
            <li
              key={study.slug}
              className="work-row"
              style={{ ["--card-accent" as string]: study.accent }}
            >
              <Link className="work-row__link" href={`/projects#${study.slug}`}>
                <span className="work-row__num">
                  ({String(i + 1).padStart(2, "0")})
                </span>

                <span className="work-row__text">
                  <span className="work-row__title">{study.title}</span>
                  <span className="work-row__category">{study.category}</span>
                </span>

                {/* Floats in beside the row on hover. Gated on
                    `@media (hover: hover)` in globals.css — on touch there is
                    no hover to trigger it, so the row stays a plain readable
                    line rather than a dead image slot. */}
                <span className="work-row__media" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(study.image)} alt="" loading="lazy" />
                </span>

                <span className="work-row__cta">
                  View more
                  <DotGridArrow />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
