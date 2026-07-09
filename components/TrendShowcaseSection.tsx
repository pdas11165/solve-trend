"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  LineChart,
  ChevronRight,
  Zap,
  Timer,
  TrendingDown,
  Target,
  type LucideIcon,
} from "lucide-react";

type PlatformFeature = {
  label: string;
  value: number;
  icon: LucideIcon;
};

type PlatformData = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
  };
  stats: { connectionStatus: string; efficiency: number };
  features: PlatformFeature[];
};

const AGENCY_DATA: Record<string, PlatformData> = {
  competitors: {
    id: "competitors",
    label: "Them",
    title: "Traditional Agencies",
    description:
      "Slow execution, outdated SEO tactics, and opaque reporting. You pay for the hours, not the results.",
    image:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800",
    colors: {
      gradient: "from-red-600 to-rose-900",
      glow: "bg-red-500",
      ring: "border-l-red-500/50",
    },
    stats: { connectionStatus: "Lagging", efficiency: 32 },
    features: [
      { label: "Execution Speed", value: 35, icon: Timer },
      { label: "Expected ROI", value: 42, icon: TrendingDown },
    ],
  },
  solvetrend: {
    id: "solvetrend",
    label: "Solve Trend",
    title: "Digital Dominance",
    description:
      "Data-driven growth, agile marketing, and transparent ROI. We scale your brand with precision and speed.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    colors: {
      gradient: "from-cyan-500 to-blue-900",
      glow: "bg-cyan-400",
      ring: "border-r-cyan-400/50",
    },
    stats: { connectionStatus: "Optimized", efficiency: 98 },
    features: [
      { label: "Growth Velocity", value: 96, icon: Zap },
      { label: "Conversion Rate", value: 92, icon: Target },
    ],
  },
};

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: "blur(5px)" },
  },
  image: (isCompetitor: boolean) => ({
    initial: {
      opacity: 0,
      scale: 1.5,
      filter: "blur(15px)",
      rotate: isCompetitor ? -30 : 30,
      x: isCompetitor ? -80 : 80,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotate: 0,
      x: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      filter: "blur(20px)",
      transition: { duration: 0.25 },
    },
  }),
};

