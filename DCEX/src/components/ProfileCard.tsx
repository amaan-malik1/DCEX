import { WalletMinimal } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import Loader from "./Loader";
import { useState } from "react";
import { TabButton } from "./Button";
import ShowTokens from "./ShowTokens";
import Swap from "./Swap";
import useGetUserTokens from "../hooks/useGetTokens";

const ProfileCard = () => {
  const { authUser, isLoading } = useAuthUser();
  const { assets } = useGetUserTokens()
  type Tab = "swap" | "add_funds" | "send" | "tokens" | "withdraw";
  const tabs: { id: Tab, name: string }[] = [
    { id: "swap", name: "Swap" },
    { id: "tokens", name: "Tokens" },
    { id: "add_funds", name: "Add funds" },
    { id: "send", name: "Send" },
    { id: "withdraw", name: "Withdraw" },
  ];
  const [selectedTab, setSelectedTab] = useState<Tab>("tokens")


  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-4">
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


      {/* TABS */}
      <div>
        {
          tabs.map(tab => <TabButton active={tab.id === selectedTab} onClick={() => {
            setSelectedTab(tab.id)
          }}>
            {tab.name}
          </TabButton>)
        }
      </div>

      {/* TABS showing based on tab */}
      <div className=" transition-all duration-200 ease-in-out">
        {/* show token  */}
        {selectedTab === "tokens" && <ShowTokens />}

        {/* show swap */}
        {selectedTab === "swap" && <Swap />}
      </div>
    </div>
  );
};

export default ProfileCard;