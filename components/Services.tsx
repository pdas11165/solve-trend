'use client';

import React, { useRef, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_CDN = 'https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b';
const WORK_CDN = 'https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1';
const PROJECT_CDN = 'https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799';

function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

type ParallaxImage = { src: string; alt: string };

function ZoomParallax({ images }: { images: ParallaxImage[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--bg-light)]">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''
              } ${
                index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''
              } ${
                index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''
              } ${
                index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''
              } ${
                index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''
              } ${
                index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''
              }`}
            >
              <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

type FlowSectionProps = {
  className?: string;
  style?: CSSProperties;
  title: string;
  number: string;
  description: string;
  tags?: string[];
  imageUrl: string;
  'aria-label'?: string;
  index?: number;
};

function FlowSection({
  className,
  style = {},
  title,
  number,
  description,
  tags,
  imageUrl,
  'aria-label': ariaLabel,
  index = 0,
}: FlowSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [index === 0 ? 0 : 25, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className={cx('sticky top-0 h-screen w-full overflow-hidden shadow-2xl', className)}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{
          ...style,
          rotate,
          transformOrigin: 'bottom left',
        }}
        className={cx(
          'relative flex h-screen w-full flex-col md:flex-row items-center justify-between gap-6 px-[4vw] py-[6vw] md:py-[3vw]',
          'will-change-transform'
        )}
      >
        <div className="flex h-[45%] md:h-full w-full md:w-1/2 flex-col justify-between z-10 pt-16 md:pt-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-80">
              {number} — {title}
            </p>
            <hr className="my-[2vw] md:my-[1.5vw] border-none border-t border-current opacity-30" />
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,7rem)] font-bold leading-[0.9] uppercase tracking-tighter pr-4">
              {title}
            </h2>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="max-w-[45ch] text-[clamp(1rem,1.5vw,1.5rem)] font-normal leading-relaxed opacity-90">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {tags?.map((tag, i) => (
                <span key={i} className="rounded-full border border-current px-4 py-2 text-xs md:text-sm uppercase tracking-wider opacity-80">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[55%] md:h-[90%] w-full md:w-1/2 overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
          <motion.div style={{ scale: imageScale }} className="h-full w-full">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function FlowArt({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}: {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}) {
  return (
    <main
      aria-label={ariaLabel}
      className={cx('relative w-full overflow-x-hidden', className)}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement<FlowSectionProps>, { index });
        }
        return child;
      })}
    </main>
  );
}

const images: ParallaxImage[] = [
  {
    src: `${HERO_CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
    alt: 'Strategy and positioning',
  },
  {
    src: `${HERO_CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
    alt: 'Web development project',
  },
  {
    src: `${WORK_CDN}/69bac6dee6fbe19c625613e7_CMS%20Work%2003%20webp.webp`,
    alt: 'Motion graphics project',
  },
  {
    src: `${HERO_CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
    alt: 'Brand identity design',
  },
  {
    src: `${HERO_CDN}/6904ca7a4abbe56dfff8957d_hero-marquee-img-08.avif`,
    alt: 'Content strategy',
  },
  {
    src: `${WORK_CDN}/69bac6c472b3ddaac9735644_CMS%20Work%2001%20webp.webp`,
    alt: 'Brand strategy work',
  },
  {
    src: `${HERO_CDN}/6904ca7a4abbe56dfff89578_hero-marquee-img-07.avif`,
    alt: 'Motion design',
  },
];

const services = [
  {
    number: '01',
    title: 'Brand Strategy',
    description: 'Positioning, market research, messaging, campaign strategy',
    tags: ['Positioning', 'Research', 'Messaging', 'Campaigns'],
    color: '#0f172a',
    textColor: '#ffffff',
    imageUrl: `${WORK_CDN}/69bac6c472b3ddaac9735644_CMS%20Work%2001%20webp.webp`,
  },
  {
    number: '02',
    title: 'Brand Identity & Graphic Design',
    description: 'Logo, visual systems, social, packaging, print',
    tags: ['Logo', 'Visual Systems', 'Packaging', 'Print'],
    color: '#fd5200',
    textColor: '#ffffff',
    imageUrl: `${HERO_CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
  },
  {
    number: '03',
    title: 'Motion Graphics & Animation',
    description: 'Motion graphics, logo animation, explainers, kinetic type',
    tags: ['Motion', 'Animation', 'Explainers', 'Kinetic Type'],
    color: '#1e1b4b',
    textColor: '#ffffff',
    imageUrl: `${WORK_CDN}/69bac6dee6fbe19c625613e7_CMS%20Work%2003%20webp.webp`,
  },
  {
    number: '04',
    title: 'Video Editing & Production',
    description: 'Commercials, reels, corporate video, color grading, sound',
    tags: ['Commercials', 'Reels', 'Color Grading', 'Sound'],
    color: '#000000',
    textColor: '#ffffff',
    imageUrl: `${WORK_CDN}/69bac6edbbaa23515e2a5e63_CMS%20Work%2004%20webp.webp`,
  },
  {
    number: '05',
    title: 'User Experience Design',
    description: 'UX/UI, wireframes, prototyping, design systems',
    tags: ['UX/UI', 'Wireframes', 'Prototyping', 'Design Systems'],
    color: '#F5F0E8',
    textColor: '#0f172a',
    imageUrl: `${PROJECT_CDN}/69ce1bd505ea321d262a6ef4_uiux.jpg`,
  },
  {
    number: '06',
    title: 'Web Development',
    description: 'Business sites, landing pages, Webflow/React, CMS, APIs',
    tags: ['React', 'Webflow', 'CMS', 'APIs'],
    color: '#1A3DE8',
    textColor: '#ffffff',
    imageUrl: `${HERO_CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
  },
  {
    number: '07',
    title: 'eCommerce Solutions',
    description: 'Shopify, WooCommerce, checkout optimization, marketplaces',
    tags: ['Shopify', 'WooCommerce', 'Checkout', 'Marketplaces'],
    color: '#064e3b',
    textColor: '#ffffff',
    imageUrl: `${WORK_CDN}/69c6157dc7884d040282487d_Work%207%20WebP.webp`,
  },
  {
    number: '08',
    title: 'AI Automation',
    description: 'Chatbots, workflow automation, CRM automation, AI content systems',
    tags: ['Chatbots', 'Workflows', 'CRM', 'AI Content'],
    color: '#4c1d95',
    textColor: '#ffffff',
    imageUrl: `${HERO_CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
  },
];

export default function Services() {
  return (
    <div id="services" className="min-h-screen w-full bg-[var(--bg-light)] selection:bg-[var(--red)] selection:text-white">
      <div className="relative flex h-[60vh] flex-col items-center justify-center overflow-x-clip px-4">
        <div
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,rgba(253,82,0,0.1),transparent_50%)]',
            'blur-[30px]'
          )}
        />
        <h1 className="font-[family-name:var(--font-display)] text-center text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tight text-slate-900">
          Our Capabilities
        </h1>
        <p className="mt-4 text-center text-lg text-slate-600 md:text-xl">
          Scroll down to explore how we elevate your business
        </p>
      </div>

      <ZoomParallax images={images} />

      <FlowArt aria-label="Our Services Detail">
        {services.map((svc, i) => (
          <FlowSection
            key={i}
            index={i}
            number={svc.number}
            title={svc.title}
            description={svc.description}
            tags={svc.tags}
            imageUrl={svc.imageUrl}
            style={{ backgroundColor: svc.color, color: svc.textColor }}
          />
        ))}
      </FlowArt>
    </div>
  );
}
