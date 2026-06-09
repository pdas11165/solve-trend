"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AROUND_CDN =
  "https://cdn.prod.website-files.com/65647bbe0d57c8abad78e939";

type Chip = {
  src?: string;
  text?: string;
  modifier: string;
};

type Result = {
  id: string;
  value: string;
  end: number;
  suffix: string;
  title: string;
  subtext: string;
  chips: Chip[];
  cursor?: boolean;
};

const RESULTS: Result[] = [
  {
    id: "experience",
    value: "5+",
    end: 5,
    suffix: "+",
    title: "Years of Experience",
    subtext: "Building brands, experiences and intelligent systems.",
    chips: [
      {
        src: `${AROUND_CDN}/6891a46af0b791ba898a7ac1_1.avif`,
        modifier: "crafting-result__chip--1",
      },
      {
        src: `${AROUND_CDN}/6891a46afae8585420502f7c_2.png`,
        modifier: "crafting-result__chip--2",
      },
      {
        src: `${AROUND_CDN}/6891a46acf30c29013082e3c_3.avif`,
        modifier: "crafting-result__chip--3",
      },
    ],
  },
  {
    id: "clients",
    value: "50+",
    end: 50,
    suffix: "+",
    title: "Happy Clients",
    subtext: "Trusted by startups and growing businesses.",
    chips: [
      {
        text: "Startups",
        modifier: "crafting-result__chip--4",
      },
      {
        text: "Scale",
        modifier: "crafting-result__chip--5",
      },
      {
        text: "Trust",
        modifier: "crafting-result__chip--6",
      },
    ],
  },
  {
    id: "projects",
    value: "120+",
    end: 120,
    suffix: "+",
    title: "Projects Delivered",
    subtext: "From identities to AI-powered solutions.",
    chips: [
      {
        src: `${AROUND_CDN}/6891a46a999f186d8190b1bb_8.avif`,
        modifier: "crafting-result__chip--7",
      },
      {
        src: `${AROUND_CDN}/6891a46a87823a871a955d4f_7.png`,
        modifier: "crafting-result__chip--8",
      },
    ],
    cursor: true,
  },
];

function ResultCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null);

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
              start: "top 85%",
              once: true,
            },
          });
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [end, suffix]);

  return (
    <p className="crafting-result__title" ref={ref}>
      0{suffix}
    </p>
  );
}

function ResultCard({ result }: { result: Result }) {
  return (
    <div className="crafting-result">
      <ResultCounter end={result.end} suffix={result.suffix} />
      <div className="crafting-result__bottom">
        <p className="crafting-result__label">{result.title}</p>
        <p className="crafting-result__sub">{result.subtext}</p>
      </div>
      {result.chips.map((chip) => (
        <div
          key={chip.modifier}
          className={`crafting-result__chip ${chip.modifier}`}
        >
          {chip.text ? (
            <span className="crafting-result__chip-label">{chip.text}</span>
          ) : (
            <img src={chip.src} alt="" loading="lazy" />
          )}
          <div className="crafting-result__chip-blur" aria-hidden="true" />
        </div>
      ))}
      {result.cursor ? (
        <img
          className="crafting-result__cursor"
          src={`${AROUND_CDN}/6891ade9b11ad92178b46212_5243840e861bb560a6157abd4379b70f_cursor.avif`}
          alt=""
          loading="lazy"
        />
      ) : null}
    </div>
  );
}

export default function ResultsCards() {
  return (
    <div className="crafting-results" aria-label="Key results">
      {RESULTS.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
