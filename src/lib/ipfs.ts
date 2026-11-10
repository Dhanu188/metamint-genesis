const PINATA_API = "https://api.pinata.cloud/pinning";

const gateway = (import.meta.env.VITE_IPFS_GATEWAY || "https://ipfs.io/ipfs/").replace(/\/?$/, "/");

export const isIpfsConfigured = Boolean(import.meta.env.VITE_PINATA_JWT);

/** Turns an ipfs:// URI into a browser-loadable gateway URL. Other URLs pass through. */
export const resolveIpfsUrl = (uri: string) =>
  uri.startsWith("ipfs://") ? gateway + uri.slice("ipfs://".length).replace(/^ipfs\//, "") : uri;

export interface NftMetadata {
  name: string;
  description: string;
  image: string;
}

async function pinata(path: string, body: BodyInit, json = false): Promise<string> {
  const jwt = import.meta.env.VITE_PINATA_JWT;
  if (!jwt) throw new Error("IPFS upload is not configured (set VITE_PINATA_JWT).");

  const res = await fetch(`${PINATA_API}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      ...(json ? { "Content-Type": "application/json" } : {}),
    },
    body,
  });
  if (!res.ok) throw new Error(`IPFS upload failed (${res.status}): ${await res.text()}`);
  const data = (await res.json()) as { IpfsHash: string };
  return `ipfs://${data.IpfsHash}`;
}

export function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  return pinata("pinFileToIPFS", form);
}

export function uploadMetadata(metadata: NftMetadata): Promise<string> {
  return pinata(
    "pinJSONToIPFS",
    JSON.stringify({ pinataContent: metadata, pinataMetadata: { name: `${metadata.name}.json` } }),
    true,
  );
}
