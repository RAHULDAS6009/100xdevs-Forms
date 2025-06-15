"use client";
import { ReactNode } from "react";

interface InputProps {
  onChange: () => void;
  placeholder?: string;
  value?: string;
  type?: "text" | "password";
  className?: string;
  variant: "primary" | "secondary";
  icon?: ReactNode;
}

const variants = {
  primary: "",
  secondary: "",
};

export function Input({
  onChange,
  placeholder,
  value,
  type = "text",
  className,
  icon,
}: InputProps) {
  return (
    <div className="relative bg-red-50">
      <input
        className={`${className} w-full h-full`}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
      />
      <span className="absolute">{icon}</span>
    </div>
  );
}
