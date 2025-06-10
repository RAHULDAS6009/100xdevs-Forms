"use client";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import "../globals.css";
import { Block, PartialBlock } from "@blocknote/core";
import { schema } from "./EditorComponents/schema";
export default function EditorPreview() {
  const blocks = localStorage.getItem("blocks");
  if (!blocks) return;
  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: JSON.parse(blocks),
  });
  console.log(editor.document);
  return <BlockNoteView editable={false} editor={editor} theme={"light"} />;
}
