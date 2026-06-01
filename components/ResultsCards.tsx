import * as React from "react";

const AROUND_CDN =
  "https://cdn.prod.website-files.com/65647bbe0d57c8abad78e939";

type Chip = {
  src?: string;
  text?: string;
  modifier: string;
};

type Result = {
  id: string;
  value: string;
  title: string;
  subtext: string;
  chips: Chip[];
  cursor?: boolean;
};

const RESULTS: Result[] = [
  {
    id: "engagement",
    value: "+170%",
    title: "Engagement Rate",
    subtext: "Intuitive flows that turn clicks into leads",
    chips: [
      {
        src: `${AROUND_CDN}/6891a46af0b791ba898a7ac1_1.avif`,
        modifier: "crafting-result__chip--1",
      },
      {
        src: `${AROUND_CDN}/6891a46afae8585420502f7c_2.png`,
        modifier: "crafting-result__chip--2",
      },
      {
        src: `${AROUND_CDN}/6891a46acf30c29013082e3c_3.avif`,
        modifier: "crafting-result__chip--3",
      },
    ],
  },
  {
    id: "revenue",
    value: "4.6×",
    title: "Revenue Growth After Redesign",
    subtext: "Product improvements that scale business impact",
    chips: [
      {
        text: "Growth",
        modifier: "crafting-result__chip--4",
      },
      {
        text: "Scale",
        modifier: "crafting-result__chip--5",
      },
      {
        text: "ROI",
        modifier: "crafting-result__chip--6",
      },
    ],
  },
  {
    id: "churn",
    value: "-37%",
    title: "Churn Across SaaS Clients",
    subtext: "Better onboarding, better UX, fewer cancellations",
    chips: [
      {
        src: `${AROUND_CDN}/6891a46a999f186d8190b1bb_8.avif`,
        modifier: "crafting-result__chip--7",
      },
      {
        src: `${AROUND_CDN}/6891a46a87823a871a955d4f_7.png`,
        modifier: "crafting-result__chip--8",
      },
    ],
    cursor: true,
  },
];

function ResultCard({ result }: { result: Result }) {
  return (
    <div className="crafting-result">
      <p className="crafting-result__title">{result.value}</p>
      <div className="crafting-result__bottom">
        <p className="crafting-result__label">{result.title}</p>
        <p className="crafting-result__sub">{result.subtext}</p>
      </div>
      {result.chips.map((chip) => (
        <div
          key={chip.modifier}
          className={`crafting-result__chip ${chip.modifier}`}
        >
          {chip.text ? (
            <span className="crafting-result__chip-label">{chip.text}</span>
          ) : (
            <img src={chip.src} alt="" loading="lazy" />
          )}
          <div className="crafting-result__chip-blur" aria-hidden="true" />
        </div>
      ))}
      {result.cursor ? (
        <img
          className="crafting-result__cursor"
          src={`${AROUND_CDN}/6891ade9b11ad92178b46212_5243840e861bb560a6157abd4379b70f_cursor.avif`}
          alt=""
          loading="lazy"
        />
      ) : null}
    </div>
  );
}

export default function ResultsCards() {
  return (
    <div className="crafting-results" aria-label="Key results">
      {RESULTS.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
