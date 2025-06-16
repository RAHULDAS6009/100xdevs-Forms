"use client";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import "../globals.css";
import { schema } from "./EditorComponents/schema";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
export default function EditorPreview({ formid }: { formid: string }) {
  const state = useAppSelector((state) => state.form);
  const blocks = state.find((form) => form.id == formid)?.blocks;
  if (!blocks) return <div>No blocks</div>;
  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: [...JSON.parse(blocks), { type: "submit" }],
  });
  console.log(editor.document);
  return <BlockNoteView editable={false} editor={editor} theme={"light"} />;
}
