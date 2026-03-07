import { PrimaryButton } from "./Button";
import useAuthUser from "../hooks/useAuthUser";
import axios from "axios";

// const BASE_URL = import.meta.env.CLIENT_BASE_URL;
const Navbar = () => {
  const { authUser, isLoading } = useAuthUser();

  const loginWithGoogle = () => {
    window.location.href = `http://localhost:3000/api/auth/google`;
  };

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center w-[70%] mx-auto h-14 px-4 py-2 my-5 border-2 border-black rounded-full bg-white/70 backdrop-blur-xl shadow-md">
        <div className="text-2xl font-semibold">DCEX</div>

        {!authUser ? (
          <PrimaryButton onClick={loginWithGoogle}>Login</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
