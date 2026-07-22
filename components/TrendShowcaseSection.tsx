"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  Clock,
  DollarSign,
  Megaphone,
  Cpu,
  BarChart3,
  Users,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";

// ── Radar model ──────────────────────────────────────────────────────────
// Five axes, three players. Scores are 0–100 and deliberately opinionated:
// agencies win on craft but lose on speed/cost/tech; freelancers win on
// cost/speed but cap out on scale and rarely bring tooling; Solve Trend is
// the balanced outer envelope.
const AXES = ["Speed", "Cost", "Craft", "Tech & AI", "Scale"];

type Series = {
  id: string;
  label: string;
  color: string;
  scores: number[];
  primary?: boolean;
};

const SERIES: Series[] = [
  {
    id: "agencies",
    label: "Creative Agencies",
    color: "#fb923c",
    scores: [45, 34, 88, 50, 68],
  },
  {
    id: "freelancers",
    label: "Freelancers",
    color: "#c084fc",
    scores: [70, 82, 70, 38, 34],
  },
  {
    id: "solvetrend",
    label: "Solve Trend",
    color: "#22d3ee",
    scores: [92, 78, 90, 96, 88],
    primary: true,
  },
];

const SIZE_W = 400;
const SIZE_H = 380;
const CX = SIZE_W / 2;
const CY = SIZE_H / 2 + 4;
const R = 126;
const RINGS = [0.25, 0.5, 0.75, 1];

const angleFor = (i: number) => ((-90 + i * (360 / AXES.length)) * Math.PI) / 180;

const pointFor = (i: number, v: number): [number, number] => {
  const a = angleFor(i);
  return [CX + Math.cos(a) * R * (v / 100), CY + Math.sin(a) * R * (v / 100)];
};

const polyPoints = (scores: number[]) =>
  scores.map((v, i) => pointFor(i, v).join(",")).join(" ");

const ringPoints = (level: number) =>
  AXES.map((_, i) => pointFor(i, level * 100).join(",")).join(" ");

const labelFor = (i: number) => {
  const a = angleFor(i);
  const lr = R + 26;
  const x = CX + Math.cos(a) * lr;
  const y = CY + Math.sin(a) * lr;
  const cos = Math.cos(a);
  const anchor = Math.abs(cos) < 0.3 ? "middle" : cos > 0 ? "start" : "end";
  return { x, y, anchor: anchor as "start" | "middle" | "end" };
};

function RadarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="w-full max-w-[440px] mx-auto">
      <svg
        viewBox={`0 0 ${SIZE_W} ${SIZE_H}`}
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Radar chart comparing creative agencies, freelancers and Solve Trend across speed, cost, craft, technology and scalability"
      >
        {/* Grid rings */}
        {RINGS.map((level) => (
          <polygon
            key={level}
            points={ringPoints(level)}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth={1}
          />
        ))}
        {/* Spokes */}
        {AXES.map((_, i) => {
          const [x, y] = pointFor(i, 100);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.09)"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygons — grow from the centre, staggered */}
        {SERIES.map((s, si) => (
          <motion.polygon
            key={s.id}
            points={polyPoints(s.scores)}
            fill={s.primary ? s.color : "none"}
            fillOpacity={s.primary ? 0.14 : 0}
            stroke={s.color}
            strokeWidth={s.primary ? 2.5 : 1.6}
            strokeOpacity={s.primary ? 1 : 0.75}
            strokeLinejoin="round"
            strokeDasharray={s.primary ? "0" : "5 4"}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ scale: 0.15, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.15 + si * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Vertex dots for the primary series */}
        {SERIES.filter((s) => s.primary).map((s) =>
          s.scores.map((v, i) => {
            const [x, y] = pointFor(i, v);
            return (
              <motion.circle
                key={`${s.id}-${i}`}
                cx={x}
                cy={y}
                r={3.5}
                fill={s.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.06 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            );
          })
        )}

        {/* Axis labels */}
        {AXES.map((axis, i) => {
          const { x, y, anchor } = labelFor(i);
          return (
            <motion.text
              key={axis}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="fill-zinc-400 font-[family-name:var(--font-display)]"
              style={{ fontSize: 13, fontWeight: 600 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
            >
              {axis}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
}

// ── Detail matrix ────────────────────────────────────────────────────────
type Row = {
  icon: LucideIcon;
  dim: string;
  agency: string;
  freelance: string;
  us: string;
};

const ROWS: Row[] = [
  {
    icon: Megaphone,
    dim: "How they sell it",
    agency: "“Award-winning craft”",
    freelance: "“Flexible & affordable”",
    us: "Craft + speed + systems",
  },
  {
    icon: Clock,
    dim: "Turnaround",
    agency: "Weeks to months",
    freelance: "Unpredictable",
    us: "Days, not quarters",
  },
  {
    icon: DollarSign,
    dim: "Cost model",
    agency: "Heavy monthly retainers",
    freelance: "Hourly, scope creep",
    us: "Flat project pricing",
  },
  {
    icon: Cpu,
    dim: "Tech & AI",
    agency: "Bolt-on, extra cost",
    freelance: "Rarely in the toolkit",
    us: "Built into every workflow",
  },
  {
    icon: BarChart3,
    dim: "Reporting",
    agency: "Monthly slide decks",
    freelance: "Ad-hoc updates",
    us: "Live dashboards",
  },
  {
    icon: Users,
    dim: "Team",
    agency: "Layers of account managers",
    freelance: "One person, one risk",
    us: "Lean senior team",
  },
  {
    icon: Layers,
    dim: "Scaling up",
    agency: "Slow to ramp",
    freelance: "Caps out fast",
    us: "Scales with automation",
  },
];

const ROW_GRID =
  "grid grid-cols-[1.15fr_1fr_1fr_1.25fr] items-stretch";

function ComparisonMatrix() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[720px]">
        {/* Header */}
        <div className={`${ROW_GRID} text-xs uppercase tracking-[0.14em]`}>
          <div className="px-4 py-4 text-zinc-500 font-semibold flex items-end">
            The details
          </div>
          <div className="px-4 py-4 text-zinc-400 font-semibold flex items-end">
            Creative Agencies
          </div>
          <div className="px-4 py-4 text-zinc-400 font-semibold flex items-end">
            Freelancers
          </div>
          <div className="px-4 py-4 font-bold flex items-end gap-2 rounded-t-2xl bg-cyan-400/10 text-cyan-300 border-x border-t border-cyan-400/20">
            Solve Trend
          </div>
        </div>

        {ROWS.map((row, i) => {
          const Icon = row.icon;
          const last = i === ROWS.length - 1;
          return (
            <motion.div
              key={row.dim}
              className={`${ROW_GRID} border-t border-white/[0.06] text-sm`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            >
              <div className="px-4 py-4 flex items-center gap-2.5 text-zinc-300 font-medium">
                <Icon size={16} className="text-zinc-500 shrink-0" />
                {row.dim}
              </div>
              <div className="px-4 py-4 flex items-center text-zinc-500">
                {row.agency}
              </div>
              <div className="px-4 py-4 flex items-center text-zinc-500">
                {row.freelance}
              </div>
              <div
                className={`px-4 py-4 flex items-center gap-2 text-zinc-100 font-medium bg-cyan-400/10 border-x border-cyan-400/20 ${
                  last ? "rounded-b-2xl border-b" : ""
                }`}
              >
                <Check size={15} className="text-cyan-400 shrink-0" />
                {row.us}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      {SERIES.map((s) => (
        <div key={s.id} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: s.primary ? s.color : "transparent",
              border: `2px solid ${s.color}`,
            }}
          />
          <span className={s.primary ? "text-white font-semibold" : "text-zinc-400"}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TrendShowcaseSection() {
  return (
    <section
      className="relative w-full bg-[var(--bg-dark)] text-zinc-100 overflow-hidden selection:bg-cyan-900/50"
      aria-label="How Solve Trend compares with creative agencies and freelancers"
    >
      {/* Ambient glow + grain */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-24 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">The Comparison</span>
          <RevealText
            as="h2"
            text="Agencies, freelancers, or Solve Trend?"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          />
          <p className="mt-4 leading-relaxed text-zinc-400">
            Creative agencies sell craft. Freelancers sell flexibility. We built
            Solve Trend to hand you both — with modern tooling and AI doing the
            heavy lifting. Here&rsquo;s the honest breakdown.
          </p>
        </div>

        {/* Radar + legend */}
        <div className="mx-auto mb-16 max-w-xl">
          <RadarChart />
          <div className="mt-6">
            <Legend />
          </div>
        </div>

        {/* Detail matrix */}
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-2 md:p-4 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <ComparisonMatrix />
        </div>

        {/* Closing line */}
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-zinc-500">
          Same craft you&rsquo;d expect from a top studio. The speed and pricing
          you&rsquo;d hope for from a freelancer. None of the trade-offs.
        </p>
      </div>
    </section>
  );
}
