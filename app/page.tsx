import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CraftingSection from "@/components/CraftingSection";
import ManifestoSection from "@/components/ManifestoSection";
import Services from "@/components/Services";
import IndustriesSection from "@/components/IndustriesSection";
import BenefitsSection from "@/components/BenefitsSection";
import StudioStatement from "@/components/StudioStatement";
import FAQ from "@/components/FAQ";
import TestimonialShowcase from "@/components/TestimonialShowcase";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import GuaranteeBand from "@/components/GuaranteeBand";
import HiringStrip from "@/components/HiringStrip";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButtons from "@/components/MagneticButtons";
import SmoothScroll from "@/components/SmoothScroll";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <MagneticButtons />
      <Nav />
      <main>
        <SectionReveal index={0} variant="none">
          <Hero />
        </SectionReveal>
        <CraftingSection />
        <ManifestoSection />
        <SectionReveal index={1} variant="none">
          <Services />
        </SectionReveal>
        {/* variant="none" on the tall sections: a whileInView reveal gated on
            20% visibility never fires for sections taller than the viewport.
            They run their own per-card reveals instead. */}
        <SectionReveal index={2} variant="none">
          <IndustriesSection />
        </SectionReveal>
        <SectionReveal index={3} variant="none">
          <BenefitsSection />
        </SectionReveal>
        {/* ProjectsSection ("Projects we'd show you first") was unmounted
            2026-08-12 at Promit's request — component + data are parked, not
            deleted, in case it comes back. DarkTransition (the Creative
            [reel] Studio expand) was unmounted the same way 2026-08-11. */}
        <StudioStatement />
        {/* Blog/insights lives only at /blog now (nav "Insights") — the
            homepage PhilosophySection was removed at Promit's request. */}
        <div className="dark-shell">
          {/* Taller than the viewport (cover card + numbers row) — a fadeUp
              gated on 20% visibility would never fire. */}
          <SectionReveal index={6} variant="none">
            <TestimonialShowcase />
          </SectionReveal>
          <SectionReveal index={7} variant="none">
            <PricingSection />
          </SectionReveal>
          <SectionReveal index={8} variant="fadeUp">
            <FAQ />
          </SectionReveal>
          <SectionReveal index={9} variant="fadeUp">
            <ContactSection />
          </SectionReveal>
          <SectionReveal index={10} variant="fadeUp">
            <GuaranteeBand />
          </SectionReveal>
          <SectionReveal index={11} variant="fadeUp">
            <HiringStrip />
          </SectionReveal>
          <SectionReveal index={12} variant="none">
            <Footer />
          </SectionReveal>
        </div>
      </main>
    </>
  );
}
