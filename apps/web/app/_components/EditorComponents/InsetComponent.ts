import { insertOrUpdateBlock } from "@blocknote/core";
import { schema } from "./schema";
import { RiAlertFill } from "react-icons/ri";

const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Alert",
  subtext: "Alert for emphasizing text",
  onItemClick: () =>
    // If the block containing the text caret is empty, `insertOrUpdateBlock`
    // changes its type to the provided block. Otherwise, it inserts the new
    // block below and moves the text caret to it. We use this function with an
    // Alert block.
    insertOrUpdateBlock(editor, {
      type: "alert",
    }),
  aliases: [
    "alert",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Basic blocks",
  //   icon: <RiAlertFill/>
});
