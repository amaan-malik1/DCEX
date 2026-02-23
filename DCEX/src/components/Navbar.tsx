// import useAuth from "../AuthContext/auth";
import { PrimaryButton } from "./Button";

const Navbar = () => {
  const user = false;

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5173/auth/google";
  };

  const handleLogout = () => {};
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center w-[70%] mx-auto h-14 px-4 py-2 my-5 border-2 border-black rounded-full bg-white/70 backdrop-blur-xl shadow-md">
        <div className="text-2xl font-semibold">DCEX</div>

        {!user ? (
          <PrimaryButton onClick={loginWithGoogle}>Login</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
