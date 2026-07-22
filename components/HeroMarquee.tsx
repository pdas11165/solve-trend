import Image from "next/image";

type Service = { num: string; name: string; img: string; video?: string };

// Real selected-works imagery from public/projects. The three video-backed
// disciplines use poster frames captured from their clips (kept static here
// so the hero never loads ~34MB of video above the fold).
const SERVICES: Service[] = [
  { num: "01", name: "Brand Strategy", img: "/projects/brand-strategy-poster.jpg" },
  { num: "02", name: "Brand Identity", img: "/projects/brand-identity-hero.jpg" },
  { num: "03", name: "Web Development", img: "/projects/web-development-hero.jpg" },
  { num: "04", name: "E-Commerce", img: "/projects/ecommerce-hero.jpg" },
  { num: "05", name: "Motion", img: "/projects/motion-poster.jpg" },
  { num: "06", name: "AI Automation", img: "/projects/ai-automation-poster.jpg" },
];

function Tile({
  s,
  dup,
  priority,
}: {
  s: Service;
  dup?: boolean;
  priority?: boolean;
}) {
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
      ) : dup ? (
        <div
          className="hero-strip-media hero-strip-media--dup"
          style={{ backgroundImage: `url(${s.img})` }}
          role="presentation"
        />
      ) : (
        <Image
          className="hero-strip-media"
          src={s.img}
          alt=""
          fill
          sizes="(max-width: 768px) 170px, 280px"
          {...(priority ? { priority: true } : { loading: "lazy" })}
        />
      )}
      <div className="hero-strip-glass" aria-hidden="true" />
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
      <div className="hero-strips-skew">
        <div className="hero-strips-track">
          {SERVICES.map((s, index) => (
            <Tile key={s.num} s={s} priority={index === 0} />
          ))}
          {SERVICES.map((s) => (
            <Tile key={`dup-${s.num}`} s={s} dup />
          ))}
        </div>
      </div>
    </div>
  );
}
