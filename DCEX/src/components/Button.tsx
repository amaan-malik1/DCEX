import type React from "react";
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const PrimaryButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1 bg-black text-white rounded-full hover:bg-gray-950 shadow-lg hover:scale-105 hover: transition"
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-950 text-white drop-shadow-2xl rounded-full shadow-2xl shadow-black hover:bg-black hover:scale-105 transition "
    >
      {children}
    </button>
  );
};
