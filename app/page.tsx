import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CraftingSection from "@/components/CraftingSection";
import ManifestoSection from "@/components/ManifestoSection";
import VelocityMarquee from "@/components/VelocityMarquee";
import ProjectsSection from "@/components/ProjectsSection";
import Services from "@/components/Services";
import TrendShowcaseSection from "@/components/TrendShowcaseSection";
import PhilosophySection from "@/components/PhilosophySection";
import DarkTransition from "@/components/DarkTransition";
import FAQ from "@/components/FAQ";
import TestimonialShowcase from "@/components/TestimonialShowcase";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
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
        {/* variant="none": the section is taller than a mobile viewport, so a
            whileInView reveal gated on 20% visibility never fires there. The
            section runs its own per-card reveals instead. */}
        <SectionReveal index={1} variant="none">
          <ProjectsSection />
        </SectionReveal>
        <SectionReveal index={2} variant="none">
          <Services />
        </SectionReveal>
        <DarkTransition />
        <VelocityMarquee />
        <SectionReveal index={3} variant="fadeUp">
          <TrendShowcaseSection />
        </SectionReveal>
        <SectionReveal index={4} variant="none">
          <PhilosophySection />
        </SectionReveal>
        <div className="dark-shell">
          <SectionReveal index={5} variant="fadeUp">
            <TestimonialShowcase />
          </SectionReveal>
          <SectionReveal index={6} variant="none">
            <PricingSection />
          </SectionReveal>
          <SectionReveal index={7} variant="fadeUp">
            <FAQ />
          </SectionReveal>
          <SectionReveal index={8} variant="fadeUp">
            <ContactSection />
          </SectionReveal>
          <SectionReveal index={9} variant="none">
            <Footer />
          </SectionReveal>
        </div>
      </main>
    </>
  );
}
