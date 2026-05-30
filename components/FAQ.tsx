"use client";

import * as React from "react";

const QUESTIONS = [
  {
    q: "What services do you offer?",
    a: "Strategy, brand identity, web design and development, UI/UX, digital marketing, SEO, and data/AI integrations. Most engagements blend two or three of these.",
  },
  {
    q: "How long does a project take?",
    a: "Brand identity systems usually run 4–6 weeks. Web design and development engagements typically land in 8–12 weeks. Growth retainers are continuous.",
  },
  {
    q: "Do you work internationally?",
    a: "Yes — we're based in Charlottetown, PEI and work with founders across North America, the UK, and the EU. Async-first, in-person on request.",
  },
  {
    q: "What is your pricing?",
    a: "Projects start at CAD $18k for focused work and scale into the six figures for full brand-and-build engagements. We scope after a discovery call.",
  },
  {
    q: "How do I start?",
    a: "Send a short note about what you're building. We reply within one business day with either next steps or a referral if we're not the right fit.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const bodyRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    QUESTIONS.forEach((_, i) => {
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
    <section className="faq" id="faq" aria-label="Frequently asked questions">
      <div className="container">
        <span className="eyebrow">Common Questions</span>
        <h2 style={{ marginTop: 12 }}>Everything else you might ask.</h2>

        <ul className="faq-list">
          {QUESTIONS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-body-${i}`}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  id={`faq-body-${i}`}
                  className="faq-body"
                  ref={(el) => {
                    bodyRefs.current[i] = el;
                  }}
                  role="region"
                >
                  <div className="faq-body-inner">{item.a}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
