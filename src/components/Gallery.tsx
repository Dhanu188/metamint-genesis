import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { zeroAddress } from "viem";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Heart } from "lucide-react";
import demoNft1 from "@/assets/demo-nft.jpg";
import demoNft2 from "@/assets/demo-nft-2.jpg";
import demoNft3 from "@/assets/demo-nft-3.jpg";
import demoNft4 from "@/assets/demo-nft-4.jpg";
import { chain, nftAbi, nftContractAddress, nftDeployBlock, shortAddress, tokenExplorerUrl } from "@/lib/web3";
import { resolveIpfsUrl, type NftMetadata } from "@/lib/ipfs";
import { cn } from "@/lib/utils";

interface GalleryNft {
  id: string;
  name: string;
  description: string;
  image: string;
  creator: string;
  price?: string;
  likes: number;
  href?: string;
}

const SAMPLE_NFTS: GalleryNft[] = [
  { id: "sample-1", name: "Cosmic Explorer #001", description: "A vibrant digital character exploring the cosmos", image: demoNft1, creator: "0x1234...5678", price: "0.05 POL", likes: 23 },
  { id: "sample-2", name: "Abstract Future #002", description: "Geometric patterns representing tomorrow's possibilities", image: demoNft2, creator: "0x8765...4321", price: "0.03 POL", likes: 18 },
  { id: "sample-3", name: "Digital Dreams #003", description: "Where technology meets imagination", image: demoNft3, creator: "0x9999...1111", price: "0.08 POL", likes: 31 },
  { id: "sample-4", name: "Neon Visions #004", description: "Cyberpunk aesthetics in digital form", image: demoNft4, creator: "0x2222...3333", price: "0.06 POL", likes: 27 },
];

const PAGE_SIZE = 8;
const LIKES_KEY = "metamint:liked";

const readLiked = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const Gallery = () => {
  const publicClient = usePublicClient({ chainId: chain.id });
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [liked, setLiked] = useState<string[]>(readLiked);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery", nftContractAddress],
    enabled: Boolean(nftContractAddress && publicClient),
    queryFn: async (): Promise<GalleryNft[]> => {
      // Every mint is a Transfer from the zero address.
      const logs = await publicClient!.getContractEvents({
        address: nftContractAddress!,
        abi: nftAbi,
        eventName: "Transfer",
        args: { from: zeroAddress },
        fromBlock: nftDeployBlock,
        toBlock: "latest",
      });

      const minted = logs.reverse(); // newest first
      return Promise.all(
        minted.map(async (log) => {
          const tokenId = log.args.tokenId!;
          const base: GalleryNft = {
            id: tokenId.toString(),
            name: `Token #${tokenId}`,
            description: "",
            image: "/placeholder.svg",
            creator: shortAddress(log.args.to!),
            likes: 0,
            href: tokenExplorerUrl(tokenId),
          };
          try {
            const uri = await publicClient!.readContract({
              address: nftContractAddress!,
              abi: nftAbi,
              functionName: "tokenURI",
              args: [tokenId],
            });
            const res = await fetch(resolveIpfsUrl(uri));
            const meta = (await res.json()) as Partial<NftMetadata>;
            return {
              ...base,
              name: meta.name || base.name,
              description: meta.description ?? "",
              image: meta.image ? resolveIpfsUrl(meta.image) : base.image,
            };
          } catch {
            return base; // Metadata unavailable; still show the token.
          }
        }),
      );
    },
  });

  const isLive = Boolean(nftContractAddress) && !isError;
  const nfts = isLive ? (data ?? []) : SAMPLE_NFTS;
  const shown = nfts.slice(0, visible);

  const toggleLike = (id: string) => {
    setLiked((current) => {
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      try {
        localStorage.setItem(LIKES_KEY, JSON.stringify(next));
      } catch {
        // Storage unavailable (private mode); keep in memory only.
      }
      return next;
    });
  };

  return (
    <section id="gallery" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {isLive ? "Live Gallery" : "Gallery"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing NFTs created by our community on the Polygon blockchain
          </p>
          {!isLive && (
            <p className="mt-4 text-sm text-muted-foreground">
              {isError
                ? "Could not load minted NFTs from the network. Showing sample NFTs."
                : "Showing sample NFTs. Configure a contract address to see live mints."}
            </p>
          )}
        </div>

        {isLive && isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
            ))}
          </div>
        ) : isLive && nfts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No NFTs minted yet. <a href="#mint" className="text-primary underline">Mint the first one!</a>
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {shown.map((nft, index) => {
              const isLiked = liked.includes(nft.id);
              const likes = nft.likes + (isLiked ? 1 : 0);
              return (
                <Card
                  key={nft.id}
                  className="group shadow-card border-0 bg-card-gradient hover:shadow-glow transition-smooth hover:scale-105 animate-scale-in overflow-hidden"
                  style={{ animationDelay: `${(index % PAGE_SIZE) * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    {/* NFT Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Overlay: visible on hover, keyboard focus, and always on touch screens */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100 [@media(hover:none)]:bg-transparent transition-opacity duration-300 flex items-center justify-center [@media(hover:none)]:items-end [@media(hover:none)]:justify-start [@media(hover:none)]:p-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => toggleLike(nft.id)}
                            aria-label={isLiked ? `Unlike ${nft.name}` : `Like ${nft.name}`}
                            aria-pressed={isLiked}
                            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            <Heart className={cn("w-4 h-4 text-white", isLiked && "fill-white")} />
                          </button>
                          {nft.href && (
                            <a
                              href={nft.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${nft.name} on the block explorer`}
                              className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                              <ExternalLink className="w-4 h-4 text-white" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Likes Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-sm">
                          <Heart className="w-3 h-3 mr-1" aria-hidden="true" />
                          <span className="sr-only">Likes: </span>
                          {likes}
                        </Badge>
                      </div>
                    </div>

                    {/* NFT Info */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors break-words">
                          {nft.name}
                        </h3>
                        {nft.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{nft.description}</p>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">{isLive ? "Minted by" : "Creator"}</p>
                          <p className="text-sm font-medium text-foreground">{nft.creator}</p>
                        </div>
                        {nft.price && (
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Price</p>
                            <p className="text-sm font-semibold text-primary">{nft.price}</p>
                          </div>
                        )}
                      </div>

                      <Badge variant="outline" className="w-full justify-center border-primary/20 text-primary">
                        Polygon Amoy
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {visible < nfts.length && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="px-8 py-3 bg-card-gradient border border-border rounded-lg text-foreground hover:shadow-soft transition-smooth hover:scale-105"
            >
              Load More NFTs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
