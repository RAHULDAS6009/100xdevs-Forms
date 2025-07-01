"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Form } from "../../types";
import axios from "axios";
import { BlockNoteView } from "@blocknote/mantine";
import { redirect, useParams } from "next/navigation";
import { BlockNoteEditor } from "@blocknote/core";
import { BACKEND_URL } from "./EditPage";
import { schema } from "../EditorComponents/schema";

type CustomEditorSchema = typeof schema.BlockNoteEditor;

export default function Page() {
  const params = useParams();
  const [form, setForm] = useState<Form | null>(null);
  const [editor, setEditor] = useState<CustomEditorSchema | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    async function fetchForm() {
      try {
        const res = await axios.get(`${BACKEND_URL}/form/${params.formid}`);
        setForm(res.data.form);
      } catch (err) {
        console.error("Failed to fetch form:", err);
      }
    }

    fetchForm();

    setIsSubmitted(false);
  }, [params.formid]);

  useEffect(() => {
    if (!form?.blocks) return;

    try {
      const parsedBlocks = JSON.parse(form.blocks);
      const editorInstance = BlockNoteEditor.create({
        schema,
        initialContent: [...parsedBlocks],
      });
      setEditor(editorInstance);
      sessionStorage.setItem(
        "form",
        JSON.stringify({ id: params.formid, submission: [] })
      );
    } catch (err) {
      console.error("Failed to parse blocks or create editor:", err);
    }
  }, [form]);

  if (!form || !editor) return <div className="loader"></div>;

  return (
    <>
      {!isSubmitted ? (
        <div className="grid grid-rows-6  h-full w-full scale-100 opacity-90 fixed overflow-y-auto">
          <div className="w-full row-span-2 bg-amber-100"></div>
          <div className="mx-auto max-w-2xl row-span-4">
            <div className="-translate-y-15 flex flex-col items-start">
              <Image
                className="rounded-full cursor-pointer hover:-translate-y-1 shadow-2xl shadow-slate-400"
                src={"/form-logo.jpg"}
                alt="form logo"
                width={100}
                height={100}
              />
              <div className="outline-none text-[50px] font-bold">
                {form.title}
              </div>
              <div className="-translate-x-18 w-full flex flex-col items-start   ">
                <BlockNoteView editable={false} editor={editor} theme="light" />
                <button
                  onClick={async () => {
                    const form = sessionStorage.getItem("form");

                    const formId = JSON.parse(form as string)?.id;

                    try {
                      const res = await axios.put(
                        `${BACKEND_URL}/form/${formId}/submission`,
                        {
                          submissions: JSON.stringify(
                            JSON.parse(form as string).submission
                          ),
                        }
                      );

                      setIsSubmitted(true);
                    } catch (err) {
                      console.error("Submission failed:", err);
                    }
                  }}
                  className="text-white bg-black font-medium text-sm w-35 ml-14  py-2   px-4 rounded-md    "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MadeWith100xForms />
      )}
    </>
  );
}

function MadeWith100xForms() {
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <button
        className="font-bold py-4 px-6 text-lg rounded-md border-4 border-neutral-400 cursor-pointer "
        onClick={() => {
          redirect("/");
        }}
      >
        Made with 100xForms
      </button>
    </div>
  );
}
