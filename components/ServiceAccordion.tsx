"use client";

import * as React from "react";
import Image from "next/image";

const CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";

type Service = {
  id: string;
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  gradientClass: string;
};

const SERVICES: Service[] = [
  {
    id: "uiux",
    num: "01",
    title: "UI UX Design",
    description:
      "We design intuitive interfaces that improve usability, guide users, and increase engagement.",
    tags: ["User Research", "UX Flows", "Useability Testing", "Interface Design"],
    image: `${CDN}/6904ca7a4abbe56dfff8956d_hero-marquee-img-05.avif`,
    gradientClass: "st-service-bg-01",
  },
  {
    id: "web",
    num: "02",
    title: "Web Development",
    description:
      "We build fast responsive websites ensuring scalability performance and experiences across devices.",
    tags: ["Webflow Builds", "CMS Integration", "Brand Guidelines", "Design Language"],
    image: `${CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
    gradientClass: "st-service-bg-02",
  },
  {
    id: "brand",
    num: "03",
    title: "Brand Identity",
    description:
      "We create brand systems that communicate values build trust and help businesses.",
    tags: ["Logo Design", "Visual Identity", "Brand Guidelines", "Design Language"],
    image: `${CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
    gradientClass: "st-service-bg-03",
  },
  {
    id: "growth",
    num: "04",
    title: "Growth Ops",
    description:
      "We optimize websites through testing insights and improvements conversions accessibility speed.",
    tags: ["Speed Optimization", "Technical SEO", "Core WebVitals", "SEO Structure"],
    image: `${CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
    gradientClass: "st-service-bg-04",
  },
  {
    id: "content",
    num: "05",
    title: "Content Strategy",
    description:
      "We plan content structures that improve engagement consistency and long term brand communication.",
    tags: ["Content", "Strategy", "Pixel Perfect Structure", "Content Planning"],
    image: `${CDN}/6904ca7a4abbe56dfff8957d_hero-marquee-img-08.avif`,
    gradientClass: "st-service-bg-05",
  },
];

function ServiceMeta({ num }: { num: string }) {
  return (
    <div className="service-accordion__meta">
      <span className="service-accordion__meta-label">SERVICE</span>
      <span className="service-accordion__meta-line" aria-hidden="true" />
      <span className="service-accordion__meta-num">({num})</span>
    </div>
  );
}

export default function ServiceAccordion() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 991px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const activate = (index: number) => setActiveIndex(index);

  const handleInteraction = (index: number) => {
    if (isMobile) {
      setActiveIndex((prev) => (prev === index ? prev : index));
    }
  };

  return (
    <div className="service-accordion" role="list">
      {SERVICES.map((service, index) => {
        const isActive = activeIndex === index;
        return (
          <article
            key={service.id}
            role="listitem"
            className={`service-accordion__card${isActive ? " is-active" : ""}`}
            aria-expanded={isActive}
            onMouseEnter={() => !isMobile && activate(index)}
            onClick={() => handleInteraction(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate(index);
              }
            }}
            tabIndex={0}
          >
            <div
              className="service-accordion__expanded"
              aria-hidden={!isActive}
            >
              <ServiceMeta num={service.num} />
              <div className="service-accordion__body">
                <div className="service-accordion__image-wrap">
                  <Image
                    src={service.image}
                    alt=""
                    width={480}
                    height={320}
                    loading="lazy"
                    className="service-accordion__image"
                    unoptimized
                  />
                </div>
                <div className="service-accordion__content">
                  <div className="service-accordion__header">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="service-accordion__tags">
                    {service.tags.map((tag) => (
                      <span key={tag} className="service-accordion__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`service-accordion__collapsed ${service.gradientClass}`}
              aria-hidden={isActive}
            >
              <ServiceMeta num={service.num} />
              <div className="service-accordion__vertical-wrap">
                <h3 className="service-accordion__title--vertical">
                  {service.title}
                </h3>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
