"use client";

import { useState } from "react";
import { dmSerifDisplayItalic } from "./layout";

export default function Home() {
  return (
    <>
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
      {/* <div className="container mx-auto">
        <AnimatedText animationType="one" />
      </div> */}
    </>
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
  const [hovered, sethovered] = useState(false);
  return (
    <button
      onMouseEnter={() => sethovered(!hovered)}
      onMouseLeave={() => sethovered(!hovered)}
      className={`flex group transform transition-all ease-in-out duration-500 opacity-70 text-gray-800 hover:ml-0.5  hover:opacity-100 ${dmSerifDisplayItalic.className}  hover:text-[1.55rem]  cursor-pointer text-black text-2xl   `}
    >
      100x{" "}
      {/* <span
        className=" after:content-['']  
        group-hover:after:content-['']"
      > */}
      {hovered && <AnimatedText animationType={"one"} />}
      {/* </span> */}
    </button>
  );
  // return <div>*</div>;
}

const words = " Forms*".split("");
//@ts-ignore
function AnimatedText({ animationType }) {
  const [resetKey, setResetKey] = useState(0);

  const handleRepeat = () => {
    // Change key to re-render component and re-trigger animation
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="w-full text-center font-black uppercase  border-b-2 border-gray-300 ">
      <div key={resetKey} className={`animate ${animationType}`}>
        {words.map((char, i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * Math.random() * 0.3}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        {/* <a
          href="#"
          onClick={handleRepeat}
          className="repeat text-orange-500 border border-black/20 px-3 py-1 text-sm ml-8 rounded hover:bg-black hover:text-white"
        >
          Repeat Animation
        </a> */}
      </div>
    </div>
  );
}
