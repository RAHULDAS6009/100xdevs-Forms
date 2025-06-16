"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Form } from "../../../types";
import axios from "axios";
import { BACKEND_URL } from "./EditPage";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { schema } from "../EditorComponents/schema";
import { useAppSelector } from "../../../lib/hooks";

export default function PublishPage({ formid }: { formid: string }) {
  const state = useAppSelector((state) => state.form);
  const form = state.find((form) => form.id == formid);
  console.log(form);

  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: [...JSON.parse(form?.blocks as string), { type: "submit" }],
  });

  return (
    <div className="relative h-full w-full scale-100 opacity-90">
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
          <div className="outline-none text-[50px] font-bold ">
            {form?.title}
          </div>
          <div className=" -translate-x-18 w-full">
            <BlockNoteView editable={false} editor={editor} theme={"light"} />;
          </div>
        </div>
      </div>
    </div>
  );
}
