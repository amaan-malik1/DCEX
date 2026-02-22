import type React from "react";
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const PrimaryButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 bg-black text-white rounded-md hover:bg-gray-800 transition"
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 bg-blue-700 text-white rounded-md hover:bg-gray-800 transition"
    >
      {children}
    </button>
  );
};
