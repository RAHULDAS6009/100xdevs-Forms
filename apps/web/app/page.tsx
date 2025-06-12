"use client";

import { ReactNode, useEffect, useState } from "react";
import { dmSerifDisplayItalic } from "./layout";

export default function Home() {
  return (
    <>
      {/* NavBar */}
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
      {/* NavBar */}

      {/* Hero */}

      <div className=" flex flex-col justify-between h-[350px] pt-20  p-5">
        <div className="flex flex-col gap-6">
          <div className="text-6xl font-bold text-center">
            The simplest way to create forms
          </div>
          <div className="text-2xl font-[500] text-gray-500 text-center max-w-2xl  mx-auto">
            Say goodbye to boring forms. Meet 100XForms — the free, intuitive
            form builder you’ve been looking for.
          </div>
        </div>

        <div className="flex flex-col mx-auto items-center gap-1 ">
          <Button variant="primary" className="flex items-center gap-3">
            Create a free form
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="size-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
          <span className="text-xs text-slate-400">No sign up required</span>
        </div>
      </div>
      {/* Hero */}

      <div className="mx-auto max-w-2xl bg-amber-200">
        <TypeWriterEffect val="Rahul" />
      </div>

      {/* <div className="container mx-auto">
        <AnimatedText animationType="one" />
      </div> */}
    </>
  );
}

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
  className?: string;
}

function Button({ children, variant, className }: ButtonProps) {
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

function TypeWriterEffect({ val }: { val: string }) {
  const [arr1, setArr1] = useState<any>([]);

  function letas() {
    const letters = val.split("");
    let i = 0;
    setInterval(() => {
      if (i === letters.length) return;
      setArr1([...arr1, letters[i]]);
      i++;
    }, 1000);
  }

  useEffect(() => {
    letas();
  }, []);

  return (
    <div className="flex bg-amber-200">
      {arr1.map((item: string, index: number) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
}
