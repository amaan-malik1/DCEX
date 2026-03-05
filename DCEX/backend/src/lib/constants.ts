import { Connection } from "@solana/web3.js";
import axios from "axios";

let LAST_UPDATED: number | null = null;
const TOKEN_REFRESH_INTERVAL = 60 * 1000;
let prices: { [key: string]: { price: string } } = {};

export interface TokenDetails {
  name: string;
  mint: string;
  native: boolean;
  image: string;
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    image:
      "https://imgs.search.brave.com/U7bNRac5otCvScvRngTMv3U1kN6EqXIYzLfKpJurowY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNjgx/NTM1OTQyL3N0b2Nr/LXBob3RvLXVzZGMt/dmlydHVhbC1jdXJy/ZW5jeS1pbWFnZXMt/ZGlnaXRhbC1iYWNr/Z3JvdW5kLWlsbHVz/dHJhdGlvbnM",
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    image:
      "https://imgs.search.brave.com/BAwveJzQFcC6cmP4ZJ4Wrlbfk5Yxh_uKPBZ1IWE066Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvdXNk/dC1jb2luLTNkLWlj/b24tcG5nLWRvd25s/b2FkLTQxNjAwMTku/cG5n",
  },
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    image:
      "https://imgs.search.brave.com/WYTZ82WAzCLOV0hNFdR8O3FtMcdUZtlMXB61Ev-Oi9g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1wc2Qv/c29sYW5hLXNvbC1j/cnlwdG9jdXJyZW5j/eS1jb2luLTNkLXJl/bmRlcmluZy1pc29s/YXRlZF8xNTU1ODIt/ODAzMy5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA",
  },
];

export const connection = new Connection("https://api/mainnet-beta.solana.com");

export const getSupportedTokens = async () => {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_REFRESH_INTERVAL
  ) {
    const response = await axios.get(
      "https://lite-api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    );
    prices = response.data.data;
    LAST_UPDATED = new Date().getTime();
  }

  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: prices[s.name]?.price,
  }));
};
