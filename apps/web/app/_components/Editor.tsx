import {
  Block,
  BlockNoteEditor,
  BlockSchema,
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  AddBlockButton,
  BasicTextStyleButton,
  CreateLinkButton,
  DragHandleButton,
  FormattingToolbar,
  FormattingToolbarController,
  getDefaultReactSlashMenuItems,
  SideMenu,
  SideMenuController,
  SideMenuProps,
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
import { RemoveBlockButton } from "./EditorComponents/sidemenu/RemoveBlockButton";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { updateForm } from "../../lib/slices/FormSlice";

export default function Editor({ formid }: { formid: string }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.form);

  const intialblocks = JSON.parse(
    state.find((form) => formid === form.id)?.blocks as string
  );

  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: [...intialblocks, { type: "submit" }],
  });

  function onChange() {
    dispatch(
      updateForm({
        id: formid,
        blocks: JSON.stringify(
          editor.document.filter((form) => form.type !== "submit")
        ),
      })
    );
  }

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

      <SideMenuController
        sideMenu={(props) => (
          <>
            <SideMenu {...props}>
              <div className="flex items-center bg-white gap-2  justify-center ">
                <AddBlockButton {...props} />
                <RemoveBlockButton {...props} />
                <DragHandleButton {...props} />
              </div>
            </SideMenu>
          </>
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
