import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary" | "outlined";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant,
  className,
  disabled,
  onClick,
}: ButtonProps) {
  let variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-white hover:bg-gray-100 text-gray-400",
    outlined: "border border-neutral-300",
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer ${className} ${variants[variant]}
      transition-colors 

      ease-in-out duration-400
     ring-0 
      focus:ring-2 focus:ring-blue-400/80
         rounded-md px-6 py-1.5  font-medium text-sm`}
    >
      {children}
    </button>
  );
}
