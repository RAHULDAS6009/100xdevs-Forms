"use client";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import "../globals.css";
import { PartialBlock } from "@blocknote/core";
import { schema } from "./EditorComponents/schema";
export default function EditorPreview({ blocks }: { blocks: PartialBlock[] }) {
  if (blocks.length === 0) {
    return;
  }
  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: blocks || [{ type: "paragraph", content: "Hello worl" }],
  });
  console.log(editor.document);
  return <BlockNoteView editable={false} editor={editor} theme={"light"} />;
}
