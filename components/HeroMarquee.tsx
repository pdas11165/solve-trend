import * as React from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { HERO_TILES, type HeroTile } from "@/lib/hero-tiles";

// Tiles come from lib/hero-tiles.ts, not from SERVICES. That file explains
// why: the strip is named for disciplines, which are narrower than the five
// offers, and five tiles was never enough width to fill a loop without the
// track visibly repeating.
//
// Only Brand Strategy carries a looping video, so the hero never loads more
// than one autoplaying clip above the fold. Its poster is the loop's own first
// frame (`brand-strategy-poster.jpg`) rather than the service card's image —
// posting a clip of falling chess pieces with a photo of a hand holding a card
// meant the still and the motion had nothing to do with each other.

function Tile({
  s,
  dup,
  priority,
}: {
  s: HeroTile;
  dup?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className="hero-strip"
      style={{ "--card-accent": s.accent } as React.CSSProperties}
      aria-hidden={dup ? "true" : undefined}
    >
      {s.video ? (
        <video
          className="hero-strip-media"
          src={asset(s.video)}
          poster={asset(s.img)}
          muted
          loop
          autoPlay
          playsInline
        />
      ) : dup ? (
        <div
          className="hero-strip-media hero-strip-media--dup"
          style={{
            backgroundImage: `url(${asset(s.img)})`,
            ...(s.position ? { backgroundPosition: s.position } : null),
          }}
          role="presentation"
        />
      ) : (
        <Image
          className="hero-strip-media"
          src={asset(s.img)}
          alt=""
          fill
          sizes="(max-width: 768px) 170px, 280px"
          {...(s.position ? { style: { objectPosition: s.position } } : null)}
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
          {HERO_TILES.map((s, index) => (
            <Tile key={s.num} s={s} priority={index === 0} />
          ))}
          {HERO_TILES.map((s) => (
            <Tile key={`dup-${s.num}`} s={s} dup />
          ))}
        </div>
      </div>
    </div>
  );
}
