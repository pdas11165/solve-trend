import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CraftingSection from "@/components/CraftingSection";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import Services from "@/components/Services";
import DarkTransition from "@/components/DarkTransition";
import Expertise from "@/components/Expertise";
import LatestWork from "@/components/LatestWork";
import FAQ from "@/components/FAQ";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <SectionReveal index={0} onMount>
          <Hero />
        </SectionReveal>
        <CraftingSection />
        <SectionReveal index={1}>
          <IntroAnimation />
        </SectionReveal>
        <SectionReveal index={2}>
          <Services />
        </SectionReveal>
        <DarkTransition />
        <div className="dark-shell">
          <SectionReveal index={3}>
            <Expertise />
          </SectionReveal>
          <SectionReveal index={4}>
            <LatestWork />
          </SectionReveal>
          <SectionReveal index={5}>
            <FAQ />
          </SectionReveal>
          <SectionReveal index={6}>
            <Marquee />
          </SectionReveal>
          <SectionReveal index={7}>
            <Footer />
          </SectionReveal>
        </div>
      </main>
    </>
  );
}
