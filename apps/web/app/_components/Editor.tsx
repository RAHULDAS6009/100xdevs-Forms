import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  BasicTextStyleButton,
  CreateLinkButton,
  FormattingToolbar,
  FormattingToolbarController,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/mantine/style.css";

import { useEffect, useRef } from "react";
import "../globals.css";
import { useDispatch } from "react-redux";
import { addBlock } from "../../lib/slices/BlockSlice";
import { schema } from "./EditorComponents/schema";

export default function Editor({ blocks }: { blocks: PartialBlock[] }) {
  const dispatch = useDispatch();

  const editor = useCreateBlockNote({
    schema: schema,
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
      formattingToolbar={false}
      theme="light"
      onChange={() => {
        dispatch(addBlock(editor.document as PartialBlock[]));
      }}
    >
      <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar>
            <BasicTextStyleButton
              basicTextStyle="bold"
              key={"boldStyleButton"}
            />
            <BasicTextStyleButton
              basicTextStyle="italic"
              key={"italicStyleButton"}
            />
            <BasicTextStyleButton
              basicTextStyle="underline"
              key={"underlineStyleButton"}
            />
            <BasicTextStyleButton
              basicTextStyle="strike"
              key={"strikeStyleButton"}
            />
            <CreateLinkButton key={"createLinkButton"} />
          </FormattingToolbar>
        )}
      />
    </BlockNoteView>
  );
}
