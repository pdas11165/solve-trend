"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface ScrollFAQAccordionProps {
  data: FAQItem[];
  header?: React.ReactNode;
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export default function ScrollFAQAccordion({
  data,
  header,
  className,
  questionClassName,
  answerClassName,
}: ScrollFAQAccordionProps) {
  const reduceMotion = useReducedMotion();
  const [openItem, setOpenItem] = React.useState(
    () => data[0]?.id.toString() ?? ""
  );
  const trackRef = React.useRef<HTMLDivElement>(null);
  const pinRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin || data.length === 0 || reduceMotion === true) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          pin: pin,
          scrub: 0.3,
          onUpdate: (self) => {
            const idx = Math.min(
              data.length - 1,
              Math.floor(self.progress * data.length * 0.999)
            );
            setOpenItem(data[idx].id.toString());
          },
        });
      });

      return () => mm.revert();
    },
    { scope: trackRef, dependencies: [data, reduceMotion] }
  );

  const trackHeight =
    reduceMotion === true ? undefined : `${data.length * 35 + 50}vh`;

  return (
    <div
      ref={trackRef}
      className={cn("scroll-faq-accordion__track", className)}
      style={trackHeight ? { height: trackHeight } : undefined}
    >
      <div ref={pinRef} className="scroll-faq-accordion__pin">
        {header ? (
          <div className="scroll-faq-accordion__header">{header}</div>
        ) : null}

        <Accordion.Root
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="scroll-faq-accordion__list"
        >
          {data.map((item) => {
            const itemId = item.id.toString();
            const isOpen = openItem === itemId;

            return (
              <Accordion.Item
                value={itemId}
                key={item.id}
                className="scroll-faq-accordion__item"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="scroll-faq-accordion__trigger flex w-full cursor-pointer items-center justify-start gap-x-4">
                    <div
                      className={cn(
                        "scroll-faq-accordion__question relative flex items-center space-x-2 rounded-xl p-2 transition-colors",
                        isOpen
                          ? "scroll-faq-accordion__question--open"
                          : "scroll-faq-accordion__question--closed",
                        questionClassName
                      )}
                    >
                      {item.icon ? (
                        <span
                          className={cn(
                            "absolute bottom-6",
                            item.iconPosition === "right" ? "right-0" : "left-0"
                          )}
                          style={{
                            transform:
                              item.iconPosition === "right"
                                ? "rotate(7deg)"
                                : "rotate(-4deg)",
                          }}
                        >
                          {item.icon}
                        </span>
                      ) : null}
                      <span className="font-medium">{item.question}</span>
                    </div>

                    <span
                      className={cn(
                        "scroll-faq-accordion__icon shrink-0",
                        isOpen && "scroll-faq-accordion__icon--open"
                      )}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content asChild forceMount>
                  <motion.div
                    initial="collapsed"
                    animate={isOpen ? "open" : "collapsed"}
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 ml-7 flex justify-end md:ml-16">
                      <div
                        className={cn(
                          "scroll-faq-accordion__answer relative max-w-md rounded-2xl px-4 py-2 text-lg",
                          answerClassName
                        )}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </div>
  );
}
