"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Form } from "../../../types";
import axios from "axios";
import { BlockNoteView } from "@blocknote/mantine";
import { BACKEND_URL } from "../../_components/pages/EditPage";
import { schema } from "../../_components/EditorComponents/schema";
import { useParams } from "next/navigation";
import { BlockNoteEditor } from "@blocknote/core";

type CustomEditorSchema = typeof schema.BlockNoteEditor;
export default function Page() {
  const params = useParams();
  const [form, setForm] = useState<Form | null>(null);
  const [editor, setEditor] = useState<CustomEditorSchema | null>(null);

  // Fetch form data
  useEffect(() => {
    async function fetchForm() {
      try {
        const res = await axios.get(`${BACKEND_URL}/form/${params.formid}`);
        setForm(res.data.form);
        console.log(JSON.parse(res.data.form.blocks));
      } catch (err) {
        console.error("Failed to fetch form:", err);
      }
    }

    fetchForm();
  }, [params.formid]);

  // Create the editor when form.blocks is ready
  useEffect(() => {
    if (!form?.blocks) return;

    try {
      const parsedBlocks = JSON.parse(form.blocks);
      const editorInstance = BlockNoteEditor.create({
        schema,
        initialContent: [...parsedBlocks, { type: "submit" }],
      });
      setEditor(editorInstance);
    } catch (err) {
      console.error("Failed to parse blocks or create editor:", err);
    }
  }, [form]);

  if (!form || !editor) return <div>Loading...</div>;

  return (
    <div className="grid grid-rows-6  h-full w-full scale-100 opacity-90">
      <div className="w-full row-span-2 bg-amber-100"></div>
      <div className="mx-auto max-w-2xl row-span-6">
        <div className="-translate-y-15 flex flex-col items-start">
          <Image
            className="rounded-full cursor-pointer hover:-translate-y-1 shadow-2xl shadow-slate-400"
            src={"/form-logo.jpg"}
            alt="form logo"
            width={100}
            height={100}
          />
          <div className="outline-none text-[50px] font-bold">{form.title}</div>
          <div className="-translate-x-18 w-full">
            <BlockNoteView editable={false} editor={editor} theme="light" />
          </div>
        </div>
      </div>
    </div>
  );
}
