import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";
import { BLOG_POSTS, getPost, formatPostDate, type BlogBlock } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found — Solve Trend" };
  return {
    title: `${post.title} — Solve Trend`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.coverImage],
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-5 text-[17px] leading-[1.75] text-[#3a3a3a] md:text-lg">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[17px] leading-[1.7] text-[#3a3a3a] md:text-lg"
            >
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8341A]"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-[#E8341A] pl-6 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-tight text-[#1A1A1A] md:text-2xl">
          {block.text}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-light)] text-[#1A1A1A]">
        <article>
          {/* Header */}
          <header className="mx-auto w-full max-w-3xl px-6 pt-36 md:pt-44">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#999]"
            >
              <Link href="/blog" className="hover:text-[#1A1A1A]">
                Insights
              </Link>
              <span aria-hidden="true">/</span>
              <span>{post.category}</span>
            </nav>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-[#888]">
              <span>{post.author}</span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>{formatPostDate(post.date)}</span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>{post.readingTime}</span>
            </p>
          </header>

          {/* Cover */}
          <div className="mx-auto mt-10 w-full max-w-4xl px-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-black/[0.04] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.coverAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto w-full max-w-3xl px-6 pb-16 pt-12 md:pb-20">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {/* Post CTA */}
            <div className="mt-16 rounded-3xl border border-black/10 bg-white/50 p-8 md:p-10">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
                Working through this yourself?
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#555] md:text-base">
                If you&rsquo;re weighing a custom build, a CRM, or an AI
                automation, we&rsquo;re happy to talk it through — scope first,
                pitch later.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="magnetic-cta group inline-flex items-center gap-2 rounded-full bg-[#E8341A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d42f17]"
                >
                  Start a conversation
                  <DotGridArrow />
                </Link>
                <Link
                  href="/services/custom-software-ai"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-black/40"
                >
                  Custom Software & AI
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* More posts */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">
            Keep reading
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 transition-colors hover:border-black/25 sm:flex-row"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.04] sm:aspect-auto sm:w-40 sm:shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverImage}
                    alt={p.coverAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#888]">
                    {p.category}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold leading-tight tracking-tight">
                    {p.title}
                  </h3>
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
