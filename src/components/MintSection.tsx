import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Coins, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ConnectWallet from "@/components/ConnectWallet";
import { chain, nftAbi, nftContractAddress, txExplorerUrl, wagmiConfig } from "@/lib/web3";
import { isIpfsConfigured, uploadFile, uploadMetadata } from "@/lib/ipfs";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];
const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;

type Status = "idle" | "uploading" | "signing" | "confirming";

const STATUS_LABEL: Record<Status, string> = {
  idle: "Mint NFT",
  uploading: "Uploading to IPFS...",
  signing: "Confirm in wallet...",
  confirming: "Minting...",
};

/** "my.cool.art.png" -> "my.cool.art" */
const stripExtension = (fileName: string) => fileName.replace(/\.[^./]+$/, "") || fileName;

const MintSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const { address, isConnected, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const queryClient = useQueryClient();

  // Release the previous object URL whenever it changes and on unmount.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const selectFile = (file: File | undefined) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError("Unsupported file type. Use PNG, JPG, GIF or WEBP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File is larger than 10MB.");
      return;
    }
    setFileError("");
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setName((current) => current || stripExtension(file.name).slice(0, MAX_NAME_LENGTH));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0]);
    // Reset so choosing the same file again still fires onChange.
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setFileError("");
  };

  const resetForm = () => {
    clearFile();
    setName("");
    setDescription("");
  };

  const trimmedName = name.trim();
  const isBusy = status !== "idle";
  const wrongNetwork = isConnected && chainId !== chain.id;
  const configError = !nftContractAddress
    ? "Minting is not configured: set VITE_NFT_CONTRACT_ADDRESS."
    : !isIpfsConfigured
      ? "Minting is not configured: set VITE_PINATA_JWT for IPFS uploads."
      : "";
  const canMint = Boolean(selectedFile && trimmedName && isConnected && !wrongNetwork && !configError && !isBusy);

  const handleMint = async () => {
    if (!selectedFile || !trimmedName || !address || !nftContractAddress) return;
    try {
      setStatus("uploading");
      const image = await uploadFile(selectedFile);
      const tokenUri = await uploadMetadata({ name: trimmedName, description: description.trim(), image });

      setStatus("signing");
      const hash = await writeContractAsync({
        address: nftContractAddress,
        abi: nftAbi,
        functionName: "safeMint",
        args: [address, tokenUri],
        chainId: chain.id,
      });

      setStatus("confirming");
      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash, chainId: chain.id });
      if (receipt.status !== "success") throw new Error("Transaction reverted.");

      toast.success("NFT minted!", {
        description: trimmedName,
        action: { label: "View tx", onClick: () => window.open(txExplorerUrl(hash), "_blank", "noopener") },
      });
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    } catch (err) {
      const message = err instanceof Error ? (err as Error & { shortMessage?: string }).shortMessage ?? err.message : String(err);
      toast.error("Minting failed", { description: message });
    } finally {
      setStatus("idle");
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
            <CardContent>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (canMint) handleMint();
                }}
              >
                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload Image</Label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                      "relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors focus-within:border-primary",
                      isDragging && "border-primary bg-primary/5",
                    )}
                  >
                    <input
                      type="file"
                      accept={ACCEPTED_TYPES.join(",")}
                      onChange={handleFileSelect}
                      className="sr-only"
                      id="file-upload"
                      disabled={isBusy}
                      aria-describedby="file-upload-hint file-upload-error"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                      </span>
                      <span id="file-upload-hint" className="text-xs text-muted-foreground">
                        PNG, JPG, GIF, WEBP up to 10MB
                      </span>
                    </label>
                    {selectedFile && !isBusy && (
                      <button
                        type="button"
                        onClick={clearFile}
                        aria-label="Remove image"
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p id="file-upload-error" role="alert" className="text-sm text-destructive min-h-[1.25rem]">
                    {fileError}
                  </p>
                </div>

                {/* NFT Name */}
                <div className="space-y-2">
                  <Label htmlFor="nft-name">NFT Name</Label>
                  <Input
                    id="nft-name"
                    placeholder="Enter NFT name"
                    className="bg-background border-border"
                    value={name}
                    maxLength={MAX_NAME_LENGTH}
                    required
                    disabled={isBusy}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="nft-description">Description</Label>
                  <Textarea
                    id="nft-description"
                    placeholder="Describe your NFT"
                    className="min-h-[100px] bg-background border-border resize-none"
                    value={description}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    disabled={isBusy}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Mint Button */}
                {isConnected ? (
                  <Button type="submit" variant="hero" className="w-full" size="lg" disabled={!canMint}>
                    {isBusy ? <Loader2 className="animate-spin" /> : <Coins className="w-5 h-5" />}
                    {STATUS_LABEL[status]}
                  </Button>
                ) : (
                  <ConnectWallet type="button" size="lg" className="w-full" />
                )}

                <div className="text-xs text-muted-foreground text-center space-y-1">
                  {configError && <p className="text-destructive">{configError}</p>}
                  {wrongNetwork && <p className="text-destructive">Switch your wallet to {chain.name} to mint.</p>}
                  <p>Minting fee: ~0.001 POL on Polygon Amoy Testnet</p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <div className="space-y-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold text-foreground">Preview</h3>

            <Card className="shadow-card border-0 bg-card-gradient">
              <CardContent className="p-6">
                <div className="aspect-square bg-muted rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="NFT Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload an image to preview</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-lg text-foreground break-words">
                    {trimmedName || "NFT Name"}
                  </h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                    {description.trim() || "Your NFT description will appear here"}
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
