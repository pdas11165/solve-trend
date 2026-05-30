import * as React from "react";

const ROW_A = [
  "Duo Nutrition",
  "Aeruk Digital",
  "Lesse Studio",
  "North Atlantic Co.",
  "Field Notes",
  "Harbour Type",
  "Cabin Goods",
  "Loop Coffee",
];
const ROW_B = [
  "Studio Verde",
  "Magnet Health",
  "Rolling Press",
  "Wayfind",
  "Pier 12",
  "Charlottetown Films",
  "Maple & Ink",
  "Polar Bank",
];

function Row({ items, className }: { items: string[]; className: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-track ${className}`}>
      {doubled.map((label, i) => (
        <span key={`${label}-${i}`} className="marquee-item" aria-hidden={i >= items.length ? "true" : undefined}>
          {label}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee-section" aria-label="Selected clients">
      <div className="marquee-track-wrap">
        <Row items={ROW_A} className="row-a" />
        <Row items={ROW_B} className="row-b" />
      </div>
    </section>
  );
}
