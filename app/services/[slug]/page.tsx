import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";
import { SERVICES, getService } from "@/lib/services";
import { asset } from "@/lib/asset";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found — Solve Trend" };
  return {
    title: `${service.name} — Solve Trend`,
    description: service.overview,
    openGraph: {
      title: `${service.name} — Solve Trend`,
      description: service.overview,
      images: [service.imageUrl],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const tint = `${service.accent}14`;

  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-light)] text-[#1A1A1A]">
        {/* Hero */}
        <section
          className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24"
          style={{
            background: `radial-gradient(90vmin 60vmin at 80% -10%, ${tint}, transparent 70%), var(--bg-light)`,
          }}
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#999]"
            >
              <Link href="/services" className="hover:text-[#1A1A1A]">
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: service.accent }}>{service.name}</span>
            </nav>

            <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
              <div>
                <p
                  className="text-sm font-bold uppercase tracking-[0.2em]"
                  style={{ color: service.accent }}
                >
                  № {service.number}
                </p>
                <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                  {service.name}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#444] md:text-xl">
                  {service.tagline}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888]">
                  {service.tags.map((tag, i) => (
                    <span key={tag} className="flex items-center gap-2.5">
                      {i > 0 ? (
                        <span aria-hidden="true" className="opacity-40">
                          /
                        </span>
                      ) : null}
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href="/#contact"
                    className="magnetic-cta group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: service.accent }}
                  >
                    Start a project
                    <DotGridArrow />
                  </Link>
                </div>
              </div>

              <div
                className="relative overflow-hidden rounded-3xl p-3"
                style={{
                  background: `linear-gradient(140deg, ${service.accent}24, rgba(255,255,255,0))`,
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/[0.04] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(service.imageUrl)}
                    alt={service.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
              The short version
            </h2>
            <p className="text-lg leading-relaxed text-[#444] md:text-xl">
              {service.overview}
            </p>
          </div>
        </section>

        {/* Deliverables */}
        <section
          className="py-16 md:py-20"
          style={{ background: tint }}
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="services-zoom-parallax__eyebrow mb-6">
              <span
                className="services-brand-dot"
                aria-hidden="true"
                style={{ background: service.accent }}
              />
              <span>What you get</span>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-[var(--bg-light)] px-6 py-5 text-[15px] leading-relaxed text-[#333] md:text-base"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: service.accent }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <div className="services-zoom-parallax__eyebrow mb-8">
            <span
              className="services-brand-dot"
              aria-hidden="true"
              style={{ background: service.accent }}
            />
            <span>How we work</span>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={step.title} className="border-t-2 pt-5" style={{ borderColor: service.accent }}>
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: service.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#555]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-24">
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-14 text-center md:px-16 md:py-20"
            style={{
              background: `linear-gradient(135deg, ${service.accent}, ${service.accent}cc)`,
            }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Let&rsquo;s scope your {service.name} project.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Tell us what you&rsquo;re trying to build. We&rsquo;ll come back with a plan and a realistic scope — no fluff.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <DotGridArrow />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                All services
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
            Other things we do
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-black/10 p-6 transition-colors hover:border-black/30"
              >
                <span
                  className="text-xs font-bold tabular-nums"
                  style={{ color: s.accent }}
                >
                  № {s.number}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold leading-tight tracking-tight">
                  {s.name}
                </h3>
                <span
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: s.accent }}
                >
                  Explore
                  <DotGridArrow />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
