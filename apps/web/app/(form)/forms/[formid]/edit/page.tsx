"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const Editor = dynamic(() => import("../../../../_components/Editor"), {
  ssr: false,
});

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className=" h-full w-full">
      {/* i think we have to make it as a component */}
      <div className="w-full h-[30%] bg-amber-100 "></div>

      <div className="mx-auto max-w-2xl   h-[70%] ">
        <div className="-translate-y-15 flex flex-col items-start ">
          <Image
            className="bg-green-500 rounded-full cursor-pointer  translate-0 hover:-translate-y-1 shadow-2xl shadow-slate-400"
            src={"/form-logo.jpg"}
            alt="form logo"
            width={100}
            height={100}
          />
          <input
            tabIndex={-1}
            ref={inputRef}
            className="outline-none text-[50px] font-bold "
            placeholder="Title"
            type="text"
          />
          <div className=" -translate-x-18 w-full">
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}
