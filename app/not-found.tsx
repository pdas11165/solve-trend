import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DotGridArrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-light)] text-[#1A1A1A]">
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,82,0,0.10),transparent_60%)] blur-[40px]"
          />
          <div className="relative mx-auto flex min-h-[72vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-32 text-center">
            <p className="font-[family-name:var(--font-display)] text-[clamp(5rem,22vw,12rem)] font-extrabold leading-none tracking-tight text-[#E8341A]">
              404
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight md:text-4xl">
              This page took a wrong turn.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#555] md:text-lg">
              The page you&rsquo;re after doesn&rsquo;t exist or has moved. Let&rsquo;s
              get you back to something useful.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="magnetic-cta group inline-flex items-center gap-2 rounded-full bg-[#E8341A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#d42f17]"
              >
                Back home
                <DotGridArrow />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-black/40"
              >
                Services
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-black/40"
              >
                Insights
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
