"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Gem,
  Globe,
  Sparkles,
  Rocket,
  TrendingUp,
  ShieldCheck,
  PenTool,
  Blocks,
  type LucideIcon,
} from "lucide-react";

const AROUND_CDN =
  "https://cdn.prod.website-files.com/65647bbe0d57c8abad78e939";

type ChipAccent = "red" | "amber" | "coral" | "blue" | "violet";

type Chip = {
  text: string;
  accent: ChipAccent;
  icon: LucideIcon;
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
      { text: "Brand", accent: "red", icon: Gem, modifier: "crafting-result__chip--1" },
      { text: "Web", accent: "blue", icon: Globe, modifier: "crafting-result__chip--2" },
      { text: "AI", accent: "violet", icon: Sparkles, modifier: "crafting-result__chip--3" },
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
      { text: "Startups", accent: "amber", icon: Rocket, modifier: "crafting-result__chip--4" },
      { text: "Scale", accent: "coral", icon: TrendingUp, modifier: "crafting-result__chip--5" },
      { text: "Trust", accent: "red", icon: ShieldCheck, modifier: "crafting-result__chip--6" },
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
      { text: "Design", accent: "blue", icon: PenTool, modifier: "crafting-result__chip--7" },
      { text: "Build", accent: "amber", icon: Blocks, modifier: "crafting-result__chip--8" },
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
      {result.chips.map((chip) => {
        const Icon = chip.icon;
        return (
          <div
            key={chip.modifier}
            className={`crafting-result__chip crafting-result__chip--${chip.accent} ${chip.modifier}`}
          >
            <Icon className="crafting-result__chip-icon" aria-hidden="true" />
            <span className="crafting-result__chip-label">{chip.text}</span>
            <div className="crafting-result__chip-blur" aria-hidden="true" />
          </div>
        );
      })}
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
