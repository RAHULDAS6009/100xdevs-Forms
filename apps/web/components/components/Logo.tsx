"use client";

import { useState } from "react";
import { DM_Serif_Display } from "next/font/google";

const dmSerifDisplayItalic = DM_Serif_Display({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--dm-serif-display",
});

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex group transition-all duration-500 ease-in-out text-2xl cursor-pointer text-black opacity-70 hover:opacity-100 hover:ml-0.5 hover:text-[1.55rem] ${dmSerifDisplayItalic.className}`}
    >
      100x <AnimatedText animationType="one" />
    </button>
  );
}

const words = " Forms*".split("");

function AnimatedText({ animationType }: { animationType: string }) {
  const [resetKey] = useState(0);

  return (
    <div className="w-full invisible sm:visible text-center font-black uppercase border-b-2 border-gray-300 outline-none">
      <div key={resetKey} className={`animate ${animationType}`}>
        {words.map((char, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.09}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}
