import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart } from "lucide-react";
import demoNft1 from "@/assets/demo-nft.jpg";
import demoNft2 from "@/assets/demo-nft-2.jpg";

const Gallery = () => {
  const nfts = [
    {
      id: 1,
      name: "Cosmic Explorer #001",
      description: "A vibrant digital character exploring the cosmos",
      image: demoNft1,
      creator: "0x1234...5678",
      price: "0.05 MATIC",
      likes: 23
    },
    {
      id: 2,
      name: "Abstract Future #002",
      description: "Geometric patterns representing tomorrow's possibilities",
      image: demoNft2,
      creator: "0x8765...4321",
      price: "0.03 MATIC",
      likes: 18
    },
    {
      id: 3,
      name: "Digital Dreams #003",
      description: "Where technology meets imagination",
      image: demoNft1,
      creator: "0x9999...1111",
      price: "0.08 MATIC",
      likes: 31
    },
    {
      id: 4,
      name: "Neon Visions #004",
      description: "Cyberpunk aesthetics in digital form",
      image: demoNft2,
      creator: "0x2222...3333",
      price: "0.06 MATIC",
      likes: 27
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Live Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing NFTs created by our community on the Polygon blockchain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {nfts.map((nft, index) => (
            <Card 
              key={nft.id} 
              className="group shadow-card border-0 bg-card-gradient hover:shadow-glow transition-smooth hover:scale-105 animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* NFT Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Likes Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-sm">
                      <Heart className="w-3 h-3 mr-1" />
                      {nft.likes}
                    </Badge>
                  </div>
                </div>

                {/* NFT Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {nft.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {nft.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Creator</p>
                      <p className="text-sm font-medium text-foreground">{nft.creator}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-semibold text-primary">{nft.price}</p>
                    </div>
                  </div>

                  <Badge variant="outline" className="w-full justify-center border-primary/20 text-primary">
                    Polygon Amoy
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-card-gradient border border-border rounded-lg text-foreground hover:shadow-soft transition-smooth hover:scale-105">
            Load More NFTs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;