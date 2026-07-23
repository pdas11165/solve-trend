import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Insights — Solve Trend",
  description:
    "Practical notes on custom software, AI automation, CRMs, brand, and design from the Solve Trend team.",
};

export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-light)] text-[#1A1A1A]">
        {/* Header */}
        <section className="relative overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,82,0,0.09),transparent_60%)] blur-[40px]"
          />
          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="services-zoom-parallax__eyebrow mb-4">
              <span className="services-brand-dot" aria-hidden="true" />
              <span>Insights</span>
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Notes from the build.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#444] md:text-xl">
              Practical thinking on custom software, AI automation, CRMs, brand,
              and design — the stuff we actually run into building for clients.
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-black/10 transition-colors hover:border-black/25 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.04] md:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(featured.coverImage)}
                alt={featured.coverAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#888]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: featured.color }}
                  aria-hidden="true"
                />
                {featured.category}
                <span aria-hidden="true" className="opacity-40">
                  —
                </span>
                {formatPostDate(featured.date)}
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#555] md:text-base">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E8341A]">
                Read the post
                <DotGridArrow />
              </span>
            </div>
          </Link>
        </section>

        {/* Rest of posts */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 transition-colors hover:border-black/25"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(post.coverImage)}
                    alt={post.coverAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#888]">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: post.color }}
                      aria-hidden="true"
                    />
                    {post.category}
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold leading-tight tracking-tight">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#555]">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#999]">
                    {formatPostDate(post.date)} · {post.readingTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
