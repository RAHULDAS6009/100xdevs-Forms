import { Block, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";

import { useEffect, useRef, useState } from "react";
import "../globals.css";
export default function Editor() {
  const [blocks, setBlocks] = useState<Block[]>();
  const editorRef = useRef<HTMLDivElement>(null);
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == "Enter" || e.key == "ArrowDown") {
      editor.focus();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editorRef]);
  const editor = useCreateBlockNote({
    initialContent: [{ type: "paragraph" }],
  });
  return (
    <BlockNoteView
      editor={editor}
      theme={"light"}
      onChange={() => {
        setBlocks(editor.document);
        localStorage.setItem("blocks", JSON.stringify(blocks));
      }}
    />
  );
}
