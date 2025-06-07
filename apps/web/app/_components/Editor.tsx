import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";

import { useEffect, useRef } from "react";
import "../globals.css";
import { useDispatch } from "react-redux";
import { addBlock } from "../../lib/slices/BlockSlice";

export default function Editor({ blocks }: { blocks: PartialBlock[] }) {
  const dispatch = useDispatch();

  const editor = useCreateBlockNote({
    initialContent: blocks,
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      editor?.focus();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <BlockNoteView
      editor={editor}
      theme="light"
      onChange={() => {
        dispatch(addBlock(editor.document as PartialBlock[]));
      }}
    />
  );
}
