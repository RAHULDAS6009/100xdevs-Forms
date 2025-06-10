import { Block, filterSuggestionItems, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  BasicTextStyleButton,
  CreateLinkButton,
  FormattingToolbar,
  FormattingToolbarController,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";

import "@blocknote/mantine/style.css";

import { useEffect, useState } from "react";
import "../globals.css";
import { schema } from "./EditorComponents/schema";
import {
  insertInput,
  insertLabel,
  insertSelect,
} from "./EditorComponents/InsetBlock";
export default function Editor() {
  const [blocks, setBlocks] = useState<any>();
  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: [{ type: "paragraph" }],
  });

  function onChange() {
    setBlocks(editor.document);
    localStorage.setItem("blocks", JSON.stringify(blocks, null, 2));
    // dispatch(addBlock(editor.document as PartialBlock[]));
  }

  // function handleKeyDown(e: KeyboardEvent) {
  //   if (e.key === "Enter") {
  //     editor?.focus();
  //   }
  // }

  useEffect(() => {
    // window.addEventListener("keydown", handleKeyDown);
    // return () => {
    //   window.removeEventListener("keydown", handleKeyDown);
    // };
  }, []);

  return (
    <BlockNoteView
      editor={editor}
      formattingToolbar={false}
      theme="light"
      onChange={onChange}
    >
      <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar>
            <BasicTextStyleButton basicTextStyle="bold" />
            <BasicTextStyleButton basicTextStyle="italic" />
            <BasicTextStyleButton basicTextStyle="underline" />
            <BasicTextStyleButton basicTextStyle="strike" />
            <CreateLinkButton />
          </FormattingToolbar>
        )}
      />

      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) => {
          const defaultItems = getDefaultReactSlashMenuItems(editor);
          const lastBasicBlockIndex = defaultItems.findLastIndex(
            (item) => item.group === "Basic blocks"
          );

          defaultItems.splice(lastBasicBlockIndex + 1, 0, insertLabel(editor));
          defaultItems.splice(lastBasicBlockIndex + 1, 0, insertInput(editor));
          defaultItems.splice(lastBasicBlockIndex + 1, 0, insertSelect(editor));

          return filterSuggestionItems(defaultItems, query);
        }}
      />
    </BlockNoteView>
  );
}
