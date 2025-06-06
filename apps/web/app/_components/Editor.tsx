import { Block, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";

import { useState } from "react";
import "../globals.css";
export default function Editor() {
  const [blocks, setBlocks] = useState<Block[]>();
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to thidemo!",
      },
      {
        type: "heading",
        content: "This is a heading block",
      },
      {
        type: "paragraph",
        content: "This is a paragraph block",
      },
      {
        type: "paragraph",
      },
    ],
  });
  return (
    <BlockNoteView
      editor={editor}
      theme={"light"}
      onChange={() => setBlocks(editor.document)}
    />
  );
}
