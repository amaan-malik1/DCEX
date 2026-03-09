import { createContext } from "react";

export interface Token {
  token: string;
  mint: string;
  balance: number;
  usdBalance: number;
}

export interface Assets {
  address: string;
  tokens: Token[];
  totalBalance: number;
}

export interface AssetsContextType {
  assets: Assets | null;
  isLoading: boolean;
}

export const AssetsContext = createContext<AssetsContextType | undefined>(undefined);