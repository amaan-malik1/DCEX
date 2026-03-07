import { WalletMinimal } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import { PrimaryButton } from "./Button";
import Loader from "./Loader";
import useGetUserTokens from "../hooks/useGetTokens";

const ProfileCard = () => {
  const { authUser, isLoading } = useAuthUser();
  const { assets } = useGetUserTokens();

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <p className="flex items-center gap-2 font-semibold text-gray-600 text-sm">
        <WalletMinimal size={18} fill="gray" />
        TipLink Account Assets
      </p>

      {/* Balance */}
      <div className="flex justify-between items-center">
        <div className="user-balance font-bold text-5xl">
          ${assets?.totalBalance.toFixed(2)}
          <span className="text-gray-700 font-bold text-xl">  USD</span>
        </div>
        <div className="user-balance font-bold text-5xl">
          {authUser?.inrWallet?.balance.toFixed(2)}
          <span className="text-gray-700 font-bold text-xl"> INR</span>
        </div>
      </div>


      {/* Assets */}
      {assets && (
        <div className="mt-6 space-y-2 bg-slate-900/15  rounded-md my-2 p-2">
          {assets?.tokens.map((token) => (
            <div
              key={token.mint}
              className="flex justify-between border-b py-1  hover:bg-slate-400/15"
            >
              <span>{token.token}</span>
              <span>{token.balance}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;