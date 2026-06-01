"use client";

import * as React from "react";

type Accent = "red" | "amber" | "coral";
const PILLS: { word: string; accent: Accent }[] = [
  { word: "brand", accent: "red" },
  { word: "websites", accent: "amber" },
  { word: "ui/ux", accent: "coral" },
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

function PillIcons() {
  return (
    <span className="hero-pill-icons" aria-hidden="true">
      <span className="hero-pill-icon i1">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 2l2.4 6.9H22l-6 4.4 2.3 7-6.3-4.6L5.7 20l2.3-7-6-4.4h7.6z" />
        </svg>
      </span>
      <span className="hero-pill-icon i2">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      </span>
      <span className="hero-pill-icon i3">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
          <circle cx="12" cy="12" r="9" />
        </svg>
      </span>
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
        We unite{" "}
        {PILLS.map((p, i) => (
          <React.Fragment key={p.word}>
            <span className={`hero-pill accent-${p.accent}`} tabIndex={0}>
              <span className="hero-pill-word">{p.word}</span>
              <PillIcons />
            </span>
            {i < PILLS.length - 1 ? (i === PILLS.length - 2 ? " & " : ", ") : ""}
          </React.Fragment>
        ))}{" "}
        into one product
      </p>
    </div>
  );
}
