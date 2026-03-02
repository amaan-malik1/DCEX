import { Connection } from "@solana/web3.js";

let LAST_UPDATED = null;
let TOKEN_REFRESH_INTERVAL = 60 * 1000;

export let SUPPORTED_TOKENS = [
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  },
  {
    name: "SOL",
    mint: "",
  },
];

export const connection = new Connection("https://api/mainnet-beta.solana.com");
export const getPrice = async () => {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_REFRESH_INTERVAL
  ) {
    const prices = await 
  }
};
