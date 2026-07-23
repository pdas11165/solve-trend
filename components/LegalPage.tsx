import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export default function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-light)] text-[#1A1A1A]">
        <div className="mx-auto w-full max-w-3xl px-6 pt-36 pb-24 md:pt-44">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#999]">
            Last updated {lastUpdated}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-[17px] leading-[1.75] text-[#3a3a3a] md:text-lg">
            {intro}
          </p>

          {sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight md:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-4 text-[16px] leading-[1.75] text-[#3a3a3a] md:text-[17px]"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
