# Testing MetaMint

MetaMint has no usernames or passwords. **Your MetaMask wallet is your login.** Everything runs on the Polygon Amoy **testnet**, so all tokens are free and have no real value.

Setup takes about 10 minutes.

## 1. Install MetaMask

1. Install the MetaMask extension from https://metamask.io/download (Chrome, Edge, Brave or Firefox).
2. Choose **Create a new wallet** and set a password.
3. **Write the 12-word Secret Recovery Phrase on paper.** Without it, a forgotten password means the wallet is gone for good. Nobody, including MetaMask, can reset it.

> Use a separate wallet for testing. Never use a wallet that holds real money.

## 2. Add the Polygon Amoy test network

You can skip this: the app offers to add and switch to Amoy when you connect. To add it by hand, go to MetaMask → network menu → **Add network** → **Add a network manually**:

| Field | Value |
| --- | --- |
| Network name | Polygon Amoy |
| RPC URL | `https://rpc-amoy.polygon.technology` |
| Chain ID | `80002` |
| Currency symbol | `POL` |
| Block explorer | `https://amoy.polygonscan.com` |

## 3. Get free test POL

1. Copy your wallet address (click the account name in MetaMask).
2. Go to https://faucet.polygon.technology/, select **Polygon Amoy**, paste the address and request tokens.
3. About 0.1 POL covers many mints.

## 4. Open the app

- **Hosted version:** use the link the project owner shares with you.
- **Run it yourself:**
  ```sh
  git clone https://github.com/Dhanu188/metamint-genesis.git
  cd metamint-genesis
  npm install
  cp .env.example .env.local   # ask the project owner for the values
  npm run dev                   # open http://localhost:8080
  ```

## 5. Sample test data

Use any of these in the mint form:

| NFT Name | Description |
| --- | --- |
| Test Robot #1 | A friendly test robot minted on Amoy. |
| Neon Circuit | Glowing circuit art for testing the gallery. |
| Sunset Bot | A robot at dusk. |

Test images: the files in `src/assets/` (`demo-nft.jpg`, `demo-nft-2.jpg`, ...) or any PNG, JPG, GIF or WEBP under 10MB.

## 6. What to test

- [ ] **Connect Wallet** connects MetaMask and shows your shortened address
- [ ] On the wrong network, the button offers to switch to Amoy
- [ ] Upload an image by clicking, then by dragging and dropping
- [ ] A non-image file is rejected; a file over 10MB is rejected
- [ ] The preview updates as you type a name and description
- [ ] **Mint NFT**: approve in MetaMask, wait for the "NFT minted!" message, open **View tx**
- [ ] The new NFT appears in the **Gallery** (refresh if needed)
- [ ] Like a gallery item and reload; the like stays
- [ ] Works on a phone-sized screen
- [ ] Unknown page (for example `/abc`) shows the 404 page with a working link home

**Report bugs** at https://github.com/Dhanu188/metamint-genesis/issues with: what you did, what you expected, what happened, your browser, and a screenshot.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| "No wallet found" | Install MetaMask and reload the page |
| "Minting is not configured" | The app is missing its settings; tell the project owner |
| "Insufficient funds" | Get more test POL from the faucet (step 3) |
| Mint fails with "Ownable" or "unauthorized" | The contract only lets its owner mint; tell the project owner |
| Images in the gallery don't load | IPFS can be slow; wait a minute and refresh |

## Safety rules

- **Never share your 12-word phrase or private key** with anyone, including the project owner or "support". Real support never asks for them.
- Never paste your phrase into a website or form.
- Only approve transactions in MetaMask that you started yourself in this app.
