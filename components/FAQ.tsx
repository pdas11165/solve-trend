"use client";

import * as React from "react";
import { ScrollCharacterText } from "@/components/ui/text-scroll-animation";
import ScrollFAQAccordion, {
  type FAQItem,
} from "@/components/ui/scroll-faqaccordion";

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer:
      "Strategy, brand identity, web design and development, UI/UX, digital marketing, SEO, and data/AI integrations. Most engagements blend two or three of these.",
  },
  {
    id: 2,
    question: "How long does a project take?",
    answer:
      "Brand identity systems usually run 4–6 weeks. Web design and development engagements typically land in 8–12 weeks. Growth retainers are continuous.",
  },
  {
    id: 3,
    question: "Do you work internationally?",
    answer:
      "Yes — we're based in Charlottetown, PEI and work with founders across North America, the UK, and the EU. Async-first, in-person on request.",
  },
  {
    id: 4,
    question: "What is your pricing?",
    answer:
      "Projects start at CAD $18k for focused work and scale into the six figures for full brand-and-build engagements. We scope after a discovery call.",
  },
  {
    id: 5,
    question: "How do I start?",
    answer:
      "Send a short note about what you're building. We reply within one business day with either next steps or a referral if we're not the right fit.",
  },
];

export default function FAQ() {
  const rootRef = React.useRef<HTMLElement>(null);

  return (
    <section ref={rootRef} className="faq" id="faq" aria-label="Frequently asked questions">
      <div className="container">
        <ScrollFAQAccordion
          data={FAQ_DATA}
          header={
            <>
              <span className="eyebrow">Common Questions</span>
              <h2 style={{ marginTop: 12, perspective: "500px" }}>
                <ScrollCharacterText
                  text="Everything else you might ask."
                  scrollTargetRef={rootRef}
                  scrollOffset={["start 0.9", "start 0.5"]}
                />
              </h2>
            </>
          }
        />
      </div>
    </section>
  );
}
