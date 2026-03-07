import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/Button";
import Loader from "../components/Loader";
import ProfileCard from "../components/ProfileCard";
import useAuthUser from "../hooks/useAuthUser";

const Dashboard = () => {
  const { authUser, isLoading } = useAuthUser();
  const handleSend = () => { };
  const handleAddFunds = () => { };
  const handleWithdraw = () => { };
  const handleSwap = () => { };

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeOut = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => { clearInterval(timeOut) }
    }
  }, [copied])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="flex flex-col gap-4 bg-gray-100 w-[90vw] rounded-md px-8 py-6">
        {/* greating div */}
        <Greeting img={authUser?.profileImg} name={authUser?.name} />

        {/* user profile */}
        <ProfileCard />

        {/* btn for operations */}
        <div className="flex justify-between items-center">
          {/* Wallet Address */}
          <div className="flex justify-center items-center mt-4">
            <PrimaryButton
              onClick={async () => {
                if (!authUser?.solWallets?.publicKey) return;

                await navigator.clipboard.writeText(authUser.solWallets.publicKey);
                setCopied(true);
              }}
            >
              {copied ? "Copied" : "Your wallet"}
            </PrimaryButton>
          </div>
          {/* buttons send, add fund... div */}
          <div className="flex justify-center gap-3">
            <PrimaryButton children={"Send"} onClick={handleSend} />
            <PrimaryButton children={"Add Funds"} onClick={handleAddFunds} />
            <PrimaryButton children={"Withdraw"} onClick={handleWithdraw} />
            <PrimaryButton children={"Swap"} onClick={handleSwap} />
          </div>
        </div>

      </div>
    </div>
  );
};

function Greeting({ name, img }: { img: string; name: string }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={img}
        alt="ProfileImg"
        className="w-[4rem] h-[4rem] bg-slate-400 rounded-full"
      />
      <p className="text-3xl font-bold text-gray-600">
        Welcome back,
        <span> {name}</span>!
      </p>
    </div>
  );
}

export default Dashboard;
