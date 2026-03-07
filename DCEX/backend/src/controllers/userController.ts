import type { Request, Response } from "express";
import {
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import { connection } from "../lib/constants.js";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getSupportedTokens } from "../lib/constants.js";
import { prismaClient } from "../lib/prisma.js";

export const getTokens = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prismaClient.user.findUnique({
      where: { id: req.userId },
      select: {
        solWallets: {
          select: {
            publicKey: true,
          },
        },
      },
    });

    if (!user?.solWallets?.publicKey) {
      return res.status(404).json({
        message: "Wallet not found",
      });
    }
    const address = user.solWallets.publicKey;
    const wallet = new PublicKey(address);

    const supportedTokens = await getSupportedTokens();

    const balances = await Promise.all(
      supportedTokens.map((token) => getAccountBalance(token, wallet)),
    );

    const tokens = supportedTokens.map((token, index) => ({
      token: token.name,
      mint: token.mint,
      balance: balances[index],
      usdBalance: balances[index] * Number(token.price),
    }));

    const totalBalance = tokens.reduce((acc, val) => acc + val.usdBalance, 0);

    return res.json({
      assets: {
        address,
        tokens,
        totalBalance,
      },
    });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    res.status(500).json({ message: "Failed to fetch balances" });
  }
};

//function for getting usser balances
const getAccountBalance = async (
  token: { name: string; mint: string; native: boolean },
  address: PublicKey,
): Promise<number> => {
  try {
    // SOL Balance
    if (token.native) {
      const balance = await connection.getBalance(address);
      return balance / LAMPORTS_PER_SOL;
    }

    // SPL Token Balance
    const ata = await getAssociatedTokenAddress(
      new PublicKey(token.mint),
      address,
    );

    const account = await getAccount(connection, ata);
    const mint = await getMint(connection, new PublicKey(token.mint));

    return Number(account.amount) / 10 ** mint.decimals;
  } catch {
    // If token account doesn't exist → balance = 0
    return 0;
  }
};
