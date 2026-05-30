"use client";

import * as React from "react";

/**
 * Generic IntersectionObserver-driven reveal.
 * Adds `.is-visible` to the wrapped element when 15% in view.
 */
export function useInView<T extends Element>(
  threshold = 0.15
): [React.RefObject<T | null>, boolean] {
  const ref = React.useRef<T | null>(null);
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen];
}

export function AnimatedUnderline() {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4);
  return (
    <span
      ref={ref}
      className={`st-animated-underline ${seen ? "is-visible" : ""}`}
      aria-hidden="true"
    />
  );
}
