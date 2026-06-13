import Image from "next/image";

type Service = { num: string; name: string; img: string; video?: string };

// Placeholder imagery borrowed from Bungee — to be replaced with real assets later.
const CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";
const SERVICES: Service[] = [
  { num: "01", name: "Brand Identity", img: `${CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif` },
  { num: "02", name: "Web Development", img: `${CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif` },
  { num: "03", name: "UI/UX Design", img: `${CDN}/6904ca7a4abbe56dfff8956d_hero-marquee-img-05.avif` },
  { num: "04", name: "Strategy", img: `${CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif` },
  { num: "05", name: "Motion", img: `${CDN}/6904ca7a4abbe56dfff89578_hero-marquee-img-07.avif` },
  { num: "06", name: "Content Strategy", img: `${CDN}/6904ca7a4abbe56dfff8957d_hero-marquee-img-08.avif` },
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
