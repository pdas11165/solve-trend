import * as React from "react";
import { DotGridArrow } from "./Icons";
import HeroHeadline from "./HeroHeadline";
import HeroShader from "./HeroShader";
import HeroMarquee from "./HeroMarquee";

export default function Hero() {
  return (
    <section className="hero hero--monument" id="top" aria-label="Hero">
      <HeroShader />
      <div className="hero-monument-wrap">
        <HeroHeadline />
        <a className="hero-cta-neo" href="#contact">
          Start a project
          <DotGridArrow />
        </a>
      </div>
      <HeroMarquee />
    </section>
  );
}
