import * as React from "react";
import ExpandCards from "./ExpandCards";
import Stats from "./Stats";

export default function Expertise() {
  return (
    <section
      className="expertise"
      id="expertise"
      aria-label="Why choose Solve Trend"
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2 style={{ marginTop: 12 }}>
              A studio that understands strategy, design and engineering as
              one craft.
            </h2>
          </div>
          <p className="lead">
            Tap a card to dive into the discipline. Every engagement is led by
            a senior partner — no account managers between you and the work.
          </p>
        </div>

        <ExpandCards />
        <Stats />
      </div>
    </section>
  );
}
