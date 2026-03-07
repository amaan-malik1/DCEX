import { useCallback, useEffect, useState } from "react";
import { apiInstance } from "../utils/api";

interface Token {
  token: string;
  mint: string;
  balance: number;
  usdBalance: number;
}

interface Assets {
  address: string;
  tokens: Token[];
  totalBalance: number;
}

const useGetUserTokens = () => {
  const [assets, setAssets] = useState<Assets | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchToken = useCallback(async () => {
    try {
      const res = await apiInstance.get("/user/wallet/tokens");
      setAssets(res.data.assets);
    } catch (error) {
      console.log("Error fetching user assets:", error);
      setAssets(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return { assets, isLoading };
};

export default useGetUserTokens;