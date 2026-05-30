"use client";

import * as React from "react";

const STEPS = [
  {
    n: "01",
    title: "Discovery & Strategy",
    body: "Stakeholder interviews, audits, and competitive mapping. We finish with a written brief everyone can point at.",
  },
  {
    n: "02",
    title: "Design & Prototyping",
    body: "Concepts in days, prototypes in weeks. We test interaction in the browser, not in slide decks.",
  },
  {
    n: "03",
    title: "Build & Develop",
    body: "Production code from senior engineers — typed, observable, deployed on Vercel by default.",
  },
  {
    n: "04",
    title: "Launch & Optimize",
    body: "We don't disappear at launch. Experimentation, content and analytics keep compounding the wins.",
  },
];

export default function Process() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);
  const bodyRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    STEPS.forEach((_, i) => {
      const el = bodyRefs.current[i];
      if (!el) return;
      if (openIdx === i) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = "0px";
      }
    });
  }, [openIdx]);

  return (
    <div className="process">
      <h3 className="section-mini">How we work</h3>
      <ul className="process-list">
        {STEPS.map((s, i) => {
          const isOpen = openIdx === i;
          return (
            <li
              key={s.n}
              className={`process-item ${isOpen ? "is-open" : ""}`}
            >
              <button
                type="button"
                className="process-trigger"
                aria-expanded={isOpen}
                aria-controls={`process-body-${i}`}
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <span className="process-num" aria-hidden="true">
                  {s.n}
                </span>
                <span className="process-title">{s.title}</span>
                <span className="process-plus" aria-hidden="true">
                  +
                </span>
              </button>
              <div
                id={`process-body-${i}`}
                className="process-body"
                ref={(el) => {
                  bodyRefs.current[i] = el;
                }}
                role="region"
              >
                <div className="process-body-inner">{s.body}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
