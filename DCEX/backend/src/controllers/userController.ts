import type { Request, Response } from "express";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { connection, SUPPORTED_TOKENS } from "../lib/tokens.js";
import { PublicKey } from "@solana/web3.js";

export const getTokens = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const balances = await Promise.all(
      SUPPORTED_TOKENS.map((token) => getAccountBalance(token, address)),
    );
  } catch (error) {}
};
const getAccountBalance = async (
  token: { name: string; mint: string },
  address: string,
) => {
  const ata = await getAssociatedTokenAddress(
    new PublicKey(token.mint),
    new PublicKey(address),
  );
  const account = await getAccount(connection, ata);
};
