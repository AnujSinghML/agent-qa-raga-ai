import HeroSection from "@/components/HeroSection";
import PhaseOverview from "@/components/PhaseOverview";
import LocalTestingDeep from "@/components/LocalTestingDeep";
import JailbreakSection from "@/components/JailbreakSection";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PhaseOverview />
      <LocalTestingDeep />
      <JailbreakSection />
      <ResultsSection />
      <Footer />
    </main>
  );
};

export default Index;
