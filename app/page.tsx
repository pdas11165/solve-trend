import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CraftingSection from "@/components/CraftingSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import VisionExpertiseSection from "@/components/VisionExpertiseSection";
import Services from "@/components/Services";
import TrendShowcaseSection from "@/components/TrendShowcaseSection";
import PhilosophySection from "@/components/PhilosophySection";
import DarkTransition from "@/components/DarkTransition";
import FAQ from "@/components/FAQ";
import TestimonialShowcase from "@/components/TestimonialShowcase";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButtons from "@/components/MagneticButtons";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <MagneticButtons />
      <Nav />
      <main>
        <SectionReveal index={0} variant="none">
          <Hero />
        </SectionReveal>
        <CraftingSection />
        <HowWeWorkSection />
        <SectionReveal index={1} variant="fadeUp">
          <VisionExpertiseSection />
        </SectionReveal>
        <SectionReveal index={2} variant="none">
          <Services />
        </SectionReveal>
        <DarkTransition />
        <SectionReveal index={3} variant="fadeUp">
          <TrendShowcaseSection />
        </SectionReveal>
        <SectionReveal index={4} variant="clipReveal">
          <PhilosophySection />
        </SectionReveal>
        <div className="dark-shell">
          <SectionReveal index={5} variant="fadeUp">
            <TestimonialShowcase />
          </SectionReveal>
          <SectionReveal index={6} variant="fadeUp">
            <FAQ />
          </SectionReveal>
          <SectionReveal index={7} variant="fadeUp">
            <ContactSection />
          </SectionReveal>
          <SectionReveal index={8} variant="none">
            <Footer />
          </SectionReveal>
        </div>
      </main>
    </>
  );
}
