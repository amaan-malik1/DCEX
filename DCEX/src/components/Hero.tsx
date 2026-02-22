import { SecondaryButton } from "./Button";

export const Hero = () => {
  const user = false;

  const handleLogin = () => {
    window.location.href = "http://localhost:5173/login";
  };
  return (
    <div className="flex justify-center items-center flex-col py-8">
      <div className="text-6xl py-4 font-bold">
        The crypto of tomorrow, <span className="text-blue-600"> today</span>
      </div>
      <div className="text-lg text-gray-700">
        Create a frictionless wallet with just a Google Account.
      </div>
      <div className="text-lg text-gray-700">
        Convert your INR to Cryptocurrency
      </div>

      {!user ? (
        <div className="px-3 py-6">
          <SecondaryButton onClick={handleLogin}>
            Login with Google
          </SecondaryButton>
        </div>
      ) : (
        <div className="px-3 py-6">
          <SecondaryButton onClick={handleLogin}>
            Go to Dashboard
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};
