import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CraftingSection from "@/components/CraftingSection";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import Services from "@/components/Services";
import PhilosophySection from "@/components/PhilosophySection";
import DarkTransition from "@/components/DarkTransition";
import Expertise from "@/components/Expertise";
import LatestWork from "@/components/LatestWork";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
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
        <SectionReveal index={1} variant="none">
          <IntroAnimation />
        </SectionReveal>
        <SectionReveal index={2} variant="none">
          <Services />
        </SectionReveal>
        <SectionReveal index={3}>
          <PhilosophySection />
        </SectionReveal>
        <DarkTransition />
        <div className="dark-shell">
          <SectionReveal index={4} variant="clipReveal">
            <Expertise />
          </SectionReveal>
          <SectionReveal index={5} variant="clipReveal">
            <LatestWork />
          </SectionReveal>
          <SectionReveal index={6} variant="clipReveal">
            <FAQ />
          </SectionReveal>
          <SectionReveal index={7} variant="clipReveal">
            <Testimonials />
          </SectionReveal>
          <SectionReveal index={8} variant="clipReveal">
            <Footer />
          </SectionReveal>
        </div>
      </main>
    </>
  );
}
