import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CraftingSection from "@/components/CraftingSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import Services from "@/components/Services";
import PhilosophySection from "@/components/PhilosophySection";
import DarkTransition from "@/components/DarkTransition";
import FAQ from "@/components/FAQ";
import TestimonialShowcase from "@/components/TestimonialShowcase";
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
        <SectionReveal index={1} variant="none">
          <Services />
        </SectionReveal>
        <DarkTransition />
        <SectionReveal index={2} variant="none">
          <PhilosophySection />
        </SectionReveal>
        <div className="dark-shell">
          <SectionReveal index={3} variant="fadeUp">
            <TestimonialShowcase />
          </SectionReveal>
          <SectionReveal index={4} variant="none">
            <FAQ />
          </SectionReveal>
          <SectionReveal index={5} variant="none">
            <Footer />
          </SectionReveal>
        </div>
      </main>
    </>
  );
}
