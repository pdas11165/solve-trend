"use client";

import * as React from "react";

type Accent = "red" | "amber" | "coral";
const PILLS: { word: string; accent: Accent }[] = [
  { word: "brand", accent: "red" },
  { word: "digital experience", accent: "amber" },
  { word: "website", accent: "coral" },
  { word: "intelligent system", accent: "red" },
];

const ROTATING_SERVICES = ["Brand", "Websites", "UI/UX", "Strategy", "Motion", "Content"];

function RotatingTrend() {
  const [active, setActive] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!active) {
      setIndex(0);
      return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_SERVICES.length);
    }, 1100);
    return () => clearInterval(id);
  }, [active]);

  return (
    <span
      className={`hero-trend${active ? " is-rotating" : ""}`}
      tabIndex={0}
      role="text"
      aria-label="Trend"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <span className="hero-trend-inner" key={active ? `s-${index}` : "trend"}>
        {active ? ROTATING_SERVICES[index] : "Trend"}
      </span>
    </span>
  );
}

function HeroPill({ word, accent, index }: { word: string; accent: Accent; index: number }) {
  return (
    <span className={`hero-pill pill-${index} accent-${accent}`} tabIndex={0}>
      <span className="hero-pill-word">{word}</span>
    </span>
  );
}

export default function HeroHeadline() {
  return (
    <div className="hero-monument">
      <h1 className="hero-wordmark">
        Solve<span className="hero-wordmark-reg">&reg;</span>
        <RotatingTrend />
      </h1>
      <p className="hero-subtitle">
        <span className="hero-subtitle-chunk chunk-a">We build </span>
        {PILLS.map((p, i) => (
          <React.Fragment key={p.word}>
            <HeroPill word={p.word} accent={p.accent} index={i} />
            {i === 0 ? <span className="hero-subtitle-chunk chunk-b">, </span> : null}
            {i === 1 ? <span className="hero-subtitle-chunk chunk-c">, </span> : null}
            {i === 2 ? <span className="hero-subtitle-chunk chunk-d"> and </span> : null}
          </React.Fragment>
        ))}
        <span className="hero-subtitle-chunk chunk-e"> that help ambitious businesses grow.</span>
      </p>
    </div>
  );
}
