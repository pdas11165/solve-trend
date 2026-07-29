import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "About Us — Solve Trend";
const DESCRIPTION =
  "Solve Trend is a digital marketing and design agency based in Charlottetown, PEI. Meet the studio behind the brands, sites, and AI systems we build.";
const OG_IMAGE = "/projects/brand-identity-hero.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/about"),
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

const STATS = [
  { value: "5+", label: "Years of experience" },
  { value: "50+", label: "Happy clients" },
  { value: "120+", label: "Projects delivered" },
];

const VALUES = [
  {
    icon: Lightbulb,
    title: "Strategy first",
    body: "We don't open a design tool until we know who you're for and what you're actually trying to win. Every deliverable traces back to a decision, not a trend.",
  },
  {
    icon: Sparkles,
    title: "Craft that holds up",
    body: "Brand systems, interfaces, and motion built to a standard that survives contact with the real world — not just a pitch deck.",
  },
  {
    icon: Rocket,
    title: "Technology that works while you sleep",
    body: "Custom software and AI automation aren't an add-on for us — they're how we make sure the strategy and design actually compound over time.",
  },
  {
    icon: ShieldCheck,
    title: "Honest about scope",
    body: "We'd rather tell you a project needs three weeks than promise one and miss it. Realistic timelines, straightforward pricing, no surprise invoices.",
  },
];

export default function AboutPage() {
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
              <span>About Us</span>
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Strategy, creativity, and technology — under one roof.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#444] md:text-xl">
              Solve Trend is a digital marketing and design agency based in
              Charlottetown, PEI. We build brands, websites, and the AI
              automations that keep them running — for founders across North
              America who want one team, not five vendors.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-5 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/10 bg-white/50 px-6 py-8 text-center"
              >
                <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[#E8341A] md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-[#555]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
              Why we exist
            </h2>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-[#444] md:text-xl">
              <p>
                Most businesses end up stitching their brand, their website,
                and their operations together from a pile of freelancers,
                templates, and tools that don&rsquo;t talk to each other.
                Solve Trend exists to be the one team that owns all of it —
                so the strategy behind your brand actually shows up in your
                website, and the systems running your business actually
                reflect how you want to grow.
              </p>
              <p>
                We&rsquo;re small enough to move fast and opinionated enough
                to push back when a request doesn&rsquo;t serve the goal. We
                work across brand strategy, identity, motion, video, UX,
                web and eCommerce development, and custom software with AI
                automation — the full stack from first idea to the system
                that runs it.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20" style={{ background: "rgba(232,52,26,0.05)" }}>
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="services-zoom-parallax__eyebrow mb-6">
              <span className="services-brand-dot" aria-hidden="true" />
              <span>How we work</span>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {VALUES.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="border-t-2 border-[#E8341A] pt-5">
                    <Icon className="h-6 w-6 text-[#E8341A]" aria-hidden="true" />
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#555]">{value.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
                Based in Charlottetown. Working everywhere.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#444]">
                We&rsquo;re headquartered in Charlottetown, Prince Edward
                Island, and work async-first with clients across North
                America, the UK, and the EU — with in-person kickoffs
                available on request.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white/50 p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#999]">
                Get in touch
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#333]">
                Have a project in mind? Tell us what you&rsquo;re building —
                we read every message ourselves and reply within a day.
              </p>
              <Link
                href="/#contact"
                className="magnetic-cta group mt-6 inline-flex items-center gap-2 rounded-[14px] bg-[#E8341A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d42f17]"
              >
                Start a project
                <DotGridArrow />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8341A] to-[#E8341Acc] px-8 py-14 text-center md:px-16 md:py-20">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              See the range of what we build.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              From brand sprints to AI running in the background — browse the
              work or the disciplines behind it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-[14px] bg-white px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-transform hover:-translate-y-0.5"
              >
                See our work
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
