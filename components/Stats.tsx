"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  { id: "projects", end: 50, suffix: "+", label: "Projects" },
  { id: "csat", end: 98, suffix: "%", label: "Satisfaction" },
  { id: "roi", end: 3, suffix: "×", label: "ROI uplift" },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const proxy = { value: 0 };
      const render = () => {
        el.textContent = `${Math.round(proxy.value)}${suffix}`;
      };
      render();

      gsap.matchMedia().add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            proxy.value = end;
            render();
            return;
          }
          gsap.to(proxy, {
            value: end,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: render,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          });
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [end, suffix]);

  return <span className="num" ref={ref} />;
}

export default function Stats() {
  return (
    <div className="stats" aria-label="Key results">
      {STATS.map((s) => (
        <div key={s.id} className="stat">
          <Counter end={s.end} suffix={s.suffix} />
          <span className="label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
