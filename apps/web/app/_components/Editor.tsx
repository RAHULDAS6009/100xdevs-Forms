import { filterSuggestionItems, PartialBlock } from "@blocknote/core";
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

import { useEffect } from "react";
import "../globals.css";
import { useDispatch } from "react-redux";
import { addBlock } from "../../lib/slices/BlockSlice";
import { schema } from "./EditorComponents/schema";
import { insertInput, insertLabel } from "./EditorComponents/InsetComponent";

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

      {/* slash menu controller */}
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) => {
          // Gets all default slash menu items.
          const defaultItems = getDefaultReactSlashMenuItems(editor);
          // Finds index of last item in "Basic blocks" group.

          const lastBasicBlockIndex = defaultItems.findLastIndex(
            (item) => item.group === "Basic blocks"
          );
          // Inserts the Alert item as the last item in the "Basic blocks" group.
          defaultItems.splice(lastBasicBlockIndex + 1, 0, insertLabel(editor));
          defaultItems.splice(lastBasicBlockIndex + 1, 0, insertInput(editor));

          // Returns filtered items based on the query.
          return filterSuggestionItems(defaultItems, query);
        }}
      />
    </BlockNoteView>
  );
}
