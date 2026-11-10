import { createConfig, http } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { isAddress, parseAbi, type Address } from "viem";

export const chain = polygonAmoy;

export const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  connectors: [injected()],
  transports: {
    [polygonAmoy.id]: http(import.meta.env.VITE_AMOY_RPC_URL || undefined),
  },
});

const rawAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;

/** Deployed ERC-721 contract, or null when not configured. */
export const nftContractAddress: Address | null =
  rawAddress && isAddress(rawAddress) ? rawAddress : null;

/** Block the contract was deployed at; limits the log search for the gallery. */
export const nftDeployBlock: bigint | "earliest" = import.meta.env.VITE_NFT_DEPLOY_BLOCK
  ? BigInt(import.meta.env.VITE_NFT_DEPLOY_BLOCK)
  : "earliest";

/**
 * Minimal ABI. Assumes the OpenZeppelin-style `safeMint(address to, string uri)`.
 * Change this if your contract's mint function has a different signature.
 */
export const nftAbi = parseAbi([
  "function safeMint(address to, string uri)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
]);

export const explorerUrl = chain.blockExplorers.default.url;

export const tokenExplorerUrl = (tokenId: bigint | number | string) =>
  nftContractAddress ? `${explorerUrl}/nft/${nftContractAddress}/${tokenId}` : explorerUrl;

export const txExplorerUrl = (hash: string) => `${explorerUrl}/tx/${hash}`;

export const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;
