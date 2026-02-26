import { WalletMinimal } from "lucide-react";
import useAuthUser from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const getBalance = async () => {};
const ProfileCard = () => {
  const { authUser, isLoading } = useAuthUser();
  const navigate = useNavigate();

  if (!authUser) {
    toast.error("Please login first");
    navigate("/login");
    return null;
  }

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
