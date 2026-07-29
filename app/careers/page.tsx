import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { OPEN_ROLES, GENERAL_APPLICATION } from "@/lib/careers";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Careers — Solve Trend";
const DESCRIPTION =
  "We're a small studio doing brand, design, and custom software. See what we're hiring for, or send us a general application.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/careers") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/careers"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const HIRING_STEPS = [
  {
    title: "You apply",
    body: "The form below. No account to create, no 40-field portal — your details go straight to our inbox.",
  },
  {
    title: "A real conversation",
    body: "If it looks like a fit, a 30-minute call about your work and ours. No trick questions.",
  },
  {
    title: "A paid exercise",
    body: "A small, realistic piece of work close to what the role actually involves. We pay for your time.",
  },
  {
    title: "Decision",
    body: "You hear back either way, quickly. We know what it's like to be left waiting.",
  },
];

export default function CareersPage() {
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
              <span>Careers</span>
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Small team. Real ownership.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#444] md:text-xl">
              We&rsquo;re a studio doing brand, design, and custom software for
              clients who actually ship. That means the work you do here has your
              name on it — and reaches people the week it&rsquo;s done, not the
              quarter after.
            </p>
          </div>
        </section>

        {/* Open roles */}
        <section id="open-roles" className="mx-auto w-full max-w-6xl scroll-mt-28 px-6 pb-16 md:pb-24">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight md:text-3xl">
            {OPEN_ROLES.length > 0 ? "Open roles" : "No open roles right now"}
          </h2>

          {OPEN_ROLES.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {OPEN_ROLES.map((role) => (
                <Link
                  key={role.slug}
                  href={`/careers/${role.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-black/10 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:justify-between sm:p-7"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--red)]">
                      {role.department}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight md:text-2xl">
                      {role.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#555]">
                      {role.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[role.location, role.employmentType, role.compensation]
                        .filter((meta): meta is string => Boolean(meta))
                        .map((meta) => (
                          <span
                            key={meta}
                            className="rounded-[8px] border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold text-[#555]"
                          >
                            {meta}
                          </span>
                        ))}
                    </div>
                  </div>
                  <span className="flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1A1A1A]">
                    View role
                    <DotGridArrow className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#444]">
              Nothing posted at the moment — but we hire ahead of need more often
              than not. Send a general application and we&rsquo;ll keep you in
              mind when something opens up.
            </p>
          )}
        </section>

        {/* How we hire */}
        <section className="border-y border-black/10 bg-black/[0.02] py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight md:text-3xl">
              How we hire
            </h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HIRING_STEPS.map((step, i) => (
                <li key={step.title}>
                  <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--red)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#555]">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="mx-auto w-full max-w-3xl scroll-mt-28 px-6 py-16 md:py-24">
          <ApplicationForm defaultRole={GENERAL_APPLICATION} />
        </section>
      </main>
      <Footer />
    </>
  );
}
