"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Form } from "../../../types";
import axios from "axios";
import { BACKEND_URL } from "./EditPage";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { schema } from "../EditorComponents/schema";

export default function PublishPage({ formid }: { formid: string }) {
  const [form, setForm] = useState<Form>();

  useEffect(() => {
    console.log("hello");
    async function callAPI() {
      const res = await axios.get(`${BACKEND_URL}/form/${formid}`);
      console.log(res);
      setForm(res.data.form);
    }
    callAPI();
  }, [formid]);

  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: [...JSON.parse(form?.blocks as string), { type: "submit" }],
  });

  if (!form) return <div>Loading.....</div>;

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
            {form.blocks ? (
              <BlockNoteView editable={false} editor={editor} theme={"light"} />
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
