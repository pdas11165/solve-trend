"use client";

/* =============================================================
   SHARED REACT COMPONENT LAYER
   React 19 · Next 16 · Tailwind 4 · Framer Motion 12

   Styled entirely through the token contract via arbitrary values
   (`bg-[var(--c-surface)]`), so swapping the imported tokens.css
   re-skins every component with no code changes.

   Setup — app/globals.css:
     @import "tailwindcss";
     @import "../design-systems/06-solvetrend-signature/tokens.css";
     @import "../design-systems/_shared/components.css";
   ============================================================= */

import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

/* ---------------------------------------------------------------
   utils
   --------------------------------------------------------------- */
const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

/** Read a duration/easing token from CSS so JS never drifts from CSS. */
function useMotionTokens() {
  const [t, setT] = React.useState({ base: 0.4, enter: 0.6, exit: 0.38 });
  React.useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const ms = (n: string, f: number) => {
      const v = cs.getPropertyValue(n).trim();
      if (!v) return f;
      return v.endsWith("ms") ? parseFloat(v) / 1000 : parseFloat(v) || f;
    };
    setT({ base: ms("--d-base", 0.4), enter: ms("--d-enter", 0.6), exit: ms("--d-exit", 0.38) });
  }, []);
  return t;
}

/** outQuint — the house easing, matching --e-out. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_OVER = [0.34, 1.56, 0.64, 1] as const;

/* ---------------------------------------------------------------
   Reveal — fade-up on scroll. The most-used move in every reference.
   --------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const { enter } = useMotionTokens();
  const M = motion(Tag as React.ElementType);

  return (
    <M
      ref={ref}
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: enter, ease: EASE_OUT, delay }}
    >
      {children}
    </M>
  );
}

/* ---------------------------------------------------------------
   Stagger — container + item pair
   --------------------------------------------------------------- */
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerParent}
      initial={reduce ? "show" : "hidden"}
      animate={inView || reduce ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   PillButton — Stuxen's signature CTA with inset circular arrow
   --------------------------------------------------------------- */
type BtnVariant = "solid" | "accent" | "ghost" | "surface";

export function PillButton({
  children,
  href,
  variant = "accent",
  badge = true,
  square = false,
  className,
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  variant?: BtnVariant;
  badge?: boolean;
  square?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantClass: Record<BtnVariant, string> = {
    solid:
      "bg-[var(--c-text)] text-[var(--c-canvas)] border-transparent [--_bg:var(--c-text)] [--_fg:var(--c-canvas)]",
    accent:
      "bg-[var(--c-accent)] text-[var(--c-accent-ink)] border-transparent hover:bg-[var(--c-accent-hover)] [--_bg:var(--c-accent)] [--_fg:var(--c-accent-ink)]",
    ghost:
      "bg-transparent text-[var(--c-text)] border-[var(--c-line)] hover:bg-[var(--c-text)] hover:text-[var(--c-canvas)] [--_bg:transparent] [--_fg:var(--c-text)]",
    surface:
      "bg-[var(--c-surface)] text-[var(--c-text)] border-[var(--c-line)] [--_bg:var(--c-surface)] [--_fg:var(--c-text)]",
  };

  const cls = cx(
    "group inline-flex items-center gap-[var(--btn-badge-gap,0.75rem)]",
    "px-[var(--btn-pad-x)] py-[var(--btn-pad-y)] border",
    square ? "rounded-none" : "rounded-[var(--btn-radius)]",
    "font-[family-name:var(--f-body)] text-[var(--fs-sm)] font-medium leading-none",
    "no-underline cursor-pointer whitespace-nowrap",
    "transition-[background-color,color,border-color,transform] duration-[var(--d-base)]",
    "hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none",
    variantClass[variant],
    className
  );

  const inner = (
    <>
      <span>{children}</span>
      {badge && (
        <span
          className={cx(
            "grid place-items-center rounded-full shrink-0",
            "size-[var(--btn-badge)] -me-[calc(var(--btn-pad-x)*0.55)]",
            "bg-[var(--_fg)] text-[var(--_bg)]",
            "transition-transform duration-[var(--d-base)]",
            "group-hover:translate-x-1 group-hover:rotate-45",
            "motion-reduce:transform-none"
          )}
        >
          <ArrowIcon className="size-[45%]" />
        </span>
      )}
    </>
  );

  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   Eyebrow — mono third-voice label (Unusually)
   --------------------------------------------------------------- */
export function Eyebrow({
  children, dot = false, pill = false, className,
}: { children: React.ReactNode; dot?: boolean; pill?: boolean; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2",
        "font-[family-name:var(--f-mono)] text-[var(--fs-2xs,0.75rem)] uppercase",
        "tracking-[var(--ls-label)] text-[var(--c-text-3)]",
        pill && "px-3.5 py-1.5 rounded-full border border-[var(--c-line)] bg-[var(--c-surface)]",
        className
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-[var(--c-accent)] shrink-0" />}
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------
   WordReveal — grey → ink word-by-word on scroll (Unusually)
   --------------------------------------------------------------- */
export function WordReveal({
  text, as: Tag = "h2", className,
}: { text: string; as?: React.ElementType; className?: string }) {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const words = React.useMemo(() => text.trim().split(/\s+/), [text]);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start 0.8", "end 0.55"],
  });

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={!!reduce}>
          {w}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  children, progress, range, reduce,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <span className="inline-block me-[0.25em]">
      <motion.span
        style={reduce ? undefined : { opacity }}
        className="inline-block text-[var(--c-text)]"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------------------------------------------------------------
   Odometer — digit-reel stat counter (Ritovex)
   --------------------------------------------------------------- */
export function Odometer({
  to, suffix = "", className,
}: { to: number; suffix?: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const digits = String(Math.max(0, Math.trunc(to))).split("");

  return (
    <span
      ref={ref}
      className={cx(
        "inline-flex items-start leading-none text-[var(--c-text)]",
        "font-[family-name:var(--f-display)] text-[var(--fs-h2)] font-medium",
        "tracking-[var(--ls-display)] tabular-nums",
        className
      )}
      aria-label={`${to}${suffix}`}
      role="img"
    >
      {digits.map((d, i) => (
        <span key={i} className="h-[1em] overflow-hidden" aria-hidden>
          <motion.span
            className="flex flex-col"
            initial={reduce ? { y: `${-Number(d)}em` } : { y: 0 }}
            animate={inView ? { y: `${-Number(d)}em` } : { y: 0 }}
            transition={{ duration: 0.9 + i * 0.12, ease: EASE_OUT }}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} className="h-[1em] leading-none">{n}</span>
            ))}
          </motion.span>
        </span>
      ))}
      {suffix && <span aria-hidden>{suffix}</span>}
    </span>
  );
}

/* ---------------------------------------------------------------
   ScrollPercent — live readout for the nav (Qubix)
   --------------------------------------------------------------- */
export function ScrollPercent({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = React.useState(0);
  React.useEffect(
    () => scrollYProgress.on("change", (v) => setPct(Math.round(v * 100))),
    [scrollYProgress]
  );
  return (
    <span
      className={cx(
        "min-w-[3.25rem] px-3 py-1.5 rounded-full text-center tabular-nums",
        "bg-[var(--c-surface-2)] text-[var(--c-text-2)]",
        "font-[family-name:var(--f-mono)] text-[var(--fs-2xs,0.75rem)]",
        className
      )}
    >
      {pct}%
    </span>
  );
}

/* ---------------------------------------------------------------
   Card
   --------------------------------------------------------------- */
export function Card({
  title, body, num, icon, href, className, children,
}: {
  title?: string; body?: string; num?: string;
  icon?: React.ReactNode; href?: string;
  className?: string; children?: React.ReactNode;
}) {
  const Tag: React.ElementType = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className={cx(
        "flex flex-col gap-4 no-underline",
        "p-[var(--card-pad)] rounded-[var(--card-radius)]",
        "border border-[var(--c-line)] bg-[var(--c-surface)]",
        "transition-[background-color,border-color,transform] duration-[var(--d-base)]",
        "hover:bg-[var(--c-surface-2)] hover:-translate-y-1",
        "motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
    >
      {num && (
        <span className="font-[family-name:var(--f-mono)] text-[var(--fs-xs)] tracking-[var(--ls-label)] text-[var(--c-text-3)]">
          {num}
        </span>
      )}
      {icon && (
        <span className="grid place-items-center size-12 rounded-[var(--r-md)] bg-[var(--c-accent-soft,var(--c-surface-2))] text-[var(--c-accent)]">
          {icon}
        </span>
      )}
      {title && <h3 className="text-[var(--fs-h5)] text-[var(--c-text)]">{title}</h3>}
      {body && <p className="m-0 text-[var(--fs-sm)] text-[var(--c-text-2)]">{body}</p>}
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------
   Marquee — CSS-driven, pauses on hover, honours reduced motion
   --------------------------------------------------------------- */
export function Marquee({
  children, reverse = false, className,
}: { children: React.ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div
      className={cx("c-marquee", reverse && "c-marquee--reverse", className)}
      aria-hidden
    >
      <div className="c-marquee__track">{children}</div>
      <div className="c-marquee__track">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ScatterHero — cursor-parallax floating cards (Qubix)
   --------------------------------------------------------------- */
export function ScatterHero({
  cards, children, className,
}: {
  cards: Array<{ src: string; alt?: string; top: string; left: string; depth?: number }>;
  children?: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [p, setP] = React.useState({ x: 0, y: 0 });
  const sx = useSpring(p.x, { stiffness: 90, damping: 22 });
  const sy = useSpring(p.y, { stiffness: 90, damping: 22 });
  React.useEffect(() => { sx.set(p.x); sy.set(p.y); }, [p, sx, sy]);

  return (
    <div
      ref={ref}
      className={cx("relative grid place-items-center overflow-hidden min-h-[88dvh]", className)}
      onPointerMove={(e) => {
        if (reduce) return;
        const b = e.currentTarget.getBoundingClientRect();
        setP({ x: (e.clientX - b.left) / b.width - 0.5, y: (e.clientY - b.top) / b.height - 0.5 });
      }}
      onPointerLeave={() => setP({ x: 0, y: 0 })}
    >
      {cards.map((c, i) => (
        <ScatterCard key={i} {...c} sx={sx} sy={sy} />
      ))}
      <div className="relative z-10 text-center">{children}</div>
    </div>
  );
}

function ScatterCard({
  src, alt = "", top, left, depth = 0.5, sx, sy,
}: {
  src: string; alt?: string; top: string; left: string; depth?: number;
  sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, (v) => v * 60 * depth);
  const y = useTransform(sy, (v) => v * 60 * depth);
  const rotate = useTransform(sx, (v) => v * 10 * depth);
  return (
    <motion.div
      style={{ top, left, x, y, rotate }}
      className="absolute w-[clamp(120px,11vw,180px)] aspect-[4/5] rounded-[var(--r-lg)] overflow-hidden will-change-transform"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="size-full object-cover block" />
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   DepthGroup — blur+grayscale unfocused siblings (Qubix)
   --------------------------------------------------------------- */
export function DepthGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("c-depth-group", className)}>{children}</div>;
}
export function DepthItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("c-depth", className)}>{children}</div>;
}

/* ---------------------------------------------------------------
   Frame — the floating rounded page frame (Unusually)
   Highest-leverage structural component in the set.
   --------------------------------------------------------------- */
export function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "m-[var(--frame-gutter)] rounded-[var(--frame-radius)]",
        "bg-[var(--c-frame,var(--c-surface))] overflow-clip",
        "min-h-[calc(100dvh-var(--frame-gutter)*2)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Section / Container
   --------------------------------------------------------------- */
export function Section({
  children, size = "base", className,
}: { children: React.ReactNode; size?: "sm" | "md" | "base"; className?: string }) {
  const pad = { sm: "py-[var(--s-section-sm)]", md: "py-[var(--s-section-md)]", base: "py-[var(--s-section)]" };
  return <section className={cx(pad[size], className)}>{children}</section>;
}

export function Container({
  children, narrow = false, className,
}: { children: React.ReactNode; narrow?: boolean; className?: string }) {
  return (
    <div
      className={cx(
        "w-full mx-auto px-[var(--s-gutter)]",
        narrow ? "max-w-[var(--s-container-narrow,880px)]" : "max-w-[var(--s-container)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Accordion — grid-template-rows technique, no JS height math
   --------------------------------------------------------------- */
export function Accordion({ items, className }: { items: Array<{ q: string; a: string }>; className?: string }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className={className}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-[var(--c-line)]">
            <button
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 bg-transparent border-0 cursor-pointer text-start text-[var(--c-text)] font-[family-name:var(--f-display)] text-[var(--fs-h5)] tracking-[var(--ls-head)]"
            >
              {it.q}
              <span
                className={cx(
                  "shrink-0 transition-transform duration-[var(--d-base)]",
                  isOpen && "rotate-45"
                )}
              >
                <PlusIcon />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-[var(--d-base)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 m-0 text-[var(--c-text-2)]">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
         strokeWidth={1.75} strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   SmoothScroll — Lenis provider (Fluke's init, as a hook)
   Wrap the root layout once.
   --------------------------------------------------------------- */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  React.useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(hover: none)").matches) return;   // native on touch

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    });

    return () => { cancelled = true; cancelAnimationFrame(raf); lenis?.destroy(); };
  }, [reduce]);

  return <>{children}</>;
}
