import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";
import { SERVICES } from "@/lib/services";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Services — Solve Trend",
  description:
    "Brand, design, web, eCommerce, and custom software with AI automation. Explore what Solve Trend builds — and how.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-light)] text-[#1A1A1A]">
        {/* Header */}
        <section className="relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,82,0,0.09),transparent_60%)] blur-[40px]"
          />
          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="services-zoom-parallax__eyebrow mb-4">
              <span className="services-brand-dot" aria-hidden="true" />
              <span>What We&rsquo;re Good At</span>
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Eight disciplines, one team.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#444] md:text-xl">
              Strategy, design, and engineering under one roof — from brand and
              motion to custom software and AI automation. Pick a discipline to
              see how we run it end to end.
            </p>
          </div>
        </section>

        {/* Service cards */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28">
          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 transition-colors hover:border-black/25"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(service.imageUrl)}
                    alt={service.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
                    style={{ background: service.accent }}
                  >
                    № {service.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight">
                    {service.name}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#555]">
                    {service.description}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: service.accent }}
                  >
                    Explore {service.name}
                    <DotGridArrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-black/10 bg-white/50 px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
                Not sure which one you need?
              </h2>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#555] md:text-base">
                Most projects touch two or three of these. Tell us the problem —
                we&rsquo;ll figure out the mix.
              </p>
            </div>
            <Link
              href="/#contact"
              className="magnetic-cta group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#E8341A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d42f17]"
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
