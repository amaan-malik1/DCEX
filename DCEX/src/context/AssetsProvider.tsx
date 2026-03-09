import { useEffect, useState } from "react";
import { apiInstance } from "../utils/api";
import { AssetsContext, type Assets } from "./AssetsContext";

export const AssetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [assets, setAssets] = useState<Assets | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await apiInstance.get("/user/wallet/tokens");
        setAssets(res.data.assets);
      } catch (error) {
        console.log("Error fetching tokens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <AssetsContext.Provider value={{ assets, isLoading }}>
      {children}
    </AssetsContext.Provider>
  );
};