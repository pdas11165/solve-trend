"use client";

import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/ui/animated-gallery";
import { Button } from "@/components/ui/button";
import { VISION_GALLERY_COLUMNS } from "@/lib/vision-gallery";
import { DotGridArrow } from "./Icons";

const COLUMN_Y_RANGES: [string, string][] = [
  ["-10%", "2%"],
  ["15%", "5%"],
  ["-10%", "2%"],
];

export default function VisionExpertiseSection() {
  return (
    <section
      className="vision-expertise relative bg-[#FAFAFA]"
      aria-label="Your vision, our expertise"
    >
      <ContainerStagger className="relative z-[9999] -mb-12 place-self-center px-6 pt-12 text-center">
        <ContainerAnimated>
          <div className="services-zoom-parallax__eyebrow mb-4 justify-center">
            <span className="services-brand-dot" aria-hidden="true" />
            <span>OUR EXPERTISE</span>
          </div>
        </ContainerAnimated>
        <ContainerAnimated>
          <h2 className="services-zoom-parallax__title">
            Your <span className="text-[#E8341A]">Vision</span>
          </h2>
        </ContainerAnimated>
        <ContainerAnimated>
          <p className="services-zoom-parallax__title mt-1">our Expertise</p>
        </ContainerAnimated>

        <ContainerAnimated className="my-4">
          <p className="mx-auto max-w-lg text-sm leading-relaxed tracking-tight text-[#555] md:text-base">
            At Solve Trend, we combine human insight, creative thinking and
            intelligent systems to help ambitious businesses create meaningful
            impact and sustainable growth.
          </p>
        </ContainerAnimated>

        <ContainerAnimated className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="h-11 gap-1 rounded-full border-0 bg-[#E8341A] px-6 text-white hover:bg-[#d42f17]"
          >
            <a href="#contact">
              Start a project
              <DotGridArrow />
            </a>
          </Button>
          <Button asChild variant="link" className="text-[#1A1A1A]">
            <a href="#about">About us</a>
          </Button>
        </ContainerAnimated>
      </ContainerStagger>

      <div
        className="pointer-events-none absolute z-10 h-[70vh] w-full"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, rgba(232, 52, 26, 0.45), rgba(255, 138, 110, 0.35), rgba(247, 162, 59, 0.25))",
          filter: "blur(84px)",
          mixBlendMode: "screen",
        }}
      />

      <ContainerScroll className="relative h-[350vh]">
        <ContainerSticky className="h-svh px-4 md:px-8">
          <GalleryContainer>
            {VISION_GALLERY_COLUMNS.map((column, columnIndex) => (
              <GalleryCol
                key={columnIndex}
                yRange={COLUMN_Y_RANGES[columnIndex]}
                className={columnIndex === 1 ? "mt-[-50%]" : "-mt-2"}
              >
                {column.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={image.src}
                    className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                ))}
              </GalleryCol>
            ))}
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
