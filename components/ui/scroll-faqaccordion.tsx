"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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
  // All items start closed; the user opens them by clicking (bug #21).
  const [openItem, setOpenItem] = React.useState("");

  return (
    <div className={cn("scroll-faq-accordion__track", className)}>
      <div className="scroll-faq-accordion__pin">
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
