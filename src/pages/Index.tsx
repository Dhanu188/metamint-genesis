import Hero from "@/components/Hero";
import MintSection from "@/components/MintSection";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <MintSection />
      <Gallery />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
