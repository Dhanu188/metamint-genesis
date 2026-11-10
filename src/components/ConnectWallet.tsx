import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { Wallet, LogOut, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { chain, shortAddress } from "@/lib/web3";

const ConnectWallet = ({ className, size = "xl", ...props }: ButtonProps) => {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  if (isConnected && address) {
    if (chainId !== chain.id) {
      return (
        <Button
          variant="hero"
          size={size}
          className={className}
          disabled={isSwitching}
          onClick={() => switchChain({ chainId: chain.id })}
          {...props}
        >
          <AlertTriangle />
          {isSwitching ? "Switching..." : `Switch to ${chain.name}`}
        </Button>
      );
    }
    return (
      <Button
        variant="hero"
        size={size}
        className={className}
        onClick={() => disconnect()}
        title="Disconnect wallet"
        {...props}
      >
        <LogOut />
        {shortAddress(address)}
      </Button>
    );
  }

  const handleConnect = () => {
    const connector = connectors[0];
    if (!connector || typeof window === "undefined" || !("ethereum" in window)) {
      toast.error("No wallet found", {
        description: "Install a browser wallet such as MetaMask to continue.",
        action: { label: "Get MetaMask", onClick: () => window.open("https://metamask.io/", "_blank", "noopener") },
      });
      return;
    }
    connect(
      { connector, chainId: chain.id },
      { onError: (err) => toast.error("Could not connect wallet", { description: err.message }) },
    );
  };

  return (
    <Button variant="hero" size={size} className={className} disabled={isPending} onClick={handleConnect} {...props}>
      <Wallet />
      {isPending ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default ConnectWallet;
