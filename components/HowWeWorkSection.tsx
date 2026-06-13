"use client";

import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";
import { WordHeroPage } from "@/components/ui/scroll-hero-section";
import {
  PROCESS_DESCRIPTIONS,
  PROCESS_IMAGES,
  PROCESS_STEPS,
  PROCESS_WORDS,
} from "@/lib/process-steps";

const TRACK_HEIGHT_VH = PROCESS_STEPS.length * 40 + 60;

export default function HowWeWorkSection() {
  return (
    <section
      className="how-we-work"
      id="process"
      aria-label="How we work"
    >
      <div className="container how-we-work__intro">
        <span className="eyebrow">Process</span>
        <h2 className="how-we-work__heading">How we work</h2>
        <p className="how-we-work__sub">
          Four focused phases — from first conversation to compounding results
          after launch.
        </p>
      </div>

      <div
        className="how-we-work__track"
        style={{ minHeight: `${TRACK_HEIGHT_VH}vh` }}
      >
        <div className="how-we-work__split">
          <div className="how-we-work__left">
            <ScrollTiltedGrid
              images={PROCESS_IMAGES}
              loop={false}
              columns={1}
              side="L"
              maxWidth="md"
              gap={10}
              aspectRatio="4/5"
              maxTilt={50}
              maxBlur={6}
              className="how-we-work__grid"
            />
          </div>
          <div className="how-we-work__right">
            <WordHeroPage
              embedded
              items={[...PROCESS_WORDS]}
              prefix="We"
              descriptions={[...PROCESS_DESCRIPTIONS]}
              theme="light"
              animate
              hue={10}
              startVh={50}
              spaceVh={50}
              showFooter={false}
              debug={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
