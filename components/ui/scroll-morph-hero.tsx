"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import {
  motion,
  AnimatePresence,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  computeArcTarget,
  IMG_WIDTH,
  IMG_HEIGHT,
  type ArcTarget,
  type AnimationPhase,
} from "./intro-arc-utils";

const ArcFluidGlassCanvas = dynamic(() => import("./ArcFluidGlassCanvas"), {
  ssr: false,
});
const CardFluidGlass = dynamic(() => import("./CardFluidGlass"), {
  ssr: false,
});

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type { AnimationPhase };

type CaseStudy = {
  id: string;
  image: string;
  title: string;
  outcome: string;
  chips: string[];
  ctaLabel?: string;
  ctaHref?: string;
  accent: string;
  glowSecondary: string;
};

type OriginRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
};

interface ArcCaseStudyCardProps {
  study: CaseStudy;
  index: number;
  target: ArcTarget;
  isActive: boolean;
  isSiblingActive: boolean;
  canInteract: boolean;
  useWebGL: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
  onActivate: (index: number, el: HTMLDivElement, rotation: number) => void;
}

interface GlassCaseStudyOverlayProps {
  study: CaseStudy;
  originRect: OriginRect;
  containerSize: { width: number; height: number };
  reducedMotion: boolean;
  useWebGL: boolean;
  onClose: () => void;
}

const MAX_SCROLL = 3000;
const MORPH_INTERACT_THRESHOLD = 0.95;

const CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";
const ARC_IMAGES = [
  `${CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
  `${CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
  `${CDN}/6904ca7a4abbe56dfff8956d_hero-marquee-img-05.avif`,
  `${CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
  `${CDN}/6904ca7a4abbe56dfff89578_hero-marquee-img-07.avif`,
  `${CDN}/6904ca7a4abbe56dfff8957d_hero-marquee-img-08.avif`,
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "duo",
    image: ARC_IMAGES[0],
    title: "Duo Nutrition",
    outcome: "3× conversion after coast-to-coast relaunch",
    chips: ["Brand", "Shopify", "Performance Ads"],
    ctaLabel: "View case study",
    ctaHref: "#latest",
    accent: "#E8341A",
    glowSecondary: "#FF8A6E",
  },
  {
    id: "lesse",
    image: ARC_IMAGES[1],
    title: "Lesse Studio",
    outcome: "Editorial-grade rebrand with scroll choreography",
    chips: ["Identity", "Web", "Motion"],
    ctaLabel: "View case study",
    ctaHref: "#latest",
    accent: "#1A1AFF",
    glowSecondary: "#6B8CFF",
  },
  {
    id: "aeruk",
    image: ARC_IMAGES[2],
    title: "AERUK Digital",
    outcome: "Full growth engine shipped in eight weeks",
    chips: ["3D", "Headless", "Analytics"],
    ctaLabel: "View case study",
    ctaHref: "#latest",
    accent: "#00C896",
    glowSecondary: "#5EFFE0",
  },
  {
    id: "brand",
    image: ARC_IMAGES[3],
    title: "Brand Systems",
    outcome: "Visual identity that scales across every touchpoint",
    chips: ["Strategy", "Identity", "Guidelines"],
    ctaLabel: "Explore services",
    ctaHref: "#services",
    accent: "#FF4500",
    glowSecondary: "#FF9A76",
  },
  {
    id: "web",
    image: ARC_IMAGES[4],
    title: "Web Design",
    outcome: "Sites that rank, convert, and ship fast",
    chips: ["Design", "CMS", "Performance"],
    ctaLabel: "Explore services",
    ctaHref: "#services",
    accent: "#6366F1",
    glowSecondary: "#A5B4FC",
  },
  {
    id: "marketing",
    image: ARC_IMAGES[5],
    title: "Digital Marketing",
    outcome: "Compounding growth across paid, owned, and earned",
    chips: ["Paid", "Lifecycle", "Attribution"],
    ctaLabel: "Explore services",
    ctaHref: "#services",
    accent: "#00C896",
    glowSecondary: "#7DFFD4",
  },
  {
    id: "seo",
    image: ARC_IMAGES[0],
    title: "SEO & Content",
    outcome: "Organic pipelines that compound month over month",
    chips: ["SEO", "Content", "Editorial"],
    ctaLabel: "Explore services",
    ctaHref: "#services",
    accent: "#FFD700",
    glowSecondary: "#FFF0A0",
  },
  {
    id: "data",
    image: ARC_IMAGES[1],
    title: "Data & AI",
    outcome: "Dashboards, agents, and shipped intelligence",
    chips: ["Analytics", "LLM", "Automation"],
    ctaLabel: "Explore services",
    ctaHref: "#services",
    accent: "#9B59B6",
    glowSecondary: "#D7A8F0",
  },
  {
    id: "uiux",
    image: ARC_IMAGES[2],
    title: "UI/UX Design",
    outcome: "Interfaces that make complex products feel obvious",
    chips: ["Research", "Prototypes", "Systems"],
    ctaLabel: "Explore services",
    ctaHref: "#services",
    accent: "#E84393",
    glowSecondary: "#FF9EC9",
  },
  {
    id: "ecommerce",
    image: ARC_IMAGES[3],
    title: "Ecommerce",
    outcome: "DTC storefronts built for conversion and retention",
    chips: ["Shopify", "CRO", "Email"],
    ctaLabel: "View work",
    ctaHref: "#latest",
    accent: "#2ECC71",
    glowSecondary: "#8AF0B0",
  },
  {
    id: "motion",
    image: ARC_IMAGES[4],
    title: "Motion Design",
    outcome: "Scroll stories and micro-interactions that convert",
    chips: ["GSAP", "Scroll", "3D"],
    ctaLabel: "View work",
    ctaHref: "#latest",
    accent: "#3498DB",
    glowSecondary: "#85C8FF",
  },
  {
    id: "strategy",
    image: ARC_IMAGES[5],
    title: "Growth Strategy",
    outcome: "Channel mix and measurement that ties spend to revenue",
    chips: ["Strategy", "Analytics", "CRO"],
    ctaLabel: "Let's talk",
    ctaHref: "#contact",
    accent: "#E8341A",
    glowSecondary: "#FF6B4A",
  },
];

const TOTAL_IMAGES = CASE_STUDIES.length;

function getExpandedSize(isMobile: boolean) {
  return {
    width: isMobile ? 280 : 360,
    height: isMobile ? 380 : 480,
  };
}

function getTargetRect(containerSize: { width: number; height: number }) {
  const isMobile = containerSize.width < 768;
  const { width, height } = getExpandedSize(isMobile);
  const centerX = containerSize.width / 2;
  const centerY = containerSize.height * 0.42;
  return {
    left: centerX - width / 2,
    top: centerY - height / 2,
    width,
    height,
    rotation: 0,
  };
}

function ArcCaseStudyCard({
  study,
  index,
  target,
  isActive,
  isSiblingActive,
  canInteract,
  useWebGL,
  cardRef,
  onActivate,
}: ArcCaseStudyCardProps) {
  const opacity = isActive ? 0 : isSiblingActive ? 0.35 : target.opacity;
  const scale = isSiblingActive ? target.scale * 0.92 : target.scale;

  const handleActivate = (
    e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>,
  ) => {
    if (!canInteract) return;
    onActivate(index, e.currentTarget, target.rotation);
  };

  return (
    <motion.div
      ref={cardRef}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale,
        opacity: useWebGL ? 1 : opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        zIndex: 8,
      }}
      className={`group ${canInteract ? "cursor-pointer" : "cursor-default"} ${useWebGL ? "intro-arc-hit" : ""}`}
      onMouseEnter={handleActivate}
      onFocus={handleActivate}
      onClick={(e) => {
        if (!canInteract) return;
        onActivate(index, e.currentTarget, target.rotation);
      }}
      tabIndex={canInteract ? 0 : -1}
      role="button"
      aria-label={`View ${study.title} case study`}
      aria-expanded={isActive}
    >
      {!useWebGL && (
        <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200">
          <img
            src={study.image}
            alt={study.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>
      )}
    </motion.div>
  );
}

function GlassCaseStudyOverlay({
  study,
  originRect,
  containerSize,
  reducedMotion,
  useWebGL,
  onClose,
}: GlassCaseStudyOverlayProps) {
  const targetRect = getTargetRect(containerSize);

  const flyTransition = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 200, damping: 26 };

  const flipTransition = reducedMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 200,
        damping: 26,
        delay: 0.18,
      };

  return (
    <motion.div
      className="intro-glass-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
    >
      <div
        className="intro-glass-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        className="intro-glass-card"
        style={
          {
            left: 0,
            top: 0,
            "--intro-accent": study.accent,
            "--intro-glow-secondary": study.glowSecondary,
          } as React.CSSProperties
        }
        initial={{
          x: originRect.left,
          y: originRect.top,
          width: originRect.width,
          height: originRect.height,
          rotate: originRect.rotation,
          borderRadius: 12,
        }}
        animate={{
          x: targetRect.left,
          y: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          rotate: 0,
          borderRadius: 12,
        }}
        exit={{
          x: originRect.left,
          y: originRect.top,
          width: originRect.width,
          height: originRect.height,
          rotate: originRect.rotation,
          borderRadius: 12,
          opacity: 0.6,
        }}
        transition={flyTransition}
      >
        <motion.div
          className="intro-glass-flip-inner"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 180 }}
          exit={{ rotateY: 0 }}
          transition={flipTransition}
        >
          <div className="intro-glass-face intro-glass-face--front">
            <img
              src={study.image}
              alt={study.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="intro-glass-face intro-glass-face--back">
            <div className="intro-glass-glow" aria-hidden="true">
              <img
                src={study.image}
                alt=""
                loading="lazy"
                className="intro-glass-glow-img"
              />
            </div>
            <div className="intro-glass-shell">
              <div className="intro-glass-media">
                {useWebGL && !reducedMotion ? (
                  <CardFluidGlass image={study.image} />
                ) : (
                  <img src={study.image} alt={study.title} loading="lazy" />
                )}
              </div>
              <div className="intro-glass-body">
                <h3 className="intro-glass-title">{study.title}</h3>
                <p className="intro-glass-outcome">{study.outcome}</p>
                <div className="intro-glass-chips">
                  {study.chips.map((chip) => (
                    <span key={chip} className="intro-glass-chip">
                      {chip}
                    </span>
                  ))}
                </div>
                {study.ctaLabel && study.ctaHref && (
                  <a href={study.ctaHref} className="intro-glass-cta">
                    {study.ctaLabel}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<OriginRect | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollAtOpenRef = useRef(0);
  const scrollRef = useRef(0);

  const canInteract = introPhase === "circle";
  const useWebGL = webglOk && !reducedMotion;

  const closeOverlay = useCallback(() => {
    setActiveIndex(null);
    setOriginRect(null);
  }, []);

  const captureOriginRect = useCallback(
    (el: HTMLDivElement, rotation: number): OriginRect | null => {
      const container = containerRef.current;
      if (!container) return null;
      const containerBounds = container.getBoundingClientRect();
      const cardBounds = el.getBoundingClientRect();
      return {
        left: cardBounds.left - containerBounds.left,
        top: cardBounds.top - containerBounds.top,
        width: cardBounds.width,
        height: cardBounds.height,
        rotation,
      };
    },
    [],
  );

  const handleActivate = useCallback(
    (index: number, el: HTMLDivElement, rotation: number) => {
      if (!canInteract) return;
      const rect = captureOriginRect(el, rotation);
      if (!rect) return;
      scrollAtOpenRef.current = scrollRef.current;
      setOriginRect(rect);
      setActiveIndex(index);
    },
    [canInteract, captureOriginRect],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
      ScrollTrigger.refresh();
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const virtualScroll = useMotionValue(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = containerRef.current;
      if (!section || !pin) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        scrollRef.current = MAX_SCROLL;
        virtualScroll.set(MAX_SCROLL);
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${MAX_SCROLL}`,
        pin: pin,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const newScroll = self.progress * MAX_SCROLL;
          scrollRef.current = newScroll;
          virtualScroll.set(newScroll);
        },
      });
    },
    { scope: sectionRef },
  );

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, {
    stiffness: 40,
    damping: 20,
  });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      setIntroPhase("circle");
      return;
    }

    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scatterPositions = useMemo(() => {
    return CASE_STUDIES.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const arcInteractReady = morphValue >= MORPH_INTERACT_THRESHOLD;

  const arcTargets = useMemo(() => {
    return CASE_STUDIES.map((_, i) =>
      computeArcTarget({
        index: i,
        total: TOTAL_IMAGES,
        introPhase,
        scatterTarget: scatterPositions[i],
        containerSize,
        morphValue,
        rotateValue,
        parallaxValue,
      }),
    );
  }, [
    introPhase,
    scatterPositions,
    containerSize,
    morphValue,
    rotateValue,
    parallaxValue,
  ]);

  useEffect(() => {
    if (activeIndex === null) return;

    const unsubscribe = virtualScroll.on("change", (latest) => {
      if (Math.abs(latest - scrollAtOpenRef.current) > 2) {
        closeOverlay();
      }
    });

    return () => unsubscribe();
  }, [activeIndex, virtualScroll, closeOverlay]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeOverlay]);

  useEffect(() => {
    if (!arcInteractReady && activeIndex !== null) {
      closeOverlay();
    }
  }, [arcInteractReady, activeIndex, closeOverlay]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  const activeStudy = activeIndex !== null ? CASE_STUDIES[activeIndex] : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      aria-label="Intro animation"
    >
      <div
        ref={containerRef}
        className="relative h-screen w-full bg-[#FAFAFA] overflow-hidden"
      >
        <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
          <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={
                introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(10px)" }
              }
              transition={{ duration: 1 }}
              className="text-2xl font-medium tracking-tight text-gray-800 md:text-4xl"
            >
              The future is built on AI.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={
                introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 0.5 - morphValue }
                  : { opacity: 0 }
              }
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500"
            >
              SCROLL TO EXPLORE
            </motion.p>
          </div>

          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
              Work that compounds
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
              Real outcomes from brands we&apos;ve built and grown.{" "}
              <br className="hidden md:block" />
              Hover a project to explore the results.
            </p>
          </motion.div>

          {useWebGL && containerSize.width > 0 && (
            <ArcFluidGlassCanvas
              studies={CASE_STUDIES}
              targets={arcTargets}
              containerSize={containerSize}
              activeIndex={activeIndex}
              visible={activeIndex === null}
              onError={() => setWebglOk(false)}
            />
          )}

          <AnimatePresence>
            {activeStudy && originRect && (
              <GlassCaseStudyOverlay
                key={activeStudy.id}
                study={activeStudy}
                originRect={originRect}
                containerSize={containerSize}
                reducedMotion={reducedMotion}
                useWebGL={useWebGL}
                onClose={closeOverlay}
              />
            )}
          </AnimatePresence>

          <div className="relative flex items-center justify-center w-full h-full z-[8]">
            {CASE_STUDIES.map((study, i) => (
              <ArcCaseStudyCard
                key={study.id}
                study={study}
                index={i}
                target={arcTargets[i]}
                isActive={activeIndex === i}
                isSiblingActive={activeIndex !== null && activeIndex !== i}
                canInteract={canInteract && arcInteractReady}
                useWebGL={useWebGL}
                cardRef={(el) => {
                  cardRefs.current[i] = el;
                }}
                onActivate={handleActivate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
