"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FlipLinkProps = {
  children: string;
  href: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
  delayPerLetter?: number;
};

function renderLetters(text: string, delayPerLetter: number, layerClassName: string) {
  return text.split("").map((letter, i) => (
    <span
      key={`${letter}-${i}`}
      className={layerClassName}
      style={{
        transitionDelay: `${i * delayPerLetter}ms`,
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));
}

export function FlipLink({
  children,
  href,
  className,
  onClick,
  target,
  rel,
  delayPerLetter = 25,
}: FlipLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={cn(
        "flip-link group relative block overflow-hidden whitespace-nowrap",
        className
      )}
      style={{ lineHeight: 0.75 }}
    >
      <div className="flex">
        {renderLetters(
          children,
          delayPerLetter,
          "flip-link-letter-top inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
        )}
      </div>
      <div className="absolute inset-0 flex">
        {renderLetters(
          children,
          delayPerLetter,
          "flip-link-letter-bottom inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
        )}
      </div>
    </a>
  );
}
