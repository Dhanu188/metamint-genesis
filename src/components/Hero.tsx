import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import ConnectWallet from "@/components/ConnectWallet";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white text-secondary text-sm font-medium mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary" />
            Powered by Polygon Amoy Testnet
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-secondary">
            MetaMint
          </h1>

          <p className="text-xl md:text-2xl text-secondary mb-4 font-medium">
            Decentralized NFT Marketplace
          </p>

          <p className="text-lg md:text-xl text-secondary/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create, mint, and trade unique digital assets on the blockchain.
            Connect your wallet and start building your NFT collection today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ConnectWallet className="animate-glow" />

            <Button variant="connect" size="xl" asChild>
              <a href="#gallery">Explore Gallery</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">150+</div>
              <div className="text-sm text-secondary/80">NFTs Minted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">50+</div>
              <div className="text-sm text-secondary/80">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">25+</div>
              <div className="text-sm text-secondary/80">Collections</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div aria-hidden="true" className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float" />
      <div aria-hidden="true" className="absolute bottom-20 right-10 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div aria-hidden="true" className="absolute top-1/2 left-20 w-8 h-8 bg-primary/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Hero;
