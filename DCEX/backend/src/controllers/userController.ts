import type { Request, Response } from "express";
import {
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import { connection } from "../lib/constants.js";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getSupportedTokens } from "../lib/constants.js";

export const getTokens = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const supportedTokens = await getSupportedTokens();

    const balances = await Promise.all(
      supportedTokens.map((token) => getAccountBalance(token, address)),
    );
  } catch (error) {
    console.log("Error while getting tokens: ", error);
  }
};

const getAccountBalance = async (
  token: { name: string; mint: string; native: boolean },
  address: string,
) => {
  if (token.native) {
    let balance = await connection.getBalance(new PublicKey(address));
    return balance / LAMPORTS_PER_SOL;
  }

  const ata = await getAssociatedTokenAddress(
    new PublicKey(token.mint),
    new PublicKey(address),
  );
  const account = await getAccount(connection, ata);
  const mint = await getMint(connection, new PublicKey(token.mint));

  return Number(account.amount) / (10 ** mint.decimals);
};
