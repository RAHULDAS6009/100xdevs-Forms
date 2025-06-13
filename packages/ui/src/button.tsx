import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
  className?: string;
}

export default function Button({ children, variant, className }: ButtonProps) {
  let variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-white hover:bg-gray-100 text-gray-400",
  };
  return (
    <button
      className={`${className} ${variants[variant]} transition-colors ease-in-out duration-400 cursor-pointer   rounded-md px-6 py-1.5  font-medium text-sm`}
    >
      {children}
    </button>
  );
}
