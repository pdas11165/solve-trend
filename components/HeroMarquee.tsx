import * as React from "react";

type Service = { num: string; name: string; img: string; video?: string };

const SERVICES: Service[] = [
  {
    num: "01",
    name: "UI/UX Design",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "02",
    name: "Web Development",
    img: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "03",
    name: "Brand Identity",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "04",
    name: "Growth Ops",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "05",
    name: "Content Strategy",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
  },
];

function Tile({ s, dup }: { s: Service; dup?: boolean }) {
  return (
    <div className="hero-strip" aria-hidden={dup ? "true" : undefined}>
      {s.video ? (
        <video
          className="hero-strip-media"
          src={s.video}
          poster={s.img}
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img className="hero-strip-media" src={s.img} alt="" loading="lazy" />
      )}
      <div className="hero-strip-frost">
        <span className="hero-strip-num">{s.num}</span>
        <span className="hero-strip-name">{s.name}</span>
      </div>
    </div>
  );
}

export default function HeroMarquee() {
  return (
    <div className="hero-strips" aria-label="Our services">
      <div className="hero-strips-track">
        {SERVICES.map((s) => (
          <Tile key={s.num} s={s} />
        ))}
        {SERVICES.map((s) => (
          <Tile key={`dup-${s.num}`} s={s} dup />
        ))}
      </div>
    </div>
  );
}
