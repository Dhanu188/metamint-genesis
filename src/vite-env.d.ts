/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NFT_CONTRACT_ADDRESS?: string;
  readonly VITE_NFT_DEPLOY_BLOCK?: string;
  readonly VITE_AMOY_RPC_URL?: string;
  readonly VITE_PINATA_JWT?: string;
  readonly VITE_IPFS_GATEWAY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
