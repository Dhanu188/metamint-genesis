import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Coins, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

const MintSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <section id="mint" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Mint Your NFT
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create unique digital assets and mint them directly on the Polygon blockchain
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Mint Form */}
          <Card className="shadow-card border-0 bg-card-gradient animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Coins className="w-6 h-6 text-primary" />
                Create NFT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Upload Image</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </div>
                    <div className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </div>
                  </label>
                </div>
              </div>

              {/* NFT Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">NFT Name</label>
                <Input 
                  placeholder="Enter NFT name"
                  className="bg-background border-border"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea 
                  placeholder="Describe your NFT"
                  className="min-h-[100px] bg-background border-border resize-none"
                />
              </div>

              {/* Mint Button */}
              <Button variant="hero" className="w-full" size="lg">
                <Coins className="w-5 h-5" />
                Mint NFT
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                Minting fee: ~0.001 MATIC on Polygon Amoy Testnet
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <div className="space-y-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-foreground">Preview</h3>
            
            <Card className="shadow-card border-0 bg-card-gradient">
              <CardContent className="p-6">
                <div className="aspect-square bg-muted rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="NFT Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload an image to preview</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg text-foreground">
                    {selectedFile ? selectedFile.name.split('.')[0] : "NFT Name"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your NFT description will appear here
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Created by You</span>
                    <span>Polygon Amoy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintSection;