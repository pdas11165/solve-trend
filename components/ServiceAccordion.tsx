"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
    id: "brand-strategy",
    num: "01",
    title: "Brand Strategy",
    description:
      "We define positioning, messaging, and campaign direction so your brand speaks with clarity and purpose.",
    tags: [
      "Brand Positioning",
      "Competitor & Market Research",
      "Brand Messaging",
      "Campaign Strategy",
      "Content Direction",
    ],
    image: `${CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
    gradientClass: "st-service-bg-01",
  },
  {
    id: "brand-identity",
    num: "02",
    title: "Brand Identity & Graphic Design",
    description:
      "We create visual systems that communicate values, build trust, and help businesses stand out.",
    tags: [
      "Logo Design",
      "Brand Identity Design",
      "Visual Language System",
      "Social Media Design",
      "Packaging Design",
      "Marketing Materials",
      "Print & Outdoor Design",
      "Presentation Design",
    ],
    image: `${CDN}/6904ca7a4abbe56dfff89578_hero-marquee-img-07.avif`,
    gradientClass: "st-service-bg-02",
  },
  {
    id: "motion",
    num: "03",
    title: "Motion Graphics & Animation",
    description:
      "We bring brands to life through motion — from logo animations to explainer videos and social content.",
    tags: [
      "Motion Graphics",
      "Animated Ads",
      "Logo Animation",
      "Explainer Videos",
      "Kinetic Typography",
      "Social Media Motion Content",
    ],
    image: `${CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
    gradientClass: "st-service-bg-03",
  },
  {
    id: "video",
    num: "04",
    title: "Video Editing & Production",
    description:
      "We craft polished video content — from commercials and reels to corporate films and podcasts.",
    tags: [
      "Commercial Video Editing",
      "Reels & Shorts Editing",
      "Corporate Videos",
      "Product Videos",
      "Podcast Editing",
      "Color Grading",
      "Subtitle & Sound Design",
    ],
    image: `${CDN}/6904ca7a4abbe56dfff8957d_hero-marquee-img-08.avif`,
    gradientClass: "st-service-bg-04",
  },
  {
    id: "ux",
    num: "05",
    title: "User Experience Design",
    description:
      "We design intuitive interfaces that improve usability, guide users, and increase engagement.",
    tags: [
      "UX / UI Design",
      "Website UI Design",
      "Mobile App Design",
      "Wireframing",
      "Prototyping",
      "Design System & UI Kit",
    ],
    image: `${CDN}/6904ca7a4abbe56dfff8956d_hero-marquee-img-05.avif`,
    gradientClass: "st-service-bg-05",
  },
  {
    id: "web",
    num: "06",
    title: "Web Development",
    description:
      "We build fast, responsive websites and applications ensuring scalability and performance across devices.",
    tags: [
      "Business Websites",
      "Landing Pages",
      "WordPress Development",
      "Custom Web Applications",
      "CMS Development",
      "API Integration",
      "Maintenance & Support",
    ],
    image: `${CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
    gradientClass: "st-service-bg-06",
  },
  {
    id: "ecommerce",
    num: "07",
    title: "eCommerce Solutions",
    description:
      "We launch and optimize online stores that convert — from Shopify to custom marketplaces.",
    tags: [
      "Shopify Stores",
      "WooCommerce Development",
      "Custom eCommerce",
      "Conversion Optimization",
      "Multi-Vendor Marketplace",
      "Payment Integration",
    ],
    image: `${CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
    gradientClass: "st-service-bg-07",
  },
  {
    id: "ai",
    num: "08",
    title: "AI Automation",
    description:
      "We build intelligent systems that automate workflows, support customers, and accelerate growth.",
    tags: [
      "AI Chatbot Development",
      "AI Customer Support Agent",
      "Workflow Automation",
      "CRM Automation",
      "AI Content Systems",
      "Lead Generation Automation",
      "AI Research Automation",
    ],
    image: `${CDN}/6904ca7a4abbe56dfff8956d_hero-marquee-img-05.avif`,
    gradientClass: "st-service-bg-08",
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
  const rootRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>(".service-accordion__image", rootRef.current)
          .forEach((img) => {
            gsap.to(img, {
              yPercent: -12,
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [activeIndex] }
  );

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
    <div ref={rootRef} className="service-accordion service-accordion--8" role="list">
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
