import { WalletMinimal } from "lucide-react";

const getBalance = async () => {
  const userWallet = await axios.get("/");
};
const ProfileCard = () => {
  return (
    <div>
      <div>
        <p className="flex items-center gap-2 font-semibold text-gray-600 text-sm">
          <WalletMinimal size={18} fill="gray" />
          TipLink Account Assets
        </p>
        {/* user balance */}
        <div className="user-balance font-bold text-5xl">
          $0.00
          <span className="text-gray-700 font-bold text-xl"> USD</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
