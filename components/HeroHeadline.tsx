"use client";

import * as React from "react";

type Accent = "red" | "amber" | "coral";
const PILLS: { word: string; accent: Accent }[] = [
  { word: "brand", accent: "red" },
  { word: "digital experience", accent: "amber" },
  { word: "website", accent: "coral" },
  { word: "intelligent system", accent: "red" },
];

const ROTATING_SERVICES = ["Trend", "Brand", "Websites", "UI/UX", "Strategy", "Motion", "Content"];

function shiftStyle(
  order: number,
  activePill: number | null,
  shift: string
): React.CSSProperties | undefined {
  if (activePill === null) return undefined;
  const activeOrder = activePill * 2 + 1;
  if (order < activeOrder) return { transform: `translateX(calc(-1 * ${shift}))` };
  if (order > activeOrder) return { transform: `translateX(${shift})` };
  return undefined;
}

function RotatingTrend() {
  const [paused, setPaused] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const currentWord = ROTATING_SERVICES[index];
  const isRotating = currentWord !== "Trend";

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_SERVICES.length);
    }, 1100);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <span
      className={`hero-trend${isRotating ? " is-rotating" : ""}`}
      tabIndex={0}
      role="text"
      aria-label="Trend"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="hero-trend-inner" key={`s-${index}`}>
        {currentWord}
      </span>
    </span>
  );
}

function HeroPill({
  word,
  accent,
  index,
  style,
  onActivate,
  onDeactivate,
}: {
  word: string;
  accent: Accent;
  index: number;
  style?: React.CSSProperties;
  onActivate: (index: number, anchor: HTMLSpanElement) => void;
  onDeactivate: () => void;
}) {
  const anchorRef = React.useRef<HTMLSpanElement>(null);
  const activate = () => {
    if (anchorRef.current) onActivate(index, anchorRef.current);
  };

  return (
    <span
      ref={anchorRef}
      className={`hero-pill-anchor pill-${index}`}
      data-word={word}
      style={style}
      onMouseEnter={activate}
    >
      <span
        className={`hero-pill pill-${index} accent-${accent}`}
        tabIndex={0}
        onFocus={activate}
        onBlur={(e) => {
          const next = e.relatedTarget as Node | null;
          if (next && e.currentTarget.closest(".hero-subtitle")?.contains(next)) return;
          onDeactivate();
        }}
      >
        <span className="hero-pill-word">{word}</span>
      </span>
    </span>
  );
}

export default function HeroHeadline() {
  const [activePill, setActivePill] = React.useState<number | null>(null);
  const [pillShift, setPillShift] = React.useState("28px");

  const handlePillActivate = (index: number, anchor: HTMLSpanElement) => {
    setActivePill(index);
    setPillShift(`${Math.max(16, Math.round(anchor.offsetWidth * 0.2 + 14))}px`);
  };

  const handlePillDeactivate = () => setActivePill(null);

  return (
    <div className="hero-monument">
      <h1 className="hero-wordmark">
        Solve<span className="hero-wordmark-reg">&reg;</span>
        <RotatingTrend />
      </h1>
      <p className="hero-subtitle" onMouseLeave={handlePillDeactivate}>
        <span
          className="hero-subtitle-chunk chunk-a"
          style={shiftStyle(0, activePill, pillShift)}
        >
          We build{" "}
        </span>
        {PILLS.map((p, i) => (
          <React.Fragment key={p.word}>
            <HeroPill
              word={p.word}
              accent={p.accent}
              index={i}
              style={shiftStyle(i * 2 + 1, activePill, pillShift)}
              onActivate={handlePillActivate}
              onDeactivate={handlePillDeactivate}
            />
            {i === 0 ? (
              <span
                className="hero-subtitle-chunk chunk-b"
                style={shiftStyle(2, activePill, pillShift)}
              >
                ,{" "}
              </span>
            ) : null}
            {i === 1 ? (
              <span
                className="hero-subtitle-chunk chunk-c"
                style={shiftStyle(4, activePill, pillShift)}
              >
                ,{" "}
              </span>
            ) : null}
            {i === 2 ? (
              <span
                className="hero-subtitle-chunk chunk-d"
                style={shiftStyle(6, activePill, pillShift)}
              >
                {" "}
                and{" "}
              </span>
            ) : null}
          </React.Fragment>
        ))}
        <span
          className="hero-subtitle-chunk chunk-e"
          style={shiftStyle(8, activePill, pillShift)}
        >
          {" "}
          that help ambitious businesses grow.
        </span>
      </p>
    </div>
  );
}
