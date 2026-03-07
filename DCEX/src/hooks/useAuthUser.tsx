import { useCallback, useEffect, useState } from "react";
import { apiInstance } from "../utils/api";

interface User {
  id: string;
  username: string;
  name: string;
  profileImg?: string;
  solWallets?: {
    publicKey: string;
  };
  inrWallet?: {
    balance: number;
  };
}

const useAuthUser = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await apiInstance.get("/auth/me");
      setAuthUser(response.data.user);
    } catch (error) {
      console.log("Error fetching user ", error);
      setAuthUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { authUser, isLoading };
};


export default useAuthUser;
