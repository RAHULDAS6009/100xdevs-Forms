"use client";
import { useState } from "react";
import { DM_Serif_Display } from "next/font/google";

export const dmSerifDisplayItalic = DM_Serif_Display({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--dm-serif-display",
});

export const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--dm-serif-display",
});

export default function Logo() {
  const [hovered, sethovered] = useState(false);
  return (
    <button
      onMouseEnter={() => sethovered(!hovered)}
      onMouseLeave={() => sethovered(!hovered)}
      className={`flex group transform transition-all ease-in-out duration-500 opacity-70 text-gray-800 hover:ml-0.5  hover:opacity-100 ${dmSerifDisplayItalic.className}  hover:text-[1.55rem]  cursor-pointer text-black text-2xl   `}
    >
      100x <AnimatedText animationType={"one"} />
      {/* </span> */}
    </button>
  );
}

const words = " Forms*".split("");
// @ts-ignore
function AnimatedText({ animationType }) {
  const [resetKey, setResetKey] = useState(0);

  const handleRepeat = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="w-full text-center font-black uppercase  border-b-2 border-gray-300 outline-none">
      <div key={resetKey} className={`animate ${animationType}`}>
        {words.map((char, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.04}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}
