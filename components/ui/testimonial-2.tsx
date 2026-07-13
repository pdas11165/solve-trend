"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/ui/reveal-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Testimonial {
  imgSrc: string;
  alt: string;
}

interface AnimatedTestimonialGridProps {
  testimonials: Testimonial[];
  badgeText?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  ctaText: string;
  ctaHref: string;
  className?: string;
}

/**
 * Per-avatar scroll drift in px, alternating direction and varying magnitude
 * so the floating portraits move at different speeds (depth parallax).
 */
const PARALLAX_SPEEDS = [-90, 50, -35, 75, -55, 40, -70, 60, -30, 80, -45, 55, -65, 45, -60];

const imagePositions = [
  { top: "5%", left: "15%", className: "hidden lg:block w-24 h-24" },
  { top: "15%", left: "35%", className: "hidden md:block w-20 h-20" },
  { top: "5%", left: "55%", className: "hidden md:block w-16 h-16" },
  { top: "10%", right: "15%", className: "hidden lg:block w-28 h-28" },
  { top: "25%", right: "5%", className: "hidden md:block w-20 h-20" },
  { top: "45%", right: "10%", className: "hidden lg:block w-24 h-24" },
  { top: "50%", left: "5%", className: "hidden md:block w-28 h-28" },
  { bottom: "5%", left: "20%", className: "hidden lg:block w-20 h-20" },
  { bottom: "15%", left: "45%", className: "hidden md:block w-16 h-16" },
  { bottom: "10%", right: "30%", className: "hidden md:block w-24 h-24" },
  { bottom: "2%", right: "15%", className: "hidden lg:block w-20 h-20" },
  { top: "10%", left: "5%", className: "block md:hidden w-16 h-16" },
  { top: "5%", right: "10%", className: "block md:hidden w-20 h-20" },
  { bottom: "5%", left: "10%", className: "block md:hidden w-20 h-20" },
  { bottom: "10%", right: "5%", className: "block md:hidden w-16 h-16" },
];

function getImageVariants(index: number) {
  return {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        delay: index * 0.07,
      },
    },
  };
}

function getFloatingAnimation(index: number) {
  const yOffset = -((index % 5) * 3 + 8);
  const duration = (index % 4) + 6;
  return {
    y: [0, yOffset, 0],
    transition: {
      duration,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  };
}

export const AnimatedTestimonialGrid = ({
  testimonials,
  badgeText = "Testimonials",
  title,
  description,
  ctaText,
  ctaHref,
  className,
}: AnimatedTestimonialGridProps) => {
  const rootRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {});

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>(".testimonial-parallax-item")
          .forEach((item) => {
            const speed = Number(item.dataset.parallaxSpeed ?? 0);
            gsap.fromTo(
              item,
              { y: -speed },
              {
                y: speed,
                ease: "none",
                scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative w-full max-w-7xl mx-auto py-32 sm:py-40 px-4 min-h-[520px]",
        className
      )}
    >
      {testimonials.slice(0, imagePositions.length).map((testimonial, index) => (
        <div
          key={index}
          className={cn("testimonial-parallax-item absolute", imagePositions[index].className)}
          style={{
            top: imagePositions[index].top,
            left: imagePositions[index].left,
            right: imagePositions[index].right,
            bottom: imagePositions[index].bottom,
          }}
          data-parallax-speed={PARALLAX_SPEEDS[index % PARALLAX_SPEEDS.length]}
        >
          <motion.div
            className="relative h-full w-full rounded-lg shadow-xl"
            variants={getImageVariants(index)}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.1, zIndex: 20 }}
          >
            <motion.img
              src={testimonial.imgSrc}
              alt={testimonial.alt}
              className="w-full h-full object-cover rounded-lg"
              animate={getFloatingAnimation(index)}
            />
          </motion.div>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        {badgeText && (
          <div className="mb-4 inline-block rounded-full bg-[var(--secondary)] px-3 py-1 text-sm font-semibold text-[var(--secondary-foreground)]">
            {badgeText}
          </div>
        )}
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--foreground)] mb-4 max-w-3xl">
          {typeof title === "string" ? <RevealText text={title} /> : title}
        </h2>
        <p className="max-w-xl text-lg text-[var(--muted-foreground)] mb-8">
          {description}
        </p>
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-base font-medium text-[var(--primary-foreground)] shadow-sm transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
        >
          {ctaText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
};
