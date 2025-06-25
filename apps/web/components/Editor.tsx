import { filterSuggestionItems } from "@blocknote/core";
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

import { useEffect } from "react";
import { schema } from "./EditorComponents/schema";
import {
  insertInput,
  insertLabel,
  insertSelect,
} from "./EditorComponents/InsetBlock";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { updateForm } from "../lib/slices/FormSlice";
import { MdDelete, MdSettings } from "react-icons/md";

type CustomEditor = typeof schema.blockSchema;

export default function Editor({ formid }: { formid: string }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.form);

  const intialblocks = JSON.parse(
    state.find((form) => formid === form.id)?.blocks as string
  );

  const editor = useCreateBlockNote({
    domAttributes: {
      // Adds a class to all `blockContainer` elements.
      block: {
        class: "hello-world-block",
      },
    },
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
        sideMenu={(props: SideMenuProps<CustomEditor>) => (
          <>
            {props.block.type == "submit" ? (
              // <SideMenu {...props}>
              <div className=" bg-white gap-2   justify-center ">
                <MdSettings size={40} className="  text-neutral-300 " />
              </div>
            ) : (
              // </SideMenu>
              <SideMenu {...props}>
                <div className="flex items-center bg-white gap-2   justify-center ">
                  <AddBlockButton {...props} />

                  <MdDelete
                    size={25}
                    className="bg-white  cursor-pointer"
                    onClick={() => {
                      editor.removeBlocks([props.block.id]);
                    }}
                  />
                  {/* <RemoveBlockButton {...props} /> */}
                  <DragHandleButton {...props} />
                </div>
              </SideMenu>
            )}
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
