import { WalletMinimal } from "lucide-react";
import useAuthUser from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PrimaryButton } from "./Button";

const getBalance = async () => { };
const ProfileCard = () => {
  const { authUser, isLoading } = useAuthUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)

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

        {/* user wallet MODAL*/}
        <div className="flex justify-center items-center">
          <PrimaryButton children={"Wallet"} onClick={() => { setIsModalOpen(!isModalOpen) }} />
          {
            isModalOpen ? (
              <div className="w-screen h-screen bg-black/95 absolute top-0 rounded-md">
                <div className="flex flex-col">
                  <h2>Your Wallet Address
                  </h2>
                  <p>
                    You can deposit crypto or NFTs into your account via this Solana wallet address:</p>
                  <div>
                    <img src={''} alt="Qr-Img" />
                    <div className="">{authUser.solWalletId.publicKey}</div>
                  </div>

                </div>

              </div>
            ) : (
              <div>
                {/* <PrimaryButton children={"Wallet"} onClick={() => { setIsModalOpen(true) }} /> */}
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
