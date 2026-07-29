import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";
import { PRICING_TIERS, PRICING_FAQ } from "@/lib/pricing";
import { SERVICES } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Pricing — Solve Trend";
const DESCRIPTION =
  "Transparent pricing for brand, web, and AI automation work — three monthly packages, or scope any of our eight services individually after a discovery call.";
const OG_IMAGE = "/services/custom-software-ai.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/pricing") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/pricing"),
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

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
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
              <span>Pricing</span>
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              One package, or eight disciplines à la carte.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#444] md:text-xl">
              Most clients start with a monthly package below. If you already
              know exactly what you need, every service can be scoped and
              quoted on its own after a quick discovery call.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28">
          <div className="grid gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <article
                key={tier.slug}
                className={`relative flex flex-col rounded-[28px] border p-7 md:p-8 ${
                  tier.featured
                    ? "border-black/15 bg-white shadow-[0_30px_80px_-30px_rgba(232,52,26,0.35)] lg:-mt-4 lg:mb-[-1rem]"
                    : "border-black/10 bg-white/60"
                }`}
              >
                {tier.featured ? (
                  <span
                    className="absolute -top-3 left-7 rounded-[8px] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
                    style={{ background: tier.accent }}
                  >
                    {tier.level}
                  </span>
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#999]">
                    {tier.level}
                  </span>
                )}

                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight">
                  {tier.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#777]">{tier.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  {tier.price !== null ? (
                    <>
                      <span className="text-xl font-bold text-[#888]">$</span>
                      <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
                        {tier.price.toLocaleString("en-CA")}
                      </span>
                      <span className="ml-1 text-sm font-medium text-[#888]">/month</span>
                    </>
                  ) : (
                    <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
                      {tier.priceLabel}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#555]">{tier.description}</p>

                <ul className="mb-8 mt-7 flex flex-col gap-3.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-snug">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: tier.accent }}
                        aria-hidden="true"
                      />
                      <span className="text-[#333]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#999]">
                      Billed
                    </span>
                    <span className="text-sm font-semibold text-[#333]">{tier.billing}</span>
                  </div>
                  <Link
                    href="/#contact"
                    className="magnetic-cta inline-flex items-center justify-center gap-2 rounded-[14px] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: tier.accent }}
                  >
                    {tier.cta}
                    <DotGridArrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-16 text-center text-xs uppercase tracking-[0.18em] text-[#999] lg:mt-20">
            Prices in CAD · Scope confirmed after a discovery call
          </p>
        </section>

        {/* By service */}
        <section className="py-16 md:py-20" style={{ background: "rgba(232,52,26,0.05)" }}>
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="services-zoom-parallax__eyebrow mb-4">
              <span className="services-brand-dot" aria-hidden="true" />
              <span>Or scope by service</span>
            </div>
            <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl">
              Know exactly what you need? Price it on its own.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#444]">
              Every discipline below can be quoted and delivered independently
              of the packages above — a single brand sprint, one website
              build, or an AI automation layered onto what you already run.
            </p>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => (
                <li key={service.slug} className="bg-[var(--bg-light)] p-6">
                  <Link href={`/services/${service.slug}`} className="group flex h-full flex-col">
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: service.accent }}
                    >
                      № {service.number}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-base font-bold leading-tight tracking-tight">
                      {service.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#666]">
                      {service.description}
                    </p>
                    <span
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold"
                      style={{ color: service.accent }}
                    >
                      Get a quote
                      <DotGridArrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
            Pricing questions
          </h2>
          <dl className="mt-8 flex flex-col gap-8">
            {PRICING_FAQ.map((item) => (
              <div key={item.question}>
                <dt className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
                  {item.question}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-[#555] md:text-base">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8341A] to-[#E8341Acc] px-8 py-14 text-center md:px-16 md:py-20">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Not sure which package fits?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Tell us what you&rsquo;re building. We&rsquo;ll recommend a
              package — or a custom scope — on a short discovery call.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-[14px] bg-white px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <DotGridArrow />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-[14px] border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                All services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
