// import useAuth from "../AuthContext/auth";
import { PrimaryButton } from "./Button";

const Navbar = () => {
  const user = false;

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5173/auth/google";
  };

  const handleLogout = () => {};
  return (
    <div className="flex justify-between items-center w-[70%] mx-auto h-10 px-4 py-2 border-b-2">
      <div className="text-2xl">DCEX</div>
      {!user ? (
        <div>
          <PrimaryButton onClick={loginWithGoogle}>Login</PrimaryButton>
        </div>
      ) : (
        <div>
          <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Navbar;
