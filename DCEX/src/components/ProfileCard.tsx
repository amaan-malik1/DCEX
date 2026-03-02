import { WalletMinimal } from "lucide-react";
import useAuthUser from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrimaryButton } from "./Button";

const ProfileCard = () => {

  const { authUser, isLoading } = useAuthUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false);


  // if (!authUser) {
  //   toast.error("Please login first");
  //   navigate("/");
  //   return null;
  // }

  useEffect(() => {
    if (copied) {
      const timeOut = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => { clearInterval(timeOut) }
    }
  }, [copied])

  return (
    <div>
      <div>
        <p className="flex items-center gap-2 font-semibold text-gray-600 text-sm">
          <WalletMinimal size={18} fill="gray" />
          TipLink Account Assets
        </p>
        {/* user balance */}
        <div className="user-balance font-bold text-5xl">
          $50.00
          <span className="text-gray-700 font-bold text-xl"> USD</span>
        </div>

        {/* user wallet address */}
        <div className="flex justify-center items-center">
          <PrimaryButton onClick={async () => {
            await navigator.clipboard.writeText("xnjsndui8298s29390smd9e83j98ud89u8ue29s");
            setCopied(true)
          }}>
            {copied ? "copied" : "Your wallet"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
