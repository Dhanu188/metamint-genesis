# 🖼️ MetaMint – Decentralized NFT Marketplace

MetaMint lets users connect a browser wallet, mint NFTs with a name, description and image, and browse minted NFTs, all on the Polygon Amoy testnet.

## 🧠 Features

- 🔐 Connect a browser wallet (MetaMask or any injected wallet) and switch to Polygon Amoy
- 🎨 Mint NFTs with name, description and image (metadata and image stored on IPFS via Pinata)
- 🖼️ Live preview while you fill in the form, with drag-and-drop upload
- 🌐 Gallery that reads minted NFTs from the contract (shows sample NFTs when no contract is configured)
- 🌍 Polygon Amoy testnet (chain ID 80002, currency POL)

## ⚙️ Tech Stack

- **Frontend:** Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Wallet & chain:** wagmi v2, viem
- **Storage:** IPFS (Pinata)
- **Smart contract:** an ERC-721 deployed on Polygon Amoy (not included in this repo)

## 🚀 Getting started

```sh
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:8080
```

### Configuration (`.env.local`)

| Variable | Required for | Notes |
| --- | --- | --- |
| `VITE_NFT_CONTRACT_ADDRESS` | Minting, live gallery | ERC-721 on Amoy exposing `safeMint(address to, string uri)` and `tokenURI(uint256)` |
| `VITE_NFT_DEPLOY_BLOCK` | Live gallery (recommended) | Block the contract was deployed at; bounds the event search |
| `VITE_PINATA_JWT` | Minting | Bundled into the browser, so use a key scoped to pinning only, testnet use only |
| `VITE_AMOY_RPC_URL` | Optional | Custom RPC (e.g. Alchemy); defaults to the public Amoy RPC |
| `VITE_IPFS_GATEWAY` | Optional | Gateway used to display IPFS images; defaults to `https://ipfs.io/ipfs/` |

If your contract's mint function has a different signature, update `nftAbi` and the `safeMint` call in `src/lib/web3.ts` and `src/components/MintSection.tsx`.

Get test POL from the [Polygon faucet](https://faucet.polygon.technology/).

**Testers:** see [TESTING.md](TESTING.md) for wallet setup, sample data and a test checklist.

## 📜 Scripts

- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm run lint` – lint
- `npm run preview` – preview the production build
