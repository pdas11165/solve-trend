"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SHOWCASE_PROJECTS, type ShowcaseProject } from "@/lib/project-showcase";
import { RevealText } from "@/components/ui/reveal-text";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { asset } from "@/lib/asset";
import { DotGridArrow } from "./Icons";

/** Plays the clip only while it is on screen; static image otherwise. */
function ProjectMedia({ project }: { project: ShowcaseProject }) {
  const isVideo = project.media.endsWith(".mp4");
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const inView = useInView(wrapRef, { margin: "-15% 0px" });

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl p-4 sm:p-6"
      style={{
        background: `linear-gradient(135deg, ${project.accentSoft}, rgba(255,255,255,0))`,
      }}
    >
      {/* soft accent glow behind the media */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 opacity-60 blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${project.accentSoft}, transparent)` }}
      />
      <div className="hover-zoom relative h-full w-full overflow-hidden rounded-xl bg-black/[0.03] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
        <ParallaxMedia>
          {isVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={asset(project.media)}
              poster={asset(project.media.replace(/\.mp4$/, "-poster.jpg"))}
              muted
              loop
              playsInline
              preload="none"
              aria-label={`${project.category} showcase`}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="h-full w-full object-cover"
              src={asset(project.media)}
              alt={`${project.category} showcase`}
              loading="lazy"
            />
          )}
        </ParallaxMedia>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: ShowcaseProject; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid items-center gap-8 rounded-[28px] border border-black/[0.06] bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] md:grid-cols-2 md:gap-12 md:p-8"
    >
      {/* Text */}
      <div className={`flex flex-col ${reversed ? "md:order-2" : ""}`}>
        <span
          className="mb-5 inline-flex w-fit items-center rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]"
          style={{ backgroundColor: project.accentSoft, color: project.accent }}
        >
          {project.category}
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold leading-[1.1] tracking-tight text-[#1A1A1A] md:text-[2rem]">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#555]">
          {project.description}
        </p>

        <div className="mt-7 flex gap-10">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#999]">
                {stat.label}
              </p>
              <p
                className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold"
                style={{ color: project.accent }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="magnetic-cta group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333]"
        >
          Start a project like this
          <DotGridArrow />
        </a>
      </div>

      {/* Media */}
      <div className={reversed ? "md:order-1" : ""}>
        <ProjectMedia project={project} />
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const headRef = React.useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="relative bg-[var(--bg-light)] py-20 md:py-28"
      aria-label="Selected projects"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="services-zoom-parallax__eyebrow mb-4 justify-center">
            <span className="services-brand-dot" aria-hidden="true" />
            <span>Selected Work</span>
          </div>
          <RevealText
            as="h2"
            text="Proof in every discipline"
            className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[#1A1A1A] md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#555] md:text-base">
            From a first brand sprint to AI running in the background — here&rsquo;s
            the range of work we ship, and what it takes to get there.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-10">
          {SHOWCASE_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#contact"
            className="magnetic-cta group inline-flex items-center gap-2 rounded-full bg-[#E8341A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d42f17]"
          >
            Start your project
            <DotGridArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
