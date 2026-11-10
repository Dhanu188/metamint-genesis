import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Globe, Coins } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Decentralized",
      description: "Built on Polygon blockchain ensuring security, transparency, and true ownership of your digital assets."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience instant minting and trading with Polygon's high-speed, low-cost infrastructure."
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Connect with creators and collectors worldwide in our vibrant NFT ecosystem."
    },
    {
      icon: Coins,
      title: "Low Fees",
      description: "Mint and trade NFTs with minimal gas fees on the Polygon Amoy testnet."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About MetaMint
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            MetaMint is a cutting-edge decentralized NFT marketplace that empowers creators 
            to mint, showcase, and trade unique digital assets on the Polygon blockchain. 
            Our platform combines the power of Web3 technology with an intuitive user experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="shadow-card border-0 bg-card-gradient hover:shadow-glow transition-smooth hover:scale-105 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="bg-card-gradient rounded-2xl p-8 shadow-card animate-fade-in">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Built with Modern Technology
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">React</div>
              <div className="text-sm text-muted-foreground">Frontend Framework</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">Polygon</div>
              <div className="text-sm text-muted-foreground">Blockchain Network</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">wagmi + viem</div>
              <div className="text-sm text-muted-foreground">Blockchain Integration</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">IPFS</div>
              <div className="text-sm text-muted-foreground">Decentralized Storage</div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mt-16 max-w-3xl mx-auto animate-slide-up">
          <blockquote className="text-2xl font-medium text-foreground italic leading-relaxed">
            "Our mission is to democratize digital ownership and empower creators 
            to monetize their art in the decentralized economy."
          </blockquote>
          <cite className="text-lg text-muted-foreground mt-4 block">
            — MetaMint Team
          </cite>
        </div>
      </div>
    </section>
  );
};

export default About;