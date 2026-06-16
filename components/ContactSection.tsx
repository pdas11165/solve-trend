import GradientBlobCard from "@/components/ui/gradient-bold-card";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20 scroll-mt-24 bg-[var(--bg-dark-2)] px-[var(--container-pad,24px)] py-24 sm:py-28"
      aria-label="Contact form"
    >
      <div className="container mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-start lg:gap-16">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--red)]">
            Get in touch
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
            Ready to start your next project?
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted-dark)]">
            Send us your details and the services you need. Customer inquiries go straight to our
            team inbox so we can follow up quickly.
          </p>
        </div>

        <div className="w-full min-w-0 overflow-visible">
          <GradientBlobCard />
        </div>
      </div>
    </section>
  );
}
