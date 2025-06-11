"use client";

import { useState } from "react";
import { dmSerifDisplayItalic } from "./layout";

export default function Home() {
  return (
    <div className="w-full flex justify-between p-4 items-center">
      <Logo />

      <div className="flex gap-4">
        {["Pricing", "Login", "Sign up"].map((item, index) => {
          return (
            <Button variant="secondary" key={index}>
              {item}
            </Button>
          );
        })}
        <Button variant="primary">Create form</Button>
      </div>
    </div>
  );
}

interface ButtonProps {
  children: string;
  variant: "primary" | "secondary";
}

function Button({ children, variant }: ButtonProps) {
  let variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-white hover:bg-gray-100 text-gray-400",
  };
  return (
    <button
      className={`${variants[variant]} transition-colors ease-in-out duration-400 cursor-pointer   rounded-md px-6 py-1.5  font-medium text-sm`}
    >
      {children}
    </button>
  );
}

function Logo() {
  return (
    <button
      className={`group transform transition-all ease-in-out duration-500 opacity-70 text-gray-800 hover:ml-0.5  hover:opacity-100 ${dmSerifDisplayItalic.className}  hover:text-[1.55rem]  cursor-pointer text-black text-2xl   `}
    >
      100x{" "}
      <span
        className=" after:content-['']  
        group-hover:after:content-['_Forms*']"
      ></span>
    </button>
  );
  // return <div>*</div>;
}
