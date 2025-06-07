"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../../lib/hook";

const EditorPreview = dynamic(
  () => import("../../../../_components/EditorPreview"),
  { ssr: false }
);
const Editor = dynamic(() => import("../../../../_components/Editor"), {
  ssr: false,
});

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const blocks = useAppSelector((state) => state.blocks.blocks);
  const handleKeyDown = (e: KeyboardEvent) => {
    // if (e.key == "Backspace") {
    //   if (inputRef.current) {
    //     inputRef.current.focus();
    //   }
    // }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  return (
    <div
      className={`transition-all duration-200 ease-in-out ${
        open
          ? "fixed inset-0 z-50 bg-white scale-110 opacity-100"
          : "relative h-full w-full scale-100 opacity-90"
      }`}
    >
      <div
        className={`fixed  w-full ${open ? "z-80 top-10 right-20" : "z-10 top-0 right-0 bg-white"} flex justify-end gap-5 pr-5 `}
      >
        <div className={"cursor-pointer"} onClick={() => setOpen(!open)}>
          {open ? "Back to Editor" : "Preview"}
        </div>
        {!open && <div className="cursor-pointer">Publish</div>}
      </div>
      <div className="w-full h-[30%] bg-amber-100 "></div>
      <div className="mx-auto max-w-2xl   h-[70%] ">
        <div className="-translate-y-15 flex flex-col items-start ">
          <Image
            className=" rounded-full cursor-pointer  translate-0 hover:-translate-y-1 shadow-2xl shadow-slate-400"
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
            {open ? (
              <EditorPreview blocks={blocks} />
            ) : (
              <Editor blocks={blocks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
