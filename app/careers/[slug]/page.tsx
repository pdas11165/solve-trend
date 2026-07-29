import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { OPEN_ROLES, getJobPosting } from "@/lib/careers";
import { absoluteUrl } from "@/lib/seo";

// Only open roles get a page. A closed posting 404s rather than collecting
// applications we can't act on.
export function generateStaticParams() {
  return OPEN_ROLES.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getJobPosting(slug);
  if (!role || role.status !== "open") return { title: "Role not found — Solve Trend" };

  const title = `${role.title} — Careers at Solve Trend`;
  return {
    title,
    description: role.summary,
    alternates: { canonical: absoluteUrl(`/careers/${role.slug}`) },
    openGraph: {
      title,
      description: role.summary,
      url: absoluteUrl(`/careers/${role.slug}`),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: role.summary,
    },
  };
}

function RoleList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="mt-10">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight md:text-2xl">
        {heading}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[16px] leading-[1.7] text-[#3a3a3a] md:text-[17px]">
            <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--red)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getJobPosting(slug);

  if (!role || role.status !== "open") notFound();

  const meta = [role.location, role.employmentType, role.compensation].filter(
    (value): value is string => Boolean(value),
  );

  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-light)] text-[#1A1A1A]">
        <div className="mx-auto w-full max-w-3xl px-6 pt-36 pb-24 md:pt-44">
          <Link
            href="/careers"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#999] transition-colors hover:text-[var(--red)]"
          >
            ← All roles
          </Link>

          <span className="mt-6 block text-xs font-bold uppercase tracking-[0.18em] text-[var(--red)]">
            {role.department}
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            {role.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {meta.map((item) => (
              <span
                key={item}
                className="rounded-[8px] border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold text-[#555]"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="mt-6 text-[17px] leading-[1.75] text-[#3a3a3a] md:text-lg">
            {role.summary}
          </p>

          <RoleList heading="What you'll do" items={role.responsibilities} />
          <RoleList heading="What we're looking for" items={role.requirements} />
          {role.niceToHave && role.niceToHave.length > 0 ? (
            <RoleList heading="Nice to have" items={role.niceToHave} />
          ) : null}

          <div id="apply" className="mt-14 scroll-mt-28">
            <ApplicationForm defaultRole={role.title} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
