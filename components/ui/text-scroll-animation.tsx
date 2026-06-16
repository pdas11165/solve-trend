"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  scrollRange: [number, number];
  charClassName?: string;
};

export const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  scrollRange,
  charClassName,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    scrollRange,
    [distanceFromCenter * 50, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    scrollRange,
    [distanceFromCenter * 50, 0]
  );

  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-[0.25em]", charClassName)}
      style={{ x, rotateX }}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
};

type ScrollOffset = NonNullable<
  Parameters<typeof useScroll>[0]
>["offset"];

export type ScrollCharacterTextProps = {
  text: string;
  className?: string;
  charClassName?: string;
  scrollTargetRef: React.RefObject<HTMLElement | null>;
  scrollRange?: [number, number];
  scrollOffset?: ScrollOffset;
};

export function ScrollCharacterText({
  text,
  className,
  charClassName,
  scrollTargetRef,
  scrollRange = [0, 0.5],
  scrollOffset = ["start start", "end end"],
}: ScrollCharacterTextProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: scrollOffset,
  });

  const words = text.split(" ");
  const characters = text.replace(/ /g, "").split("");
  const centerIndex = Math.floor(characters.length / 2);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  let charIndex = 0;

  return (
    <span className={cn("inline-block", className)} aria-hidden="true">
      <span className="sr-only">{text}</span>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const index = charIndex++;
            return (
              <CharacterV1
                key={`${char}-${index}`}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
                scrollRange={scrollRange}
                charClassName={charClassName}
              />
            );
          })}
          {wordIndex < words.length - 1 ? (
            <CharacterV1
              key={`space-${wordIndex}`}
              char=" "
              index={charIndex++}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
              scrollRange={scrollRange}
              charClassName={charClassName}
            />
          ) : null}
        </span>
      ))}
    </span>
  );
}
