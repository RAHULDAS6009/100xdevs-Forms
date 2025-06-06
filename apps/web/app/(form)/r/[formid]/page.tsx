"use client";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const EditorPreview = dynamic(
  () => import("../../../_components/EditorPreview"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative h-full w-full scale-100 opacity-90">
      {/* i think we have to make it as a component */}

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
          <div className="outline-none text-[50px] font-bold ">{"Title"}</div>
          <div className=" -translate-x-18 w-full">
            <EditorPreview
              blocks={[{ type: "paragraph", content: "new thing" }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
