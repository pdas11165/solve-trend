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
  color = "#F03223",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="74 73 208 230"
      fill="none"
      aria-hidden="true"
      className="monogram"
    >
      <path
        fill={color}
        d="M109.7,206.5v69.56c0,1.46,0.51,2.87,1.43,3.99l11.6,14.13c2.02,2.46,0.27,6.17-2.92,6.17H82.26c-3.48,0-6.29-2.82-6.29-6.29V81.38c0-3.48,2.82-6.29,6.29-6.29h21.14c3.48,0,6.29,2.82,6.29,6.29v73.88c0,2.09,1.04,4.04,2.77,5.21l67.75,45.8c1.73,1.17,2.77,3.12,2.77,5.21v30.34c0,3.03-3.38,4.82-5.89,3.13l-61.5-41.58C113.09,201.68,109.7,203.48,109.7,206.5z"
      />
      <path
        fill={color}
        d="M127.22,251.25v24.77c0,1.46,0.51,2.87,1.43,4l14.85,18.05c1.2,1.45,2.98,2.3,4.86,2.3h124.84c3.48,0,6.29-2.82,6.29-6.29v-80.14c0-2.09-1.04-4.05-2.78-5.22L163.8,132.74c-1.74-1.17-2.78-3.13-2.78-5.22v-14.8c0-2.09,1.69-3.78,3.78-3.78h108.38c3.48,0,6.29-2.82,6.29-6.29V81.38c0-3.48-2.82-6.29-6.29-6.29H133.52c-3.48,0-6.29,2.82-6.29,6.29v64.43c0,2.09,1.03,4.04,2.76,5.21l112.83,76.62c1.73,1.17,2.76,3.12,2.76,5.21v27.11c0,3.48-2.82,6.29-6.29,6.29h-90.92c-1.88,0-3.66-0.84-4.85-2.29l-11.82-14.31C130.18,247.83,127.22,248.89,127.22,251.25z"
      />
    </svg>
  );
}
