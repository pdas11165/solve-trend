import * as React from "react";

export function DotGridArrow({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={`arrow ${className ?? ""}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      {[
        [2, 2],
        [6, 2],
        [10, 2],
        [2, 6],
        [10, 6],
        [10, 10],
        [2, 10],
        [6, 10],
        [10, 10],
        [13, 6],
        [13, 10],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="2.4" height="2.4" rx="0.6" fill="currentColor" />
      ))}
      {/* Diagonal hint */}
      <rect x="6" y="6" width="2.4" height="2.4" rx="0.6" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function DotGridIcon({
  className,
  size = 18,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      {[1, 7, 13].map((y) =>
        [1, 7, 13].map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="3"
            height="3"
            rx="0.8"
            fill={color}
          />
        ))
      )}
    </svg>
  );
}

export function Monogram({
  size = 28,
  color = "#E8341A",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="monogram"
    >
      <rect x="0" y="0" width="32" height="32" rx="8" fill={color} />
      <path
        d="M9 22V10h2.2v5l4.3-5h2.7l-4.4 5 4.6 7h-2.6l-3.5-5.4-1.1 1.2V22H9zm10.5 0V10h2.2v12h-2.2z"
        fill="#fff"
      />
    </svg>
  );
}
