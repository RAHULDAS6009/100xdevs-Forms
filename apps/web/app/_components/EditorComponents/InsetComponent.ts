import { insertOrUpdateBlock } from "@blocknote/core";
import { schema } from "./schema";
import { group } from "console";

export const insertLabel = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Label",
  subtext: "Label for emphasizing text",
  onItemClick: () =>
    // If the block containing the text caret is empty, `insertOrUpdateBlock`
    // changes its type to the provided block. Otherwise, it inserts the new
    // block below and moves the text caret to it. We use this function with an
    // Alert block.
    insertOrUpdateBlock(editor, {
      type: "label",
    }),
  // aliases: [
  //   "h",
  //   "notification",
  //   "emphasize",
  //   "warning",
  //   "error",
  //   "info",
  //   "success",
  // ],
  group: "Basic blocks",
  //   icon: <RiAlertFill/>
});

export const insertInput = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Input",
  subtext: "Input Block",
  onItemClick: () =>
    insertOrUpdateBlock(editor, {
      type: "input",
    }),
  group: "Basic blocks",
});
