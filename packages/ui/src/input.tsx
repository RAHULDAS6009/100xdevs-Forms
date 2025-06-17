"use client";
import { ReactNode } from "react";

interface InputProps {
  //cahnge the optional tag in onChange
  onChange?: () => void;
  placeholder?: string;
  value?: string;
  type?: "text" | "password";
  className?: string;
  position: "left" | "right";
  icon?: ReactNode;
}

export function Input({
  onChange,
  placeholder,
  value,
  position,
  type = "text",
  className,
  icon,
}: InputProps) {
  return (
    <>
      <div className="relative ">
        <input
          className={`${className} w-full h-full  rounded-md border border-neutral-200
        
        
        placeholder-neutral-300
        
         py-2.5 text-neutral-500 font-medium outline-none flex items-center
        
        focus:ring-2
        ${position == "left" ? "px-8" : "px-4"}
        
        
        focus:ring-blue-500/50
        
        `}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          type={type}
        />
        <div className={`absolute ${position}-2 top-[12.5px] text-neutral-400`}>
          {icon}
        </div>
      </div>
    </>
  );
}