const BackgroundGradient = ({ isCompetitor }: { isCompetitor: boolean }) => (
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      animate={{
        background: isCompetitor
          ? "radial-gradient(circle at 0% 50%, rgba(239, 68, 68, 0.12), transparent 50%)"
          : "radial-gradient(circle at 100% 50%, rgba(6, 182, 212, 0.15), transparent 50%)",
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const PlatformVisual = ({
  data,
  isCompetitor,
}: {
  data: PlatformData;
  isCompetitor: boolean;
}) => (
  <motion.div layout="position" className="relative group shrink-0">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`absolute inset-[-20%] rounded-full border border-dashed border-white/10 ${data.colors.ring}`}
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-2xl opacity-40`}
    />

    <div className="relative h-80 w-80 md:h-[450px] md:w-[450px] rounded-full border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden bg-zinc-900/50 backdrop-blur-md">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center p-2"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={data.title}
            variants={ANIMATIONS.image(isCompetitor)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full object-cover rounded-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>

    <motion.div
      layout="position"
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 bg-zinc-950/90 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur shadow-xl">
        <span className={`h-2 w-2 rounded-full ${data.colors.glow} animate-pulse`} />
        {data.stats.connectionStatus}
      </div>
    </motion.div>
  </motion.div>
);

const PlatformDetails = ({
  data,
  isCompetitor,
}: {
  data: PlatformData;
  isCompetitor: boolean;
}) => {
  const alignClass = isCompetitor ? "items-start text-left" : "items-end text-right";
  const flexDirClass = isCompetitor ? "flex-row" : "flex-row-reverse";
  const barColorClass = isCompetitor ? "left-0 bg-red-500" : "right-0 bg-cyan-400";

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.h2
        variants={ANIMATIONS.item}
        className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2"
      >
        {data.label} Approach
      </motion.h2>
      <motion.h1
        variants={ANIMATIONS.item}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500"
      >
        {data.title}
      </motion.h1>
      <motion.p
        variants={ANIMATIONS.item}
        className={`text-zinc-400 mb-8 max-w-sm leading-relaxed ${isCompetitor ? "mr-auto" : "ml-auto"}`}
      >
        {data.description}
      </motion.p>

      <motion.div
        variants={ANIMATIONS.item}
        className="w-full space-y-6 bg-zinc-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl"
      >
        {data.features.map((feature, idx) => (
          <div key={feature.label} className="group">
            <div className={`flex items-center justify-between mb-3 text-sm ${flexDirClass}`}>
              <div
                className={`flex items-center gap-2 ${feature.value > 50 ? "text-zinc-200" : "text-zinc-400"}`}
              >
                <feature.icon
                  size={16}
                  className={feature.value > 50 ? "text-cyan-400" : "text-red-400"}
                />
                <span className="font-medium">{feature.label}</span>
              </div>
              <span className="font-mono text-xs text-zinc-500">{feature.value}%</span>
            </div>
            <div className="relative h-2 w-full bg-zinc-950/50 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
                className={`absolute top-0 bottom-0 ${barColorClass} opacity-90`}
              />
            </div>
          </div>
        ))}

        <div className={`pt-4 flex ${isCompetitor ? "justify-start" : "justify-end"}`}>
          <button
            type="button"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <LineChart size={14} /> View Analytics
            <ChevronRight
              size={14}
              className={`transition-transform ${isCompetitor ? "group-hover:translate-x-1" : "group-hover:-translate-x-1 rotate-180"}`}
            />
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={ANIMATIONS.item}
        className={`mt-8 flex items-center gap-3 text-zinc-400 ${flexDirClass}`}
      >
        <Activity size={18} className={isCompetitor ? "text-red-500" : "text-cyan-400"} />
        <span className="text-sm font-medium tracking-wide">
          System Efficiency: {data.stats.efficiency}%
        </span>
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({
  activeId,
  onToggle,
}: {
  activeId: string;
  onToggle: (id: string) => void;
}) => {
  const options = Object.values(AGENCY_DATA).map((p) => ({ id: p.id, label: p.label }));

  return (
    <div className="relative mt-16 flex justify-center z-10">
      <motion.div
        layout
        className="flex items-center gap-2 p-2 rounded-full bg-zinc-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/5"
      >
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative w-32 h-12 rounded-full flex items-center justify-center text-sm font-bold tracking-wide focus:outline-none overflow-hidden"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-white/5 shadow-inner border border-white/10"
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-300 ${activeId === opt.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {opt.label}
            </span>
            {activeId === opt.id && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-1 h-1 w-8 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[1px]"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default function TrendShowcaseSection() {
  const [activeSide, setActiveSide] = useState("competitors");

  const currentData = AGENCY_DATA[activeSide];
  const isCompetitor = activeSide === "competitors";

  return (
    <section
      className="relative min-h-screen w-full bg-[var(--bg-dark)] text-zinc-100 overflow-hidden selection:bg-cyan-900/50 flex flex-col items-center justify-center font-sans"
      aria-label="Solve Trend vs traditional agencies"
    >
      <BackgroundGradient isCompetitor={isCompetitor} />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 w-full px-6 py-12 flex flex-col justify-center max-w-7xl mx-auto min-h-screen">
        <motion.div
          layout
          transition={{ type: "spring", bounce: 0, duration: 0.9 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 lg:gap-40 w-full ${
            isCompetitor ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <PlatformVisual data={currentData} isCompetitor={isCompetitor} />

          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <PlatformDetails
                key={activeSide}
                data={currentData}
                isCompetitor={isCompetitor}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <Switcher activeId={activeSide} onToggle={setActiveSide} />
      </div>
    </section>
  );
}
