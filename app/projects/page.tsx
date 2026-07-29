import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";
import { PORTFOLIO_CASE_STUDIES } from "@/lib/portfolio";
import { asset } from "@/lib/asset";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Projects — Solve Trend";
const DESCRIPTION =
  "Case studies from Solve Trend's work across brand strategy, identity, web development, eCommerce, motion, video, UX, and custom software with AI automation.";
const OG_IMAGE = "/projects/web-development-hero.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/projects"),
    type: "website",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-light)] text-[#1A1A1A]">
        {/* Hero */}
        <section className="relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,82,0,0.09),transparent_60%)] blur-[40px]"
          />
          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="services-zoom-parallax__eyebrow mb-4">
              <span className="services-brand-dot" aria-hidden="true" />
              <span>Selected Work</span>
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Proof in every discipline.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#444] md:text-xl">
              From a first brand sprint to AI running quietly in the
              background — here&rsquo;s a closer look at the range of work we
              ship, and what each engagement actually delivered.
            </p>
          </div>
        </section>

        {/* Case studies */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28">
          <div className="grid gap-6 md:grid-cols-2">
            {PORTFOLIO_CASE_STUDIES.map((project) => (
              <article
                key={project.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/60 transition-colors hover:border-black/25"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(project.image)}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <span
                    className="absolute left-4 top-4 rounded-[8px] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
                    style={{ background: project.accent }}
                  >
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    {project.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#555]">
                    {project.summary}
                  </p>
                  <p
                    className="mt-4 text-sm font-semibold"
                    style={{ color: project.accent }}
                  >
                    {project.outcome}
                  </p>
                  <Link
                    href={`/services/${project.relatedService}`}
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold"
                    style={{ color: project.accent }}
                  >
                    See the service behind this
                    <DotGridArrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-black/10 bg-white/50 px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
                Want results like these?
              </h2>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#555] md:text-base">
                Tell us what you&rsquo;re building — we&rsquo;ll come back
                with a plan and a realistic scope.
              </p>
            </div>
            <Link
              href="/#contact"
              className="magnetic-cta group inline-flex shrink-0 items-center gap-2 rounded-[14px] bg-[#E8341A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d42f17]"
            >
              Start a project
              <DotGridArrow />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
